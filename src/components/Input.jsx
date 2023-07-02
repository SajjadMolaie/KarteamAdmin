import React from "react";

const Input = ({ name, id, lable, error, ...rest }) => {
  const err = error ? "border-red-600" : null;
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-xs text-black/90">
        {lable}
      </label>
      <input
        name={name}
        id={id}
        {...rest}
        className={`w-full outline-none h-16 bg-slate-100 rounded-lg py-2 px-4 mt-2 border-1 ${err}`}
      />
    </div>
  );
};

export default Input;
