package Models;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscosGroup;

import java.util.List;

public class LoocaMoodel {
    final Looca looca = new Looca();
    final DataBaseModel db = new DataBaseModel();
    private Double valueOfUsoProcessador;
    private String usoProcessador;
    private String temperaturaCpu;
    private Long usoDissco;
    private Long usoRam;
    private Long totalDisco;
    private Long totalRam;
    public void setPcInfo() {
        valueOfUsoProcessador = looca.getProcessador().getUso().doubleValue();
        usoProcessador = valueOfUsoProcessador.toString();
        usoProcessador = usoProcessador.replace(",","");
            temperaturaCpu = looca.getTemperatura().toString();
            DiscosGroup grupo = looca.getGrupoDeDiscos();
            List<Disco> discos = grupo.getDiscos();
            for (Disco disco : discos) {
                usoDissco = disco.getTamanhoAtualDaFila();

            }
            usoRam = looca.getMemoria().getEmUso();

    }
    public void setStaticPcInfo(){
        DiscosGroup grupo = looca.getGrupoDeDiscos();
        Long somaTotalDiscos = 0L;
        List<Disco> discos = grupo.getDiscos();
        for (Disco disco : discos) {
            somaTotalDiscos += disco.getTamanho();
        }
        totalDisco = somaTotalDiscos;
        totalRam = looca.getMemoria().getTotal();
    }

    public Double getValueOfUsoProcessador() {
        return valueOfUsoProcessador;
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

    public Long getUsoRam() {
        return usoRam;
    }

    public Long getTotalDisco() {
        return totalDisco;
    }

    public Long getTotalRam() {
        return totalRam;
    }


}


