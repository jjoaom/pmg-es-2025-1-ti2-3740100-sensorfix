# SENSORFIX




**Caio Gabriel de Lima Leal, 1498306@sga.pucminas.br**

**Erick Guedes de Carvalho, 1450737@sga.pucminas.br**

**Ian Nycolas Fernandes Costa, 1494000@sga.pucminas.br**

**João Marcos de Aquino Gonçalves, 1336608@sga.pucminas.br**

**João Vitor Tolentino, joaovitornll@gmail.com**

**Luiz Gustavo Fagundes Teixeira, 1254357@sga.pucminas.br**


---

Professores:


**Danilo De Quadros Maia Filho**

**Joana Gabriela Ribeiro de Souza**

**Michelle Hanne Soares De Andrade**

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. Escrever aqui o resumo. O resumo deve contextualizar rapidamente o trabalho, descrever seu objetivo e, ao final, 
mostrar algum resultado relevante do trabalho (até 10 linhas)._

---


## 1. Introdução
 - Equipamentos IoT (Internet das Coisas) são dispositivos conectados à internet que coletam, processam e transmitem dados automaticamente. Eles podem incluir sensores, câmeras, eletrodomésticos inteligentes, dispositivos industriais e equipamentos médicos, permitindo automação, monitoramento remoto e tomada de decisões baseada em dados em diversos setores.

- A Internet das Coisas (IoT) tem se destacado como um componente vital na transformação digital do Brasil, impulsionando avanços em diversos setores, como agricultura, saúde e manufatura. Estudos indicam que o mercado brasileiro de IoT movimenta aproximadamente R$ 8,5 bilhões anualmente, refletindo um crescimento significativo e contínuo. Além disso, a América do Sul, com o Brasil à frente, é a terceira maior região no mercado global de IoT, projetando um crescimento anual composto (CAGR) de 24,3% até 2030. Esse cenário evidencia a crescente importância da IoT no desenvolvimento econômico e tecnológico do país. 

- Nesse projeto apresentaremos a SensorFix uma solução web somada a aprimoração dos processos voltados para a gestão de uma empresa IOT que realiza a manufatura e manutenção de sensores de segurança em campo.  

- Atualmente, empresas que utilizam ou comercializam equipamentos eletrônicos com tecnologia IoT enfrentam carência de técnicas logísticas que otimizem seus processos. Para aumentar a lucratividade e reduzir o descarte desnecessário de componentes reutilizáveis, essas empresas buscam cada vez mais o reuso de tecnologias e estruturas de hardware. No entanto, esse objetivo apresenta desafios, como a estocagem eficiente dos equipamentos em manutenção, a classificação precisa dos dispositivos danificados para agilizar a identificação e resolução de problemas, além do controle detalhado do fluxo dos equipamentos ao longo do processo. O uso de depósitos fictícios permite um melhor rastreamento, possibilitando a coleta de indicadores que aprimoram a eficiência operacional, reduzindo o tempo de resposta e facilitando a identificação de falhas. Esses obstáculos ressaltam a necessidade de investimentos em infraestrutura tecnológica e parcerias estratégicas para superar as barreiras existentes e promover o crescimento sustentável do setor de IoT no país.

 

- A SensorFix apresenta uma solução web inovadora voltada para os processos logísticos de empresas que desenvolvem e distribuem soluções IoT para clientes em escala mundial. Nossa plataforma aprimora a gestão de estocagem, a classificação de equipamentos destinados à manutenção e o controle de depósitos onde os dispositivos estão localizados, além de oferecer outras ferramentas para agilizar a logística. Atualmente, somos uma empresa terceirizada que absorve a tecnologia de nossos clientes e se empenha em garantir o controle de qualidade e a manutenção dos equipamentos IoT. Estamos fortemente presentes no setor de manutenção de sensores de segurança para ambientes industriais e galpões.

### 1.1 Contextualização

