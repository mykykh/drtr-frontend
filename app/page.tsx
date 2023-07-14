"use client"

import MessageList from "@/components/MessageList"
import PostMessageForm from "@/components/PostMessageForm"
import { useMoralis } from "react-moralis"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const { isWeb3Enabled } = useMoralis()
  const searchParams = useSearchParams()
  const startingMessageId = searchParams.get("id")
  return (
    <div className="flex flex-col items-ceneter p-2">
      {
        isWeb3Enabled ? 
          (
            <div className="grid grid-row-1 gap-2">
              <PostMessageForm />
              <MessageList startingMessageId={startingMessageId ? 
                parseInt(startingMessageId) + 1 : undefined}/>
            </div>
          ) : 
          <p className="text-center text-xl">Connect wallet to fetch messages</p>
      }
    </div>
  )
}
