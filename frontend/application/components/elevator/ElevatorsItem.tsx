import * as React from "react";
import classNames from "classnames";

interface IProperties {
  currentFloor: number;
  name: string;
  active: boolean;
}

const FloorButton: React.FunctionComponent<IProperties> = ({
  currentFloor,
  name,
  active
}) => {
  return (
    <div
      className={classNames(
        "w-1/5 md:w-full flex flex-col md:flex-row items-center border-solid border-b border-r md:border-r-0 border-gray-600 text-3xl md:text-5xl font-semibold leading-tight md:py-5 md:pl-10 py-2",
        {
          "bg-gray-600": active
        }
      )}
    >
      <div className="name text-gray-500 md:mr-4 font-semibold">{name}</div>
      <div className="floor text-gray-800 font-light">{currentFloor}</div>
    </div>
  );
};

export default FloorButton;
