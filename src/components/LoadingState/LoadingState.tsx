import "./LoadingState.css";

interface LoadingStateProps {
  count?: number;
}

// Pre-generated skeleton IDs to avoid index-based keys
const SKELETON_IDS = Array.from({ length: 12 }, (_, i) => `skeleton-card-${i}`);

export function LoadingState({ count = 8 }: LoadingStateProps) {
  const skeletonCards = SKELETON_IDS.slice(0, count);

  return (
    <output className="loading-state" aria-label="Loading users">
      <span className="sr-only">Loading...</span>
      <div className="loading-state__grid">
        {skeletonCards.map((id) => (
          <div key={id} className="loading-state__card" aria-hidden="true">
            <div className="loading-state__badge skeleton" />
            <div className="loading-state__content">
              <div className="loading-state__name skeleton" />
              <div className="loading-state__title skeleton" />
              <div className="loading-state__info skeleton" />
              <div className="loading-state__info loading-state__info--short skeleton" />
            </div>
            <div className="loading-state__button skeleton" />
          </div>
        ))}
      </div>
    </output>
  );
}
