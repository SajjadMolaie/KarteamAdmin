import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Table from "../components/Table";
import Button from "../components/Button";
import { getRequests, updateRequest } from "../services/requestService";

const Cartable = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [updateRequests, setUpdateRequests] = useState(false);

  const cols = [
    {
      name: "name",
      lable: "نام و نام خانوادگی",
    },
    { name: "type", lable: "نوع درخواست" },
    {
      name: "start",
      lable: "تاریخ شروع",
    },
    {
      name: "end",
      lable: "تاریخ پایان",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getRequests();
        setRequests(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    getData();

    if (updateRequest) {
      getData();
      setUpdateRequests(false);
    }
  }, [updateRequests]);

  const sData = () => {
    let result = [];

    requests.forEach((r) => {
      r.staus === "Pending" &&
        result.push({
          id: r._id,
          name: r.user.firstName + " " + r.user.lastName,
          type: r.type,
          start: r.start,
          end: r.end,
        });
    });

    return result;
  };

  const data = sData();

  const [type, setType] = useState("all");

  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  const typeData = [
    { name: "all", lable: "همه" },
    { name: "Enter", lable: "ورود" },
    { name: "Exit", lable: "خروج" },
    { name: "Vacation", lable: "مرخصی" },
    { name: "Mission", lable: "ماموریت" },
  ];

  const onAccept = async (id) => {
    var request = requests.filter((r) => r._id === id);

    request[0].status = "Accept";

    try {
      await updateRequest(request[0]);

      setUpdateRequests(true);
    } catch (ex) {
      console.log(ex);
    }
  };

  const onReject = async (id) => {
    var request = requests.filter((r) => r._id === id);

    request[0].status = "Reject";

    try {
      await updateRequest(request[0]);

      setUpdateRequests(true);
    } catch (ex) {
      console.log(ex);
    }
  };

  const filteredData =
    type === "all" ? data : data.filter((d) => d.type === type && d);

  return (
    <Nav user={user}>
      <Button
        theme="dropdown"
        onChange={onTypeChange}
        data={typeData}
        lable="درخواست"
      />
      <Table
        data={filteredData}
        cols={cols}
        rowsPerPage={10}
        onAccept={onAccept}
        onReject={onReject}
      />
    </Nav>
  );
};

export default Cartable;
