import { NextApiRequest, NextApiResponse } from 'next'
import camelcase from 'camelcase'

async function ChatWebhook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { webhook_id, secret_key, action, organization_id, payload } = req.body
    if (secret_key !== process.env.WEBHOOK_SECRET) {
      throw new Error('Unauthorized')
    }
    const handlerName = camelcase(action) as keyof typeof WebhooksHandlers
    await WebhooksHandlers[handlerName](organization_id, webhook_id, payload)
  } catch (error) {
    const { message } = error as Error
    console.log('ChatWebhook -> error: ', message)
  } finally {
    res.status(200).end()
  }
}

const WebhooksHandlers = {
  async incomingChat(organization_id: string, webhook_id: string, payload: unknown) {
    console.log('ChatWebhook -> incomingChat', organization_id, webhook_id, payload)
  },
}

export default ChatWebhook
