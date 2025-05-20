## 5. Indicadores de desempenho

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Defeitos recorrentes | Identificar causas comuns de falha nos equipamentos |Lista os defeitos mais registrados em manutenções de equipamentos | Tabela Manutenções | GROUP BY defeito ORDER BY COUNT(*) DESC LIMIT 10 |
| Taxa de acurácia de estoque | Verificar a confiabilidade do sistema de inventário| Compara o estoque físico com o registrado no sistema | Tabela de Insumos/Equipamentos | (nº de itens com estoque correto / total de itens verificados) × 100 |
| Tempo médio de produção de uma demanda | Medir a eficiência da equipe de prdução | Calcula o tempo médio entre início e fim de uma demanda realizada | Tabela de Demanda | Soma dos tempos de demandas / nº de demandas realizadas
 |


