import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div className="w-full flex justify-center bg-gray-bg py-4">
      {page - 1 !== 0 && (
        <button
          className="flex justify-center items-center rounded-md mx-2 px-3 py-1 bg-white"
          onClick={() => setPage(page - 1)}
        >
          قبل
        </button>
      )}
      {range.map((el, index) => (
        <>
          <button
            key={index}
            className="flex justify-center items-center rounded-md mx-2 px-3 py-1 bg-white"
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        </>
      ))}
      <button
        className="flex justify-center items-center rounded-md mx-2 px-3 py-1 bg-white"
        onClick={() => setPage(page + 1)}
      >
        بعد
      </button>
    </div>
  );
};

export default TableFooter;
