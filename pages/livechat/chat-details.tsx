import { useEffect, useState } from 'react'
import { Button, Card } from '@livechat/design-system'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import lcConfig from '../../livechat.config.json'
import useDeveloperApp from 'hooks/app/useDeveloperApp'
import useLiveChatDetailsWidget from 'hooks/products/livechat/useDetailsWidget'
import { DeveloperAppConfig } from '@livechat/developer-sdk'

function LiveChatChatDetails() {
  const developerApp = useDeveloperApp()
  const { widget, customerProfile } = useLiveChatDetailsWidget()
  const [customers, setCustomers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (customerProfile && developerApp) {
      fetchCustomerProfiles()
    }
  }, [developerApp, customerProfile])

  if (widget === null || !developerApp || !customerProfile) {
    return <FullScreenLoader />
  }

  const fetchCustomerProfiles = () => {
    fetch(`${developerApp.urls.liveChatApi}/configuration/action/list_propertie`, {
      method: 'POST',
      body: JSON.stringify({
        owner_client_id: (lcConfig as DeveloperAppConfig).auth?.clientId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${developerApp.authorization?.data?.token_type} ${developerApp.authorization?.data?.access_token}`,
      },
    })
      .then((response) => response.json())
      .then(setCustomers)
      .catch((e) => console.log(e))
  }

  const handleSaveCustomerProfile = () => {
    setIsLoading(true)

    fetch(`${developerApp.urls.liveChatApi}/configuration/action/register_property`, {
      method: 'POST',
      body: JSON.stringify({
        name: customerProfile.id,
        owner_client_id: (lcConfig as DeveloperAppConfig).auth?.clientId,
        type: 'string',
        access: {
          license: {
            agent: ['read', 'write'],
          },
        },
        default_value: `${customerProfile.name};${customerProfile.email}`,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${developerApp.authorization?.data?.token_type} ${developerApp.authorization?.data?.access_token}`,
      },
    })
      .then((response) => response.json())
      .then(() => fetchCustomerProfiles())
      .finally(() => setIsLoading(false))
  }

  const handleDeleteCustomerProfile = () => {
    setIsLoading(true)
    fetch(`${developerApp.urls.liveChatApi}/configuration/action/unregister_property`, {
      method: 'POST',
      body: JSON.stringify({
        name: customerProfile.id,
        owner_client_id: (lcConfig as DeveloperAppConfig).auth?.clientId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${developerApp.authorization?.data?.token_type} ${developerApp.authorization?.data?.access_token}`,
      },
    })
      .then((response) => response.json())
      .then(() => fetchCustomerProfiles())
      .finally(() => setIsLoading(false))
  }

  const customerExists = customerProfile?.id in customers

  return (
    <ViewContainer>
      <Card title="Customer profile">
        <ul>
          <li>Name: {customerProfile.name}</li>
          <li>Country: {customerProfile.geolocation.country}</li>
          <li>Timezone: {customerProfile.geolocation.timezone}</li>
        </ul>
        <Button
          loading={isLoading}
          kind="primary"
          onClick={customerExists ? handleDeleteCustomerProfile : handleSaveCustomerProfile}
        >
          {customerExists ? 'Delete customer' : 'Save customer'}
        </Button>
      </Card>
    </ViewContainer>
  )
}

export default LiveChatChatDetails
