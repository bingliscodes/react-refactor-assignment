export default function SearchBar({ onSearchChange }) {
  return (
    <>
      <h2>User Dashboard</h2>
      <input
        type="text"
        placeholder="Search users..."
        onChange={onSearchChange}
      />
    </>
  );
}
