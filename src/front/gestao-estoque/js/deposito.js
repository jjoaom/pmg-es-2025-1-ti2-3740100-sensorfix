document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("movimentacao-modal");
  const openBtn = document.getElementById("nova-movimentacao-btn");
  const closeBtn = document.querySelector(".close-button");
  const form = document.getElementById("form-movimentacao");

  // Abrir o modal
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Fechar o modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fechar clicando fora do conteúdo
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Capturar envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
      <td>${formData.get("data")}</td>
      <td>${formData.get("descricao")}</td>
      <td>${formData.get("deposito")}</td>
      <td>${formData.get("quantidade")}</td>
    `;

    document.querySelector("#transactions-table tbody").appendChild(novaLinha);

    form.reset();
    modal.style.display = "none";
  });
});
