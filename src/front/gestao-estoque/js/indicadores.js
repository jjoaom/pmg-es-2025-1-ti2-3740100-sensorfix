//url da api 
const urlDepositos = "http://localhost:8080/estoque-depositos/"
const urlDemandas = "https://sensorfix-backend-fegvfqa4bra5csbq.brazilsouth-01.azurewebsites.net/api/demandas"


//puxando os canvas
const ctxDepEquip = document.getElementById("cvsDepEquip");
const ctxTempo = document.getElementById("cvsTempo");

//variaveis
let vetorDepositos = [];
let vetorDemandas = [];

//eventos da página 
window.addEventListener("pageshow",()=>{
  criaGraficoDepositos();
  criaGraficoTempDemanda();
});


//funções





//cria nosso grafico de depositos 
async function criaGraficoDepositos (){
  vetorDepositos = await getDepositos(urlDepositos);

  if(vetorDepositos == []){
    alert("vetor vazio");
  }

  let nomes  =  vetorDepositos.map(obj=>obj.tipoDeposito);
  let quantidades =  vetorDepositos.map(obj=>obj.quantidade);

  new Chart(ctxDepEquip,
  {
    type:'bar',
    data:{
      labels:nomes,
      datasets:[{
        label: 'Quantidade',
        data: quantidades,
        backgroundColor: [
          'rgba(229, 235, 54, 0.7)',
          'rgba(114, 235, 54, 0.7)',
          'rgba(235, 54, 54, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(148, 54, 235, 0.7)',

        ],
        
        borderColor: 'rgb(0, 0, 0)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

}

async function criaGraficoTempDemanda() {
  vetorDemandas = await getDemandas(urlDemandas);
}

async function getDepositos(url) {
  try {
    const resposta = await fetch(url, { method: "GET" });
    if (resposta.ok) {
      const data = await resposta.json();
      console.log(data);
      return data; // Retorna o array de objetos
    } else {
      console.error("Erro na requisição:", resposta.status);
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar depósitos:", error);
    return [];
  }
}


async function getDemandas(url) {
  try {
    const resposta = await fetch(url, { method: "GET" });
    if (resposta.ok) {
      const data = await resposta.json();
      console.log(data);
      return data; // Retorna o array de objetos
    } else {
      console.error("Erro na requisição:", resposta.status);
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar depósitos:", error);
    return [];
  }
}




