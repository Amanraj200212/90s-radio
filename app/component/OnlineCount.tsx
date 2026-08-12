"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import usePresence from "@convex-dev/presence/react";
import { api } from "@/convex/_generated/api";

const USER_ID_STORAGE_KEY = "90s-radio-user-id";

function getUserId() {
  if (typeof window === "undefined") {
    return null;
  }

  let id = localStorage.getItem(USER_ID_STORAGE_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_STORAGE_KEY, id);
  }

  return id;
}

function OnlineCountClient() {
  const [userId] = useState(getUserId);

  return userId ? <PresenceCounter userId={userId} /> : null;
}

const OnlineCount = dynamic(() => Promise.resolve(OnlineCountClient), {
  ssr: false,
});

export default OnlineCount;

function PresenceCounter({ userId }: { userId: string }) {
  const presenceState = usePresence(
    api.presence,
    "90s-radio",
    userId
  );

  const onlineUsers =
    presenceState?.filter((user) => user.online) ?? [];

  return (
    <div className="flex items-center gap-2 text-sm text-white">
      <span className="h-2 w-2 rounded-full bg-green-700 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
      <span>{onlineUsers.length} online</span>
    </div>
  );
}
