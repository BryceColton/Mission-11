import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  sortBy,
  setSortBy,
  onPageChange,
  onPageSizeChange
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      <label>
        Sort By:
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            onPageChange(1);
          }}
        >
          <option value="title_asc">Title Asc (A-Z)</option>
          <option value="title_desc">Title Desc (Z-A)</option>
        </select>
      </label>

      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button key={i + 1} onClick={() => onPageChange(i + 1)} disabled={currentPage === i + 1}>
          {i + 1}
        </button>
      ))}

      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>

      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            onPageSizeChange(Number(p.target.value));
            onPageChange(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;
