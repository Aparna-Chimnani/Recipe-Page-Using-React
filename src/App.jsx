import { useEffect, useState } from "react";
import axios from 'axios'

import "./App.css";

function App() {
  const [recipe, setRecipe] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [toggle, setToggle] = useState(null);
  const [toggleinst, setToggleinst] = useState(null);
  const [instruct, setInstruct] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        // const response = await data.json();
        const update =response.data.recipes.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          instruction: item.instructions,
          ingredient: item.ingredients,
          cuisine: item.cuisine,
          difficulty: item.difficulty,
        }));
        console.log("response", response.data);
        console.log("update", update);
        setRecipe(update);
        setFiltered(update);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchdata();
  }, []);

  const handleIngredient = (id) => {
    setToggle((prev) => (prev === id ? null : id));
    setToggleinst(null)
    recipe.map((item) =>
      item.id === id ? setIngredient(item.ingredient) : item
    );
  };

  const handleInstruction = (id) => {
    setToggleinst((prev) => (prev === id ? null : id));
    setToggle(null)
    recipe.map((item) =>
      item.id === id ? setInstruct(item.instruction) : item
    );
  };

  const handleEasy = () => {
    const update = recipe.filter((item) => item.difficulty === "Easy");
    setFiltered(update);
  };

  const handleMedium = () => {
    const update = recipe.filter((item) => item.difficulty === "Medium");
    setFiltered(update);
  };

  const handleSearch = () => {
    const update = filtered.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(update);
  };

  const handleAll = () => {
    setFiltered(recipe);
  };

  return (
    <>
      <div className="navbar">
        <h1>Recipes 👨🏻‍🍳 </h1>
        <input
          type="text"
          placeholder="search...🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>search</button>
        <button onClick={handleAll}>All</button>
        <button onClick={handleEasy}>Easy</button>
        <button onClick={handleMedium}>Medium</button>
      </div>

      <div className="recipe-list">
        {filtered.map((item) => (
          <div key={item.id} className="recipe-card">
            <h3>{item.name}</h3>
            <h4>{item.difficulty}</h4>
            <img src={item.image} alt={item.name} />

            <button onClick={() => handleIngredient(item.id)}>
              Ingredients
            </button>
            <button onClick={() => handleInstruction(item.id)}>
              Instructions
            </button>

            {toggle === item.id && (
              <div>
                <h4>Ingredients</h4>
                <ul>
                  {ingredient.map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </ul>
              </div>
            )}

            {toggleinst === item.id && (
              <div>
                <h4>Instructions</h4>
                <ol>
                  {instruct.map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
