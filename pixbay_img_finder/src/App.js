import React from "react";
import Button from "@material-ui/core/Button";
import NavBar from "./components/navbar/NavBar";
import Search from "./components/search/Search";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Search />
      <div>My React App</div>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default App;
