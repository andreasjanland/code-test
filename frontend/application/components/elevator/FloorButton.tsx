import * as React from "react";
import classNames from "classnames";

interface IProperties {
  floor: number;
  clickHandler: any;
  active: boolean;
  disabled: boolean;
}

const FloorButton: React.FunctionComponent<IProperties> = ({
  floor,
  clickHandler,
  active,
  disabled
}) => {
  return (
    <div
      className={classNames(
        "w-full md:h-24 h-24 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center md:text-4xl text-2xl",
        {
          "text-gray-600 cursor-pointer": !disabled && !active
        },
        {
          "text-gray-500 cursor-default": disabled
        },
        {
          "text-gray-800 hover:bg-gray-400 bg-gray-400 cursor-default": active
        }
      )}
      onClick={() => !active && !disabled && clickHandler(floor)}
    >
      {floor}
    </div>
  );
};

export default FloorButton;
