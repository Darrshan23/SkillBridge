import { Link } from "react-router-dom";

// Purely presentational: it receives a `listing` object as a prop and
// renders it. It doesn't know or care where that listing came from
// (mock data today, an API tomorrow) — that separation is what makes
// components reusable.
export default function ListingCard({ listing }) {
  const payLabel =
    listing.payMin === listing.payMax
      ? `RM${listing.payMin}/${listing.payUnit}`
      : `RM${listing.payMin}–${listing.payMax}/${listing.payUnit}`;

  return (
    <article className="listing-card">
      <div className="listing-card__top">
        <h3>
          <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
        </h3>
        <span className="listing-card__type">{listing.type}</span>
      </div>

      <p className="listing-card__company">
        {listing.company} · {listing.location}
      </p>

      <p className="listing-card__desc">{listing.description}</p>

      <ul className="listing-card__tags" aria-label="Skill tags">
        {listing.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div className="listing-card__bottom">
        <span className="listing-card__pay">{payLabel}</span>
        <Link className="btn btn--small" to={`/listing/${listing.id}`}>
          View details
        </Link>
      </div>
    </article>
  );
}
