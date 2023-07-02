import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import { useForm } from "../hooks/useForm";
import Input from "../components/Input";
import Nav from "../components/Nav";
import Table from "../components/Table";
import Button from "../components/Button";
import {
  getLocations,
  addLocation,
  deleteLocation,
} from "../services/companyLocationService";
import { getCompany } from "../services/companyService";
import MapboxRadiusSelector from "../components/Map";

const Reports = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [location, setLocation] = useState([]);
  const [update, setUpdate] = useState();
  const [companyId, setCompanyId] = useState("");
  const [center, setCenter] = useState([51.3347, 35.7219]); // default center
  const radius = 1200; // default radius in meters

  const schema = {
    name: Joi.string().required(),
  };

  const onSubmit = async ({ name }) => {
    try {
      await addLocation(name, companyId, center[0], center[1], radius);

      setUpdate(!update);
    } catch (ex) {
      if (ex.response && ex.response.status === 409)
        toast.warning(".موقعیت وجود دارد");
    }
  };

  const { formData, formError, handleChange, handleSubmit, validate } = useForm(
    {
      name: "",
    },
    (formData) => onSubmit(formData),
    schema
  );

  const cols = [
    {
      name: "name",
      lable: "نام",
    },
    { name: "lat", lable: "عرض جغرافیایی" },
    {
      name: "long",
      lable: "طول جغرافیایی",
    },
    {
      name: "radius",
      lable: "شعاع",
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
        const { data } = await getLocations(id);
        setLocation(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    if (!companyId) getCompanies();
    if (companyId) getData(companyId);
  }, [companyId, update]);

  const sData = () => {
    let result = [];

    location.forEach((loc) => {
      result.push({
        id: loc._id,
        lat: loc.lat,
        long: loc.long,
        radius: loc.radius,
        name: loc.name,
      });
    });

    return result;
  };

  const data = sData();

  const onComapnyChange = (e) => {
    setCompanyId(e.target.value);
  };

  const onDelete = async (id) => {
    try {
      await deleteLocation(id);

      setUpdate(!update);
    } catch (ex) {
      console.log(ex);
    }
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

  const handleMapClick = (map, event) => {
    setCenter([event.lngLat.lng, event.lngLat.lat]);
  };

  setComapnyData();

  return (
    <Nav user={user}>
      <Button
        theme="dropdown"
        onChange={onComapnyChange}
        data={companyData}
        lable="شرکت"
      />
      <Table data={data} cols={cols} rowsPerPage={3} onReject={onDelete} />
      <div className="flex">
        <form className="mt-5 w-1/4" onSubmit={handleSubmit}>
          <Input
            lable="نام موقعیت"
            name="name"
            id="name"
            onChange={handleChange}
            value={formData && formData.name}
            type="txt"
            error={formError && formError.name}
          />
          <div className="flex justify-between mt-1 mb-2">
            <Button disabled={validate()} lable="ثبت" theme="primary" />
          </div>
        </form>
        <div className="w-1/2 mr-40">
          <MapboxRadiusSelector
            center={center}
            handleMapClick={handleMapClick}
            radius={radius}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Reports;
