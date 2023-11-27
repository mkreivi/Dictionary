import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Search from "./search";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Search />
    </div>
  );
}

export default App;
