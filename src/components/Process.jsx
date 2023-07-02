import React from "react";

const Process = ({ total, remaining }) => {
  return (
    <div>
      <span>{`مانده: ${remaining} روز`}</span>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `calc(100% * ${remaining} / ${total})` }}
        ></div>
      </div>
    </div>
  );
};

export default Process;
