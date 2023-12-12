import { Card } from '@livechat/design-system'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useDeveloperApp from 'hooks/app/useDeveloperApp'
import useLiveChatDetailsWidget from 'hooks/products/livechat/useDetailsWidget'

function LiveChatChatDetails() {
  const developerApp = useDeveloperApp()
  const { widget, customerProfile } = useLiveChatDetailsWidget()

  if (widget === null || !developerApp) {
    return <FullScreenLoader />
  }

  return (
    <ViewContainer>
      <h1>Chat Details widget</h1>
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

export default LiveChatChatDetails
