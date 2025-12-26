import type { User } from "../../types";
import { RoleBadge } from "../RoleBadge/RoleBadge";
import "./UserCard.css";

interface UserCardProps {
  user: User;
  onViewDetails: (user: User) => void;
}

export function UserCard({ user, onViewDetails }: UserCardProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <article
      className="user-card card"
      aria-label={`User card for ${fullName}`}
    >
      <header className="user-card__header">
        <RoleBadge role={user.role} />
        <h3 className="user-card__name">{fullName}</h3>
        <p className="user-card__job-title">{user.jobTitle}</p>
      </header>

      <div className="user-card__body">
        <div className="user-card__info">
          <div className="user-card__info-item">
            <span className="user-card__info-label text-label">Team</span>
            <span className="user-card__info-value text-value">
              {user.team}
            </span>
          </div>
          <div className="user-card__info-item">
            <span className="user-card__info-label text-label">
              Contact Information
            </span>
            <span className="user-card__info-value text-value user-card__email">
              {user.email}
            </span>
          </div>
        </div>
      </div>

      <footer className="user-card__footer">
        <button
          type="button"
          className="user-card__button btn-primary"
          onClick={() => onViewDetails(user)}
          aria-label={`View details for ${fullName}`}
        >
          View details
        </button>
      </footer>
    </article>
  );
}
