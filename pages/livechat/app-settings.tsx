import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useDeveloperApp from 'hooks/app/useDeveloperApp'

function LiveChatAppSettings() {
  const developerApp = useDeveloperApp()

  if (developerApp === null) {
    return <FullScreenLoader />
  }

  return (
    <ViewContainer>
      <h1>App settings</h1>
    </ViewContainer>
  )
}

export default LiveChatAppSettings
