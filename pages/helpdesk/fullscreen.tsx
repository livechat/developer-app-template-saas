import { useEffect, useState } from 'react'
import { Card, NumericInputField } from '@livechat/design-system'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useDeveloperApp from 'hooks/app/useDeveloperApp'
import useHelpDeskFullscreenWidget from 'hooks/products/helpdesk/useFullscreenWidget'

type Agent = {
  id: string
  name: string
  role: string
  avatar: string
}

function HelpDeskFullscreen() {
  const developerApp = useDeveloperApp()
  const fullscreenWidget = useHelpDeskFullscreenWidget()
  const [agents, setAgents] = useState<Agent[] | null>(null)
  const [notificationsCount, setNotificationsCount] = useState(0)

  useEffect(() => {
    if (fullscreenWidget) {
      fullscreenWidget.setNotificationBadge(notificationsCount)
    }
  }, [fullscreenWidget, notificationsCount])

  useEffect(() => {
    if (developerApp) {
      fetch(`${developerApp.urls.liveChatApi}/configuration/action/list_agents`, {
        method: 'POST',
        body: '{}',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${developerApp.authorization?.data?.token_type} ${developerApp.authorization?.data?.access_token}`,
        },
      })
        .then((response) => response.json())
        .then(setAgents)
    }
  }, [developerApp])

  if (fullscreenWidget === null || developerApp === null || agents === null) {
    return <FullScreenLoader />
  }

  return (
    <ViewContainer>
      <h1>Fullscreen widget</h1>
      <NumericInputField
        min={0}
        max={99}
        id="notifications-count"
        labelText="Notifications count"
        value={String(notificationsCount)}
        onChange={(value) => setNotificationsCount(Number(value))}
      />
      <h3>Agents list:</h3>
      <div className="agents-list">
        {agents.map((agent) => (
          <Card key={agent.id} title={agent.name} img={agent.avatar}>
            {agent.role}
          </Card>
        ))}
      </div>
    </ViewContainer>
  )
}

export default HelpDeskFullscreen
