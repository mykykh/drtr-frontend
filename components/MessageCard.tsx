"use client"

import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import NumberInput from "./NumberInput";

import addresses from "../contracts/addresses.json" 
import abi from "../contracts/abi.json"
import { useMoralis, useWeb3Contract } from "react-moralis";

export default function MessageCard({id, author, text, currentBalance, totalDonations,
    onDonationClickHandler, onWithdrawClickHandler}:
    {id: number, author: string, text: string, currentBalance: number, totalDonations: number,
        onDonationClickHandler: (messageId: number, donationAmount: number) => void,
        onWithdrawClickHandler: (messageId: number) => void}) {

    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex!)
    const messageStorageAddress: string | undefined = chainId ? addresses[chainId][0] : undefined

    const { runContractFunction: getMessage } = useWeb3Contract({
        abi: abi,
        contractAddress: messageStorageAddress,
        functionName: "getMessage",
        params: {
          messageId: id 
        }
    })

    const [donationAmount, updateDonationAmount] = useState(0)

    const [messageBalance, updateMessageBalance] = useState(currentBalance)
    const [messageTotalDonations, updateMessageTotalDonations] = useState(totalDonations)

    setInterval(async () => {
        const fetchedMessage = await getMessage()
        updateMessageBalance((parseInt(fetchedMessage[2]._hex))/(10**18))
        updateMessageTotalDonations((parseInt(fetchedMessage[3]._hex))/(10**18))
    }, 10000)

    return (
        <div className="flex flex-col p-2 bg-secondary rounded-md w-full max-w-3xl">
            <h3>id: {id}, author: {author.slice(0, 6)}...{author.slice(author.length - 4)}</h3>
            <p>{text}</p>
            <p>current balance: {messageBalance} ETH, donated totaly: {messageTotalDonations} ETH</p>
            <div className="flex">
                <div className="basis-2/3 items-center">
                    <NumberInput placeholder="Enter donation amount" 
                        value={donationAmount}
                        onChangeHandler={(input) => updateDonationAmount(input.target.value)} />
                </div>
                <div className="flex basis-1/6 justify-center items-center">
                    <PrimaryButton text="Donate"
                        onClickHandler={() => onDonationClickHandler(id, donationAmount)} />
                </div>
                <div className="flex basis-1/6 justify-center items-center">
                    <PrimaryButton text="Withdraw"
                        onClickHandler={() => onWithdrawClickHandler(id)} />
                </div>
            </div>
        </div>
    )
}
