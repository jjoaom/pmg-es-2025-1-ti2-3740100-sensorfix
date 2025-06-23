import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";

import Producao from "./pages/producao/Producao.jsx";

import Estoque from './pages/gestao-estoque/Estoque.jsx';
import CadastroEquipamento from "./pages/gestao-estoque/CadastroEquipamento.jsx";
import Pesquisa from "./pages/gestao-estoque/Pesquisa.jsx";
import IndicadoresDesempenho from "./pages/gestao-estoque/IndicadoresDesempenho.jsx";
import CadastroInsumo from "./pages/gestao-estoque/CadastroInsumo.jsx";
import Compras from "./pages/gestao-estoque/Compras.jsx";
import EditarEquipamento from "./pages/gestao-estoque/EditarEquipamento.jsx";
import EditarInsumo from "./pages/gestao-estoque/EditarInsumo.jsx";
import Entrada  from "./pages/gestao-estoque/Entrada.jsx";
import FastEquip from "./pages/gestao-estoque/FastEquip.jsx";
import FastInsumo from "./pages/gestao-estoque/FastInsumo.jsx";


import Movimentacao from "./pages/movimentacao/Movimentacao.jsx";

import RevisaoEquipamento from "./pages/registro/RevisaoEquipamento.jsx";

import Login from "./pages/login/Login.jsx";
import Usuarios from "./pages/login/Usuarios.jsx";
import Profile from "./pages/login/Profile.jsx";

import PrivateRoute from "./utils/PrivateRoute.jsx";
import AdminRoute from "./utils/AdminRoute.jsx";

import Indicator from "./pages/indicadores/Indicator.jsx";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header />
        <main className="flex-grow-1 d-flex justify-content-center align-items-start py-4 ">
          <div className="container-fluid">
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />

              <Route path="/producao" element={<PrivateRoute><Producao /></PrivateRoute>} />

              <Route path="/movimentacao" element={<PrivateRoute><Movimentacao /></PrivateRoute>} />

              <Route path="/indicadores" element={<PrivateRoute><Indicator /></PrivateRoute>} />

              <Route path="/estoque" element={<PrivateRoute><Estoque /></PrivateRoute>} />
              <Route path="/estoque/entrada" element={<PrivateRoute><Entrada /></PrivateRoute>} />
              <Route path="/estoque/buscar" element={<PrivateRoute><Pesquisa /></PrivateRoute>} />
              <Route path="/estoque/indicadoresDesempenho" element={<PrivateRoute><IndicadoresDesempenho /></PrivateRoute>} />
              <Route path="/estoque/compras" element={<PrivateRoute><Compras /></PrivateRoute>} />
              <Route path="/estoque/fastEquipamento" element={<PrivateRoute><FastEquip /></PrivateRoute>} />
              <Route path="/estoque/fastInsumo" element={<PrivateRoute><FastInsumo /></PrivateRoute>} />
              <Route path="/estoque/cadastrarEquipamento" element={<PrivateRoute><CadastroEquipamento /></PrivateRoute>} />
              <Route path="/estoque/cadastroInsumo" element={<PrivateRoute><CadastroInsumo /></PrivateRoute>} />
              <Route path="/estoque/editarEquipamento" element={<PrivateRoute><EditarEquipamento /></PrivateRoute>} />
              <Route path="/estoque/editarInsumo" element={<PrivateRoute><EditarInsumo /></PrivateRoute>} />

              <Route path="/manutencao" element={<PrivateRoute><RevisaoEquipamento /></PrivateRoute>} />

              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

              {/* Rotas restritas para ADMIN */}
              <Route path="/admin" element={<AdminRoute><Usuarios /></AdminRoute>} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
