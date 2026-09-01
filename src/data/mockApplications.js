// ---------------------------------------------------------------------------
// mockApplications.js
//
// Each application links a seeker (applicantId) to a listing (listingId)
// and tracks a `status` through the hiring funnel:
//   applied -> shortlisted -> hired   (or "rejected" at any point)
//
// [BACKEND] In production, applying would be `POST /api/applications`, and
// changing status would be `PATCH /api/applications/:id`. Both are
// simulated here with plain array updates in DataContext.jsx.
// ---------------------------------------------------------------------------

export const mockApplications = [
  {
    id: "a1",
    listingId: "l2",
    applicantId: "u1",
    status: "shortlisted",
    appliedAt: "2026-08-21",
    note: "Portfolio link: figma.com/@amara-demo",
  },
  {
    id: "a2",
    listingId: "l1",
    applicantId: "u2",
    status: "applied",
    appliedAt: "2026-08-19",
    note: "Available all weekend mornings.",
  },
  {
    id: "a3",
    listingId: "l3",
    applicantId: "u1",
    status: "hired",
    appliedAt: "2026-08-25",
    note: "Wrote 3 sample captions, attached below.",
  },
];
