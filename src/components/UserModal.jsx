export default function UserModal({ selectedUser, closeModal }) {
  return (
    <div className="modal">
      <h3>{selectedUser.name}</h3>
      <p>Email: {selectedUser.email}</p>
      <p>Phone: {selectedUser.phone}</p>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}
