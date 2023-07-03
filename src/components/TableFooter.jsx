const TableFooter = ({ range, setPage, page, slice }) => {
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
        <button
          key={index}
          className={`flex justify-center items-center rounded-md mx-2 px-3 py-1 bg-white ${
            el === page ? "bg-gray-200" : ""
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
      {page + 1 <= Math.ceil(slice.length / 10) && (
        <button
          className="flex justify-center items-center rounded-md mx-2 px-3 py-1 bg-white"
          onClick={() => setPage(page + 1)}
        >
          بعد
        </button>
      )}
    </div>
  );
};

export default TableFooter;
