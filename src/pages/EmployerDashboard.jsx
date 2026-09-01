import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { mockUsers } from "../data/mockUsers";
import ApplicantRow from "../components/ApplicantRow";
import SimpleBarChart from "../components/SimpleBarChart";

export default function EmployerDashboard() {
  const { currentUser } = useAuth();
  const { listings, applications, updateApplicationStatus } = useData();

  const myListings = useMemo(
    () => listings.filter((l) => l.employerId === currentUser.id),
    [listings, currentUser.id]
  );

  const myListingIds = useMemo(() => myListings.map((l) => l.id), [myListings]);

  const myApplications = useMemo(
    () => applications.filter((a) => myListingIds.includes(a.listingId)),
    [applications, myListingIds]
  );

  // "Applicants over time" — count how many applications came in per day
  // across ALL of this employer's listings. In a real backend this would
  // be a single aggregation query instead of client-side reducing.
  const applicantsOverTime = useMemo(() => {
    const counts = {};
    myApplications.forEach((a) => {
      counts[a.appliedAt] = (counts[a.appliedAt] || 0) + 1;
    });
    const dates = Object.keys(counts).sort();
    return {
      values: dates.map((d) => counts[d]),
      labels: dates.map((d) => d.slice(5)), // "MM-DD"
    };
  }, [myApplications]);

  const mostViewed = useMemo(
    () => [...myListings].sort((a, b) => b.views - a.views).slice(0, 4),
    [myListings]
  );

  function findApplicant(id) {
    return mockUsers.find((u) => u.id === id);
  }
  function findListing(id) {
    return listings.find((l) => l.id === id);
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <h1>Employer dashboard</h1>
        <Link className="btn btn--primary" to="/post">
          Post a new gig
        </Link>
      </div>

      <section className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-card__value">{myListings.length}</span>
          <span className="stat-card__label">Active listings</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{myApplications.length}</span>
          <span className="stat-card__label">Total applicants</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">
            {myApplications.filter((a) => a.status === "hired").length}
          </span>
          <span className="stat-card__label">Hired</span>
        </div>
      </section>

      <section className="dashboard-charts">
        <div className="chart-block">
          <h2>Applicants over time</h2>
          {applicantsOverTime.values.length === 0 ? (
            <p className="empty-state__inline">No applicants yet.</p>
          ) : (
            <SimpleBarChart
              values={applicantsOverTime.values}
              labels={applicantsOverTime.labels}
              ariaLabel="Bar chart of applicants received per day"
            />
          )}
        </div>

        <div className="chart-block">
          <h2>Most-viewed listings</h2>
          {mostViewed.length === 0 ? (
            <p className="empty-state__inline">Post a listing to see views.</p>
          ) : (
            <SimpleBarChart
              values={mostViewed.map((l) => l.views)}
              labels={mostViewed.map((l) => l.title.slice(0, 10))}
              ariaLabel="Bar chart of views per listing"
            />
          )}
        </div>
      </section>

      <section>
        <h2>Applicants</h2>
        {myApplications.length === 0 ? (
          <p className="empty-state__inline">No one has applied yet.</p>
        ) : (
          <table className="applicant-table">
            <thead>
              <tr>
                <th scope="col">Applicant</th>
                <th scope="col">Listing</th>
                <th scope="col">Applied</th>
                <th scope="col">Status</th>
                <th scope="col">Update</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {myApplications.map((application) => (
                <ApplicantRow
                  key={application.id}
                  application={application}
                  applicant={findApplicant(application.applicantId)}
                  listing={findListing(application.listingId)}
                  onStatusChange={updateApplicationStatus}
                />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
