package controller;

import Models.DataBaseModel;
import Models.LoocaMoodel;
import Models.SlackModel;
import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;
import org.json.JSONObject;

public class LoocaController {

    private final  LoocaMoodel looca = new LoocaMoodel();
    private final DataBaseModel db = new DataBaseModel();
    private final SlackModel slack = new SlackModel();
    JSONObject json = new JSONObject();
    private int fkMaquina;
    Timer timer = new Timer();
    private final TimerTask task = new TimerTask() {
        @Override
        public void run() {
                 System.out.println("pegando infos...");
                 looca.setPcInfo();
             String query = String.format("INSERT INTO status_maquina " +
                             "(uso_processador,temperatura_cpu,uso_disco,uso_ram,fk_maquina) " +
                             "values (%s,'%s',%s,%d,%d)",
                     looca.getUsoProcessador(),
                     looca.getTemperaturaCpu(),
                     looca.getUsoDissco(),
                     looca.getUsoRam(),fkMaquina);
              System.out.println(query);     
             db.initializer();
             db.makeQueryWithoutReturn(query);
            System.out.println("inseriu");
        }
   };

    public void setStaticPcInfo(){
        looca.setStaticPcInfo();
        String query = (String.format("update [dbo].[maquina] set ram = %d, tamanho_disco = %d, checada = 1 where id_maquina = %d", looca.getTotalRam(),looca.getTotalDisco(),fkMaquina));
        db.initializer();
        db.makeQueryWithoutReturn(query);
    }
    public void insertInSeconds(int seconds){
        timer.schedule(task,0,seconds* 1000L);
    }

    public void setFkMaquina(int fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
    
    public void sendingMessageSlack() throws IOException, InterruptedException {
        slack.initializer();
        json.put("text", "Bot em testes :)");
        SlackModel.sendMessage(json);
    }

}
