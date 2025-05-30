import { Link } from "react-router-dom";
import { FaHome, FaTools } from "react-icons/fa";
import { MdPrecisionManufacturing } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export default function Header() {
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
              <Link className="nav-link text-white d-flex align-items-center gap-1 py-2" to="/">
                <FaHome /> <span className="">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white d-flex align-items-center gap-1 py-2" to="/producao">
                <MdPrecisionManufacturing /> <span className="">Produção</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white d-flex align-items-center gap-1 py-2" to="/estoque">
                <BsBoxSeam /> <span className="">Estoque</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white d-flex align-items-center gap-1 py-2" to="/manutencao">
                <FaTools /> <span className="">Manutenção</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 flex-row flex-lg-row justify-content-center justify-content-lg-end w-100">
            <li className="nav-item">
              <Link className="nav-link text-white px-2" id="paginaLogin" to="/login">
                <FaUser />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-2" id="loginButton" to="/logout">
                <IoLogOutOutline id="iconLogin" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
