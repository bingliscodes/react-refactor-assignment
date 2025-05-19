/*
Refactor the UserDashboard below into multiple smaller, reusable components such as 
UserList, SearchBar, Pagination, and UserModal. 
Move logic and UI out of the main component and make it clean and readable.
*/
import React from "react";
import axios from "axios";
import UserList from "./UserList.jsx";
import SearchBar from "./SearchBar.jsx";
import UserModal from "./UserModal.jsx";

import { useState } from "react";

let search = "";
let loading = false;
let error = null;

export default function UserDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userState, setUserState] = useState({
    users: [],
    filteredUsers: [],
    search: "",
    sortAsc: true,
    currentPage: 1,
    pageSize: 5,
    loading: false,
    error: null,
  });

  if (!userState.users.length && !userState.loading) {
    setUserState((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUserState((prevState) => {
          return {
            ...prevState,
            users: res.data,
            filteredUsers: res.data,
            loading: false,
          };
        });
      })
      .catch((err) => {
        error = err.message;
        loading = false;
        setUserState((prevState) => {
          return {
            ...prevState,
            loading: false,
          };
        });
      });
  }

  const handleSearchChange = (e) => {
    search = e.target.value.toLowerCase();
    setUserState((prevState) => {
      return {
        ...prevState,
        filteredUsers: prevState.users.filter((user) =>
          user.name.toLowerCase().includes(search)
        ),
      };
    });
    handlePageChange(1);
  };

  const toggleSort = () => {
    setUserState((prevState) => {
      return {
        ...prevState,
        sortAsc: !prevState.sortAsc,
        filteredUsers: prevState.filteredUsers.sort((a, b) =>
          prevState.sortAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        ),
      };
    });
  };

  const handlePageChange = (page) => {
    setUserState((prevState) => {
      return {
        ...prevState,
        currentPage: page,
      };
    });
  };

  const handleSelectUser = function (user) {
    setSelectedUser(user);
  };

  const handleToggleModal = function () {
    setShowModal((prevState) => !prevState);
  };

  const openModal = (user) => {
    handleToggleModal();
    setSelectedUser(user);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <SearchBar onSearchChange={handleSearchChange} />
      <UserList
        filteredUsers={userState.filteredUsers}
        openModal={openModal}
        currentPage={userState.currentPage}
        pageSize={userState.pageSize}
        handlePageChange={handlePageChange}
        handleToggleSort={toggleSort}
        onSelectUser={handleSelectUser}
      />
      {showModal && selectedUser && (
        <UserModal
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
          toggleModal={handleToggleModal}
        />
      )}
    </div>
  );
}
