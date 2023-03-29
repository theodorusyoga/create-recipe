import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import TextBox from "./components/TextBox";
import Ingredients from "./components/Ingredients";
import Loading from "./components/Loading";
import EmptyBox from "./assets/empty-box.png";
import "./App.css";

const API_KEY = "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";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onIngredientsSubmit = (data) => {
    setIngredients([...ingredients, data.ingredients]);
    reset();
  };

  const onDelete = (i) => {
    setIngredients([
      ...ingredients.slice(0, i),
      ...ingredients.slice(i + 1, ingredients.length),
    ]);
  };

  const onSubmit = async () => {
    setLoading(true);
    setRecipe("");
    const ingredientStr = ingredients.join(", ");
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `give me a recipe that I can make using: ${ingredientStr}`,
        },
      ],
    };
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        payload,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const { data } = response;
      const cleanContent = data.choices?.[0]?.message?.content.replace(
        /\n/g,
        "<br/>"
      );
      setRecipe(cleanContent);
    } catch {
      alert("Unknown Error! 🥲");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setRecipe("");
    setIngredients([]);
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
            {!recipe && !isLoading && (
              <div>
                <p className="font-sans text-grey text-md subpixel-antialiased py-8 pb-4 px-5 leading-normal">
                  Enter your ingredients
                </p>
                <form onSubmit={handleSubmit(onIngredientsSubmit)}>
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
              </div>
            )}

            {!recipe && (
              <>
                {isLoading ? (
                  <div className="text-center">
                    <div className="px-5 py-20 flex justify-center">
                      <Loading />
                    </div>
                    <p className="font-sans font-center text-lg text-gray-400 subpixel-antialiased py-4 pb-8 px-5 leading-normal">
                      Preparing awesome recipe for you! 🥳 🤩
                    </p>
                  </div>
                ) : ingredients.length <= 0 ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <p className="font-sans text-lg subpixel-antialiased py-4 pt-8 px-5 leading-normal">
                      Ingredients List
                    </p>
                    {ingredients.map((p, i) => (
                      <Ingredients
                        key={i}
                        name={p}
                        onDelete={() => onDelete(i)}
                      />
                    ))}
                  </>
                )}
              </>
            )}
            {!!recipe && (
              <p
                className="font-sans font-center text-lg text-gray-400 subpixel-antialiased py-8 px-5 leading-normal"
                dangerouslySetInnerHTML={{ __html: recipe }}
              ></p>
            )}
          </div>
        </div>
      </div>
      <footer className="px-5 py-4">
        <button
          onClick={
            !!recipe
              ? () => resetAll()
              : ingredients.length > 0 && !isLoading
              ? () => onSubmit()
              : () => {}
          }
          className={`${
            ingredients.length <= 0 || isLoading
              ? "opacity-50 cursor-not-allowed "
              : "hover:bg-red-300 "
          }rounded-full bg-red-200 text-white text-lg py-3 w-full`}
        >
          {!recipe ? "Create Your Recipe Now!" : "Start Over 💥"}
        </button>
      </footer>
    </div>
  );
}

export default App;
