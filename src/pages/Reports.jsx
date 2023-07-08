import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import Nav from "../components/Nav";
import Table from "../components/Table";
import Button from "../components/Button";
import Input from "../components/Input";
import Excelexport from "../components/Excelexport";
import { getEnterExit, getEnterExitByTime } from "../services/enterExitService";
import { getCompany } from "../services/companyService";
import { findUserById } from "../services/userService";

const Reports = ({ user }) => {
  const [logDate, setLogDate] = useState({ endDate: null, startDate: null });
  const [reports, setReports] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState({name: null, lable: null});
  const [search, setSearch] = useState("");
  const [type, setType] = useState({name:'all',lable:'همه'});

  const handleChange = (date) => {
    setLogDate(date);
  };

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
        setCompanyId({name:data[0].company._id, lable: data[0].company.name});
        setCompanies(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    const getData = async (id) => {
      try {
        const { data } = await getEnterExit(id);
        setReports(data.reverse());
      } catch (ex) {
        console.log(ex);
      }
    };

    const getDataByTime = async (start, end) => {
      try {
        const { data } = await getEnterExitByTime(start, end, companyId);
        setReports(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    if (!companyId.name) getCompanies();
    if (companyId.name && logDate.startDate && logDate.endDate)
      getDataByTime(logDate.startDate, logDate.endDate);
    if (companyId.name && !logDate.endDate) getData(companyId.name);
  }, [companyId, logDate]);

  const sData = () => {
    let result = [];

    reports.forEach((r) => {
      //   r.logs.length > 0 &&
      //     r.logs.forEach((log) => {
      const date = new Date(r.date);
      const dateFormat =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      const timeFormat =
        ((date.getHours() + 24) % 12 || 12) + ":" + date.getMinutes();

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



  const onTypeChange = (name, lable) => {
    setType({name, lable});
  };
  const onComapnyChange = (name, lable) => {
    setCompanyId({name, lable});
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
    type.name === "all" ? data : data.filter((d) => d.type === type.name && d);

  const filteredData2 = !search
    ? filteredData
    : filteredData.filter((d) => d.name.startsWith(search));

  return (
    <Nav user={user}>
      <div className="flex">
        <div>
          <Datepicker
            useRange={true}
            value={logDate}
            primaryColor="blue"
            onChange={handleChange}
            placeholder="بازه زمانی"
          />
        </div>
        <Button
          theme="dropdown"
          onChange={onComapnyChange}
          data={companyData}
          selected={companyId}
          lable="شرکت"
        />
        <Button
          theme="dropdown"
          onChange={onTypeChange}
          data={typeData}
          selected={type}
          lable="وضعیت"
        />
        <div className="w-12 h-12 text-xl flex justify-center items-center">
          <Excelexport excelData={filteredData2} fileName={Date.now()} />
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
