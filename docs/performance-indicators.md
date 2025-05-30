## 5. Indicadores de desempenho

| **Indicador**                                 | **Objetivo**                                                     | **Descrição**                                                                                                                  | **Fonte de Dados**                | **Fórmula de Cálculo**                                                     |
| --------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------- |
| **Defeitos Recorrentes**                      | Identificar os tipos de falhas mais comuns em equipamentos       | Exibe os defeitos mais frequentemente registrados nas manutenções, permitindo ações corretivas e preventivas                   | Tabela de Manutenções             | `GROUP BY defeito ORDER BY COUNT(*) DESC LIMIT 10`                         |
| **Taxa de Acurácia de Estoque**               | Avaliar a precisão dos registros de inventário                   | Compara os dados registrados no sistema com o estoque físico, apontando a confiabilidade do controle de insumos e equipamentos | Tabelas de Insumos e Equipamentos | `(Número de itens com estoque correto / Total de itens verificados) × 100` |
| **Tempo Médio de Produção por Demanda**       | Medir a eficiência do processo produtivo                         | Calcula o tempo médio entre o início e a finalização das demandas atendidas pela equipe de produção                            | Tabela de Demandas                | `Soma dos tempos das demandas / Número total de demandas concluídas`       |
| **Distribuição de Equipamentos por Depósito** | Obter uma visão macro da alocação dos equipamentos nos depósitos | Exibe a quantidade de equipamentos por local, permitindo identificar unidades em manutenção, danificadas ou aguardando uso. Com isso podemos criar questionamento com base na análise de equipamentos disponivies e outros danificados.     | Tabela de Estoque / Depósitos     | `Soma dos equipamentos por depósito (valor bruto)`                         |

 


