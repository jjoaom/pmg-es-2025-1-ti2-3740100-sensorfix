import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { isAuthenticated } from "../../utils/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const reason = localStorage.getItem("logoutReason");
    if (reason === "expired") {
      setSessionExpired(true);
      localStorage.removeItem("logoutReason");
    }

    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "danger",
        message: "Usuário ou senha inválidos, ou erro no servidor.",
      });
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card p-4 w-50 glass-div btn-design">
        <h2 className="mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuário</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-voltar w-25 text-center" type="submit">
              Entrar
            </button>
          </div>
        </form>
        <div className="py-3">
          {feedback.message && (
            <div
              className={`glass-div alert alert-${feedback.type} text-center w-100`}
              role="alert"
            >
              {feedback.message}
            </div>
          )}
          {sessionExpired && (
            <div
              className="glass-div alert alert-warning text-center w-100"
              role="alert"
            >
              Sua sessão expirou. Faça login novamente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
