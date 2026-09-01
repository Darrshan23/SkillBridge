// A deliberately simple chart: it turns an array of numbers into bars whose
// height is a percentage of the largest value. This avoids pulling in a
// charting library (recharts, chart.js, etc.) while still visually showing
// a trend — good enough for a v1 analytics view.
//
// [BACKEND] In production, `values` and `labels` would come from an
// analytics endpoint, e.g. GET /api/listings/:id/views?range=7d, which
// would return pre-aggregated daily counts so the frontend never has to
// crunch raw event logs itself.
export default function SimpleBarChart({ values, labels, ariaLabel }) {
  const max = Math.max(...values, 1); // avoid divide-by-zero when all values are 0

  return (
    <div className="bar-chart" role="img" aria-label={ariaLabel}>
      {values.map((value, i) => (
        <div className="bar-chart__column" key={i}>
          <div
            className="bar-chart__bar"
            style={{ height: `${(value / max) * 100}%` }}
            title={`${labels?.[i] ?? i}: ${value}`}
          />
          <span className="bar-chart__label">{labels?.[i] ?? i}</span>
        </div>
      ))}
    </div>
  );
}
