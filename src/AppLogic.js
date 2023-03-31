import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const API_KEY = "bd7a997a-8762-47fb-92de-b3b88bf4a0ea";

const useApp = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
    try {
      const response = await axios.post(
        "https://create-recipe-be.onrender.com/chats/completions",
        { ingredients },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const { data } = response;
      const originalContent = data.choices?.[0]?.message?.content;
      const cleanContent = originalContent.replace(/\n/g, "<br/>");
      await fetchImage({
        prompt: originalContent?.split("\n")[0],
      });
      setRecipe(cleanContent);
    } catch {
      alert("Unknown Error! 🥲");
    } finally {
      setLoading(false);
    }
  };

  const fetchImage = async ({ prompt }) => {
    setImageLoading(true);
    try {
      const response = await axios.post(
        "https://create-recipe-be.onrender.com/chats/images",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const { data } = response;
      setImageUrl(data.data?.[0]?.url);
    } catch {
      alert("Unknown Error While Loading Image! 🥲");
    } finally {
      setImageLoading(false);
    }
  };

  const resetAll = () => {
    setImageUrl("");
    setLoading(false);
    setImageLoading(false);
    setRecipe("");
    setIngredients([]);
  };

  return {
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
  };
};

export default useApp;
