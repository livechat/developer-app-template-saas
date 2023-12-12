import { NextApiRequest, NextApiResponse } from 'next'
import camelcase from 'camelcase'
import lcConfig from '../../livechat.config.json'
import { DeveloperAppConfig } from '@livechat/developer-sdk'

async function AppWebhook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { clientID, licenseID, event, payload } = req.body
    if (clientID !== (lcConfig as DeveloperAppConfig).auth?.clientId) {
      throw new Error('Unauthorized')
    }
    const handlerName = camelcase(event) as keyof typeof WebhooksHandlers
    await WebhooksHandlers[handlerName](licenseID, payload)
  } catch (error) {
    const { message } = error as Error
    console.log('AppWebhook -> error: ', message)
  } finally {
    res.status(200).end()
  }
}

const WebhooksHandlers = {
  async applicationInstalled(licenseId: number, payload: { applicationId: string }) {
    console.log('AppWebhook -> applicationInstalled', licenseId, payload)
  },

  async applicationUninstalled(licenseId: number, payload: { applicationId: string }) {
    console.log('AppWebhook -> applicationUninstalled', licenseId, payload)
  },

  async paymentActivated(licenseId: number, payload: { paymentId: string; quantity: number }) {
    console.log('AppWebhook -> paymentActivated', licenseId, payload)
  },

  async paymentCollected(licenseId: number, payload: { paymentId: string; total: number }) {
    console.log('AppWebhook -> paymentCollected', licenseId, payload)
  },

  async paymentCancelled(licenseId: number, payload: { paymentId: string }) {
    console.log('AppWebhook -> paymentCancelled', licenseId, payload)
  },
}

export default AppWebhook
