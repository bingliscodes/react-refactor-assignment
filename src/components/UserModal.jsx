export default function UserModal({ selectedUser, onSelectUser, toggleModal }) {
  const closeModal = () => {
    onSelectUser(null);
    toggleModal();
  };

  return (
    <div className="modal">
      <h3>{selectedUser.name}</h3>
      <p>Email: {selectedUser.email}</p>
      <p>Phone: {selectedUser.phone}</p>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}
