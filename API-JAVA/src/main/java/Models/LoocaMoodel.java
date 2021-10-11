package Models;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscosGroup;
import com.github.britooo.looca.api.group.temperatura.Temperatura;

import java.util.List;

public class LoocaMoodel {
    final Looca looca = new Looca();
    final DataBaseModel db = new DataBaseModel();
    private Double valueOfUsoProcessador;
    private String usoProcessador;
    private String temperaturaCpu;
    private Long usoDissco;
    private String nomeDIsco;
    public void setPcInfo() {

        valueOfUsoProcessador = looca.getProcessador().getUso().doubleValue();
        usoProcessador = valueOfUsoProcessador.toString();
        usoProcessador = usoProcessador.replace(",","");
            temperaturaCpu = looca.getTemperatura().toString();
            DiscosGroup grupo = looca.getGrupoDeDiscos();
            List<Disco> discos = grupo.getDiscos();
            for (Disco disco : discos) {
                usoDissco = disco.getTamanhoAtualDaFila();
                nomeDIsco = disco.getNome();

            }

    }


    public String getNomeDIsco() {
        return nomeDIsco;
    }

    public String getUsoProcessador() {
        return usoProcessador;
    }

    public String getTemperaturaCpu() {
        return temperaturaCpu;
    }

    public Long getUsoDissco() {
        return usoDissco;
    }

}


