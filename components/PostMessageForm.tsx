import { useMoralis, useWeb3Contract } from "react-moralis"

import addresses from "../contracts/addresses.json" 
import abi from "../contracts/abi.json"
import { useState } from "react"

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
            <input className="w-full max-w-3xl bg-secondary p-2 mb-2 
                rounded-md hover:bg-secondary-hover transition" 
                type="text" placeholder="Enter message" 
                value={messageText} onChange={input => updateMessageText(input.target.value)} />

            <input className="w-full max-w-3xl p-2 bg-primary rounded-md 
                hover:bg-primary-hover transition" type="submit" value="Post" />
        </form>
    )
}
