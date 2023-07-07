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
    { name: "absent", lable: "مجموع غیاب" },
    { name: "deficit", lable: "مجموع کسری" },
    { name: "spent", lable: "مجموع حضور" },
  ];

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const companies = await getCompany();
        setCompanies(companies);
        setCompanyId(companies[1].company._id);
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
    users.forEach((user) => {
      const enterLogs = [];
      const exitLogs = [];
      logs.forEach((log) => {
        if (log.user._id === user.user._id) {
          if (log.type === "Enter") {
            enterLogs.push(log);
          } else if (log.type === "Exit") {
            exitLogs.push(log);
          }
        }
      });
      // Create a new array with valid Enter logs
      const validEnterLogs = enterLogs.filter((enterLog) => {
        const exitLog = exitLogs.find(
          (exitLog) => new Date(exitLog.date) > new Date(enterLog.date)
        );
        return exitLog != null;
      });
      let timeSpent = 0;
      let deficit = 0; // Initialize deficit to 0
      let totalAttendance = 0; // Initialize totalAttendance to 0
      validEnterLogs.forEach((enterLog) => {
        const enterTime = new Date(enterLog.date);
        const exitLog = exitLogs.find(
          (exitLog) => new Date(exitLog.date) > enterTime
        );
        let exitTime;
        if (exitLog) {
          exitTime = new Date(exitLog.date);
        } else {
          // Set exit time to current time if no matching Exit log
          exitTime = new Date();
        }
        // Check if the Enter and Exit logs occur on the same day
        if (enterTime.toDateString() === exitTime.toDateString()) {
          // Calculate time spent in seconds
          const timeDiffInSeconds =
            (exitTime.getTime() - enterTime.getTime()) / 1000;
          // Calculate the time difference from 8:30 am in seconds
          const timeDiffFromStartInSeconds =
            (enterTime.getTime() -
              new Date(
                enterTime.getFullYear(),
                enterTime.getMonth(),
                enterTime.getDate(),
                8,
                30,
                0
              ).getTime()) /
            1000;
          // Calculate the time difference from 5:00 pm in seconds
          const timeDiffToEndInSeconds =
            (new Date(
              enterTime.getFullYear(),
              enterTime.getMonth(),
              enterTime.getDate(),
              17,
              0,
              0
            ).getTime() -
              exitTime.getTime()) /
            1000;
          // Check if the user logged in after 8:30 am
          if (timeDiffFromStartInSeconds > 0) {
            deficit += timeDiffFromStartInSeconds; // Add time difference to deficit
          }
          // Check if the user logged out before 5:00 pm
          if (timeDiffToEndInSeconds > 0) {
            deficit += timeDiffToEndInSeconds; // Add time difference to deficit
          }
          timeSpent += timeDiffInSeconds;
          totalAttendance += 1;
        }
      });
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const diffInTime = currentDate.getTime() - firstDayOfMonth.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      let absentDays = diffInDays - totalAttendance;
      absentDays = Math.max(absentDays, 0); // Ensure absentDays is not negative
      const hours = Math.floor(timeSpent / 3600);
      const minutes = Math.floor((timeSpent % 3600) / 60);
      const deficitHours = Math.floor(deficit / 3600); // Convert deficit to hours
      const deficitMinutes = Math.floor((deficit % 3600) / 60); // Get remaining minutes
      const obj = {
        name: user.user.firstName + " " + user.user.lastName,
        spent: hours + ":" + minutes,
        deficit: `${deficitHours}:${deficitMinutes}`,
        attendance: totalAttendance,
        absent: absentDays,
      };
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
