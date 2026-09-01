import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function ListingDetail() {
  const { id } = useParams(); // reads ":id" from the URL, e.g. /listing/l2
  const { listings, applications, applyToListing, recordView } = useData();
  const { currentUser } = useAuth();

  const [note, setNote] = useState("");
  const [applyError, setApplyError] = useState("");
  const [applied, setApplied] = useState(false);

  const listing = listings.find((l) => l.id === id);

  // Runs once when the page loads (or when the listing id changes) to bump
  // the view counter — this is what feeds the employer dashboard's
  // "most-viewed listings" chart.
  useEffect(() => {
    if (listing) recordView(listing.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!listing) {
    return (
      <div className="empty-state">
        <p>This listing doesn't exist or was removed.</p>
        <Link className="btn btn--ghost" to="/browse">
          Back to browse
        </Link>
      </div>
    );
  }

  const alreadyApplied = applications.some(
    (a) => a.listingId === listing.id && a.applicantId === currentUser?.id
  );

  const payLabel =
    listing.payMin === listing.payMax
      ? `RM${listing.payMin}/${listing.payUnit}`
      : `RM${listing.payMin}–${listing.payMax}/${listing.payUnit}`;

  function handleApply(e) {
    e.preventDefault();
    setApplyError("");

    if (!currentUser) {
      setApplyError("Log in as a job seeker to apply.");
      return;
    }
    if (currentUser.role !== "seeker") {
      setApplyError("Only job-seeker accounts can apply to listings.");
      return;
    }

    const result = applyToListing(listing.id, currentUser.id, note);
    if (!result.ok) {
      setApplyError(result.error);
      return;
    }
    setApplied(true);
  }

  return (
    <div className="listing-detail">
      <Link className="back-link" to="/browse">
        ← Back to browse
      </Link>

      <h1>{listing.title}</h1>
      <p className="listing-detail__meta">
        {listing.company} · {listing.location} · {listing.type}
      </p>
      <p className="listing-detail__pay">{payLabel}</p>

      <ul className="listing-card__tags" aria-label="Skill tags">
        {listing.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <p className="listing-detail__desc">{listing.description}</p>

      <section className="apply-box">
        <h2>Apply to this gig</h2>

        {applied || alreadyApplied ? (
          <p className="form-success">
            You've applied. Track its status on{" "}
            <Link to="/applications">My applications</Link>.
          </p>
        ) : (
          <form onSubmit={handleApply}>
            {applyError && (
              <p className="form-error" role="alert">
                {applyError}
              </p>
            )}
            <div className="form-field">
              <label htmlFor="note">
                Short note to the employer (portfolio link, availability, etc.)
              </label>
              <textarea
                id="note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <button className="btn btn--primary" type="submit">
              Submit application
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
