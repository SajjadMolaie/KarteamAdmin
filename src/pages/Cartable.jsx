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
  const [companyId, setCompanyId] = useState({name: null,lable: null});
  const [type, setType] = useState({name: 'all', lable:'همه'});

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
        setCompanyId({name: data[0].company._id, lable: data[0].company.name});
        setCompanies(data);
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
    if (!companyId.name) getCompanys();
    if (companyId.name) getData(companyId.name);
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


  const onTypeChange = (name, lable) => {
    setType({name, lable});
  };
  const onCompanyChange = (name, lable) => {
    setCompanyId({name, lable});
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
    type.name === "all" ? data : data.filter((d) => d.type === type.name && d);

  return (
    <Nav user={user}>
      <Button
        theme="dropdown"
        onChange={onCompanyChange}
        selected={companyId}
        data={companyData}
        lable="شرکت"
      />
      <Button
        theme="dropdown"
        onChange={onTypeChange}
        selected={type}
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
