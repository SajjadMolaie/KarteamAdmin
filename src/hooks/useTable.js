import { useState, useEffect } from "react";

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const start = Math.max(1, page - 2);
    const end = Math.min(start + 4, Math.ceil(data.length / rowsPerPage));
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    setTableRange(range);

    const slice = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    setSlice(slice);
  }, [data, page, rowsPerPage]);

  return { slice, range: tableRange };
};

export default useTable;
