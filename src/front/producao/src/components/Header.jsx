import { Link } from "react-router-dom";
import { FaHome, FaTools } from "react-icons/fa";
import { MdPrecisionManufacturing } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg header-div">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="./logo1.png"
            alt="Logo"
            width="100%"
            height="92"
            className="d-inline-block align-text-top"
          />
        </a>
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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/producao">
                <MdPrecisionManufacturing /> Produção
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/estoque">
                <BsBoxSeam /> Estoque
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/manutencao">
                <FaTools /> Manutenção
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" id="paginaLogin" to="/login" ><FaUser /></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" id="loginButton" to="/logout"><IoLogOutOutline id="iconLogin" /></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
