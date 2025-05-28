import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import Producao from "./pages/Producao.jsx";
import Estoque from './pages/gestao-estoque/Estoque.jsx';

export default function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header/>
        <div className="flex-grow-1 overflow-auto ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producao" element={<Producao />} />
            <Route path="/estoque" element={<Estoque />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}