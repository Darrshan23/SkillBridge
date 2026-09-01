// Maps a status string to a CSS class + readable label in one place, so
// every screen that shows a status (seeker's application list, employer's
// applicant table) looks consistent.
const STATUS_META = {
  applied: { label: "Applied", className: "status-badge--applied" },
  shortlisted: { label: "Shortlisted", className: "status-badge--shortlisted" },
  hired: { label: "Hired", className: "status-badge--hired" },
  rejected: { label: "Not selected", className: "status-badge--rejected" },
};

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? { label: status, className: "" };
  return <span className={`status-badge ${meta.className}`}>{meta.label}</span>;
}
