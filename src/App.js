import TextBox from "./components/TextBox";
import Ingredients from "./components/Ingredients";
import Loading from "./components/Loading";
import EmptyBox from "./assets/empty-box.png";
import "./App.css";
import useApp from "./AppLogic";

function App() {
  const {
    errors,
    handleSubmit,
    imageUrl,
    ingredients,
    isImageLoading,
    isLoading,
    onIngredientsSubmit,
    onDelete,
    onSubmit,
    register,
    recipe,
    resetAll,
  } = useApp();

  return (
    <div className="container mx-auto sm:border-2 border-red-200 flex flex-col min-h-screen justify-between">
      <div>
        <div className="bg-red-200 border-red">
          {!imageUrl ? (
            <>
              <p className="font-sans font-light text-4xl subpixel-antialiased text-white pt-8 px-5 leading-normal">
                Hi 👋🏻 I am MealMashinator 👩🏻‍🍳
              </p>
              <p className="font-sans text-lg subpixel-antialiased text-white py-4 pb-14 px-5 leading-normal">
                What are we cooking today?
              </p>
            </>
          ) : (
            <div className="max-h-96">
              <img className="min-w-full" alt="Recipe" src={imageUrl} />
            </div>
          )}

          <div className="container mx-auto relative bg-white -mt-6 rounded-3xl rounded-b-none">
            {!recipe && !isLoading && (
              <div>
                <p className="font-sans text-grey text-md subpixel-antialiased py-8 pb-4 px-5 leading-normal">
                  Let's input the ingredients you want to cook today (min. 5)
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
                      {isImageLoading
                        ? "Step 2. Almost finished! 🥰 Preparing illustration for you... 🖌️💥"
                        : "Step 1. Preparing awesome recipe for you! 🥳 🤩"}
                    </p>
                  </div>
                ) : ingredients.length <= 0 ? (
                  <>
                    <div className="text-center py-12">
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
              <div className="px-5 py-8">
                <button
                  onClick={resetAll}
                  className="hover:bg-red-300 rounded-full bg-red-200 text-white text-lg py-3 w-full"
                >
                  Start Over 💥
                </button>
                <p
                  className="font-sans font-center text-lg text-gray-400 subpixel-antialiased py-8 px-5 leading-normal"
                  dangerouslySetInnerHTML={{ __html: recipe }}
                ></p>
              </div>
            )}
          </div>
        </div>
      </div>
      {!recipe && (
        <footer className="px-5 py-4">
          <button
            onClick={
              ingredients.length > 4 && !isLoading ? () => onSubmit() : () => {}
            }
            className={`${
              ingredients.length <= 4 || isLoading
                ? "opacity-50 cursor-not-allowed "
                : "hover:bg-red-300 "
            }rounded-full bg-red-200 text-white text-lg py-3 w-full`}
          >
            Create Your Recipe Now!
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;
