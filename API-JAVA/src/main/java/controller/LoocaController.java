package controller;

import Models.DataBaseModel;
import Models.LoocaMoodel;

import java.util.Timer;
import java.util.TimerTask;

public class LoocaController {

    private final  LoocaMoodel looca = new LoocaMoodel();
   private final DataBaseModel db = new DataBaseModel();
    private Integer fkMaquina;
    Timer timer = new Timer();
    Timer delay = new Timer();
    private TimerTask task = new TimerTask() {
        @Override
        public void run() {


                 System.out.println("pegando infos...");
                 looca.setPcInfo();
             String query = String.format("INSERT INTO status_maquina " +
                             "(uso_processador,temperatura_cpu,nome_disco,uso_disco,fk_maquina) " +
                             "values (%s,'%s','%s',%s,7000)",
                     looca.getUsoProcessador(),
                     looca.getTemperaturaCpu(),
                     looca.getNomeDIsco(),
                     looca.getUsoDissco());
            System.out.println(query);
             db.makeQuery(query);


        }
   };
    public void insertInSeconds(int seconds){
        timer.schedule(task,0,seconds*1000);
    }





    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
}
