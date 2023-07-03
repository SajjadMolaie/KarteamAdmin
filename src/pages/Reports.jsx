import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Table from "../components/Table";
import Button from "../components/Button";
import Input from "../components/Input";
import Excelexport from "../components/Excelexport";
import { getEnterExit } from "../services/enterExitService";
import { getCompany } from "../services/companyService";

const Reports = ({ user }) => {
  const [reports, setReports] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [search, setSearch] = useState("");

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

  const onSearchChange = ({ target: input }) => {
    setSearch(input.value);
  };

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
      console.log(r);
      //   r.logs.length > 0 &&
      //     r.logs.forEach((log) => {
      const date = new Date(r.date);
      const dateFormat =
        date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
      const timeFormat = date.getHours() + ":" + date.getMinutes();

      r.user &&
        result.push({
          id: r._id,
          name: r.user.firstName + " " + r.user.lastName,
          type: r.type,
          date: dateFormat,
          time: timeFormat,
        });
      //     });
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

  const filteredData2 = !search
    ? filteredData
    : filteredData.filter((d) => d.name.startsWith(search));

  return (
    <Nav user={user}>
      <div className="flex">
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
        <div className="w-12 h-12 text-xl flex justify-center items-center">
          <Excelexport excelData={filteredData} fileName={Date.now()} />
        </div>
        <div>
          <Input
            style={{ width: "100%", height: "50%", marginRight: "16px" }}
            placeholder="جست و جو"
            onChange={onSearchChange}
            value={search}
          />
        </div>
      </div>
      <Table data={filteredData2} cols={cols} rowsPerPage={10} />
    </Nav>
  );
};

export default Reports;
