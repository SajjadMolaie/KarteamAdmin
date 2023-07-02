import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Table from "../components/Table";
import Button from "../components/Button";
import { getEnterExit } from "../services/enterExitService";
import { getCompany } from "../services/companyService";

const Reports = ({ user }) => {
  const [reports, setReports] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");

  const cols = [
    {
      name: "name",
      lable: "نام و نام خانوادگی",
    },
    { name: "type", lable: "وضعیت" },
    {
      name: "time",
      lable: "زمان",
    },
    {
      name: "date",
      lable: "تاریخ",
    },
  ];

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await getCompany();
        setCompanyId(data[0].company._id);
        setCompanies(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    const getData = async (id) => {
      try {
        const { data } = await getEnterExit(id);
        setReports(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    if (!companyId) getCompanies();
    if (companyId) getData(companyId);
  }, [companyId]);

  const sData = () => {
    let result = [];

    reports.forEach((r) => {
      r.logs.length > 0 &&
        r.logs.map((log) => {
          const date = new Date(log.date);
          const dateFormat =
            date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
          const timeFormat = date.getHours() + ":" + date.getMinutes();

          result.push({
            id: log._id,
            name: log.user.firstName + " " + log.user.lastName,
            type: log.type,
            date: dateFormat,
            time: timeFormat,
          });
        });
    });

    return result;
  };

  const data = sData();

  const [type, setType] = useState("all");

  const onTypeChange = (e) => {
    setType(e.target.value);
  };
  const onComapnyChange = (e) => {
    setCompanyId(e.target.value);
  };

  const companyData = [];

  const setComapnyData = () => {
    companies.forEach((company) => {
      company.role === "Admin" &&
        companyData.push({
          name: company.company._id,
          lable: company.company.name,
        });
    });
  };

  setComapnyData();

  const typeData = [
    { name: "all", lable: "همه" },
    { name: "Enter", lable: "ورود" },
    { name: "Exit", lable: "خروج" },
  ];

  const filteredData =
    type === "all" ? data : data.filter((d) => d.type === type && d);

  return (
    <Nav user={user}>
      <Button
        theme="dropdown"
        onChange={onComapnyChange}
        data={companyData}
        lable="شرکت"
      />
      <Button
        theme="dropdown"
        onChange={onTypeChange}
        data={typeData}
        lable="وضعیت"
      />
      <Table data={filteredData} cols={cols} rowsPerPage={10} />
    </Nav>
  );
};

export default Reports;
