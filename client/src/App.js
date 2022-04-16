import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/custom/header/Header';
import Home from "./components/home/Home";
import './App.css'
function App() {
  return (
    <>
    <Router>
      <Header />

      <div className="pages">
        <Routes>
          <Route exact path="/" component={<Home/>} />
        </Routes>
      </div>
    </Router>
  </>
  );
}

export default App;
