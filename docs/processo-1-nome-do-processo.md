### 3.3.1 Processo 1 – Gestão de Estoque

_Apresente aqui o nome e as oportunidades de melhoria para o processo 1. 
Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN._

![Exemplo de um Modelo BPMN do PROCESSO 1](images/process.png "Modelo BPMN do Processo 1.")

#### Detalhamento das atividades

O processo de Gestão de Estoque esta relacionada ao controle e organização de um grupo de produtos e insumos que necessitam de gestão visando a demanda da organização para que tenha-se sempre insumos disponíveis para uso. 

Em nosso processo de Gestão de Estoque temos três pontos iniciais. São eles a chegada de insumos do  fornecedor, a solicitação de compra e por fim atendimento de solicitações internas de insumo.

No momento que mercadorias novas chegam, inicia-se a alocação dos produtos em estoques. Com o sistema aberto clica-se no botão "Realizar entrada de insumos ", ao clicar nesse botão será aberta uma página com um formulário para iniciar o a entrada quantificada de produtos. Inicia-se digitando  o ID do insumo ou equipamento, em caso de ID cadastrado basta colocar o insumo na patraleira com o endereço correto e digitar a quantidade de insumos que desejar dar entrada. 

Para realizar o pedido de compra, basta clicar no botão "Abrir um pedido de compra". Em seguida, será aberta uma aba com um espaço para adicionar livremente um insumo de sua escolha. Basta digitar o ID do insumo e a quantidade desejada.Nos casos em que o insumo não estiver cadastrado, será possível inserir os detalhes do item diretamente no pedido de compra, e o cadastro poderá ser realizado no momento em que ele for entregue.Também será exibida uma lista de sugestões de compra, com base nos itens que se encontram em estoque crítico. Além disso, será possível adicionar outros insumos de sua preferência clicando no botão "+". Ao incluir todos os elemento no pedido de compra poderá atrelar ou não a ele um ou mais forncedor(es). Finalizar o pedido de compra enviando para o setor de faturamento.

O último gatilho do nosso processo é a solicitação interna de demanda. Ao clicar no botão "Fast in/Out" voce será direcionado para uma aba onde a ideia é promover agilidade ao user, nesta aba voce digitará o ID do produto e poderá selecionar se é saída ou entrada, digitando também a quantidade e podedo atrelar essa saída a um comentário. Pós isso basta clicar em salvar e com isso finaliza-se o processo salvando as alterações em banco de dados.

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Hora** - campo do tipo hora (hh:mm:ss)_

_* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_

_* **Tabela** - campo formado por uma matriz de valores_


**Nome da atividade 1**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
| ***Exemplo:***  |                  |                |                   |
| login           | Caixa de Texto   | formato de e-mail |                |
| senha           | Caixa de Texto   | mínimo de 8 caracteres |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel  ) |
| ***Exemplo:***       |                                |                   |
| entrar               | Fim do Processo 1              | default           |
| cadastrar            | Início do proceso de cadastro  |                   |


**Nome da atividade 2**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |
