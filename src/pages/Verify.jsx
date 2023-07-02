import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";

import { useForm } from "../hooks/useForm";
import { login, verify } from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";

const Verify = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) setPhoneNumber(location.state.phoneNumber);
    else navigate("/login");
  }, [location.state, navigate]);

  const schema = {
    otp: Joi.string().min(4).max(4).required(),
  };

  const onSubmit = async ({ otp }) => {
    try {
      await verify(phoneNumber, otp);

      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 422)
        toast.warning(".کد وارد شده نامعتبر است");
    }
  };

  const { formData, formError, handleChange, handleSubmit, validate } = useForm(
    {
      otp: "",
    },
    (formData) => onSubmit(formData),
    schema
  );

  const handleBack = () => {
    navigate(-1);
  };

  const resendOtp = async () => {
    try {
      await login(phoneNumber);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.warning(".کاربری با این شماره تلفن پیدا نشد");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-60 w-11/12 py-6 px-8 rounded-lg bg-white sm:w-460 sm:py-8 sm:px-11">
        <VscChevronRight
          style={{ fontSize: "24px", cursor: "pointer" }}
          onClick={handleBack}
        />
        <form className="mt-5" onSubmit={handleSubmit}>
          <Input
            lable={`کد تایید به ${phoneNumber} ارسال شد لطفا وارد کنید`}
            name="otp"
            id="otp"
            onChange={handleChange}
            value={formData && formData.otp}
            type="tel"
            error={formError && formError.otp}
          />
          <div className="flex justify-between mt-3">
            <Button
              type="button"
              onClick={resendOtp}
              lable="ارسال مجدد کد"
              theme="white"
            />
            <Button disabled={validate()} lable="ورود" theme="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
