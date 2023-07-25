"use client"
import { useMoralis } from "react-moralis"
import PrimaryButton from "./PrimaryButton"
import { useEffect } from "react"

export default function ConnectButton() {
    const {isWeb3Enabled, enableWeb3, account, deactivateWeb3} = useMoralis()
    useEffect(() => {
        if (!isWeb3Enabled) {
            if (window) {
                if (window.localStorage.getItem("connected")) {
                    enableWeb3()
                }
            }
        }
    }, [isWeb3Enabled])
    return (
        <div>
           {account ? 
                <PrimaryButton
                text={`${account.slice(0, 6)}...${account.slice(account.length - 4)}`} 
                onClickHandler={() => {deactivateWeb3()
                        if (window) {
                            window.localStorage.removeItem("connected")
                        }
                    }} /> :
                <PrimaryButton
                text="Connect wallet" 
                onClickHandler={() => {
                        enableWeb3()
                        if (window) {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }} />}
        </div>
    )
}
