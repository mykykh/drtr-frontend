"use client"
import { useMoralis } from "react-moralis"

export default function ConnectButton() {
    const {enableWeb3, account, deactivateWeb3} = useMoralis()
    return (
        <div>
           {account ? 

                (<button onClick={() => deactivateWeb3()}
                    className="p-2 bg-primary rounded-md hover:bg-primary-hover transition">
                    {account.slice(0, 6)}...{account.slice(account.length - 4)}</button>) : 

                (<button onClick={() => enableWeb3()}
                    className="p-2 bg-primary rounded-md hover:bg-primary-hover transition">
                    Connect wallet</button>)}
        </div>
    )
}
