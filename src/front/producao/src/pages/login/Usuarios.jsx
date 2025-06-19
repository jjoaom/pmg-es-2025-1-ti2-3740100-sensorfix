import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import PageLayout from "../../components/PageLayout";
import { isAdmin, getUsername } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
  const navigate = useNavigate();
  
  const userLogado = getUsername();

  const [usuarios, setUsuarios] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [editandoId, setEditandoId] = useState(null);

  const carregarUsuarios = async () => {
    try {
      const dados = await api.get("/users");
      setUsuarios(dados);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  const handleCriarOuAtualizar = async (e) => {
    e.preventDefault();
    try {
      if (!username.trim()) {
        alert("Username é obrigatório");
        return;
      }

      const usuario = { username, password, role };

      if (editandoId) {
        if (!password) {
          delete usuario.password; // Não manda senha se campo estiver vazio
        }
        await api.put(`/users/${editandoId}`, usuario);
      } else {
        if (!password) {
          alert("Senha é obrigatória no cadastro");
          return;
        }
        await api.post("/users", usuario);
      }

      resetarFormulario();
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário");
    }
  };

  const handleEditar = (usuario) => {
    setUsername(usuario.username);
    setPassword(""); // Senha não vem
    setRole(usuario.role);
    setEditandoId(usuario.id);
  };

  const handleDeletar = async (id, userName) => {
    const userLogado = getUsername();
    if (userName === userLogado) {
      alert("Você não pode excluir seu próprio usuário.");
      return;
    }

    if (window.confirm(`Deseja realmente excluir o usuário ${userName}?`)) {
      try {
        await api.delete(`/users/${id}`);
        carregarUsuarios();
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        alert("Erro ao deletar usuário");
      }
    }
  };

  const resetarFormulario = () => {
    setUsername("");
    setPassword("");
    setRole("USER");
    setEditandoId(null);
  };

  useEffect(() => {
    if (!isAdmin()) {
      alert("Acesso não autorizado!");
      navigate("/");
      return;
    }
    carregarUsuarios();
  }, []);

  return (
    <PageLayout>
      <div className="container-fluid p-4">
        <h1 className="text-blue text-center">Bem vindo, {userLogado}.</h1>
        <h2 className="text-blue">Gestão de Usuários</h2>

        <form
          className="glass-div p-3 mb-4"
          onSubmit={handleCriarOuAtualizar}
        >
          <h5>{editandoId ? "Editar Usuário" : "Criar Novo Usuário"}</h5>
          <div className="row g-2">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="password"
                className="form-control"
                placeholder={
                  editandoId ? "Nova senha (opcional)" : "Senha"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!editandoId}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-success w-100">
                {editandoId ? "Salvar" : "Criar"}
              </button>
            </div>
          </div>
        </form>

        <table className="table glass-div">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th style={{ width: "200px" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEditar(u)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeletar(u.id, u.username)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
