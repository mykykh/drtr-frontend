"use client"

import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import MessageCard from "./MessageCard"

import addresses from "../contracts/addresses.json" 
import abi from "../contracts/abi.json"
import PrimaryButton from "./PrimaryButton"

export default function MessageList({startingMessageId}: {startingMessageId: number | undefined}) {
  const { chainId: chainIdHex } = useMoralis()
  const chainId = parseInt(chainIdHex!)
  const messageStorageAddress: string | undefined = chainId ? addresses[chainId][0] : undefined

  const [ maxMessageId, setMaxMessageId ] = useState(startingMessageId)
  const [ queriedMessageId, updateQueriedMessageId ] = useState(undefined)

  const [ messages, updateMessages ] = useState([]) 

  const [ fetchedMessagesId, updateFethcedMessagesId ] = useState([])
  const [ maxNumberOfMessages, updateMaxNumberOfMessages ] = useState(5)

  const { runContractFunction: getCurrentId } = useWeb3Contract({
    abi: abi,
    contractAddress: messageStorageAddress,
    functionName: "currentId",
    params: {}
  })

  const { runContractFunction: getMessage } = useWeb3Contract({
    abi: abi,
    contractAddress: messageStorageAddress,
    functionName: "getMessage",
    params: {
      messageId: queriedMessageId 
    }
  })

  async function fetchMaxMessageId() {
    const currentId = parseInt((await getCurrentId())._hex)
    setMaxMessageId(currentId)
  }

  async function fetchMessage() {
    const fetchedMessage = await getMessage()
    updateMessages(messages.concat([{
      messageId: queriedMessageId,
      author: fetchedMessage[0],
      text: fetchedMessage[1]
    }]))
    updateFethcedMessagesId(fetchedMessagesId.concat([queriedMessageId]))
    updateQueriedMessageId(queriedMessageId - 1)
  }

  useEffect(() => {
    if (queriedMessageId !== undefined) {
      if (queriedMessageId >= 0 && queriedMessageId < maxMessageId) {
        if (fetchedMessagesId.length < maxNumberOfMessages) {
          if (!(fetchedMessagesId.includes(queriedMessageId))) {
            fetchMessage()
          } else {
            updateQueriedMessageId(queriedMessageId - 1)
          }
        }
      }
    }
  }, [queriedMessageId])

  useEffect(() => {
    if (maxMessageId === undefined) {
      fetchMaxMessageId()
    }else {
      updateQueriedMessageId(Math.max(0, maxMessageId - 1))
    }
  }, [maxMessageId, maxNumberOfMessages])

  return (
      <div className="grid grid-row-1 gap-2 justify-items-center">
        {messages.map(message => 
          <MessageCard key={message.messageId}
            id={message.messageId}
            author={message.author} 
            text={message.text} />
        )}
        <PrimaryButton text="Load more"
        onClickHandler={() => updateMaxNumberOfMessages(maxNumberOfMessages + 5)}
        disabled={queriedMessageId==-1} />
      </div>
  )
}
