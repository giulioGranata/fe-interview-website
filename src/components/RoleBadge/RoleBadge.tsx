import type { UserRole } from "../../types";
import "./RoleBadge.css";

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

export function RoleBadge({ role, className = "" }: RoleBadgeProps) {
  return (
    <div>
      <span
        className={`role-badge role-badge--${role.toLowerCase()} ${className}`}
      >
        {role}
      </span>
    </div>
  );
}
