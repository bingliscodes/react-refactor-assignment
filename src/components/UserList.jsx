export default function UserList({ paginatedUsers, openModal }) {
  return (
    <ul>
      {paginatedUsers.map((user) => (
        <li key={user.id} onClick={() => openModal(user)}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
