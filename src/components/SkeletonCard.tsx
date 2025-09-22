export default function SkeletonCard() {
  return (
    <div className="card skeleton">
      <div className="card-header">
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line short"></div>
      </div>

      <div className="skeleton-line long"></div>
      <div className="skeleton-line medium"></div>

      <div className="details">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line short"></div>
      </div>

      <div className="actions">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
}
