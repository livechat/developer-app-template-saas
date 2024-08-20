"use client";

import {
  Button,
  Heading,
  Text,
} from "@livechat/design-system-react-components";
import config from "livechat.config.json";

export default function Page() {
  return (
    <div className="homepage">
      <div className="homepage-card">
        <Heading as="div" size="xl">
          Hi! <span role="img">👋🏻</span>
        </Heading>
        <Heading as="div" size="xs" bold>
          Your app has been successfully installed <span role="img">🎉</span>
        </Heading>
        <Text as="div" size="md">
          This is the apps main page, continue with private installation to see your app in LiveChat.
        </Text>
        <Button kind="primary" onClick={() => window.open(`https://platform.text.com/console/apps/${config.id}/installation`, '_blank')}>
          Go to private installation
        </Button>
      </div>
    </div>
  );
}
