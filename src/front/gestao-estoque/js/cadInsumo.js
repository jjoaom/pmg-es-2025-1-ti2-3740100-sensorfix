///////////////////////BOTÕES/////////////////////////////////////
const bntCadastra = document.getElementById("btnCadastrar");
const btnNovaEntrada = document.getElementById("btnNovaEntrada");
btnNovaEntrada.style.display="none";
//////////////////////////////////função dos botões////////////////////////////////////
bntCadastra.addEventListener('click',()=>{
    createInsumo(url,inputDescricao.value,inputPeso.value,inputEstMin.value,inputEstoque.value,inputEnd.value,2)
})
////////////////////VARIAVEIS////////////////////////////
const inputDescricao = document.getElementById('desc');
const inputPeso = document.getElementById('peso');
const inputEstMin = document.getElementById('estMin');
const inputEnd = document.getElementById('end');
const inputEstoque = document.getElementById('total');
const dialogOk = document.getElementById('dialogOk');

const url = "http://localhost:8080/insumo"



////////////////////////FUNÇÕES///////////////////////////////
async function createInsumo(url, nome, peso, estoqueMin, quantidade, endereco, deposito) {
    const novoInsumo = {
        nome,
        peso: parseFloat(peso),
        estoqueMin: parseInt(estoqueMin),
        quantidade: parseInt(quantidade),
        endereco,
        deposito: parseInt(deposito)
    };
    

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoInsumo)
        });

        if (resposta.ok) {
            const contentType = resposta.headers.get("content-type");
            
            if (contentType && contentType.includes("application/json")) {
                const resultado = await resposta.json();
                console.log("Criado:", resultado);
            } else {
                console.log("Criado com sucesso, mas sem corpo na resposta.");
            }
        
            dialogOk.showModal();
            btnNovaEntrada.style.display ="inline";
        } else {
            alert("Erro ao criar insumo. Código: " + resposta.status);
            console.error("Erro na requisição POST:", resposta.status);
        }
        
    } catch (erro) {
        console.error("Erro ao tentar criar insumo:", erro);
    }

    limparCampos();
    btnNovaEntrada.style.display="inline";
}

function limparCampos() {
    inputDescricao.value = "";
    inputEnd.value = "";
    inputEstMin.value = "";
    inputEstoque.value = "";
    inputPeso.value="";
}


