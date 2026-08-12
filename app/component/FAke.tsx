// "use client";

// import { useEffect, useState } from "react";
// import usePresence from "@convex-dev/presence/react";
// import { api } from "@/convex/_generated/api";

// export default function OnlineCount() {
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     let id = localStorage.getItem("90s-radio-user-id");

//     if (!id) {
//       id = crypto.randomUUID();
//       localStorage.setItem("90s-radio-user-id", id);
//     }

//     setUserId(id);
//   }, []);

//   // Don't start Presence until we have the stable ID.
//   if (!userId) {
//     return null;
//   }

//   return <PresenceCounter userId={userId} />;
// }

// function PresenceCounter({ userId }: { userId: string }) {
//   const presenceState = usePresence(
//     api.presence,
//     "90s-radio",
//     userId
//   );

//   const onlineUsers =
//     presenceState?.filter((user) => user.online) ?? [];

//   return (
//     <div className="flex items-center gap-2 text-sm text-white">
//       <span className="h-2 w-2 rounded-full bg-green-400" />
//       <span>{onlineUsers.length} online</span>
//     </div>
//   );
// }