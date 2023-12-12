import ViewContainer from 'components/ViewContainer'
import createMomentsSDK, { MomentsSDK } from '@livechat/moments-sdk'
import { useEffect, useState } from 'react'

function LiveChatTestMoment() {
  const [moment, setMoment] = useState<MomentsSDK>()

  useEffect(() => {
    createMomentsSDK({ title: 'My App' }).then((momentsSDK) => {
      console.log('chatId: ', momentsSDK.chatId)

      setMoment(momentsSDK)

      // your code
    })
  }, [])

  return (
    <ViewContainer>
      <h1>Test moment</h1>
      <button
        onClick={() => {
          moment?.sendMessage({
            text: 'Response from moment',
          })
        }}
      >
        Send message back
      </button>
      <button
        onClick={() => {
          moment?.sendMessage({
            text: 'Response from moment',
          })
          moment?.close()
        }}
      >
        Send message back and close
      </button>
    </ViewContainer>
  )
}

export default LiveChatTestMoment
