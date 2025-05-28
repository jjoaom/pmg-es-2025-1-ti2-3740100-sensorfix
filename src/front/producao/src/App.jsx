import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import Producao from "./pages/Producao.jsx";
import Estoque from './pages/gestao-estoque/Estoque.jsx';
import Buscar from "./pages/gestao-estoque/Buscar.jsx";
import CadastroEquipamento from "./pages/gestao-estoque/CadastroEquipamento.jsx";
//import Login from "./pages/login/Login.jsx";

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
            <Route path="/estoque/buscar" element={<Buscar/>}></Route>
            <Route path="/estoque/cadastrarEquipamento" element={<CadastroEquipamento/>}></Route>
            {/*<Route path="/login" element={<Login/>} />*/}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}