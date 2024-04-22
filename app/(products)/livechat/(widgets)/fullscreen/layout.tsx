import { LiveChatFullscreenProvider } from "@livechat/developer-ui-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LiveChatFullscreenProvider>{children}</LiveChatFullscreenProvider>;
}
