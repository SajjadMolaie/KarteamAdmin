import React, { useEffect, useState } from "react";

import { getCompany } from "../services/companyService";
import { getEnterExit, getEnterExitMonth } from "../services/enterExitService";
import { findAllCompanyUser } from "../services/companyUserService";
import Nav from "../components/Nav";
import Table from "../components/Table";

const Time = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [companyId, setCompanyId] = useState("");

  const cols = [
    {
      name: "name",
      lable: "نام و نام خانوادگی",
    },
    { name: "deficit", lable: "کسری" },
    { name: "spent", lable: "مجموع حضور" },
  ];

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const companies = await getCompany();
        setCompanies(companies);
        setCompanyId(companies[2].company._id);
      } catch (ex) {
        console.log(ex);
      }
    };

    const getLogs = async (cid) => {
      try {
        const { data: logs } = await getEnterExitMonth(cid);
        setLogs(logs);
      } catch (ex) {
        console.log(ex);
      }
    };

    const getUsers = async (cid) => {
      try {
        const { data: users } = await findAllCompanyUser(cid);
        setUsers(users);
      } catch (ex) {
        console.log(ex);
      }
    };

    if (!companyId) getCompanies();
    if (companyId) {
      getLogs(companyId);
      getUsers(companyId);
    }
  }, [companyId]);

  const setData = () => {
    const result = [];
    const start = new Date();
    start.setHours(8, 30, 0, 0);
    const end = new Date();
    end.setHours(17, 0, 0, 0);
    const totalWorkingHours = (end.getTime() - start.getTime()) / 1000;
    users.forEach((user) => {
      const enterLogs = [];
      const exitLogs = [];
      const absenceLogs = [];
      logs.forEach((log) => {
        if (log.user._id === user.user._id) {
          if (log.type === "Enter") {
            enterLogs.push(log);
          } else if (log.type === "Exit") {
            exitLogs.push(log);
          } else if (log.type === "Absent") {
            absenceLogs.push(log);
          }
        }
      });
      const obj = {
        name: user.user.firstName + " " + user.user.lastName,
        spent: "00:00",
        deficit: "00:00",
      };
      if (absenceLogs.length > 0) {
        // If the user is absent, don't calculate deficit
        result.push(obj);
        return;
      }
      // Remove Enter logs that don't have a matching Exit log
      enterLogs.forEach((enterLog, index) => {
        const exitLog = exitLogs.find(
          (exitLog) => exitLog.date > enterLog.date
        );
        if (!exitLog) {
          enterLogs.splice(index, 1);
        }
      });
      let timeSpent = 0;
      enterLogs.forEach((enterLog) => {
        const enterTime = new Date(enterLog.date);
        const exitLog = exitLogs.find(
          (exitLog) => exitLog.date > enterLog.date
        );
        if (exitLog) {
          const exitTime = new Date(exitLog.date);
          const timeDiffInSeconds =
            (exitTime.getTime() - enterTime.getTime()) / 1000;
          timeSpent += timeDiffInSeconds;
        }
      });
      const hours = Math.floor(timeSpent / 3600);
      const minutes = Math.floor((timeSpent % 3600) / 60);
      const deficit = Math.abs(totalWorkingHours - timeSpent);
      const deficitHours = Math.floor(deficit / 3600);
      const deficitMinutes = Math.floor((deficit % 3600) / 60);
      const deficitString =
        String(deficitHours).padStart(2, "0") +
        ":" +
        String(deficitMinutes).padStart(2, "0");
      obj.spent =
        String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
      obj.deficit = deficitString;
      result.push(obj);
    });
    return result;
  };

  const data = setData();

  console.log(data);

  return (
    <div>
      <Nav user={user}>
        <Table data={data} cols={cols} rowsPerPage={10} />
      </Nav>
    </div>
  );
};

export default Time;
