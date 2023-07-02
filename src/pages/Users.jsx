import React, { Fragment, useEffect, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { BsPersonFillAdd } from "react-icons/bs";

import { useForm } from "../hooks/useForm";
import {
  addCompanyUser,
  deleteCompanyUser,
  changeRoleCompanyUser,
} from "../services/companyUserService";
import Nav from "../components/Nav";
import Table from "../components/Table";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUser } from "../services/userService";
import { getCompany } from "../services/companyService";

const Users = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [companys, setCompanys] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [update, setUpdate] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const schema = {
    phoneNumber: Joi.string().min(11).max(11).required(),
    role: Joi.string().min(5).max(6).required(),
  };

  const onSubmit = async ({ phoneNumber, role }) => {
    try {
      await addCompanyUser(phoneNumber, type, role);

      setModalOpen(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 403)
        toast.warning("دسترسی محدود است.");
      if (ex.response && ex.response.status === 409)
        toast.warning("کاربر قبلا افزوده شده است.");
    }
  };

  const { formData, formError, handleChange, handleSubmit, validate } = useForm(
    {
      phoneNumber: "",
      role: "",
    },
    (formData) => onSubmit(formData),
    schema
  );

  const {
    formData: formData2,
    formError: formError2,
    handleChange: handleChange2,
    handleSubmit: handleSubmit2,
    validate: validate2,
  } = useForm(
    {
      role: "",
    },
    (formData) => onEdit(formData),
    schema
  );

  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  const onEdit = async (data) => {
    try {
      await changeRoleCompanyUser(
        data.id,
        data.companyId,
        data.userId,
        data.role
      );

      setUpdate(!update);
    } catch (ex) {
      console.log(ex);
    }
  };

  const cancelButtonRef = useRef(null);

  const cols = [
    {
      name: "name",
      lable: "نام و نام خانوادگی",
    },
    {
      name: "phoneNumber",
      lable: "موبایل",
    },
    { name: "role", lable: "دسترسی" },
    {
      name: "date",
      lable: "تاریخ ثبت",
    },
  ];

  useEffect(() => {
    const getCompanys = async () => {
      try {
        const data = await getCompany();
        setCompanys(data);
        setType(data[0].company._id);
      } catch (ex) {
        console.log(ex);
      }
    };

    const getUsers = async (id) => {
      try {
        const data = await getUser(id);
        setUsers(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    if (!type) getCompanys();
    if (type) getUsers(type);
  }, [type, modalOpen, update]);

  const sData = () => {
    let result = [];

    users.forEach((user) => {
      const myDate = new Date(user.date);

      const date =
        myDate.getMonth() + "/" + myDate.getDay() + "/" + myDate.getFullYear();

      user.user &&
        result.push({
          id: user._id,
          companyId: user.company._id,
          userId: user.user._id,
          name: user.user.firstName + " " + user.user.lastName,
          phoneNumber: user.user.phoneNumber,
          role: user.role,
          date,
        });
    });

    return result;
  };

  const onSearchChange = ({ target: input }) => {
    setSearch(input.value);
  };

  const onUserDelete = async (id) => {
    try {
      await deleteCompanyUser(id);

      setUpdate(!update);
    } catch (ex) {
      console.log(ex);
    }
  };

  const data = sData();
  const typeData = [];

  const setTypeData = () => {
    companys.forEach((company) => {
      company.role === "Admin" &&
        typeData.push({
          name: company.company._id,
          lable: company.company.name,
        });
    });
  };

  // const onRoleChange = (e) => {
  //   setRole(e.target.value);
  // };

  // const roleData = [
  //   { name: "Admin", lable: "ادمین" },
  //   { name: "Member", lable: "کاربر" },
  // ];

  setTypeData();

  const filteredData = !search
    ? data
    : data.filter((d) => d.name.startsWith(search));

  return (
    <Nav user={user}>
      <div className="flex">
        <Button
          theme="dropdown"
          onChange={onTypeChange}
          data={typeData}
          lable="شرکت"
        />
        <div className="mr-5 h-12 w-12 flex items-center justify-center text-3xl cursor-pointer">
          <BsPersonFillAdd onClick={() => setModalOpen(true)} />
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
      <Table
        data={filteredData}
        cols={cols}
        rowsPerPage={10}
        onReject={onUserDelete}
        onEdit={onEdit}
      />
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setModalOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg bg-white text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <AiOutlineCloseCircle
                          onClick={() => setModalOpen(!modalOpen)}
                          className="h-6 w-6 text-red-600 cursor-pointer"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-60 w-11/12 py-6 px-8 rounded-lg bg-white sm:w-460 sm:py-8 sm:px-11">
                    <h2>افزودن کاربر</h2>
                    <form className="mt-5" onSubmit={handleSubmit}>
                      <div className="flex h-14">
                        <Input
                          lable="شماره همراه کاربر خود را وارد کنید"
                          name="phoneNumber"
                          id="phoneNumber"
                          onChange={handleChange}
                          value={formData && formData.phoneNumber}
                          type="tel"
                          error={formError && formError.phoneNumber}
                        />
                        <Input
                          lable="سطح دسترسی کاربر خود را اضافه کنید"
                          name="role"
                          id="role"
                          onChange={handleChange}
                          value={formData && formData.role}
                          type="text"
                          error={formError && formError.role}
                          placeholder="Admin || Member"
                        />
                      </div>
                      <div className="flex justify-between mt-3">
                        <Button
                          disabled={validate()}
                          lable="افزودن"
                          theme="primary"
                        />
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={editModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setEditModalOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg bg-white text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <AiOutlineCloseCircle
                          onClick={() => setEditModalOpen(!modalOpen)}
                          className="h-6 w-6 text-red-600 cursor-pointer"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-60 w-11/12 py-6 px-8 rounded-lg bg-white sm:w-460 sm:py-8 sm:px-11">
                    <h2>تغییر سطح دسترسی</h2>
                    <form className="mt-5" onSubmit={handleSubmit2}>
                      <div className="flex h-14">
                        <Input
                          lable="سطح دسترسی جدید کاربر خود را اضافه کنید"
                          name="role"
                          id="role"
                          onChange={handleChange2}
                          value={formData2 && formData2.role}
                          type="text"
                          error={formError2 && formError2.role}
                          placeholder="Admin || Member"
                        />
                      </div>
                      <div className="flex justify-between mt-3">
                        <Button
                          disabled={validate2()}
                          lable="تغییر"
                          theme="primary"
                        />
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Nav>
  );
};

export default Users;
