import { useState } from "react";
import { useForm } from "react-hook-form";
import TextBox from "./components/TextBox";
import Ingredients from "./components/Ingredients";
import EmptyBox from "./assets/empty-box.png";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setIngredients([...ingredients, data.ingredients]);
    reset();
  };

  const onDelete = (i) => {
    setIngredients([
      ...ingredients.slice(0, i),
      ...ingredients.slice(i + 1, ingredients.length),
    ]);
  };

  return (
    <div className="container mx-auto sm:border-2 border-red-200 flex flex-col h-screen justify-between">
      <div>
        <div className="bg-red-200 border-red">
          <p className="font-sans font-light text-4xl subpixel-antialiased text-white pt-8 px-5 leading-normal">
            What Are You Cooking Today? 👩🏻‍🍳
          </p>
          <p className="font-sans text-lg subpixel-antialiased text-white py-4 pb-8 px-5 leading-normal">
            Put your ingredients and let the AI create a recipe!
          </p>
          <div className="container mx-auto bg-white rounded-3xl rounded-b-none">
            <p className="font-sans text-grey text-md subpixel-antialiased py-8 pb-4 px-5 leading-normal">
              Enter your ingredients
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextBox
                placeholder="Write ingredients..."
                {...register("ingredients", { required: true })}
              />
              {errors.ingredients && (
                <p className="px-5 my-2 text-sm text-red-300">
                  Did you forget something? 😴
                </p>
              )}
            </form>
            <p className="font-sans text-lg subpixel-antialiased py-4 pt-8 px-5 leading-normal">
              Ingredients List
            </p>
            {ingredients.length <= 0 ? (
              <div className="text-center">
                <img
                  className="mx-auto py-8"
                  alt="Empty"
                  src={EmptyBox}
                  width={175}
                />
                <p className="font-sans font-center text-lg text-gray-400 subpixel-antialiased py-4 pb-8 px-5 leading-normal">
                  Still empty in here 😿 try to add some ingredients 🚀
                </p>
              </div>
            ) : (
              ingredients.map((p, i) => (
                <Ingredients name={p} onDelete={() => onDelete(i)} />
              ))
            )}
          </div>
        </div>
      </div>
      <footer className="px-5 py-4">
        <button
          className={`${
            ingredients.length <= 0
              ? "opacity-50 cursor-not-allowed "
              : "hover:bg-red-300 "
          }rounded-full bg-red-200 text-white text-lg py-3 w-full`}
        >
          Create Your Recipe Now!
        </button>
      </footer>
    </div>
  );
}

export default App;
