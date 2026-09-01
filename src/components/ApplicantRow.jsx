import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

// Receives everything it needs as props (no context lookups here) — this
// keeps it a "pure" component that's easy to reuse or test in isolation.
export default function ApplicantRow({ application, applicant, listing, onStatusChange }) {
  return (
    <tr>
      <td>{applicant?.name ?? "Unknown applicant"}</td>
      <td>{listing?.title ?? "Unknown listing"}</td>
      <td>{application.appliedAt}</td>
      <td>
        <StatusBadge status={application.status} />
      </td>
      <td>
        <label className="sr-only" htmlFor={`status-${application.id}`}>
          Change status for {applicant?.name}
        </label>
        <select
          id={`status-${application.id}`}
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="hired">Hired</option>
          <option value="rejected">Not selected</option>
        </select>
      </td>
      <td>
        <Link className="btn btn--small btn--ghost" to={`/messages?application=${application.id}`}>
          Message
        </Link>
      </td>
    </tr>
  );
}
