import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faBowlRice } from "@fortawesome/free-solid-svg-icons";

const Ingredients = ({ name, onDelete }) => {
  return (
    <div className="px-5 pb-4">
      <div className="px-3 py-3 flex justify-between bg-gray-700 rounded">
        <div className="flex">
          <div className="pt-1 mr-3">
            <FontAwesomeIcon
              icon={faBowlRice}
              className="text-red-200 text-2xl"
            />
          </div>
          <div className="pt-1">
            <p className="font-sans text-md subpixel-antialiased leading-normal">
              {name}
            </p>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="rounded-full bg-white w-16 h-8 text-center"
        >
          <div className="pt-1">
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-red-200 text-xl"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
export default Ingredients;
