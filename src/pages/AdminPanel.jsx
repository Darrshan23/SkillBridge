import { useData } from "../context/DataContext";

// [BACKEND] `removeListing` and `toggleFlag` currently only change local
// state. Real moderation actions would call something like:
//   DELETE /api/listings/:id
//   POST   /api/moderation/flag/:id
// and probably write an audit log entry server-side so moderation actions
// are traceable to a specific admin.
export default function AdminPanel() {
  const { listings, flaggedListingIds, toggleFlag, removeListing } = useData();

  return (
    <div className="admin-page">
      <h1>Admin — moderation</h1>
      <p className="admin-page__intro">
        Flag listings that need review, or remove ones that violate the
        posting guidelines.
      </p>

      <table className="applicant-table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Employer</th>
            <th scope="col">Posted</th>
            <th scope="col">Flagged</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => {
            const isFlagged = flaggedListingIds.includes(listing.id);
            return (
              <tr key={listing.id} className={isFlagged ? "is-flagged" : ""}>
                <td>{listing.title}</td>
                <td>{listing.company}</td>
                <td>{listing.postedAt}</td>
                <td>{isFlagged ? "Yes" : "No"}</td>
                <td className="admin-page__actions">
                  <button
                    className="btn btn--small btn--ghost"
                    onClick={() => toggleFlag(listing.id)}
                  >
                    {isFlagged ? "Unflag" : "Flag"}
                  </button>
                  <button
                    className="btn btn--small btn--danger"
                    onClick={() => {
                      if (window.confirm(`Remove "${listing.title}"?`)) {
                        removeListing(listing.id);
                      }
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
