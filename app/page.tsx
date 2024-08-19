"use client";

import {
  Button,
  Heading,
  Text,
} from "@livechat/design-system-react-components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
          This is the apps main page but you can&apos;t find anything
          interesting here.
        </Text>
        <Button kind="primary" onClick={() => router.push("/livechat/details")}>
          See chat details
        </Button>
      </div>
    </div>
  );
}
