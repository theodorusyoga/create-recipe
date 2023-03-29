import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const TextBox = () => {
  return (
    <div className="grid grid-cols-8">
      <div className="px-5 pb-4 col-span-7">
        <input
          class="font-sans font-extrabold shadow bg-gray-200 appearance-none rounded w-full py-2 px-3 text-grey focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Write ingredients..."
        ></input>
      </div>
      <div>
        <div className="pt-1">
          <FontAwesomeIcon
            size="2x"
            icon={faSquarePlus}
            style={{ color: "#ff607a" }}
          />
        </div>
      </div>
    </div>
  );
};
export default TextBox;
