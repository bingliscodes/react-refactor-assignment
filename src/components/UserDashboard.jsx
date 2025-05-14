/*
Refactor the UserDashboard below into multiple smaller, reusable components such as 
UserList, SearchBar, Pagination, and UserModal. 
Move logic and UI out of the main component and make it clean and readable.
*/
import React from "react";
import axios from "axios";
import UserList from "./UserList.jsx";
import SearchBar from "./SearchBar.jsx";
import Pagination from "./Pagination.jsx";
import UserModal from "./UserModal.jsx";

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
      <SearchBar onSearchChange={handleSearchChange} />
      <button onClick={toggleSort}>Toggle Sort</button>
      <UserList paginatedUsers={paginatedUsers} openModal={openModal} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      {showModal && selectedUser && (
        <UserModal selectedUser={selectedUser} closeModal={closeModal} />
      )}
    </div>
  );
}
