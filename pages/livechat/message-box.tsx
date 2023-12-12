import { Card } from '@livechat/design-system'
import { IRichMessage } from '@livechat/agent-app-sdk'
import { Button } from '@livechat/design-system'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useLiveChatMessageBoxWidget from 'hooks/products/livechat/useMessageBoxWidget'
import useDeveloperApp from 'hooks/app/useDeveloperApp'

const getRichMessage = (currentLocation: string): IRichMessage => ({
  template_id: 'cards',
  elements: [
    {
      title: 'Hello',
      subtitle: 'This is an example card',
      buttons: [
        {
          type: 'message',
          text: 'Say hello',
          value: 'Say hello',
          postback_id: 'send_message',
          user_ids: [],
        },
        {
          type: 'webview',
          text: 'Open link',
          postback_id: 'open_url',
          user_ids: [],
          value: `${currentLocation}/livechat/moments/test`,
          webview_height: 'full',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      ],
    },
  ],
})

function LiveChatMessageBox() {
  const developerApp = useDeveloperApp()
  const { widget, customerProfile } = useLiveChatMessageBoxWidget()

  if (widget === null || !developerApp) {
    return <FullScreenLoader />
  }

  return (
    <ViewContainer>
      <h1>Message box widget</h1>
      <Button kind="primary" type="button" onClick={() => widget.putMessage(getRichMessage(window.location.origin))}>
        Put a message
      </Button>
      <Card title="Customer profile">
        {customerProfile ? (
          <ul>
            <li>Name: {customerProfile.name}</li>
            <li>Country: {customerProfile.geolocation.country}</li>
            <li>Timezone: {customerProfile.geolocation.timezone}</li>
          </ul>
        ) : (
          'Loading customer profile ...'
        )}
      </Card>
    </ViewContainer>
  )
}

export default LiveChatMessageBox
