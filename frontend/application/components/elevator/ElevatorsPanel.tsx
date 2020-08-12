import * as React from "react";
import ElevatorsItem from "./ElevatorsItem";

interface IProperties {
  elevators: [];
  activeFloorRequest: number;
}
const ElevatorsPanel: React.FunctionComponent<IProperties> = ({
  elevators,
  activeFloorRequest
}) => {
  return (
    <div className="flex-none h-auto md:h-screen overflow-y-auto w-full md:w-1/4 bg-gray-700">
      <div className="flex flex-col h-auto md:h-screen bg-gray-700">
        <div className="text-gray-200 md:py-6 md:px-6 py-4 text-center md:text-left text-lg">
          Elevators
        </div>
        <div className="flex md:block justify-around relative border-t border-gray-600 ">
          {elevators
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, index) => (
              <ElevatorsItem
                key={index}
                currentFloor={item.floor}
                name={item.name}
                active={
                  item.destination !== null &&
                  item.destination === activeFloorRequest
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ElevatorsPanel;
