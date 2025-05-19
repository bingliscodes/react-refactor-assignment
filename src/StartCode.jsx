// Refactor the UserDashboard below into multiple smaller, reusable components such as UserList, SearchBar, Pagination, and UserModal. Move logic and UI out of the main component and make it clean and readable.
import React from "react";
import axios from "axios";
let users = [];
let filteredUsers = [];
let search = "";
let sortAsc = true;
let currentPage = 1;
const pageSize = 5;
let selectedUser = null;
let showModal = false;
let loading = false;
let error = null;
export default function UserDashboard() {
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  if (!users.length && !loading) {
    loading = true;
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        users = res.data;
        filteredUsers = res.data;
        loading = false;
        forceUpdate();
      })
      .catch((err) => {
        error = err.message;
        loading = false;
        forceUpdate();
      });
  }
  const handleSearchChange = (e) => {
    search = e.target.value.toLowerCase();
    filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    currentPage = 1;
    forceUpdate();
  };
  const toggleSort = () => {
    filteredUsers.sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    sortAsc = !sortAsc;
    forceUpdate();
  };
  const handlePageChange = (page) => {
    currentPage = page;
    forceUpdate();
  };
  const openModal = (user) => {
    selectedUser = user;
    showModal = true;
    forceUpdate();
  };
  const closeModal = () => {
    selectedUser = null;
    showModal = false;
    forceUpdate();
  };
  const start = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h2>User Dashboard</h2>
      <input
        type="text"
        placeholder="Search users..."
        defaultValue={search}
        onChange={handleSearchChange}
      />
      <button onClick={toggleSort}>Toggle Sort</button>
      <ul>
        {paginatedUsers.map((user) => (
          <li key={user.id} onClick={() => openModal(user)}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {showModal && selectedUser && (
        <div className="modal">
          <h3>{selectedUser.name}</h3>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
}
