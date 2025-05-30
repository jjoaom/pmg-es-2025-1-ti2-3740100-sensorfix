import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Manutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String idProduto; 
    private String defeitoEncontrado; 
    private String causaProvavel; 
    private boolean podeSerReparado; 
    private String reparosNecessarios; 
    private boolean encaminhadoParaTimeTecnico; 
    private boolean encaminhadoParaDescarte; 
    private LocalDate dataFinalizacao; 

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getIdProduto() { return idProduto; }
    public void setIdProduto(String idProduto) { this.idProduto = idProduto; }

    public String getDefeitoEncontrado() { return defeitoEncontrado; }
    public void setDefeitoEncontrado(String defeitoEncontrado) { this.defeitoEncontrado = defeitoEncontrado; }

    public String getCausaProvavel() { return causaProvavel; }
    public void setCausaProvavel(String causaProvavel) { this.causaProvavel = causaProvavel; }

    public boolean isPodeSerReparado() { return podeSerReparado; }
    public void setPodeSerReparado(boolean podeSerReparado) { this.podeSerReparado = podeSerReparado; }

    public String getReparosNecessarios() { return reparosNecessarios; }
    public void setReparosNecessarios(String reparosNecessarios) { this.reparosNecessarios = reparosNecessarios; }

    public boolean isEncaminhadoParaTimeTecnico() { return encaminhadoParaTimeTecnico; }
    public void setEncaminhadoParaTimeTecnico(boolean encaminhadoParaTimeTecnico) { this.encaminhadoParaTimeTecnico = encaminhadoParaTimeTecnico; }

    public boolean isEncaminhadoParaDescarte() { return encaminhadoParaDescarte; }
    public void setEncaminhadoParaDescarte(boolean encaminhadoParaDescarte) { this.encaminhadoParaDescarte = encaminhadoParaDescarte; }

    public LocalDate getDataFinalizacao() { return dataFinalizacao; }
    public void setDataFinalizacao(LocalDate dataFinalizacao) { this.dataFinalizacao = dataFinalizacao; }
}