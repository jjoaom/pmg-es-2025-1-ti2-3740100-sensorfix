import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import PageLayout from "../../components/PageLayout";
import { isAdmin, getUsername } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { ModalAlert } from "../../components/ModalAlert";

export default function Usuarios() {
  const navigate = useNavigate();
  const userLogado = getUsername();

  const [usuarios, setUsuarios] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [editandoId, setEditandoId] = useState(null);
  const [modalAlert, setModalAlert] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showModal = (message, type = "success") => {
    setModalAlert({
      show: true,
      message,
      type
    });
  };

  const closeModal = () => {
    setModalAlert({
      show: false,
      message: "",
      type: "success"
    });
  };

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
        showModal("Username é obrigatório", "danger");
        return;
      }

      const usuario = { username, password, role };

      if (editandoId) {
        if (!password) {
          delete usuario.password;
        }
        await api.put(`/users/${editandoId}`, usuario);
      } else {
        if (!password) {
          showModal("Senha é obrigatória no cadastro", "danger");
          return;
        }
        await api.post("/users", usuario);
      }

      resetarFormulario();
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      showModal("Erro ao salvar usuário", "danger");
    }
  };

  const handleEditar = (usuario) => {
    setUsername(usuario.username);
    setPassword("");
    setRole(usuario.role);
    setEditandoId(usuario.id);
  };

  const handleDeletar = async (id, userName) => {
    const userLogado = getUsername();
    if (userName === userLogado) {
      showModal("Você não pode excluir seu próprio usuário.", "warning");
      return;
    }

    if (window.confirm(`Deseja realmente excluir o usuário ${userName}?`)) {
      try {
        await api.delete(`/users/${id}`);
        carregarUsuarios();
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        showModal("Erro ao deletar usuário", "danger");
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
      showModal("Acesso não autorizado!", "danger");
      navigate("/");
      return;
    }
    carregarUsuarios();
  }, [navigate]);

  return (
    <PageLayout>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="text-center mb-3">
              <h1 className="text-primary">Bem vindo, {userLogado}.</h1>
              <h2 className="text-secondary">Gestão de Usuários</h2>
            </div>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <form onSubmit={handleCriarOuAtualizar}>
                  <h5 className="mb-3">{editandoId ? "Editar Usuário" : "Criar Novo Usuário"}</h5>
                  <div className="row g-3 align-items-end">
                    <div className="col-md-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">
                        {editandoId ? "Nova senha (opcional)" : "Senha"}
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder={editandoId ? "Nova senha (opcional)" : "Senha"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={!editandoId}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Perfil</label>
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
                    <div className="col-md-1 d-grid">
                      <button type="submit" className="btn btn-success btn-design">
                        {editandoId ? "Salvar" : "Criar"}
                      </button>
                    </div>
                  </div>
                  {editandoId && (
                    <div className="mt-3">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-design btn-sm"
                        onClick={resetarFormulario}
                      >
                        Cancelar edição
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="card shadow-sm">
              <div className="card-body">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
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
                        <td>
                          <span className={`badge ${u.role === "ADMIN" ? "bg-primary" : "bg-secondary"}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary btn-design me-2"
                            onClick={() => handleEditar(u)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger btn-design"
                            onClick={() => handleDeletar(u.id, u.username)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                    {usuarios.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center text-muted">
                          Nenhum usuário cadastrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ModalAlert
          show={modalAlert.show}
          message={modalAlert.message}
          type={modalAlert.type}
          onClose={closeModal}
        />
      </div>
    </PageLayout>
  );
}
