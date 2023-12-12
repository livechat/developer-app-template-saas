import { NextApiRequest, NextApiResponse } from 'next'

type ChatActionPayload = {
  licence_id: string
  agent_id: string
  time: string
  instance_id: string
  source: string
  chat_id: string
  thread_id: string
  customer_id: string
  customer_name: string
  customer_email: string
  customer_host: string
  customer_ip: string
  customer_latitude: string
  customer_longitude: string
  customer_country: string
  customer_region: string
  customer_city: string
  customer_timezone: string
}

async function ChatAction(req: NextApiRequest, res: NextApiResponse) {
  const payload = req.query as ChatActionPayload
  console.log('ChatAction', payload)
  res.status(200).end()
}

export default ChatAction
