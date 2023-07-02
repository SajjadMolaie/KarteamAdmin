import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";

import { useForm } from "../hooks/useForm";
import Nav from "../components/Nav";
import Table from "../components/Table";
import Input from "../components/Input";
import Button from "../components/Button";
import { getMyCompany, addCompany } from "../services/companyService";

const Company = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [update, setUpdate] = useState();

  const schema = {
    name: Joi.string().required(),
    phoneNumber: Joi.string().min(11).max(11).required(),
  };

  const onSubmit = async ({ phoneNumber, name }) => {
    try {
      await addCompany(name, phoneNumber);

      setUpdate(!update);
    } catch (ex) {
      if (ex.response && ex.response.status === 409)
        toast.warning(".شرکت با این اسم وجود دارد");
    }
  };

  const { formData, formError, handleChange, handleSubmit, validate } = useForm(
    {
      phoneNumber: "",
      name: "",
    },
    (formData) => onSubmit(formData),
    schema
  );

  const cols = [
    {
      name: "name",
      lable: "نام شرکت",
    },
    { name: "phoneNumber", lable: "شماره تلفن" },
  ];

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const { data } = await getMyCompany();
        setCompanies(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    getCompanies();
  }, [update]);

  const sData = () => {
    let result = [];

    companies.forEach((company) => {
      result.push({
        name: company.name,
        phoneNumber: company.phoneNumber,
      });
    });

    return result;
  };

  const data = sData();

  return (
    <Nav user={user}>
      <Table data={data} cols={cols} rowsPerPage={10} />
      <div className="flex flex-col w-1/3 ">
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="flex justify-around ">
            <Input
              lable="نام شرکت خود را وارد کنید"
              name="name"
              id="name"
              onChange={handleChange}
              value={formData && formData.name}
              type="text"
              error={formError && formError.name}
            />
            <Input
              lable="شماره شرکت خود را وارد کنید"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
              value={formData && formData.phoneNumber}
              type="tel"
              error={formError && formError.phoneNumber}
            />
          </div>
          <div className="pr-3">
            <Button disabled={validate()} lable="ثبت" theme="primary" />
          </div>
        </form>
      </div>
    </Nav>
  );
};

export default Company;
