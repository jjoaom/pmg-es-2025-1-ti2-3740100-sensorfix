## **Processo 3 – Movimentação de Depósitos**  

### **Descrição das Atividades** 

O fluxo descreve a movimentação dos sensores em diferentes estados: Ativo, Ativação, Estoque, Manutenção e Danificado.
Cada atividade do processo tem seus campos e comandos definidos abaixo.

![image](https://github.com/user-attachments/assets/0da4901b-e4be-4384-aa69-efbc073cde1f)

Detalhamento das atividades: 



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




