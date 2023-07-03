import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Table from "../components/Table";
import Button from "../components/Button";
import { getRequests, updateRequest } from "../services/requestService";
import { getCompany } from "../services/companyService";

const Cartable = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [updateRequests, setUpdateRequests] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState(null);

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
    const getCompanys = async () => {
      try {
        const data = await getCompany();
        setCompanies(data);
        setCompanyId(data[0].company._id);
      } catch (ex) {
        console.log(ex);
      }
    };

    const getData = async (id) => {
      try {
        const { data } = await getRequests(id);
        setRequests(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    // if (updateRequest && companyId !== null) {
    //   getData();
    //   setUpdateRequests(false);
    // }
    if (!companyId) getCompanys();
    if (companyId !== null) getData(companyId);
  }, [updateRequests, companyId]);

  const sData = () => {
    let result = [];

    requests.forEach((r) => {
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
  const onCompanyChange = (e) => {
    setCompanyId(e.target.value);
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

  const companyData = [];

  const setCompanyData = () => {
    companies.forEach((company) => {
      company.role === "Admin" &&
        companyData.push({
          name: company.company._id,
          lable: company.company.name,
        });
    });
  };

  setCompanyData();

  const filteredData =
    type === "all" ? data : data.filter((d) => d.type === type && d);

  return (
    <Nav user={user}>
      <Button
        theme="dropdown"
        onChange={onCompanyChange}
        data={companyData}
        lable="شرکت"
      />
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
