import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Test Meta Tag5454577784545542</p>
        <Router>
          <Link to={"post?id=1"}>Post 1</Link>
          <Link to={"post?id=2"}>Post 2</Link>
        </Router>
      </header>
    </div>
  );
}

export default App;
