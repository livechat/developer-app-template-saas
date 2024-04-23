import { LiveChatDetailsProvider } from "@livechat/developer-ui-react";
import { getCustomers } from "lib/api";
import Widget from "./widget";

export default async function Page() {
  const customers = await getCustomers();

  return (
    <LiveChatDetailsProvider>
      <Widget customers={customers} />
    </LiveChatDetailsProvider>
  );
}
