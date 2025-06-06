const urlinsumo= "http://localhost:8080/insumo/"


//BOTÕES
const btnBuscar=document.getElementById('btnBuscar');
const btnSalvar=document.getElementById('btnSalvar');
const btnExcluir=document.getElementById('btnExcluir');
btnExcluir.style.display="none";
btnSalvar.style.display="none";

//VARIAVEIS
const inputDescricao = document.getElementById('desc');
const inputPeso = document.getElementById('peso');
const inputEstMin = document.getElementById('estMin');
const inputEnd = document.getElementById('end');
const inputEstoque = document.getElementById('total');
const inputIdInsumo = document.getElementById('id');
const dialogOk = document.getElementById('dialogOk');
const dialogSemCad = document.getElementById('naoCadastrado');
const dialogDeletado = document.getElementById('delete');
const dialogAviso = document.getElementById('avisoRelacional');


let data;

//botões

btnBuscar.addEventListener('click',() =>{
    
    getInsumo(urlinsumo,inputIdInsumo.value);
});

btnSalvar.addEventListener('click',() =>{
    
    putInsumo(inputIdInsumo.value,urlinsumo);
});

btnExcluir.addEventListener('click',()=>{
    deleteInsumo(urlinsumo,inputIdInsumo.value);
})

//FUNÇÕES 


function preencheAutomatico (desc,peso,estMin,end,quantidade){
    inputDescricao.value = desc;
    inputPeso.value =peso;
    inputEstMin.value=estMin;
    inputEnd.value =end;
    inputEstoque.value =quantidade;
  
}

async function getInsumo(url, idInsumo) {
    const urlCompleta = url + idInsumo;

    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            
            data = await resposta.json();
            console.log(data);
            preencheAutomatico(data.nome, data.peso, data.estoqueMin, data.endereco, data.quantidade);
            btnExcluir.style.display ="inline"
            btnSalvar.style.display ="inline"

        } else {
            console.error("Erro na requisição:", resposta.status);
            dialogSemCad.showModal();
            
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
    }
}


async function putInsumo(id, urlBase) {
    const url = `${urlBase}${id}`;

    const insumo = {
        nome: document.getElementById('desc').value,
        peso: parseFloat(document.getElementById('peso').value),
        estoqueMin: parseInt(document.getElementById('estMin').value),
        endereco: document.getElementById('end').value,
        quantidade: parseInt(document.getElementById('total').value),
        deposito: 2 // fixa ou dinamiza se quiser
    };

    try {
        const resposta = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insumo)
        });

        if (resposta.ok) {
            dialogOk.showModal();
        } else {
            alert(`Erro ao atualizar insumo: ${resposta.status}`);
        }
    } catch (erro) {
        console.error('Erro na requisição PUT:', erro);
        alert('Erro ao atualizar insumo. Veja o console para mais detalhes.');
    }

    limparCampos();
}

function limparCampos() {
    inputDescricao.value = "";
    inputEnd.value = "";
    inputEstMin.value = "";
    inputEstoque.value = "";
    inputPeso.value="";
    
    inputIdInsumo.value="";
}

async function deleteInsumo(url, id) {
    try {
      const response = await fetch(`${url}${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        dialogDeletado.showModal();
        limparCampos();

      } else {
        dialogAviso.showModal();
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  }