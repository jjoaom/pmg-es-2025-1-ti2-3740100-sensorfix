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

_Descreva aqui cada uma das propriedades das atividades do processo 4. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente._

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

**Identificação do Equipamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
| **ID do equipamento**  |  Número   | Obrigatório    |    -               |
| **Número de série**    | Caixa de Texto   | Alfanumérico, obrigatório |                |
| **Imagem do equipamento**          | Imagem   | Opções: Sim/Não |           |
| **Equipamento já teve retorno antes?**  |  Seleção única   | Opções: Sim/Não    |    -               |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel  ) |
| ***Próximo***       |    Identificação do Problema    | default            |


**Identificação do Problema**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Componente danificado | Caixa de texto  | Obrigatório  |                   |
| Detalhamento do problema | Área de texto | Mínimo 10 caracteres |                   |
| Necessário detalhamento adicional? | Seleção única | Opções Sim/Não |                   |
| Registro de falhas recorrentes | Seleção múltipla | Listagem de falhas comuns |            |
| Evidência do problema | Arquivo | Formato PDF, JPG, PNG |            |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
| Próximo              |  Encaminhamento para Manutenção | default                  |
| Voltar  |  Encaminhamento para Manutenção | default                  |


**Encaminhamento para Manutenção**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Data de encaminhamento | Data e hora  | Automático  |  Data/Hora atual  |
| Técnico responsável | Seleção única | Lista de técnicos cadastrados |    -               |
| Depósito de destino | Seleção única | Lista de depósitos cadastrados | -                  |
| Registro de falhas recorrentes | Seleção múltipla | Listagem de falhas comuns |            |
| Evidência do problema | Arquivo | Formato PDF, JPG, PNG |            |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
| Finalizar |  Fim do Processo | default                |
| Voltar  |  Identificação do Problema | cancel    |




