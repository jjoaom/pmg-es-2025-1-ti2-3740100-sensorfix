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

![tela manutenção](https://github.com/user-attachments/assets/44ad6e8a-aa11-42bf-b1e8-8cd701d27739)


**Identificação do Equipamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| **ID do equipamento**  |  Número   | Obrigatório    |    -               |
| **Número de série**    | Caixa de Texto   | Alfanumérico, obrigatório |          -      |
| **Imagem do equipamento**          | Imagem   | Formato PDF, JPG, PNG |    -       |
| **Equipamento já teve retorno antes?**  |  Seleção única   | Opções: Sim/Não    |    -               |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| ***Próximo***       |    Identificação do Problema    | default            |


**Identificação do Problema**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Componente danificado | Caixa de texto  | Obrigatório  |          -         |
| Detalhamento do problema | Área de texto | Mínimo 10 caracteres |       -            |
| Necessário detalhamento adicional? | Seleção única | Opções Sim/Não |          -         |
| Registro de falhas recorrentes | Seleção múltipla | Listagem de falhas comuns |     -       |
| Evidência do problema | Arquivo | Formato PDF, JPG, PNG |      -      |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Próximo              |  Encaminhamento para Manutenção | default                  |
| Voltar  |  Encaminhamento para Manutenção | default                  |


**Encaminhamento para Manutenção**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Data de encaminhamento | Data e hora  | Automático  |  Data/Hora atual  |
| Técnico responsável | Seleção única | Lista de técnicos cadastrados |    -               |
| Depósito de destino | Seleção única | Lista de depósitos cadastrados | -                  |
| Registro de falhas recorrentes | Seleção múltipla | Listagem de falhas comuns |      -      |
| Evidência do problema | Arquivo | Formato PDF, JPG, PNG |        -    |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Finalizar |  Fim do Processo | default                |
| Voltar  |  Identificação do Problema | cancel    |




