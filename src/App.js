import TextBox from "./components/TextBox";
import "./App.css";

function App() {
  return (
    <div className="container mx-auto bg-red h-screen sm:border-2 border-red">
      <p className="font-sans font-light text-4xl subpixel-antialiased text-white pt-8 px-5 leading-normal">
        What Are You Cooking Today? 👩🏻‍🍳
      </p>
      <p className="font-sans text-lg subpixel-antialiased text-white py-4 pb-8 px-5 leading-normal">
        Put your ingredients and let the AI create a recipe!
      </p>
      <div className="container mx-auto bg-white h-screen rounded-3xl">
        <p className="font-sans text-grey text-md subpixel-antialiased py-8 pb-4 px-5 leading-normal">
          Enter your ingredients
        </p>
        <TextBox />
      </div>
    </div>
  );
}

export default App;
