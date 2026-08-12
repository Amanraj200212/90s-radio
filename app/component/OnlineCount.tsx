"use client";
import { useEffect, useSyncExternalStore } from "react";
import usePresence from "@convex-dev/presence/react";
import { api } from "@/convex/_generated/api";

const USER_ID_STORAGE_KEY = "90s-radio-user-id";
const USER_ID_CHANGED_EVENT = "90s-radio-user-id-changed";

function getStoredUserId() {
  return localStorage.getItem(USER_ID_STORAGE_KEY);
}

function getServerUserId() {
  return null;
}

function subscribeToUserIdChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(USER_ID_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(USER_ID_CHANGED_EVENT, onStoreChange);
  };
}

export default function OnlineCount() {
  const userId = useSyncExternalStore(
    subscribeToUserIdChanges,
    getStoredUserId,
    getServerUserId
  );

  useEffect(() => {
    if (!localStorage.getItem(USER_ID_STORAGE_KEY)) {
      localStorage.setItem(USER_ID_STORAGE_KEY, crypto.randomUUID());
      window.dispatchEvent(new Event(USER_ID_CHANGED_EVENT));
    }
  }, []);

  // Don't start Presence until we have the stable ID.
  if (!userId) {
    return null;
  }

  return <PresenceCounter userId={userId} />;
}

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
      <span className="h-2 w-2 rounded-full bg-green-400" />
      <span>{onlineUsers.length} online</span>
    </div>
  );
}