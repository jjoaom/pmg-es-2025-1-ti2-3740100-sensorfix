package com.luizgustavo.sensor_fix.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity //quando falo que é uma entidade significa que esse cara sera uma tabela do banco de dados 
@Table (name = Insumo.TABLE_NAME)//nome da tabela
public class Insumo {
   public static final String TABLE_NAME = "insumo"; //variavel para usar o nome da tabela

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY) //fazendo com que o id seja gerado de uma forma automática
   @Column (name = "id",unique = true) // configurando a coluna 
   private Long id;

   @Column(name = "nome",length = 100,nullable = false,unique = true)
   private String nome;

   @Column(name = "peso",precision = 6,scale = 2)
   private float peso;

   @Column(name= "estoqueMin", nullable=false)
   private int estoqueMin;

   @Column(name= "quantidade", nullable=false)
   private int quantidade;

   @Column(name= "endereco", nullable=false,length = 255)
   @NotNull
   @NotEmpty
   private String endereco;

   @Column(name= "deposito", nullable=false)
   @NotNull
   @NotEmpty
   private int deposito;

    public Insumo() {
    }


    public Insumo(Long id, String nome, float peso, int estoqueMin, int quantidade, String endereco, int deposito) {
        this.id = id;
        this.nome = nome;
        this.peso = peso;
        this.estoqueMin = estoqueMin;
        this.quantidade = quantidade;
        this.endereco = endereco;
        this.deposito = deposito;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public float getPeso() {
        return this.peso;
    }

    public void setPeso(float peso) {
        this.peso = peso;
    }

    public int getEstoqueMin() {
        return this.estoqueMin;
    }

    public void setEstoqueMin(int estoqueMin) {
        this.estoqueMin = estoqueMin;
    }

    public int getQuantidade() {
        return this.quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getEndereco() {
        return this.endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public int getDeposito() {
        return this.deposito;
    }

    public void setDeposito(int deposito) {
        this.deposito = deposito;
    }




     @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Insumo insumo = (Insumo) o;
        return id != null && id.equals(insumo.id);
    }

    // hashCode também baseado no id
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    // toString para facilitar logs e debug
    @Override
    public String toString() {
        return "Insumo{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", peso=" + peso +
                ", estoqueMin=" + estoqueMin +
                ", quantidade=" + quantidade +
                ", endereco='" + endereco + '\'' +
                ", deposito=" + deposito +
                '}';
    }

    

}
