import { useEffect, useState } from 'react'
import { Button, Card } from '@livechat/design-system-react-components'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useDeveloperApp from 'hooks/app/useDeveloperApp'
import useLiveChatDetailsWidget from 'hooks/products/livechat/useDetailsWidget'
import { deleteCustomerProfile, fetchCustomers, saveCustomerProfile } from 'lib/api'

export interface CustomerProfile {
  [key: string]: {
    default_value: string
  }
}

function LiveChatChatDetails() {
  const developerApp = useDeveloperApp()
  const { widget, customerProfile } = useLiveChatDetailsWidget()
  const [customers, setCustomers] = useState<CustomerProfile>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (customerProfile && developerApp) {
      fetchCustomerProfiles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developerApp, customerProfile])

  if (widget === null || !developerApp || !customerProfile) {
    return <FullScreenLoader />
  }

  const fetchCustomerProfiles = async () => {
    const customers = await fetchCustomers(developerApp)
    setCustomers(customers)
  }

  const handleSaveCustomerProfile = async () => {
    setIsLoading(true)
    await saveCustomerProfile(developerApp, customerProfile)
    await fetchCustomerProfiles()
    setIsLoading(false)
  }

  const handleDeleteCustomerProfile = async () => {
    setIsLoading(true)
    await deleteCustomerProfile(developerApp, customerProfile.id)
    await fetchCustomerProfiles()
    setIsLoading(false)
  }

  const customerExists = customerProfile?.id in customers

  return (
    <ViewContainer>
      <Card title="Customer profile">
        <ul>
          <li>Name: {customerProfile.name}</li>
          <li>Email: {customerProfile.email}</li>
          <li>Country: {customerProfile.geolocation.country}</li>
          <li>Timezone: {customerProfile.geolocation.timezone}</li>
          <li>ID: {customerProfile.id}</li>
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
