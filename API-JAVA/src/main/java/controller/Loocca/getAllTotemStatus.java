
package controller.Loocca;
import Models.Locca.*;
import Models.Locca.ModelDisco;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscosGroup;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import static java.lang.System.in;
import java.util.List;

public class getAllTotemStatus {
   private final ModelCpu cpu = new ModelCpu();
   private final ModelDisco disco = new ModelDisco();
   private final modelMemoria memoria = new modelMemoria();
   private final Looca looca = new Looca();
  private  void setCPUinfo(){
      Processador proc = looca.getProcessador();
      cpu.setUso(proc.getUso());
      cpu.setFrequencia(proc.getFrequencia());
     
  }
  private void setMemoriaInfo(){
    Memoria mem = looca.getMemoria();
    memoria.setUso(mem.getEmUso());
  }
  private void setDiscoInfo(){
     DiscosGroup grupoDeDiscos = looca.getGrupoDeDiscos();
     List<Disco> discos = grupoDeDiscos.getDiscos();
     for(Disco disco :discos){
         this.disco.setNome(disco.getNome());
         this.disco.setUso(disco.getBytesDeEscritas());
     }
  }
          
  }
}