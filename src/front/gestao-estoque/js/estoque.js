const btnBuscar = document.getElementById('btnBuscar');
const btnFast = document.getElementById('btnFast');
const btnCompra = document.getElementById('btnCompra');
const btnNovoPedido = document.getElementById('btnNovoPedido');
const dialogEdicao = document.getElementById('dialogEditar');
const dialogFast = document.getElementById('dialogFast');
const dialogCompras = document.getElementById('compras');
const urlPedidos = 'http://localhost:8080/pedidos';

btnBuscar.addEventListener('click', () => {
    dialogEdicao.showModal();
});
btnFast.addEventListener('click', () => {
    dialogFast.showModal();
});
btnCompra.addEventListener('click', () => {
    dialogCompras.showModal();
});

btnNovoPedido.addEventListener("click", () => {
    criaNovoPedido(urlPedidos);
});

async function criaNovoPedido(url) {
    const agora = new Date();
    console.log(url);

    const pedido = {
        idfornecedor: 0,
        data: agora.toISOString().split('T')[0]
    };

    try {
        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (resposta.ok) {
            const data = await resposta.json();
            const idNovoPedido = data.id;

            console.log('Novo ID do Pedido:', idNovoPedido);

            // Armazenar o ID no localStorage
            localStorage.setItem('idNovoPedido', idNovoPedido);

            // Redireciona para a próxima página
            window.location.href = 'compras.html';
        } else {
            alert(`Erro ao criar pedido: ${resposta.status}`);
        }
    } catch (erro) {
        console.error('Erro na requisição POST:', erro);
        alert('Erro ao criar pedido. Veja o console para mais detalhes.');
    }
}
