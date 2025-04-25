### 3.3.4 Processo 4 – Manutenção 

### Nome do Processo
Manutenção de Equipamentos

### Oportunidades de Melhoria
- Melhor rastreamento de equipamentos que retornam para manutenção múltiplas vezes.
- Redução do tempo de diagnóstico e encaminhamento para manutenção.
- Registro mais detalhado dos problemas identificados para análise de recorrência.
- Automatização da identificação do depósito de destino.
  
![Exemplo de um Modelo BPMN do PROCESSO 4](images/modelagemmanutencao.svg "Modelo BPMN do Processo 4.")

#### Detalhamento das atividades

O processo de manutenção tem como objetivo identificar, registrar os defeitos encontrados nos equipamentos e buscar um meio para recuperá-los, garantindo que todas as informações sejam devidamente documentadas. Caso o reparo não seja viável, o equipamento é encaminhado para descarte.

O processo se inicia com a chegada do equipamento danificado, momento em que o técnico responsável realiza a identificação do ID do produto. Este ID é registrado no sistema para rastreio e consulta do histórico de manutenção anteriores. Se necessário, o técnico pode anexar imagens do equipamento como evidência do dano.

Após a identificação, segue-se a análise do defeito, na qual o técnico descreve o problema encontrado e registra a provável causa. Se necessário, podem ser adicionadas evidências adicionais, como imagens ou documentos. Em seguida, é feita a descrição sobre a possibilidade de reparo, onde o técnico avalia se o equipamento pode ser consertado ou se deve ser descartado.

Caso o equipamento for reparável, o técnico registrará os detalhes dos reparos necessários, incluindo a descrição das ações a serem realizadas, o responsável pelo serviço e a previsão de conclusão. O equipamento é então encaminhado à equipe técnica para manutenção, onde os procedimentos necessários serão executados.

Caso o equipamento não possa ser reparado, ele é encaminhado ao depósito de descarte para o devido processamento.

Independente do caminho que será seguido, quando chegarem ao final do processo, as informações são registradas e armazenadas no sistema, garantindo assim a rastreabilidade da manutenção e permitindo consultas futuras. Isso possibilita um controle eficiente sobre os equipamentos, otimizando assim a gestão da manutenção e tomada de decisões.

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

**Escolher uma opção dos serviços de Manutenção**

![tela manutenção![Tela de Busca de Equipamento](https://github.com/user-attachments/assets/3108639c-c8bc-4724-acb2-99ffc2fb6c6b)


**Identificação do Equipamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| **ID do equipamento**  |  Caixa de Texto   | Obrigatório    |    "Digite o ID aqui..."         |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| ***Buscar Equipamento***       |    Resultado de Busca    | submit        |


![Tela de Identificação do Problema](https://github.com/user-attachments/assets/22139c62-dabf-4d17-89fc-76e4056cb4a0)


**Identificação do Problema - Seção: Dados da Revisão**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Data | Data  | Obrigatório  |          dd/mm/aaaa         |
| Hora | Hora | Obrigatório |       --:--            |
| Estado do Hardware | Seleção única (dropdown) | Opcional, lista pré-definida |   Sem danos físicos      |
| Observações | Texto livre | Opcional, lista pré-definida |     Sem danos físicos      |


**Seção: Trabalho a ser realizado**


| **Campo**         |  **Tipo**   | **Restrições**  | **Valor default** |
| ---             | ---              | ---            | ---               |               
| Alta     |  Caixa de Seleção | Opcional  | Não selecionado   |
| Revisão  |  Caixa de Seleção | Opcional  |  Não Selecionado      |
| Refuncionalização  |  Caixa de Seleção | Opcional  |  Não Selecionado      |


**Seção: Registro de Falhas**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Sintoma | Texto curto | Obrigatório |  Vazio  |
| Falha Encontrada | Texto curto | Obrigatório | Vazio              |
| Causa Provável | Texto curto | Obrigatório | Vazio   |
| Ação | Texto curto / Seleção | Obrigatório |  Vazio  |
| Evidência do problema | Arquivo | Formato PDF, JPG, PNG |        -    |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Adicionar |  Registro de Falhas (tabela abaixo) | Dinâmico   |
| Guardar Dados  |  Salvar manutenção (provável redirecionamento ou feedback visual) | Submit  |




