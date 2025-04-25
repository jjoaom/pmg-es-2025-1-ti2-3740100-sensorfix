## **Processo 3 – Movimentação de Depósitos**  

### **Descrição das Atividades** 

O fluxo descreve a movimentação dos sensores em diferentes estados: Ativo, Ativação, Estoque, Manutenção e Danificado.
Cada atividade do processo tem seus campos e comandos definidos abaixo.


![Movimentação de depósitos](https://github.com/user-attachments/assets/24bb96ef-d437-451e-a9a6-7f901676bec9)




## Protótipo tela Movimentação de depósitos

![image](https://github.com/user-attachments/assets/59779c03-9d89-4f0d-b15d-f5576d9cb12d)

Detalhamento das atividades: 

## Fluxo de Registro e Manutenção de Equipamentos

O processo inicia com o recebimento do equipamento, que deve ser registrado no sistema com todas as informações pertinentes.

Em seguida, o motivo da movimentação deve ser identificado, podendo estar relacionado a um projeto específico ou à necessidade de inspeção técnica. Através desse questionamento que será verificado se equipmaneto será colcoado em Ativo (produto no cliente), Ativação (produto em produção para cliente), estoque (produto pronto para enviar), manutenção (produto que veio do cliente para ser realizada manutenção, desde que não tenha tido perda parcial ou total da placa) e danificado (produto que não é possível realizar manutenção, mas pode ser reaproveitado os componentes).

Se for um projeto, o sistema verifica se o equipamento já está no cliente. Caso esteja, ele é registrado como ativo. Se não estiver, ele é considerado de ativação diretamente no sistema e preparado para envio, garantindo que todas as configurações estejam adequadas ao uso pretendido. Caso não tiver necessidade de enviar para o cliente, ele será mantido no estoque e resgitrado.

No caso de inspeção, um diagnóstico técnico é realizado para avaliar o estado do equipamento. Esse diagnóstico pode incluir testes funcionais, análise de desgaste e verificação de falhas operacionais. Caso seja detectada a necessidade de manutenção, o equipamento passa por uma triagem para definir o tipo de reparo necessário.

Se a manutenção for viável e o equipamento puder ser recuperado, ele pode ser reparado e enviado de volta ao cliente com um laudo técnico detalhado, informando as intervenções realizadas. Caso contrário, se o equipamento for considerado irrecuperável ou obsoleto, ele é registrado como danificado.

Equipamentos danificados são submetidos a uma avaliação criteriosa para verificar a possibilidade de reaproveitamento de componentes. As peças utilizáveis são desmontadas, classificadas e encaminhadas para reutilização em outros equipamentos ou projetos, contribuindo para a redução de desperdício e otimização de recursos. Componentes sem possibilidade de reaproveitamento são destinados à reciclagem ou descarte adequado, conforme as normas ambientais vigentes.

O processo finaliza com a atualização do sistema, garantindo que todas as informações de movimentação estejam devidamente registradas. Esse registro inclui detalhes sobre o status final do equipamento, intervenções realizadas, destino das peças reaproveitadas e quaisquer outras ações tomadas. Esse controle eficiente permite um acompanhamento preciso do ciclo de vida dos equipamentos e contribui para uma gestão otimizada dos ativos.

Os tipos de dados a serem utilizados são:

### **Registrar Movimentação do Equipamento**  

#### **Campos:**  
| Nome do Campo        | Tipo            | Restrições         | Valor Padrão  |
|----------------------|----------------|--------------------|---------------|
| Tipo de Movimentação | Caixa de Seleção | Obrigatório       | -             |
| Cliente             | Caixa de Texto  | Obrigatório       | -             |
| Data da Movimentação | Campo de Data  | Obrigatório       | Data Atual    |

#### **Comandos:**  
| Nome do Botão  | Destino                  | Tipo    |
|---------------|-------------------------|--------|
| Salvar        | Próxima Atividade        | Default |
| Cancelar      | Retorna ao Processo Anterior | Default |

---

### **Produzir Sensor (Ativação)**  

#### **Campos:**  
| Nome do Campo      | Tipo            | Restrições         | Valor Padrão  |
|--------------------|----------------|--------------------|---------------|
| Número do Pedido  | Caixa de Texto  | Obrigatório       | -             |
| Quantidade        | Campo Numérico  | Obrigatório, mínimo 1 | -          |
| Prioridade        | Caixa de Seleção | Baixa, Média, Alta | Média         |

#### **Comandos:**  
| Nome do Botão         | Destino                      | Tipo    |
|----------------------|----------------------------|--------|
| Enviar para Produção | Inicia o Processo de Produção | Default |
| Cancelar             | Retorna ao Processo Anterior | Default |

---

### **Realizar Diagnóstico (Manutenção)**  

#### **Campos:**  
| Nome do Campo       | Tipo            | Restrições         | Valor Padrão  |
|---------------------|----------------|--------------------|---------------|
| Código do Equipamento | Caixa de Texto | Obrigatório       | -             |
| Diagnóstico        | Caixa de Seleção | Reparável, Não Reparável | -   |
| Observações        | Caixa de Texto   | Opcional          | -             |

#### **Comandos:**  
| Nome do Botão          | Destino                                | Tipo    |
|-----------------------|-------------------------------------|--------|
| Enviar para Reparo   | Caso reparável, segue para manutenção | Default |
| Marcar como Danificado | Caso não seja reparável, segue para descarte | Default |

---

### **Separar Componentes Reutilizáveis (Danificado)**  

#### **Campos:**  
| Nome do Campo               | Tipo                    | Restrições         | Valor Padrão  |
|-----------------------------|------------------------|--------------------|---------------|
| Código do Equipamento       | Caixa de Texto        | Obrigatório       | -             |
| Componentes Aproveitáveis   | Caixa de Seleção Múltipla | Obrigatório       | -             |
| Destino dos Componentes     | Caixa de Seleção      | Reuso Interno, Venda, Descarte | - |

#### **Comandos:**  
| Nome do Botão       | Destino                                   | Tipo    |
|--------------------|-----------------------------------------|--------|
| Enviar para Reuso | Caso tenha componentes reutilizáveis   | Default |
| Enviar para Descarte | Caso não tenha peças aproveitáveis | Default |




