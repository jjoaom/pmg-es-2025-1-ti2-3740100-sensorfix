import { useNavigate, useLocation } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";

const Voltar = ({ label = "Voltar" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const parentPath = location.pathname
    .split("/")
    .slice(0, -1)
    .join("/") || "/";

  const handleBack = () => {
    navigate(parentPath);
  };

  return (
    <div className="d-flex justify-content-start">
      <button
        onClick={handleBack}
        className="btn btn-voltar btn-sm d-flex align-items-center gap-1 shadow-sm px-3 py-2"
      >
        <IoMdReturnLeft size={13} />
        <span className="d-none d-sm-inline">{label}</span>
      </button>
    </div>
  );
};

export default Voltar;
