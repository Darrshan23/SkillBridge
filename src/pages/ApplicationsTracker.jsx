import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import StatusBadge from "../components/StatusBadge";

const STEPS = ["applied", "shortlisted", "hired"];

// A small visual "progress" strip: 3 dots joined by a line, with everything
// up to and including the current status lit up. Rejections are shown
// separately since they break out of the normal funnel.
function ProgressTrack({ status }) {
  if (status === "rejected") {
    return <p className="progress-track progress-track--rejected">Not selected this time</p>;
  }
  const currentIndex = STEPS.indexOf(status);
  return (
    <ol className="progress-track">
      {STEPS.map((step, i) => (
        <li key={step} className={i <= currentIndex ? "is-complete" : ""}>
          {step}
        </li>
      ))}
    </ol>
  );
}

export default function ApplicationsTracker() {
  const { currentUser } = useAuth();
  const { applications, listings } = useData();

  const mine = applications.filter((a) => a.applicantId === currentUser.id);

  return (
    <div className="applications-page">
      <h1>My applications</h1>

      {mine.length === 0 ? (
        <div className="empty-state">
          <p>You haven't applied to anything yet.</p>
          <Link className="btn btn--primary" to="/browse">
            Browse gigs
          </Link>
        </div>
      ) : (
        <ul className="application-list">
          {mine.map((application) => {
            const listing = listings.find((l) => l.id === application.listingId);
            return (
              <li key={application.id} className="application-list__item">
                <div>
                  <h2>
                    <Link to={`/listing/${application.listingId}`}>
                      {listing?.title ?? "Listing removed"}
                    </Link>
                  </h2>
                  <p className="application-list__meta">
                    {listing?.company} · Applied {application.appliedAt}
                  </p>
                  <ProgressTrack status={application.status} />
                </div>
                <StatusBadge status={application.status} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
