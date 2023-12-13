import { useEffect, useState } from 'react'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useDeveloperApp from 'hooks/app/useDeveloperApp'
import useLiveChatFullscreenWidget from 'hooks/products/livechat/useFullscreenWidget'
import { DeveloperApp } from '@livechat/developer-sdk'
import { deleteCustomerProfile, fetchCustomers } from 'lib/api'
import { Button } from '@livechat/design-system-react-components'

interface Customer {
  name: string
  email: string
  id: string
}

function LiveChatFullscreen() {
  const developerApp = useDeveloperApp()
  const fullscreenWidget = useLiveChatFullscreenWidget()
  const [notificationsCount, setNotificationsCount] = useState(0)
  const [customers, setCustomers] = useState<Customer[]>([])

  const handleFetchCustomers = async (developerApp: DeveloperApp) => {
    const customers = await fetchCustomers(developerApp)
    const formattedCustomers = Object.keys(customers).map((customer) => ({
      name: customers[customer].default_value.split(';')[0],
      email: customers[customer].default_value.split(';')[1],
      id: customer,
    }))
    setCustomers(formattedCustomers)
    setNotificationsCount(3)
  }

  const handleDeleteCustomerProfile = async (developerApp: DeveloperApp, customerId: string) => {
    await deleteCustomerProfile(developerApp, customerId)
    await handleFetchCustomers(developerApp)
  }

  useEffect(() => {
    if (fullscreenWidget) {
      fullscreenWidget.setNotificationBadge(notificationsCount)
    }
  }, [fullscreenWidget, notificationsCount])

  useEffect(() => {
    if (developerApp && fullscreenWidget) {
      handleFetchCustomers(developerApp)
    }
  }, [developerApp, fullscreenWidget])

  if (fullscreenWidget === null || developerApp === null || !Object.keys(customers).length) {
    return <FullScreenLoader />
  }

  return (
    <ViewContainer>
      <h1>Customers list</h1>
      <table className="customer-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.id}</td>
              <td>
                <Button
                  kind="secondary"
                  onClick={async () => await handleDeleteCustomerProfile(developerApp, customer.id)}
                >
                  Delete user
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ViewContainer>
  )
}

export default LiveChatFullscreen
