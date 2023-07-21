"use client"

import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import MessageCard from "./MessageCard"

import addresses from "../contracts/addresses.json" 
import abi from "../contracts/abi.json"
import PrimaryButton from "./PrimaryButton"
import Moralis from "moralis-v1"

export default function MessageList({startingMessageId}: {startingMessageId: number | undefined}) {
  const { chainId: chainIdHex } = useMoralis()
  const chainId = parseInt(chainIdHex!)
  const messageStorageAddress: string | undefined = chainId ? addresses[chainId][0] : undefined

  const [ maxMessageId, setMaxMessageId ] = useState(startingMessageId)
  const [ queriedMessageId, updateQueriedMessageId ] = useState(undefined)

  const [ messages, updateMessages ] = useState([]) 

  const [ fetchedMessagesId, updateFethcedMessagesId ] = useState([])
  const [ maxNumberOfMessages, updateMaxNumberOfMessages ] = useState(5)

  const [ messageDonation, updateMessageDonation ] = useState({messageId: -1, donationAmount: 0})

  const [ messageWithdrawId, updateMessageWithdraw ] = useState(-1)

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

  const { runContractFunction: donateToMessage } = useWeb3Contract({
    abi: abi,
    contractAddress: messageStorageAddress,
    functionName: "donateToMessage",
    msgValue: Moralis.Units.ETH(messageDonation.donationAmount),
    params: {
      messageId: messageDonation.messageId 
    }
  })

  const { runContractFunction: withdrawFromMessage } = useWeb3Contract({
    abi: abi,
    contractAddress: messageStorageAddress,
    functionName: "withdrawFromMessage",
    params: {
      messageId: messageWithdrawId 
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
      text: fetchedMessage[1],
      currentBalance: (parseInt(fetchedMessage[2]._hex))/(10**18),
      totalDonations: (parseInt(fetchedMessage[3]._hex))/(10**18)
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

  useEffect(() => {
    if (messageDonation.messageId < 0)
      return
    if (messageDonation.donationAmount <= 0)
      return

    donateToMessage()
  }, [messageDonation])

  useEffect(() => {
    if (messageWithdrawId < 0)
      return

    withdrawFromMessage()
  }, [messageWithdrawId])

  return (
      <div className="grid grid-row-1 gap-2 justify-items-center">
        {messages.map(message => 
          <MessageCard key={message.messageId}
            id={message.messageId}
            author={message.author} 
            text={message.text}
            currentBalance={message.currentBalance}
            totalDonations={message.totalDonations} 
            onDonationClickHandler={(messageId, donationAmount) => {
              updateMessageDonation({messageId: messageId, donationAmount: donationAmount})
            }}
            onWithdrawClickHandler={(messageId) => updateMessageWithdraw(messageId)} />
        )}
        <PrimaryButton text="Load more"
        onClickHandler={() => updateMaxNumberOfMessages(maxNumberOfMessages + 5)}
        disabled={queriedMessageId==-1} />
      </div>
  )
}
