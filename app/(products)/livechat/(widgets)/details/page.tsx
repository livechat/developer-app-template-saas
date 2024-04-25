import { LiveChatDetailsProvider } from "@livechat/developer-ui-react";
import { getCustomers } from "prisma/api";
import Widget from "./widget";

export const dynamic = "force-dynamic";

export default async function Page() {
  const customers = await getCustomers();

  return (
    <LiveChatDetailsProvider>
      <Widget customers={customers} />
    </LiveChatDetailsProvider>
  );
}
