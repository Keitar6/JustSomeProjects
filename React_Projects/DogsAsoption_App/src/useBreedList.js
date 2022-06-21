import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  //   useEffect(() => { nigdy nie używaj alertów
  //     alert(status);
  //   }, [status]);

  useEffect(() => {
    if (!animal) {
      // jeśli nie ma wybranego zwierzęcia to nie może być gatunku (breed)
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      // console.log(json);
      localCache[animal] = json.breeds || []; // jeśli nie będzie takiego zwierzęcia to zwróci pustą tablicę, dlatego tutaj jest or
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
