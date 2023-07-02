import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import useTable from "../hooks/useTable";
import TableFooter from "./TableFooter";
import Accept from "../images/accept.svg";
import Reject from "../images/reject.svg";

const Table = ({
  data,
  cols,
  rowsPerPage,
  onAccept,
  onReject,
  onEdit,
  onModal,
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="w-full bg-blue-500 text-white">
                  <tr>
                    {cols.map((col) => (
                      <th key={col.name} scope="col" className="px-6 py-3">
                        {col.lable}
                      </th>
                    ))}
                    {onAccept && <th scope="col" className="px-6 py-3"></th>}
                    {onReject && <th scope="col" className="px-6 py-3"></th>}
                    {onEdit && <th scope="col" className="px-6 py-3"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-gray-bg">
                  {slice.map((el) => (
                    <tr key={el.id}>
                      {cols.map((col) => (
                        <td
                          key={col.name}
                          className="px-6 py-4 text-center text-sm font-medium text-gray-800 whitespace-nowrap"
                        >
                          {el[col.name]}
                        </td>
                      ))}
                      {onAccept && (
                        <td className="px-6 py-4 text-center text-sm font-medium text-gray-800 whitespace-nowrap">
                          <button onClick={(e) => onAccept(el.id)}>
                            <img
                              src={Accept}
                              alt="Accept"
                              className="cursor-pointer"
                            />
                          </button>
                        </td>
                      )}
                      {onReject && (
                        <td className="px-6 py-4 text-center text-sm font-medium text-gray-800 whitespace-nowrap">
                          <button onClick={(e) => onReject(el.id)}>
                            <img
                              src={Reject}
                              alt="Reject"
                              className="cursor-pointer"
                            />
                          </button>
                        </td>
                      )}
                      {onEdit && (
                        <td className="px-6 py-4 text-center text-sm font-medium text-gray-800 whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              onEdit({
                                id: el.id,
                                companyId: el.companyId,
                                userId: el.userId,
                                role: el.role,
                              });
                            }}
                          >
                            <AiOutlineEdit />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <TableFooter
                page={page}
                setPage={setPage}
                range={range}
                slice={slice}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
