import { DeveloperApp, DeveloperAppConfig } from '@livechat/developer-sdk'
import lcConfig from '../../livechat.config.json'
import { ICustomerProfile } from '@livechat/agent-app-sdk'

const getRegion = (token: string) => token.split(':')[0]

export const fetchCustomers = async (developerApp: DeveloperApp) => {
  const response = await fetch(`${developerApp.urls.liveChatApi}/configuration/action/list_properties`, {
    method: 'POST',
    body: JSON.stringify({
      owner_client_id: (lcConfig as DeveloperAppConfig).auth?.clientId,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${developerApp.authorization?.data?.token_type} ${developerApp.authorization?.data?.access_token}`,
      'X-Region': getRegion(developerApp.authorization?.data?.access_token || ''),
    },
  }).then((response) => {
    if (!response.ok) {
      developerApp.features.reports.sendError('4xx', 'list_properties')
    }
    return response.json()
  })

  return response
}

export const saveCustomerProfile = async (developerApp: DeveloperApp, customerProfile: ICustomerProfile) => {
  const response = await fetch(`${developerApp.urls.liveChatApi}/configuration/action/register_property`, {
    method: 'POST',
    body: JSON.stringify({
      name: customerProfile.id,
      owner_client_id: (lcConfig as DeveloperAppConfig).auth?.clientId,
      type: 'string',
      access: {
        license: {
          agent: ['read', 'write'],
        },
      },
      default_value: `${customerProfile.name};${customerProfile.email}`,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${developerApp.authorization?.data?.token_type} ${developerApp.authorization?.data?.access_token}`,
      'X-Region': getRegion(developerApp.authorization?.data?.access_token || ''),
    },
  }).then((response) => {
    if (!response.ok) {
      developerApp.features.reports.sendError('4xx', 'register_property')
    }
    return response.json()
  })

  return response
}

export const deleteCustomerProfile = async (developerApp: DeveloperApp, id: string) => {
  const response = await fetch(`${developerApp.urls.liveChatApi}/configuration/action/unregister_property`, {
    method: 'POST',
    body: JSON.stringify({
      name: id,
      owner_client_id: (lcConfig as DeveloperAppConfig).auth?.clientId,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${developerApp.authorization?.data?.token_type} ${developerApp.authorization?.data?.access_token}`,
      'X-Region': getRegion(developerApp.authorization?.data?.access_token || ''),
    },
  }).then((response) => {
    if (!response.ok) {
      developerApp.features.reports.sendError('4xx', 'unregister_property')
    }
    return response.json()
  })

  return response
}
