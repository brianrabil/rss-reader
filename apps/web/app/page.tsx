"use client";
import type { NextPage } from "next";
import { FeedLayout, InboxLayout } from "ui";

type Layouts = "inbox" | "feed";
const ACTIVE_LAYOUT: Layouts = "inbox";

function useActiveLayout(): Layouts {
  const activeLayout = ACTIVE_LAYOUT;
  return activeLayout;
}

const Home: NextPage = () => {
  const layout = useActiveLayout();
  switch (layout) {
    case "inbox":
      return <InboxLayout />;
    case "feed":
    default:
      return <FeedLayout />;
  }
};

export default Home;
