import * as React from "react";
import FloorButton from "./FloorButton";

interface IProperties {
  floors: [];
  clickHandler: any;
  activeFloorRequest: number;
}

const ButtonPanel: React.FunctionComponent<IProperties> = ({
  floors,
  clickHandler,
  activeFloorRequest
}) => {
  return (
    <div className="w-full relative bg-white">
      <div className="flex flex-col h-screen overflow-y-auto">
        <div className="text-gray-800 md:py-6 md:px-6 py-4 text-lg border-b text-center md:text-left">
          Select floor
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <div className="p-6 grid grid-cols-4 gap-2">
            {floors.map(item => (
              <FloorButton
                key={item.floor}
                floor={item.floor}
                clickHandler={clickHandler}
                active={activeFloorRequest === item.floor}
                disabled={
                  activeFloorRequest !== null &&
                  activeFloorRequest !== item.floor
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonPanel;
