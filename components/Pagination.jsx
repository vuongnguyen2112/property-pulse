const Pagination = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const handlePageSize = (newPageSize) => {
    onPageSizeChange(newPageSize);
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
      <select
        name="pageSize"
        id="pageSize"
        className="ml-3 border hover:bg-gray-100 rounded px-2 py-1"
        onChange={(e) => handlePageSize(e.target.value)}
      >
        <option selected value="6">
          6
        </option>
        <option value="12">12</option>
      </select>
    </section>
  );
};

export default Pagination;
