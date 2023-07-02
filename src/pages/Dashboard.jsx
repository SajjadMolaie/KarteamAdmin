import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import Nav from "../components/Nav";
import Button from "../components/Button";
import Card from "../components/Card";
import Location from "../images/location.svg";
import Game from "../images/game.svg";
import Send from "../images/send.svg";
import Process from "../components/Process";
import Chart from "../components/Chart";
import { getRequests } from "../services/requestService";

const Dashboard = ({ user }) => {
  const [logDate, setLogDate] = useState({ endDate: null, startDate: null });
  const [data, setData] = useState([]);

  const rowChart = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const dataChart = [
    {
      data: [5, 4, 10, 2, 4, 6, 2, 6, 3, 9, 1, 5],
      type: "line",
      smooth: true,
    },
    {
      data: [4, 2, 40, 2, 42, 16, 22, 6, 3, 49, 1, 5],
      type: "line",
      smooth: true,
    },
  ];

  const handleChange = (date) => {
    setLogDate(date);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getRequests();
        setData(data);
      } catch (ex) {}
    };

    if (!logDate.startDate) getData();

    if (logDate) {
      const newData = data.filter((d) => {
        const dDate = d.start.substring(0, 10);
        return dDate === logDate.startDate;
      });

      setData(newData);
    }
  }, [logDate]);

  const traffic = data.filter((d) => d.type === "Enter" || d.type === "Exit");
  const vacation = data.filter((d) => d.type === "Vacation");
  const mission = data.filter((d) => d.type === "Mission");

  return (
    <>
      <Nav user={user}>
        <div className="flex flex-col h-full">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full 2xl:pl-80 sm:w-1/2">
              <Datepicker
                useRange={false}
                showShortcuts={true}
                asSingle={true}
                value={logDate}
                primaryColor="blue"
                onChange={handleChange}
                classNames="bg-red-500"
                placeholder="تاریخ"
                configs={{
                  shortcuts: {
                    today: "امروز",
                    yesterday: "دیروز",
                  },
                }}
              />
              <Card
                background="blue-500"
                icon={Location}
                lable="تردد"
                value={traffic.length}
              />
              <Card
                background="indigo-500"
                icon={Game}
                lable="مرخصی"
                value={vacation.length}
              />
              <Card
                background="pink-500"
                icon={Send}
                lable="ماموریت"
                value={mission.length}
              />
            </div>
            <div className="w-full mt-6 2xl:pl-80 sm:w-1/2 mx-auto mr-0 sm:mr-8">
              <Process total="360" remaining="120" />
              <Button
                lable="اشتراک"
                theme="primary"
                style={{ marginRight: "auto", marginTop: "24px" }}
              />
            </div>
          </div>
          <div className="mt-10">
            <Chart title="فعالیت ها" row={rowChart} data={dataChart} />
          </div>
        </div>
      </Nav>
    </>
  );
};

export default Dashboard;
