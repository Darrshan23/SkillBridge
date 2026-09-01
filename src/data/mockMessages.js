// ---------------------------------------------------------------------------
// mockMessages.js
//
// A flat list of messages between a seeker and an employer, grouped by
// `applicationId` so each conversation is tied to a specific application.
//
// [BACKEND] A real chat feature would use either polling (`GET
// /api/messages?applicationId=...` every few seconds) or a WebSocket /
// server-sent-events connection for instant delivery. This mock version just
// keeps everything in memory, so messages disappear on refresh.
// ---------------------------------------------------------------------------

export const mockMessages = [
  {
    id: "m1",
    applicationId: "a1",
    senderId: "u4",
    text: "Hi Amara — loved your portfolio. Are you free for a quick call this week?",
    sentAt: "2026-08-22T10:15:00",
  },
  {
    id: "m2",
    applicationId: "a1",
    senderId: "u1",
    text: "Hi! Yes, I'm free Wednesday or Thursday afternoon.",
    sentAt: "2026-08-22T11:02:00",
  },
  {
    id: "m3",
    applicationId: "a3",
    senderId: "u4",
    text: "Congrats, you're hired! Sending over the first brief today.",
    sentAt: "2026-08-26T09:00:00",
  },
];
