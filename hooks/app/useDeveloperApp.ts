import { useEffect, useState } from 'react'
import { DeveloperApp, DeveloperAppConfig } from '@livechat/developer-sdk'
import lcConfig from '../../livechat.config.json'

const config = lcConfig as unknown as DeveloperAppConfig

function useDeveloperApp() {
  const [developerApp, setDeveloperApp] = useState<DeveloperApp | null>(null)

  useEffect(() => {
    const app = DeveloperApp.init(config)

    if (config.blocks?.authorization) {
      app.authorize().then(() => setDeveloperApp(app))
    } else {
      setDeveloperApp(app)
    }
  }, [])

  return developerApp
}

export default useDeveloperApp
