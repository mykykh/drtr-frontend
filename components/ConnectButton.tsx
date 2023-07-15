"use client"
import { useMoralis } from "react-moralis"
import PrimaryButton from "./PrimaryButton"

export default function ConnectButton() {
    const {enableWeb3, account, deactivateWeb3} = useMoralis()
    return (
        <div>
           {account ? 
                <PrimaryButton
                text={`${account.slice(0, 6)}...${account.slice(account.length - 4)}`} 
                onClickHandler={() => deactivateWeb3()} /> :
                <PrimaryButton
                text="Connect wallet" 
                onClickHandler={() => enableWeb3()} />}
        </div>
    )
}
