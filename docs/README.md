# TITULO DO PROJETO


**Nome completo do Aluno 1, email do aluno 1**

**Nome completo do Aluno 2, email do aluno 2**

**Nome completo do Aluno 3, email do aluno 3**

**Nome completo do Aluno 4, email do aluno 4**

**Nome completo do Aluno 5, email do aluno 5**

**Nome completo do Aluno 6, email do aluno 6**

---

Professores:

** Prof. Nome do Prof 1 **

** Prof. Nome do Prof 2 **

** Prof. Nome do Prof 3 **

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. Escrever aqui o resumo. O resumo deve contextualizar rapidamente o trabalho, descrever seu objetivo e, ao final, 
mostrar algum resultado relevante do trabalho (até 10 linhas)._

---


## 1. Introdução

- Nesse projeto apresentaremos uma solução web somada a aprimoração dos processos voltados para a gestão de uma empresa IOT que realiza a manufatura e manutenção de sensores de segurança em campo.

### 1.1 Contextualização

- A SensorFix atua no ramo de IOT como uma terceira que presta serviço para empresas que atuam na gestão da segurança de galpões empregando sensores que, instalados em um equipamento que oferecem risco a segurança em caso de operação, emitem sinais sonoros e luminosos buscando evitar colisões ou danos físicos a outros colaboradores ou estruturas. Uma vez que os equipamentos estão em campo, em caso de danos ou necessidade de manutenção a nível de mau funcionamento ou troca, como também a necessidade de produção de equipamentos novos, a SensorFix atuará realizando a avaliação primária do equipamento, catalogando seu dano, movimentando o mesmo para o deposito de origem para que volte para produção e posteriormente envio. Em caso de equipamentos novos, faremos toda a busca de insumos no estoque e a produção entregará o equipamento finalizado.

### 1.2 Problema

- Hoje os equipamentos de segurança em campo apresentam tecnologias em hardware e firmware muito desenvolvidas, com isso atribuindo a estes equipamentos um alto valor de custo e também o emprego de peças e componentes elétricos delicados e complexos.  
- Atualmente tendo em vista seu alto valor de mercado, não se observa uma gestão de ponta a ponta nos processos de produção, faturamento, estocagem, gestão de depósitos e envios como também não apresentam uma logística eficaz no que tangem a reutilização dos equipamentos que retornam de campo tendo em vista que a prática de reuso e recuperação dos dispositivos de retorno seriam fonte de lucro e indicadores importantes. 

### 1.3 Objetivo geral

- Desenvolver uma solução web para otimizar a gestão de manufatura e manutenção de sensores de segurança, garantindo um controle eficiente sobre os processos de produção, estocagem, envio e reutilização dos equipamentos, melhorando a rastreabilidade e a eficiência logística da empresa. 

#### 1.3.1 Objetivos específicos

- Integrar um sistema de controle de estoque para monitoramento dos insumos necessários para a produção e manutenção dos sensores e que também notifique quando insumos chegarem em estoque mínimo, tendo em vista prazos de solicitação, importação e envio. 

- Desenvolver o controle de depósitos para que os equipamentos sejam movimentados para cada deposito e tenhamos controle melhor do estado real em que cada um se encontra. Depósitos de ativação (quando estiver com o cliente), manutenção (assim que retornar do cliente ele será direcionado para tal), adquiridos (equipamentos novos ou que saíram de manutenção e foram para produção) e danificados (equipamentos que saíram do depósito de manutenção e aguardam descarte ou reaproveitamento de peça). 

- Implementar um ambiente de análise dos equipamentos que chegam de retorno do cliente. Esse ambiente permitirá que o usuário faça análise primária do equipamento e registre qual o dano principal, danos secundários e sua necessidade de manutenção. Com isso movimentará o equipamento para o deposito correto juntamente com a orientação.

### 1.4 Justificativas

- O trabalho se faz muito útil no momento em que temos o emprego de um estoque com uma diversidade grande de insumos. No contexto de dispositivos eletrônicos IOT, os mesmos apresentam circuitos que empregam componentes pequenos e com especificações técnicas características. Portanto é necessário que a gestão do estoque de insumos para produção e manutenção seja bem desenvolvida em função da dificuldade de controlar previsão e demanda de toda produção. Vale ressaltar as consequências da quebra desse processo como a possibilidade de cancelamento de envios ao cliente devido à falta de algum insumo da demanda solicitada. 
 
- Se faz muito válido a criação de depósitos para alocação dos equipamentos produzidos e os que retornam de campo. Com isso teremos uma noção maior da quantidade de equipamentos que estão em cada etapa do processo geral, absorvendo indicadores importantes como a necessidade de manter o número de equipamentos do deposito de manutenção e adquiridos maior que o número de equipamentos no deposito de danificados. A divisão da frota de equipamentos de maneira modular permite a noção maior de identificação de problemas nos equipamentos em sí como também falhas no processo. 

- O ambiente de análise de equipamentos de retorno empregará o registro no sistema somado a avaliação física do equipamento. Neste momento saberemos o porquê exato o equipamento retornou do cliente, além do depoimento do mesmo em função da solicitação da troca. A análise contará com a catalogação do que o equipamento em função de seu dano, teremos a padronização do campo de danos onde o usuário selecionará qual o problema, a ideia é usar caixas de seleção do problema principal e um campo de detalhamento se for o caso, para que futuramente seja possível aplicar filtros e obter indicadores para investigarmos por exemplo qual o problema principal de equipamentos que retornam de campo. 

## 2. Participantes do processo

- Os participantes do processo em nosso sistema web são os principais usuários do sistema, cada um com um perfil específico que determina sua função dentro da solução. Cada usuário desempenha um papel essencial, acessando informações relevantes e realizando tarefas que garantem o funcionamento eficiente do sistema (o que cada um faz, quais funcionalidades precisa acessar, quais informações precisa registrar). 

- Para definir esses perfis, podemos responder às seguintes perguntas: 
  - Quais são as responsabilidades de cada usuário no sistema? 

  - Que tipo de informações cada usuário precisa acessar e registrar? 

  - De que forma o sistema pode facilitar suas atividades diárias? 

- Inicialmente identificamos 6 participantes sendo eles: 

  - Gestor de Manufatura e Manutenção 

  - Técnico de Manutenção 

  - Operador de Estoque 

  - Gestor de Logística 

  - Cliente/Empresa Contratante 

  - Equipe de TI e Desenvolvedores do Sistema

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

_Apresente uma descrição textual de como os sistemas atuais resolvem o problema que se propõe a resolver.  Caso sua proposta seja inovadora e não existam processos claramente definidos, **apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente**, mesmo que não se utilize tecnologia computacional._

### 3.2. Descrição geral da proposta de solução

_Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias._

### 3.3. Modelagem dos processos

[PROCESSO 1 - Nome do Processo](processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Nome do Processo](processo-2-nome-do-processo.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Nome do Processo](processo-3-nome-do-processo.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Nome do Processo](processo-4-nome-do-processo.md "Detalhamento do Processo 4.")

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

_Apresente aqui a conclusão do seu trabalho. Deve ser apresentada aqui uma discussão dos resultados obtidos no trabalho, local em que se verifica as observações pessoais de cada aluno. Essa seção poderá também apresentar sugestões de novas linhas de estudo._

# REFERÊNCIAS

_Como um projeto de software não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

_Verifique no link abaixo como devem ser as referências no padrão ABNT:_

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






