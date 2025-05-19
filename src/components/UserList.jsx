import Pagination from "./Pagination";

export default function UserList({
  filteredUsers,
  openModal,
  currentPage,
  pageSize,
  handlePageChange,
  handleToggleSort,
}) {
  const start = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  return (
    <>
      <button onClick={handleToggleSort}>Toggle Sort</button>
      <ul>
        {paginatedUsers.map((user) => (
          <li key={user.id} onClick={() => openModal(user)}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
