import { createContext, useContext, useState } from "react";
import { mockListings } from "../data/mockListings";
import { mockApplications } from "../data/mockApplications";
import { mockMessages } from "../data/mockMessages";

// ---------------------------------------------------------------------------
// DataContext
//
// This is the "everything that isn't auth" store: listings, applications,
// and messages. It's a second Context (separate from AuthContext) so that
// components which only care about listings don't re-render just because
// the logged-in user changed, and vice versa — a common React pattern once
// an app has more than one kind of shared state.
//
// [BACKEND] Every function below is a placeholder for a real network call.
// The comment above each one shows the REST endpoint it would become. Once
// a backend exists, you'd typically swap useState for a data-fetching
// library (React Query / SWR) so loading and error states are handled for
// you — but the *shape* of these functions (what they take in, what they
// return) can stay the same, so screens built against this context won't
// need to change much.
// ---------------------------------------------------------------------------

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [listings, setListings] = useState(mockListings);
  const [applications, setApplications] = useState(mockApplications);
  const [messages, setMessages] = useState(mockMessages);
  const [flaggedListingIds, setFlaggedListingIds] = useState([]); // for admin moderation

  // [BACKEND] POST /api/listings
  function addListing(listing) {
    const newListing = {
      ...listing,
      id: `l${Date.now()}`,
      postedAt: new Date().toISOString().slice(0, 10),
      views: 0,
      viewHistory: [0, 0, 0, 0, 0, 0, 0],
    };
    setListings((prev) => [newListing, ...prev]);
    return newListing;
  }

  // [BACKEND] DELETE /api/listings/:id  (used by admin moderation)
  function removeListing(listingId) {
    setListings((prev) => prev.filter((l) => l.id !== listingId));
  }

  // [BACKEND] PATCH /api/listings/:id/view  — increments a view counter.
  // Called once when a seeker opens a listing's detail page.
  function recordView(listingId) {
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, views: l.views + 1 } : l))
    );
  }

  // [BACKEND] POST /api/applications
  function applyToListing(listingId, applicantId, note) {
    const alreadyApplied = applications.some(
      (a) => a.listingId === listingId && a.applicantId === applicantId
    );
    if (alreadyApplied) {
      return { ok: false, error: "You already applied to this listing." };
    }
    const newApplication = {
      id: `a${Date.now()}`,
      listingId,
      applicantId,
      status: "applied",
      appliedAt: new Date().toISOString().slice(0, 10),
      note,
    };
    setApplications((prev) => [newApplication, ...prev]);
    return { ok: true };
  }

  // [BACKEND] PATCH /api/applications/:id  { status }
  // Used by the employer dashboard to move a candidate through the funnel.
  function updateApplicationStatus(applicationId, status) {
    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status } : a))
    );
  }

  // [BACKEND] POST /api/messages
  function sendMessage(applicationId, senderId, text) {
    const newMessage = {
      id: `m${Date.now()}`,
      applicationId,
      senderId,
      text,
      sentAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }

  // [BACKEND] POST /api/moderation/flag/:listingId — used by the admin panel
  function toggleFlag(listingId) {
    setFlaggedListingIds((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  }

  const value = {
    listings,
    applications,
    messages,
    flaggedListingIds,
    addListing,
    removeListing,
    recordView,
    applyToListing,
    updateApplicationStatus,
    sendMessage,
    toggleFlag,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used inside a <DataProvider>");
  }
  return ctx;
}
