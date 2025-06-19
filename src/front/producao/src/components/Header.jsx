import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaTools, FaUser, FaDollyFlatbed } from "react-icons/fa";
import { MdPrecisionManufacturing } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { LuUserCog } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { isAuthenticated, logout, getRole, getUsername } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();

   const username = getUsername();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary py-2">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="./logo1.png"
            alt="Logo"
            style={{ height: "clamp(40px, 5vw, 56px)" }}
            className="d-inline-block align-text-top me-2 img-fluid"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-column flex-lg-row align-items-start align-items-lg-center">
            <li className="nav-item">
              <Link
                className="nav-link text-white d-flex align-items-center gap-1 py-2"
                to="/"
              >
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white d-flex align-items-center gap-1 py-2"
                to="/producao"
              >
                <MdPrecisionManufacturing /> <span>Produção</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white d-flex align-items-center gap-1 py-2"
                to="/estoque"
              >
                <BsBoxSeam /> <span>Estoque</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white d-flex align-items-center gap-1 py-2"
                to="/manutencao"
              >
                <FaTools /> <span>Manutenção</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white d-flex align-items-center gap-1 py-2"
                to="/movimentacao"
              >
                <FaDollyFlatbed /> <span>Movimentação</span>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0 flex-row justify-content-center justify-content-lg-end w-100">
            {getRole() === "ADMIN" && (
              
              <li className="nav-item">
                <Link
                  className="nav-link text-white d-flex align-items-center gap-1 py-2"
                  to="/admin/usuarios"
                >
                  <LuUserCog /> <span title={`Bem vindo, ${username}`}>Usuários</span>
                </Link>
              </li>
            )}

            {getRole() === "USER" && (
              
              <li className="nav-item">
                <Link
                  className="nav-link text-white d-flex align-items-center gap-1 py-2"
                  to="/profile"
                >
                  <FaUser /> <span title={`Bem vindo, ${username}`}>Perfil de {username}</span>
                </Link>
              </li>
            )}

            {!isAuthenticated() ? (
              <li className="nav-item">
                <Link className="nav-link text-white px-2" to="/login">
                  <FaUser />
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link text-white px-2 btn btn-link"
                  onClick={handleLogout}
                  style={{ textDecoration: "none" }}
                >
                  <IoLogOutOutline />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
