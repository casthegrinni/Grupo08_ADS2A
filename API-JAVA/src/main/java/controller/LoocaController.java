package controller;

import Models.DataBaseModel;
import Models.LoocaMoodel;

import java.util.Timer;
import java.util.TimerTask;

public class LoocaController {
    private final  LoocaMoodel looca = new LoocaMoodel();
   private final DataBaseModel db = new DataBaseModel();
    private Integer fkMaquina;
    private long delay = 10000;
    Timer timer = new Timer();
    private TimerTask task = new TimerTask() {
        @Override
        public void run() {

        }
   };




    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
}
