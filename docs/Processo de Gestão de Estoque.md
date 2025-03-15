### 3.3.1 Processo 1 – Gestão de Estoque

_Apresente aqui o nome e as oportunidades de melhoria para o processo 1. 
Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN._

![Modelagem : Processo de Gestão de Estoque](images/modelagemGestaoEstoque.svg)

#### Detalhamento das atividades

O processo de Gestão de Estoque esta relacionada ao controle e organização de um grupo de produtos e insumos que necessitam de gestão visando a demanda da organização para que tenha-se sempre insumos disponíveis para uso. 

Em nosso processo de Gestão de Estoque temos três pontos iniciais. São eles a chegada de insumos do  fornecedor, a solicitação de compra e por fim atendimento de solicitações internas de insumo.

No momento que mercadorias novas chegam, inicia-se a alocação dos produtos em estoques. Com o sistema aberto clica-se no botão "Realizar entrada de insumos ", ao clicar nesse botão será aberta uma página com um formulário para iniciar o a entrada quantificada de produtos. Inicia-se digitando  o ID do insumo ou equipamento, em caso de ID cadastrado basta colocar o insumo na patraleira com o endereço correto e digitar a quantidade de insumos que desejar dar entrada. Em caso de ID não cadastrado, basta clicar no botão cadastrar que aparecerá assim que o ID for identificado como desconhecido, com isso será direcionado para a página de cadastro.

Para realizar o pedido de compra, basta clicar no botão "Abrir um pedido de compra". Em seguida, será aberta uma aba com um espaço para adicionar livremente um insumo de sua escolha. Basta clicar no botão "+" digitar o ID do insumo e a quantidade desejada. Nos casos em que o insumo não estiver cadastrado, será possível inserir os detalhes do item diretamente no pedido de compra, e o cadastro poderá ser realizado no momento em que ele for entregue.Também será exibida uma lista de sugestões de compra, com base nos itens que se encontram em estoque crítico. Ao incluir todos os elemento no pedido de compra poderá atrelar ou não a ele um ou mais forncedor(es). Finalizar o pedido de compra enviando para o setor de faturamento.

Outro gatilho do nosso processo é a solicitação interna de demanda. Ao clicar no botão "Fast in/Out" voce será direcionado para uma aba onde a ideia é promover agilidade ao user, nesta aba voce digitará o ID do produto e poderá selecionar se é saída ou entrada, digitando também a quantidade e podendo atrelar essa saída a um comentário. Pós isso basta clicar em salvar e com isso finaliza-se o processo salvando as alterações em banco de dados.

Na escolha da Manutenção de Cadastro você pode digitar o ID do insumo ou equipamento e com isso abrirá, automáticamente, uma aba personalizada para insumos ou equipamentos. Em caso de insumos teremos os dados default e será possível sobrescrever os dados e salvar as alterações. Em caso de equipamento será possível sobrescrever os dados e também alterar os insumos que o compõem. Todo equipamento é um conjunto de insumos.

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Classes** - Modelagem para objetos_






**Escolher uma opção dos serviços de Gestão de Estoque**


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                           | ---               |
| Btn Realizar Entrada de insumos| Inicia subprocesso de entarda de inusmos | redirecionador |
| Btn Realizar pedido de compra|Inicia subprocesso de solicitação de compras                                |    redirecionador               |
| Btn Fast In/Out               | Incia processo de entrada ou saída de insumo             |redirecionador  |


**Realziar entrada de insumos**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Digitar o ID    | Caixa de Texto   |Apenas número   |    "Digite o id do equipamento"|
| Quantidade de entrada|Caixa de Texto|valores Inteiros |Vazio|
|Descrição|Caixa de Texto|String |Preenchimento automático|
|Peso|Caixa de Texto|String |Preenchimento automático|
|Quantidade em estoque |Caixa de Texto|String |Preenchimento automático|
|Endereço|Caixa de Texto|String |Preenchimento automático|
|Estoque Minimo|Caixa de Texto|String |Preenchimento automático|

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Btn Consultar o ID | Busca o id do equipamento  | botão |
| Btn Cadastrar um insumo| Abre a aba de cadastro de um insumo/equipamento|botão    |
| Btn Confirma entrada              | Salva a quantidade do insumo| botão|



**Solicitação de Compra**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Busca o ID            | String              | Int e String            | "Digite o ID"               |
|Descrição|Caixa de Texto|String |Preenchimento automático|
|Peso|Caixa de Texto|String |Preenchimento automático|
|Quantidade em estoque |Caixa de Texto|String |Preenchimento automático|
|Endereço|Caixa de Texto|String |Preenchimento automático|
|Estoque Minimo|Caixa de Texto|String |Preenchimento automático|
|Descrição de insumo |Caixa de Texto|String |"Descreva os deatlhes do insumo/equipamento"|
|Fornecedor |Caixa de Texto|String |"Dados do fornecedor"|


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Btn Adiciona insumo | Abre campo para buscar o insumo/equipamento que deseja  | botão |
| Btn Confirma insumo |Confirmar entarda do insumo no pedido de compra|botão|
| Btn Atrela Fornecedor |Permite ao pedido de compra atrelar um forncedor |botão|
| Btn Produto Desconhecido |Direciona para dar a descrição do produto para compra |botão|

**Fast In/Out**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Digitar o ID | Caixa de Texto|      Seguir padrão "letra+num+num+num+num"           |    "Digite o id do equipamento"               |
| Digitar a quantidade que deseja | Int |     Quantidades superiores às em estoque |"Digite o valor de Entrada ou Saída"               |
| Digitar o comentárioda retirada | String|  100 caractéres | "-"|
| Saída | Check Box |  - | Marcada|
| Entrada | Check Box |  - | Desmarcada|


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Btn salvar | Salva o valor de saída ou entgarda  | botão |
| CheckBox Saída |Cnfirma que o ato em função do valor será de retida |botão|
| CheckBox Entrada |Cnfirma que o ato em função do valor será reposto |botão|