- A SensorFix atua no setor de IoT como uma empresa terceirizada que presta serviços para companhias focadas na gestão da segurança de galpões. Empregamos sensores instalados em equipamentos que oferecem risco à segurança durante a operação, emitindo sinais sonoros e luminosos para evitar colisões ou danos físicos a colaboradores e estruturas. Uma vez que os equipamentos estão em campo, em caso de danos, necessidade de manutenção devido a mau funcionamento ou reposição, bem como na fabricação de novos dispositivos, a SensorFix realiza a avaliação primária do equipamento, cataloga seu dano e movimenta-o para o depósito de origem, permitindo seu retorno à produção e posterior envio. No caso de novos equipamentos, gerenciamos a busca de insumos no estoque e acompanhamos a produção até a entrega do equipamento finalizado.

### 1.2 Problema

- Hoje os equipamentos de segurança em campo apresentam tecnologias em hardware e firmware muito desenvolvidas, com isso atribuindo a estes equipamentos um alto valor de custo e também o emprego de peças e componentes elétricos delicados e complexos.  
- Atualmente tendo em vista seu alto valor de mercado, não se observa uma gestão de ponta a ponta nos processos de produção, faturamento, estocagem, gestão de depósitos e envios como também não apresentam uma logística eficaz no que tangem a reutilização dos equipamentos que retornam de campo tendo em vista que a prática de reuso e recuperação dos dispositivos de retorno seriam fonte de lucro e indicadores importantes. 

### 1.3 Objetivo geral

- Desenvolver uma solução web para otimizar a gestão de manufatura e manutenção de sensores de segurança, garantindo um controle eficiente sobre os processos de produção, estocagem, envio e reutilização dos equipamentos, melhorando a rastreabilidade e a eficiência logística da empresa. 

#### 1.3.1 Objetivos específicos
##### 1.3.1.1 Controle de estoque
- Integrar um sistema de controle de estoque para monitoramento dos insumos necessários para a produção e manutenção dos sensores e que também notifique quando insumos chegarem em estoque mínimo, tendo em vista prazos de solicitação, importação e envio. 
##### 1.3.1.2 Movimentação de depositos
- Desenvolver o controle de depósitos para que os equipamentos sejam movimentados para cada deposito e tenhamos controle melhor do estado real em que cada um se encontra. Depósitos de ativação (quando estiver com o cliente), manutenção (assim que retornar do cliente ele será direcionado para tal), adquiridos (equipamentos novos ou que saíram de manutenção e foram para produção) e danificados (equipamentos que saíram do depósito de manutenção e aguardam descarte ou reaproveitamento de peça). 
##### 1.3.1.3 Manutenção de ponta a ponta
- Implementar um ambiente de análise dos equipamentos que chegam de retorno do cliente. Esse ambiente permitirá que o usuário faça análise primária do equipamento e registre qual o dano principal, danos secundários e sua necessidade de manutenção. Com isso movimentará o equipamento para o deposito correto juntamente com a orientação. Com esse resgistro no sistema o time de produção pode atuar de maneira cada vez mais eficaz uma vez que sabendo do problema principal, em caso de alta demanda e necessidade de reuso, podem atacar por exemplo o grupo de equipamentos que tem problemas mais simples de resolver. 

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

- Inicialmente identificamos 3 participantes sendo eles: 
  - Técnico de manutenção
  - Gestor de logísica
  - Administrador Geral

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual
Atualmente, as empresas que atuam no setor de IoT e lidam com sensores de segurança enfrentam desafios significativos na gestão logística e na manutenção dos equipamentos. O processo de gerenciamento desses dispositivos é frequentemente descentralizado, com muitas etapas sendo conduzidas manualmente ou por meio de sistemas desconectados, o que resulta em ineficiências e dificuldades na rastreabilidade dos equipamentos.

Os principais problemas enfrentados incluem:

1. **Falta de controle integrado de estoque:**
   - A gestão dos insumos para produção e manutenção dos sensores é feita sem um monitoramento automatizado, o que pode levar a faltas inesperadas de componentes essenciais ou a desperdícios devido a compras excessivas.
   - Não há um sistema eficiente para prever a demanda e planejar reabastecimentos de forma otimizada.

