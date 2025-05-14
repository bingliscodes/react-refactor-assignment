export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}) {
  return (
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
  );
}
