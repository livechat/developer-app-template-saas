import { useCallback, useEffect, useState } from 'react'
import { createDetailsWidget, ITicketInfo, IDetailsWidget, ISection } from '@livechat/helpdesk-sdk'

function useHelpDeskDetailsWidget(onSectionLoad?: () => ISection) {
  const [widget, setWidget] = useState<IDetailsWidget | null>(null)
  const [ticketInfo, setTicketInfo] = useState<ITicketInfo | null>(null)

  const widgetButtonHandler = useCallback(() => {
    // Handler for widget buttons
  }, [])

  useEffect(() => {
    createDetailsWidget().then(setWidget)
  }, [])

  useEffect(() => {
    if (widget) {
      setTicketInfo(widget.getTicketInfo())

      if (onSectionLoad) {
        widget.modifySection(onSectionLoad())
      }

      widget.on('ticket_info', setTicketInfo)
      widget.on('customer_details_section_button_click', widgetButtonHandler)

      return () => {
        widget.off('ticket_info', setTicketInfo)
        widget.off('customer_details_section_button_click', widgetButtonHandler)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget, widgetButtonHandler])

  return { widget, ticketInfo }
}

export default useHelpDeskDetailsWidget
