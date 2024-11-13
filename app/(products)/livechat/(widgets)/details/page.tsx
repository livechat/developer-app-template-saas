import { LiveChatDetailsProvider } from "@livechat/developer-ui-react";
import Widget from "./widget";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <LiveChatDetailsProvider>
      <Widget />
    </LiveChatDetailsProvider>
  );
}
