import React from "react";
import { PaginationItem } from "reactstrap";

export const Pagination = ({ productsPerPage, products, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(products / productsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
      {pageNumber.map((number) => (
        <a
          onClick={() => paginate(number)}
          key = {number}
          className="cursor-pointer relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          {number}
        </a>
      ))}
    </nav>
  );
};
