// A controlled form: every input's value comes from the `filters` prop and
// every change calls `onChange` with the updated filters object. The parent
// (BrowseListings.jsx) owns the actual state — this component just displays
// it and reports changes upward. This "lifting state up" pattern is one of
// the most common in React apps.
export default function SearchFilterBar({ filters, onChange, allTags }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <form
      className="filter-bar"
      role="search"
      aria-label="Search and filter gigs"
      onSubmit={(e) => e.preventDefault()} // filtering happens live, no submit needed
    >
      <div className="filter-bar__field">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Job title or keyword"
          value={filters.query}
          onChange={(e) => update("query", e.target.value)}
        />
      </div>

      <div className="filter-bar__field">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="e.g. Georgetown"
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
        />
      </div>

      <div className="filter-bar__field">
        <label htmlFor="tag">Skill tag</label>
        <select
          id="tag"
          value={filters.tag}
          onChange={(e) => update("tag", e.target.value)}
        >
          <option value="">All skills</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__field">
        <label htmlFor="minPay">Min pay</label>
        <input
          id="minPay"
          type="number"
          min="0"
          placeholder="RM"
          value={filters.minPay}
          onChange={(e) => update("minPay", e.target.value)}
        />
      </div>
    </form>
  );
}
