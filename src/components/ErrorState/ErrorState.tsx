import "./ErrorState.css";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon" aria-hidden="true">
        ⚠️
      </div>
      <h2 className="error-state__title">Something went wrong</h2>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <button type="button" className="error-state__button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
