import PageLayout from "../../components/PageLayout";
import { getUsername, getRole } from "../../utils/auth";

export default function Profile() {
  const userLogado = getUsername();
  const role = getRole();

  let roleLabel = "";
  if (role === "User") {
    roleLabel = "Usuário";
  } else if (role === "admin") {
    roleLabel = "Administrador";
  } else {
    roleLabel = role;
  }

  return (
    <PageLayout>
      <div className="container-fluid p-4 d-flex flex-column align-items-center">
        <h1 className="text-blue text-center mb-2">Bem-vindo, {userLogado}!</h1>
        <p className="text-blue">Seu acesso é de: {roleLabel}</p>
        <p className="text-blue">Para alterar sua senha, contate um administrador.</p>
      </div>
    </PageLayout>
  );
}
