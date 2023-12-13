import { useEffect, useState } from 'react'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useDeveloperApp from 'hooks/app/useDeveloperApp'
import lcConfig from '../../livechat.config.json'
import useLiveChatFullscreenWidget from 'hooks/products/livechat/useFullscreenWidget'
import { DeveloperAppConfig } from '@livechat/developer-sdk'

function LiveChatFullscreen() {
  const developerApp = useDeveloperApp()
  const fullscreenWidget = useLiveChatFullscreenWidget()
  const [notificationsCount, setNotificationsCount] = useState(0)
  const [customers, setCustomers] = useState<any>()

  useEffect(() => {
    if (fullscreenWidget) {
      fullscreenWidget.setNotificationBadge(notificationsCount)
    }
  }, [fullscreenWidget, notificationsCount])

  useEffect(() => {
    if (developerApp && fullscreenWidget) {
      fetch(`${developerApp.urls.liveChatApi}/configuration/action/list_properties`, {
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
        .then((response) => {
          setCustomers(response)
          setNotificationsCount(Object.keys(response).length)
        })
    }
  }, [developerApp, fullscreenWidget])

  if (fullscreenWidget === null || developerApp === null) {
    return <FullScreenLoader />
  }

  const tableHandler = () => {
    for (const customer in customers) {
      const formattedCustomerData = customers[customer].default_value.split(';')
      const name = formattedCustomerData[0]
      const email = formattedCustomerData[1]

      return (
        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{customer}</td>
        </tr>
      )
    }
  }

  return (
    <ViewContainer>
      <h1>Customers list:</h1>
      <table className="agents-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>{tableHandler()}</tbody>
      </table>
    </ViewContainer>
  )
}

export default LiveChatFullscreen
