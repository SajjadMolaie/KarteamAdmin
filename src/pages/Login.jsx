import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { login } from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();

  const schema = {
    phoneNumber: Joi.string().min(11).max(11).required(),
  };

  const onSubmit = async ({ phoneNumber }) => {
    try {
      await login(phoneNumber);

      navigate("/verify", { state: { phoneNumber } });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.warning(".کاربری با این شماره تلفن پیدا نشد");
    }
  };

  const { formData, formError, handleChange, handleSubmit, validate } = useForm(
    {
      phoneNumber: "",
    },
    (formData) => onSubmit(formData),
    schema
  );

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-60 w-11/12 py-6 px-8 rounded-lg bg-white sm:w-460 sm:py-8 sm:px-11">
        <h2>ورود به پنل</h2>
        <form className="mt-5" onSubmit={handleSubmit}>
          <Input
            lable="شماره همراه خود را وارد کنید"
            name="phoneNumber"
            id="phoneNumber"
            onChange={handleChange}
            value={formData && formData.phoneNumber}
            type="tel"
            error={formError && formError.phoneNumber}
          />
          <div className="flex justify-between mt-3">
            <Button type="button" lable="ثبت کسب و کار جدید" theme="white" />
            <Button disabled={validate()} lable="ارسال کد" theme="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
