package Models;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscosGroup;
import com.github.britooo.looca.api.group.temperatura.Temperatura;

import java.util.List;

public class LoocaMoodel {
    final Looca looca = new Looca();
    final DataBaseModel db = new DataBaseModel();
    private Double usoProcessador;
    private String temperaturaCpu;
    private Long usoDissco;
    private String nomeDIsco;
    public void setPcInfo() {
        synchronized (this) {
            usoProcessador = looca.getProcessador().getUso();
            temperaturaCpu = looca.getTemperatura().toString();
            DiscosGroup grupo = looca.getGrupoDeDiscos();
            List<Disco> discos = grupo.getDiscos();
            for (Disco disco : discos) {
                usoDissco = disco.getTamanhoAtualDaFila();
                nomeDIsco = disco.getNome();

            }
            notify();
        }
    }


    public String getNomeDIsco() {
        return nomeDIsco;
    }

    public Double getUsoProcessador() {
        return usoProcessador;
    }

    public String getTemperaturaCpu() {
        return temperaturaCpu;
    }

    public Long getUsoDissco() {
        return usoDissco;
    }
}
