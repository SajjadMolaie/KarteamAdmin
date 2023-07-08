import React from "react";

import Down from "../images/down.svg";

const Button = ({ theme, lable, active, data, onChange,selected, ...rest }) => {
  return (
    <>
      {theme === "primary" && (
        <button
          {...rest}
          className={`min-w-min py-1 px-5 flex justify-center items-center mt-2 disabled:opacity-80 bg-blue-600 text-white text-sm rounded-md`}
        >
          {lable}
        </button>
      )}
      {theme === "white" && (
        <button
          {...rest}
          className={`min-w-min py-1 px-5 flex justify-center items-center mt-2 disabled:opacity-80 bg-white text-blue-600 text-xs rounded-md`}
        >
          {lable}
        </button>
      )}
      {theme === "dropdown" && (
        <>
          <div
            className="hs-dropdown relative inline-flex z-50"
            data-hs-dropdown-auto-close="inside"
          >
            <button
              id="hs-dropdown-item-checkbox_button"
              type="button"
              className="hs-dropdown-toggle w-44 py-2 px-2 inline-flex justify-center items-center gap-2 rounded-full border-2 font-medium bg-gray-200 text-gray-700 border-white shadow-sm align-middle focus:outline-none transition-all text-sm"
            >
              {selected ? selected.lable : lable}
              <img src={Down} alt="dropDown" />
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-[11rem] bg-gray-200 shadow-md rounded-lg p-2 z-50"
              aria-labelledby="hs-dropdown-item-checkbox_button"
            >
              {data.map((value) => (
                <div
                  onClick={() => onChange(value.name, value.lable)}
                  key={value.name}
                  className="relative cursor-pointer flex items-start py-2 px-3 rounded-md hover:bg-gray-100"
                >
                    <button>
                      {value.lable}
                    </button>
                  {/* <div className="flex items-center h-5 mt-1">
                    <input
                      id={value.name}
                      name="hs-dropdown-item-radio"
                      type="radio"
                      value={value.name}
                      className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
                      aria-describedby="hs-dropdown-item-radio-archive-description"
                      {...rest}
                    />
                  </div>
                  <label htmlFor={value.name} className="mr-3.5">
                    {value.lable}
                  </label> */}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Button;
