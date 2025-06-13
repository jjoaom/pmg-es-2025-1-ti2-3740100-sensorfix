import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import Producao from "./pages/Producao.jsx";
import Estoque from './pages/gestao-estoque/Estoque.jsx';
import CadastroEquipamento from "./pages/gestao-estoque/CadastroEquipamento.jsx";
import Indicadores from "./pages/indicadores/Indicadores.jsx";
import RevisaoEquipamento from "./pages/gestao-estoque/RevisaoEquipamento.jsx";
import Pesquisa from "./pages/gestao-estoque/Pesquisa.jsx";
import IndicadoresDesempenho from "./pages/gestao-estoque/IndicadoresDesempenho.jsx";
import CadastroInsumo from "./pages/gestao-estoque/CadastroInsumo.jsx";
import Compras from "./pages/gestao-estoque/Compras.jsx";
import Deposito from "./pages/gestao-estoque/Deposito.jsx";
import EditarEquipamento from "./pages/gestao-estoque/EditarEquipamento.jsx";
import EditarInsumo from "./pages/gestao-estoque/EditarInsumo.jsx";
import Entrada  from "./pages/gestao-estoque/Entrada.jsx";
import FastEquip from "./pages/gestao-estoque/FastEquip.jsx";
import FastInsumo from "./pages/gestao-estoque/FastInsumo.jsx";
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
            <Route path="/estoque/entrada" element={<Entrada />} />
            <Route path="/estoque/buscar" element={<Pesquisa/>}></Route>
            <Route path="/estoque/cadastrarEquipamento" element={<CadastroEquipamento/>}></Route>
            <Route path="/indicadores" element={<Indicadores/>} />
            <Route path="/revisaoEquipamento" element={<RevisaoEquipamento/>} />
            <Route path="/Pesquisa" element={<Pesquisa/>} />
            <Route path="/estoque/indicadoresDesempenho" element={<IndicadoresDesempenho/>} />
            <Route path="/estoque/cadastroInsumo" element={<CadastroInsumo/>} />
            <Route path="/estoque/compras" element={<Compras/>} />
            <Route path="/estoque/Deposito" element={<Deposito/>} />
            <Route path="/estoque/editarEquipamento" element={<EditarEquipamento/>} />
            <Route path="/estoque/editarInsumo" element={<EditarInsumo/>} />
            <Route path="/estoque/fastEquipamento" element={<FastEquip/>} />
            <Route path="/estoque/fastInsumo" element={<FastInsumo/>} />
            {/*<Route path="/login" element={<Login/>} />*/}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}