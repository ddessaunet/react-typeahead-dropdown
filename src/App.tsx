import "./styles.css";
import cities from "./cities";

import TypeAheadDropDown from "./components/TypeAheadDropdown";

export default function App() {
  return (
    <div className="App">
      <h1>TypeAheadDropdown component</h1>
      <TypeAheadDropDown />
    </div>
  );
}
