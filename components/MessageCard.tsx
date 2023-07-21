"use client"

import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import NumberInput from "./NumberInput";

export default function MessageCard({id, author, text, currentBalance,
    totalDonations, onDonationClickHandler}:
    {id: number, author: string, text: string, currentBalance: number, totalDonations: number,
        onDonationClickHandler: (messageId: number, donationAmount: number) => void}) {
    const [donationAmount, updateDonationAmount] = useState(0)
    return (
        <div className="flex flex-col p-2 bg-secondary rounded-md w-full max-w-3xl">
            <h3>id: {id}, author: {author.slice(0, 6)}...{author.slice(author.length - 4)}</h3>
            <p>{text}</p>
            <p>current balance: {currentBalance} ETH, donated totaly: {totalDonations} ETH</p>
            <div className="flex">
                <div className="basis-2/3 items-center">
                    <NumberInput placeholder="Enter donation amount" 
                        value={donationAmount}
                        onChangeHandler={(input) => updateDonationAmount(input.target.value)} />
                </div>
                <div className="flex basis-1/3 pl-2 items-center">
                    <PrimaryButton text="Donate" onClickHandler={() => onDonationClickHandler(id, donationAmount)}/>
                </div>
            </div>
        </div>
    )
}
