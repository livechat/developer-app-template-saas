import { Card } from '@livechat/design-system'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useDeveloperApp from 'hooks/app/useDeveloperApp'
import useHelpDeskDetailsWidget from 'hooks/products/helpdesk/useDetailsWidget'

function HelpDeskTicketDetails() {
  const developerApp = useDeveloperApp()
  const { widget, ticketInfo } = useHelpDeskDetailsWidget()

  if (widget === null || ticketInfo === null || !developerApp) {
    return <FullScreenLoader />
  }

  return (
    <ViewContainer>
      <h1>Chat Details widget</h1>
      <Card title="Ticket details">
        <ul>
          <li>Id: {ticketInfo.id}</li>
        </ul>
      </Card>
    </ViewContainer>
  )
}

export default HelpDeskTicketDetails
