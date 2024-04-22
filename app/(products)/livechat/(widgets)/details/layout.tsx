import { LiveChatDetailsProvider } from "@livechat/developer-ui-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LiveChatDetailsProvider>{children}</LiveChatDetailsProvider>;
}
