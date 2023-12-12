import { useEffect, useState } from 'react'
import { createFullscreenWidget, IFullscreenWidget } from '@livechat/helpdesk-sdk'

function useHelpDeskFullscreenWidget(): IFullscreenWidget | null {
  const [widget, setWidget] = useState<IFullscreenWidget | null>(null)

  useEffect(() => {
    createFullscreenWidget().then(setWidget)
  }, [])

  return widget
}

export default useHelpDeskFullscreenWidget
