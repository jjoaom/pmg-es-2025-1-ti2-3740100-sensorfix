const urlEquipamento= "http://localhost:8080/equipamentos"
const urlinsumo= "http://localhost:8080/insumo/"
////////////////////VARIAVEIS////////////////////////////
const inputDescricao = document.getElementById('desc');
const inputPeso = document.getElementById('peso');
const inputEstMin = document.getElementById('estMin');
const inputEnd = document.getElementById('end');
const inputEstoque = document.getElementById('total');
const inputIdInsumo = document.getElementById('id');
const inputDescInsumo = document.getElementById('insumo');

const showInsumo= document.getElementById('showInsumos');

const table = document.createElement('table');
const th = document.createElement('th');




let data;

///////////////////////BOTÕES/////////////////////////////////////
const bntCadastra = document.getElementById("btnCadastrar");
const btnNovaEntrada = document.getElementById("btnNovaEntrada");
const btnBuscar = document.getElementById('btnBusca');
btnNovaEntrada.style.display="none";
//////////////////////////////////função dos botões////////////////////////////////////


bntCadastra.addEventListener('click',()=>{
    createEquipamento(urlEquipamento,inputDescricao.value,inputPeso.value,inputEstMin.value,inputEstoque.value,inputEnd.value,2)
})







////////////////////////FUNÇÕES///////////////////////////////
async function createEquipamento(url, nome, peso, estoqueMin, quantidade, endereco, deposito) {
    const novoEquipamento = {
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
            body: JSON.stringify(novoEquipamento)
        });

        if (resposta.ok) {
            const contentType = resposta.headers.get("content-type");
            
            if (contentType && contentType.includes("application/json")) {
                const resultado = await resposta.json();
                console.log("Criado:", resultado);
            } else {
                console.log("Criado com sucesso, mas sem corpo na resposta.");
            }
        
            alert("Insumo criado com sucesso!");
        } else {
            alert("Erro ao criar equipamento. Código: " + resposta.status);
            console.error("Erro na requisição POST:", resposta.status);
        }
        
    } catch (erro) {
        console.error("Erro ao tentar criar equipamento:", erro);
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


async function getInsumo(url, idInsumo) {
    const urlCompleta = url + idInsumo;

    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            data = await resposta.json();
            console.log(data);
            preencheAutomatico(data.nome);
        } else {
            console.error("Erro na requisição:", resposta.status);
            alert("ID NÃO CADASTRADO");
            
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
    }
}

//colcoar valores do item que foi achado;
function preencheAutomatico (desc){
    inputDescInsumo.value = desc;
  
}