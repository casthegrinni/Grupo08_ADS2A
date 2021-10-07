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
         synchronized (looca){
             try {
                 System.out.println("pegando infos...");
                 looca.wait();
             } catch (InterruptedException e) {
                 e.printStackTrace();
             }
             String querry = String.format("INSERT INTO status_maquina " +
                     "(uso_processador,temperatura_cpu,nome_disco,uso_disco,fk_maquina) " +
                     "values (00.00,'AAA','AA' ,1,7000)");
             db.makeQuerry(querry);

         }


        }
   };
    public void insertInSeconds(int seconds){
        timer.schedule(task,seconds);
    }





    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
}
