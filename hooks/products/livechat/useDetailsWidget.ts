import { useCallback, useEffect, useState } from 'react'
import { createDetailsWidget, ICustomerProfile, IDetailsWidget, ISection } from '@livechat/agent-app-sdk'

function useLiveChatDetailsWidget(onSectionLoad?: () => ISection) {
  const [widget, setWidget] = useState<IDetailsWidget | null>(null)
  const [customerProfile, setCustomerProfile] = useState<ICustomerProfile | null>(null)

  const widgetButtonHandler = useCallback(() => {
    // Handler for widget buttons
  }, [])

  useEffect(() => {
    createDetailsWidget().then(setWidget)
  }, [])

  useEffect(() => {
    if (widget) {
      setCustomerProfile(widget.getCustomerProfile())

      if (onSectionLoad) {
        widget.modifySection(onSectionLoad())
      }

      widget.on('customer_profile', setCustomerProfile)
      widget.on('customer_details_section_button_click', widgetButtonHandler)

      return () => {
        widget.off('customer_profile', setCustomerProfile)
        widget.off('customer_details_section_button_click', widgetButtonHandler)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget, widgetButtonHandler])

  return { widget, customerProfile }
}

export default useLiveChatDetailsWidget
