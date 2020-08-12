import * as React from "react";
import classNames from "classnames";

interface IProperties {
  message: string;
  variant: string;
  show: boolean;
}

const variants = {
  success: "text-green-800",
  danger: "text-red-800"
};

const Alert: React.FunctionComponent<IProperties> = ({ alert }) => {
  return (
    <>
      {alert && (
        <div className="absolute top-0 inset-x-auto p-6 w-full pointer-events-none z-20">
          <div className="w-full max-w-xl mx-auto mb-2 pointer-events-auto">
            <div
              className={classNames(
                "modal-container rounded shadow-lg z-50 overflow-y-auto shadow-md rounded p-6 bg-white",
                variants[alert.variant]
              )}
            >
              <span>{alert.message}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
