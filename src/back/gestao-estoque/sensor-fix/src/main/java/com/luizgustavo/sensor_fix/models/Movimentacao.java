    package com.luizgustavo.sensor_fix.models;

    import javax.persistence.Column;
    import javax.persistence.Entity;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;
    import javax.persistence.JoinColumn;
    import javax.persistence.ManyToOne;
    import javax.persistence.Table;
    import java.time.LocalDateTime;


    @Entity
    @Table(name = Movimentacao.TABLE_NAME)

    public class Movimentacao {
        public static final String TABLE_NAME = "movimentacoes";

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id", unique = true)
        private Long id;

        @Column(name = "dep_origem", nullable = false)
        private int origem; 

        @Column(name = "dep_destino", nullable = false)
        private int destino;

        @Column(name = "data_movimentacao", nullable = false)
        private LocalDateTime dataMovimentacao;

        

        @ManyToOne
        @JoinColumn(name = "equipamento_id", nullable = false)
        private Equipamento equipamento;

        @Column(name = "quantidade", nullable = false)
        private int quantidade;
        
        // Getters e Setters (recomendado gerar)

        public int getQuantidade() {
        return this.quantidade;
        }

        public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public int getOrigem() {
            return origem;
        }

        public void setOrigem(int origem) {
            this.origem = origem;
        }

        public int getDestino() {
            return destino;
        }

        public void setDestino(int destino) {
            this.destino = destino;
        }

        public LocalDateTime getDataMovimentacao() {
            return dataMovimentacao;
        }

        public void setDataMovimentacao(LocalDateTime dataMovimentacao) {
            this.dataMovimentacao = dataMovimentacao;
        }

        public Equipamento getEquipamento() {
            return equipamento;
        }

        public void setEquipamento(Equipamento equipamento) {
            this.equipamento = equipamento;
        }
    }
