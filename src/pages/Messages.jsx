import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { mockUsers } from "../data/mockUsers";

// [BACKEND] This whole page currently re-derives "conversations" from the
// flat `messages` + `applications` arrays on every render. A real backend
// would more likely expose a ready-made `GET /api/conversations` endpoint
// that already groups messages by application, so the frontend wouldn't
// need to do this grouping itself.
export default function Messages() {
  const { currentUser } = useAuth();
  const { applications, listings, messages, sendMessage } = useData();
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("application");

  // Conversations this user is part of: every application where they're
  // either the applicant or the employer of that listing.
  const myConversations = useMemo(() => {
    return applications
      .map((application) => {
        const listing = listings.find((l) => l.id === application.listingId);
        const isApplicant = application.applicantId === currentUser.id;
        const isEmployer = listing?.employerId === currentUser.id;
        if (!isApplicant && !isEmployer) return null;

        const otherPartyId = isApplicant ? listing?.employerId : application.applicantId;
        const otherParty = mockUsers.find((u) => u.id === otherPartyId);

        return { application, listing, otherParty };
      })
      .filter(Boolean);
  }, [applications, listings, currentUser.id]);

  const [activeId, setActiveId] = useState(preselected || myConversations[0]?.application.id);
  const active = myConversations.find((c) => c.application.id === activeId);

  const thread = messages
    .filter((m) => m.applicationId === activeId)
    .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));

  const [draft, setDraft] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!draft.trim() || !activeId) return;
    sendMessage(activeId, currentUser.id, draft.trim());
    setDraft("");
  }

  if (myConversations.length === 0) {
    return (
      <div className="empty-state">
        <p>No conversations yet — they'll show up once you apply or receive an applicant.</p>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <aside className="messages-page__list" aria-label="Conversations">
        {myConversations.map(({ application, listing, otherParty }) => (
          <button
            key={application.id}
            className={`conversation-item ${
              application.id === activeId ? "is-active" : ""
            }`}
            onClick={() => setActiveId(application.id)}
          >
            <strong>{otherParty?.name ?? "Unknown"}</strong>
            <span>{listing?.title}</span>
          </button>
        ))}
      </aside>

      <section className="messages-page__thread">
        {active ? (
          <>
            <header>
              <h2>{active.otherParty?.name}</h2>
              <p>{active.listing?.title}</p>
            </header>

            <ul className="thread">
              {thread.length === 0 && (
                <li className="empty-state__inline">No messages yet — say hello.</li>
              )}
              {thread.map((m) => (
                <li
                  key={m.id}
                  className={`thread__bubble ${
                    m.senderId === currentUser.id ? "thread__bubble--mine" : ""
                  }`}
                >
                  <p>{m.text}</p>
                  <time dateTime={m.sentAt}>
                    {new Date(m.sentAt).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>

            <form className="thread__composer" onSubmit={handleSend}>
              <label className="sr-only" htmlFor="message">
                Write a message
              </label>
              <input
                id="message"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a message..."
              />
              <button className="btn btn--primary" type="submit">
                Send
              </button>
            </form>
          </>
        ) : (
          <p className="empty-state__inline">Select a conversation.</p>
        )}
      </section>
    </div>
  );
}
