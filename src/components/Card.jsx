import React from "react";

const Card = ({ background, icon, lable, value, ...rest }) => {
  return (
    <div
      className={`w-full h-16 flex justify-around items-center rounded-2xl cursor-default mt-6 bg-${background}`}
    >
      <img src={icon} alt="icons" />
      <span className="text-2xl text-white">{lable}</span>
      <span className="text-2xl text-white">{value}</span>
    </div>
  );
};

export default Card;
