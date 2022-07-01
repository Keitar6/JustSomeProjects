import { createContext } from "react";

const ThemeContext = createContext(["orange", () => {}]); // pusta funkcja wywołująca się jeśli ktoś wywoła ThemeContext i to nie będzie hook to nic ma się nie zadziać. Działałoby też gdyby było samo createContext(). środek jest jest dobry szczególnie dla Typescript'a . W środku znajduje się czego możemy się spodziewać
export default ThemeContext;
