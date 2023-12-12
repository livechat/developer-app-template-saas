import { useCallback, useEffect, useState } from 'react'
import { createMessageBoxWidget, ICustomerProfile, IMessageBoxWidget } from '@livechat/agent-app-sdk'

function useLiveChatMessageBoxWidget() {
  const [widget, setWidget] = useState<IMessageBoxWidget | null>(null)
  const [customerProfile, setCustomerProfile] = useState<ICustomerProfile | null>(null)

  const widgetButtonHandler = useCallback(() => {
    // Handler for widget buttons
  }, [])

  useEffect(() => {
    createMessageBoxWidget().then((widget) => {
      widget.on('customer_profile', setCustomerProfile)

      setWidget(widget)
    })
  }, [])

  useEffect(() => {
    if (widget) {
      setCustomerProfile(widget.getCustomerProfile())

      widget.on('customer_profile', setCustomerProfile)

      return () => {
        widget.off('customer_profile', setCustomerProfile)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget, widgetButtonHandler])

  return { widget, customerProfile }
}

export default useLiveChatMessageBoxWidget
