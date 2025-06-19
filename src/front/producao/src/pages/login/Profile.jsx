import PageLayout from "../../components/PageLayout";
import { getUsername } from "../../utils/auth";

export default function Profile() {
  const userLogado = getUsername();

  return (
    <PageLayout>
      <div className="container-fluid p-4">
        <h1 className="text-blue text-center">Bem vindo, {userLogado}.</h1>
      </div>
    </PageLayout>
  );
}
