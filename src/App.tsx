import { useCallback, useEffect, useState } from "react";
import { fetchUsers, filterUsers } from "./api/users";
import "./App.css";
import { EmptyState } from "./components/EmptyState/EmptyState";
import { ErrorState } from "./components/ErrorState/ErrorState";
import { LoadingState } from "./components/LoadingState/LoadingState";
import { RoleFilter } from "./components/RoleFilter/RoleFilter";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { UserCard } from "./components/UserCard/UserCard";
import { UserModal } from "./components/UserModal/UserModal";
import type { User, UserRole } from "./types";

export function App() {
  // Data state
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Modal state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users on mount
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Handle search
  const handleSearch = useCallback(() => {
    setAppliedSearchQuery(searchQuery);
    setSearchPerformed(true);
  }, [searchQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    // Apply search immediately as user types
    setAppliedSearchQuery(value);
    if (value.length > 0) {
      setSearchPerformed(true);
    }
  }, []);

  // Handle role filter
  const handleRoleChange = useCallback((roles: UserRole[]) => {
    setSelectedRoles(roles);
  }, []);

  // Handle modal
  const handleViewDetails = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  // Filter users
  const filteredUsers = filterUsers(users, appliedSearchQuery, selectedRoles);

  // Render content based on state
  const renderContent = () => {
    // Don't show anything until search is performed
    if (!searchPerformed) {
      return null;
    }

    if (loading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState message={error} onRetry={loadUsers} />;
    }

    if (filteredUsers.length === 0) {
      return (
        <EmptyState
          searchQuery={appliedSearchQuery}
          hasFilters={selectedRoles.length > 0}
        />
      );
    }

    return (
      <ul className="user-grid" aria-label="User results">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-grid__item">
            <UserCard user={user} onViewDetails={handleViewDetails} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="app">
      <div className="app__content-wrapper">
        <header className="app__header">
          <h1 className="app__title">
            <span className="app__title-highlight">User</span>{" "}
            <span className="app__title-dark">Dashboard</span>
          </h1>
        </header>

        <section
          className="app__search-section"
          aria-label="Search and filters"
        >
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
        </section>
      </div>

      <main className="app__main">
        {searchPerformed && (
          <section className="app__filter-section" aria-label="Filters">
            <RoleFilter
              selectedRoles={selectedRoles}
              onChange={handleRoleChange}
            />
            <div className="app__filter-divider" />
          </section>
        )}

        <section className="app__results-section" aria-label="Search results">
          {renderContent()}
        </section>
      </main>

      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
