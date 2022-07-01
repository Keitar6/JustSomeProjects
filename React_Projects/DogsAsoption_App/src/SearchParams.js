import { useState, useEffect, useContext } from "react"; // importowwanie hooków, zawsze zaczynają się od use
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
const ANIMALS = ["bird", "dog", "cat", "reptile", "rabbit"];

const SearchParams = () => {
  //   const location = " Strzelin, Rynek";
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);

  const [pets, setPets] = useState([]); //
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    // uruchamia się po renderowaniu, a raczej czeka aż się coś stanie, najpierw na koniec pierwszego renderu
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // arrey of dependend variables, jak chcemy wywołać raz po renderowaniu pierszym to zostawiamy puste, jak wstawimy tam jakieś coś to wtedy przy każdej zmianie tego czegoś. Jak nie damy nic, w sensie nic nie będzie po przecinku to uruchamia się przy każdej zmianie

  async function requestPets() {
    const res = await fetch(
      // await sprawia, że czekamy aż fetch się wykona. Sam fetch jest coś jak promise, a await sprawia że czekasz aż promise się wykona.
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(event) => {
          event.preventDefault(); // odświeża stronę jak tego nie ma
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(event) => {
              setAnimal(event.target.value);
              setBreed("");
            }}
            onBlur={(event) => {
              setAnimal(event.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(event) => {
              setBreed(event.target.value);
            }}
            onBlur={(event) => {
              setBreed(event.target.value);
            }}
          >
             <option />
            {breeds.map((userBreed) => (
              <option key={userBreed} value={userBreed}>
                {userBreed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            onBlur={(event) => setTheme(event.target.value)}
          >
            <option value={"#ff4e60"}>
              Choose your Glorious color(#f06d06)
            </option>
            <option value={"orchid"}>Orchid</option>
            <option value={"mediumorchid"}>Medium Orchid</option>
            <option value={"#f06d06"}>Fog Dog</option>
            <option value={"royalblue"}>Royal Blue</option>
            <option value={"peru"}>Peru</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
