import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/"); 
    } catch {
      alert("Login inválido");
    }
  };

return (
    <div className="container  mt-5 d-flex justify-content-center align-items-center" >
        <div className="card p-4 glass-div btn-design" >
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
                <button className="btn btn-voltar w-100" type="submit">
                    Entrar
                </button>
            </form>
        </div>
    </div>
);
}
