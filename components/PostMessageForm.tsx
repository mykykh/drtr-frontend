import { useMoralis, useWeb3Contract } from "react-moralis"

import addresses from "../contracts/addresses.json" 
import abi from "../contracts/abi.json"
import { useState } from "react"
import TextInput from "./TextInput"
import SubmitInput from "./SubmitInput"

export default function PostMessageForm() {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex!)
    const messageStorageAddress: string | undefined = chainId ? addresses[chainId][0] : undefined

    const [ messageText, updateMessageText ] = useState("")

    const { runContractFunction } = useWeb3Contract({
          abi: abi,
          contractAddress: messageStorageAddress,
          functionName: "postMessage",
          params: {
            messageText: messageText
          }
        })

    function postMessage(form: any) {
        form.preventDefault()
        runContractFunction()
    }

    return (
        <form className="flex flex-col items-center w-full" onSubmit={postMessage}>
            <div className="w-full max-w-3xl">
                <div className="mb-2">
                    <TextInput placeholder="Enter message" value={messageText} 
                        onChangeHandler={(input: any) => updateMessageText(input.target.value)} />
                </div>

                <SubmitInput value="Post" />
            </div>
        </form>
    )
}