2. **Gestão ineficaz da movimentação dos equipamentos:**
   - Atualmente, não existe um controle eficiente da movimentação dos sensores entre os diferentes estágios, como ativação (com o cliente), manutenção (retornando do cliente), aquisição (novos ou recuperados) e danificados.
   - A ausência de uma categorização clara dos dispositivos impacta diretamente na velocidade da tomada de decisão sobre reuso, manutenção ou descarte.

3. **Falta de um processo estruturado para manutenção e reuso:**
   - O diagnóstico de falhas é realizado de maneira pouco padronizada, muitas vezes dependendo da experiência individual do técnico e sem um sistema que registre e categorize os danos de maneira sistemática.
   - O reuso de componentes é dificultado pela falta de dados históricos sobre os equipamentos e a ausência de uma metodologia clara para identificar quais peças podem ser reaproveitadas.

4. **Dificuldade na rastreabilidade e análise de indicadores:**
   - A falta de um sistema integrado impossibilita o monitoramento detalhado dos equipamentos ao longo de seu ciclo de vida, dificultando a obtenção de indicadores sobre taxas de falha, tempo médio de manutenção e taxa de reaproveitamento de componentes.
   - Sem esses dados, torna-se difícil otimizar processos e implementar melhorias contínuas na gestão dos sensores.

### Comparação com o modelo proposto

Diante dessas dificuldades, a SensorFix surge como uma solução inovadora ao oferecer uma plataforma web integrada que otimiza a gestão da manufatura e manutenção de sensores de segurança. A proposta inclui funcionalidades como:

- **Controle automatizado de estoque** com alertas para níveis críticos de insumos.
- **Gestão centralizada da movimentação dos equipamentos** entre diferentes depósitos.
- **Sistema de análise padronizada de equipamentos retornados**, permitindo diagnósticos mais rápidos e precisos.
- **Rastreamento detalhado dos sensores** e coleta de indicadores para melhoria contínua dos processos.

Com essa abordagem, a SensorFix não apenas resolve os problemas enfrentados atualmente, mas também proporciona maior eficiência operacional e redução de custos para as empresas do setor de IoT.

### **3.2. Descrição Geral da Proposta de Solução**  

A **SensorFix** é uma plataforma web que tem como objetivo otimizar a gestão logística e a manutenção de sensores de segurança no setor de IoT. A solução busca resolver a qualidade de operação, oferecendo uma abordagem centralizada e automatizada para o controle de estoque, rastreamento de equipamentos e análise de indicadores operacionais.

A proposta da SensorFix se concentra na digitalização e automação dos processos relacionados à manufatura, movimentação e manutenção de sensores e equipamentos eletrônicos. 

#### Objetivos do Negócio
- Reduz desperdícios ao oferecer um controle automatizado de estoque, minizando o risco de compras excessivas e a falta de insumos críticos.
- Com um sistema padronizado de diagnóstico, é possível reduzir o tempo médio de reparo e melhorar o reaproveitamento de componentes.
- O monitoramento detalhado do ciclo de vida dos sensores permite identificar padrões de falhas e prever demandas futuras.
- Centralização dos dados operacionais, visando facilitar a análise de indicadores-chave, possibilitando ajustes estratégicos em tempo real.
- A plataforma facilita a identificação e categorização de falhas e defeitos, direcionando o reparo para a equipe técnica responsável.
- A plataforma oferece ferramentas a gestão, mas não interfere diretamente na logística física de transporte. 
- 
#### Oportunidade de Melhoria
A implementação da SensorFix abre espaço para diversas melhorias nos processos das empresas, incluindo:

- **Automação de processos manuais**
- **Aprimoramento da análise preditiva**
- **Integração futura com IoT e Machine Learning**
- **Expansão para outros setores**
Com essa proposta, a SensorFix se posiciona como uma solução moderna e estratégica para empresas do setor de IoT, promovendo agilidade, eficiência, inovação e sustentabilidade na gestão de sensores e reparos técnicos.
#### Limites do Negócio 
- A SensorFix oferece ferramentas para otimizar a gestão, mas não interfere diretamente na logística física de transporte dos sensores 
- A compatibilidade com softwares já utilizados pelas empresas dependerá da viabilidade técnica e das necessidades específicas de cada cliente.

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






