import { LiveChatFullscreenProvider } from "@livechat/developer-ui-react";
import { getCustomers } from "lib/api";
import Widget from "./widget";

export default async function Page() {
  const customers = await getCustomers();

  return (
    <LiveChatFullscreenProvider>
      <Widget customers={customers} />
    </LiveChatFullscreenProvider>
  );
}
