import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const TextBox = React.forwardRef(({ placeholder, ...props }, ref) => (
  <div className="flex justify-between px-5">
    <input
      className="font-sans font-extrabold shadow bg-gray-700 appearance-none rounded w-full py-2 px-3 mr-3 text-grey focus:outline-none focus:shadow-outline"
      type="text"
      placeholder={placeholder}
      ref={ref}
      {...props}
    ></input>
    <button type="submit" className="pt-1">
      <FontAwesomeIcon
        size="2x"
        icon={faSquarePlus}
        style={{ color: "#ff607a" }}
      />
    </button>
  </div>
));
export default TextBox;
