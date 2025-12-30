import { useCallback } from "react";
import type { UserRole } from "../../types";
import "./RoleFilter.css";

interface RoleFilterProps {
  selectedRoles: UserRole[];
  onChange: (roles: UserRole[]) => void;
}

const ALL_ROLES: UserRole[] = [
  "ADMIN",
  "EDITOR",
  "VIEWER",
  "GUEST",
  "OWNER",
  "INACTIVE",
];

export function RoleFilter({ selectedRoles, onChange }: RoleFilterProps) {
  const handleRoleToggle = useCallback(
    (role: UserRole) => {
      if (selectedRoles.includes(role)) {
        onChange(selectedRoles.filter((r) => r !== role));
      } else {
        onChange([...selectedRoles, role]);
      }
    },
    [selectedRoles, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, role: UserRole) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleRoleToggle(role);
      }
    },
    [handleRoleToggle]
  );

  return (
    <div className="role-filter" aria-label="Filter by role" role="group">
      <div className="role-filter__label">FILTER BY:</div>
      <div className="role-filter__options">
        {ALL_ROLES.map((role) => {
          const isSelected = selectedRoles.includes(role);
          return (
            <button
              key={role}
              type="button"
              className={`role-filter__button role-filter__button--${role.toLowerCase()} ${
                isSelected ? "role-filter__button--selected" : ""
              }`}
              onClick={() => handleRoleToggle(role)}
              onKeyDown={(e) => handleKeyDown(e, role)}
              aria-pressed={isSelected}
              aria-label={`Filter by ${role}`}
            >
              {role}
            </button>
          );
        })}
      </div>
    </div>
  );
}
