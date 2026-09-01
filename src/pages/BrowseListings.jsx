import { useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import ListingCard from "../components/ListingCard";
import SearchFilterBar from "../components/SearchFilterBar";

const emptyFilters = { query: "", location: "", tag: "", minPay: "" };

export default function BrowseListings() {
  const { listings } = useData();
  const [filters, setFilters] = useState(emptyFilters);

  // Build the list of unique tags once from the current listings, so the
  // filter dropdown always matches what's actually postable/searchable.
  const allTags = useMemo(() => {
    const set = new Set();
    listings.forEach((l) => l.tags.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [listings]);

  // useMemo re-runs the filtering only when listings or filters change,
  // instead of on every render — a small performance habit worth building
  // early, even though it barely matters at this data size.
  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      const matchesQuery =
        !filters.query ||
        listing.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        listing.description.toLowerCase().includes(filters.query.toLowerCase());

      const matchesLocation =
        !filters.location ||
        listing.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesTag = !filters.tag || listing.tags.includes(filters.tag);

      const matchesPay =
        !filters.minPay || listing.payMax >= Number(filters.minPay);

      return matchesQuery && matchesLocation && matchesTag && matchesPay;
    });
  }, [listings, filters]);

  return (
    <div className="browse-page">
      <h1>Browse gigs</h1>

      <SearchFilterBar filters={filters} onChange={setFilters} allTags={allTags} />

      <p className="browse-page__count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "listing" : "listings"} found
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No gigs match those filters yet.</p>
          <button
            className="btn btn--ghost"
            onClick={() => setFilters(emptyFilters)}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="listing-grid">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
