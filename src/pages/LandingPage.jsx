import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function LandingPage() {
  const { listings } = useData();
  const recent = listings.slice(0, 3);

  return (
    <div className="landing">
      <section className="landing__hero">
        <div>
          <h1>Local gigs, found on your own street.</h1>
          <p>
            SkillBridge connects students and freelancers around Penang with
            real part-time work and internships — no cold-emailing shops one
            by one.
          </p>
          <div className="landing__cta">
            <Link className="btn btn--primary" to="/browse">
              Browse gigs
            </Link>
            <Link className="btn btn--ghost" to="/signup">
              Post a gig instead
            </Link>
          </div>
        </div>
      </section>

      <section className="landing__recent">
        <h2>Recently posted</h2>
        <ul className="landing__recent-list">
          {recent.map((listing) => (
            <li key={listing.id}>
              <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
              <span>{listing.company}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="landing__how">
        <h2>How it works</h2>
        <ol>
          <li>
            <strong>Create a profile.</strong> Tell us whether you're looking
            for work or hiring for it.
          </li>
          <li>
            <strong>Match on skills and location.</strong> Filter listings by
            tag, pay, and distance.
          </li>
          <li>
            <strong>Apply and track status.</strong> Follow your application
            from applied through hired.
          </li>
        </ol>
      </section>
    </div>
  );
}
