import "./EmptyState.css";

interface EmptyStateProps {
  searchQuery?: string;
  hasFilters?: boolean;
}

export function EmptyState({ searchQuery, hasFilters }: EmptyStateProps) {
  const hasSearch = searchQuery && searchQuery.trim().length > 0;

  return (
    <output className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        🔍
      </div>
      <h2 className="empty-state__title">No users found</h2>
      <p className="empty-state__message">
        {hasSearch || hasFilters ? (
          <>
            We couldn't find any users matching your criteria.
            <br />
            Try adjusting your search or filters.
          </>
        ) : (
          "There are no users to display at this time."
        )}
      </p>
    </output>
  );
}
