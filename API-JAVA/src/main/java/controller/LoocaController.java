package controller;

import Models.DataBaseModel;
import Models.LoocaMoodel;
import controller.utils.Conversor;
import java.util.Timer;
import java.util.TimerTask;

public class LoocaController {

    private final LoocaMoodel looca = new LoocaMoodel();
    private final DataBaseModel db = new DataBaseModel();
    private SlackController slack = new SlackController();
    private int fkMaquina;
    Timer timer = new Timer();
    private final TimerTask task = new TimerTask() {
        @Override
        public void run() {
            System.out.println("pegando infos...");
            looca.setPcInfo();
            looca.setStaticPcInfo();
            String query = String.format(
                    "INSERT INTO status_maquina "
                    + "(uso_processador,temperatura_cpu,uso_disco,uso_ram,status_web,fk_maquina) "
                    + "values (%s,'%s',%s,%d,%d)",
                    looca.getUsoProcessador(),
                    looca.getTemperaturaCpu(),
                    looca.getUsoDissco(),
                    looca.getUsoRam(),
                    insertStatusPc(
                        looca.getValueOfUsoProcessador(),
                        looca.getUsoRam(),
                        looca.getTotalRam()
                    ),
                    fkMaquina
            );
            try {
                slack.sendingMessageSlack(
                        looca.getValueOfUsoProcessador(),
                        looca.getUsoRam(),
                        looca.getTotalRam(),
                        looca.getUsoDissco(),
                        looca.getTotalDisco()
                );
                
            } catch (Exception e) {
                System.out.println(e);
            }
            System.out.println(query);
            db.initializer();
            db.makeQueryWithoutReturn(query);
            System.out.println("inseriu");
        }
    };

    public void setStaticPcInfo() {
        looca.setStaticPcInfo();
        String query = (String.format("update [dbo].[maquina] set ram = %d, tamanho_disco = %d, checada = 1 where id_maquina = %d", looca.getTotalRam(), looca.getTotalDisco(), fkMaquina));
        db.initializer();
        db.makeQueryWithoutReturn(query);
    }

    public void insertInSeconds(int seconds) {
        timer.schedule(task, 0, seconds * 1000L);
    }

    public void setFkMaquina(int fkMaquina) {
        this.fkMaquina = fkMaquina;
    }

    public String insertStatusPc(
        Double usoProcessador, 
        Long usoMemoria,
        Long totalMemoria
    ) {
        Double memoria = Conversor.longToDouble(usoMemoria);
        Double memoriaTotal = Conversor.longToDouble(totalMemoria);
        Double porcentagemMemoria = memoria * (memoriaTotal / 100.0);
        String status;

        if ((porcentagemMemoria <= 50.0) && ( usoProcessador <= 50.0)) {
            status = "'Normal'";
            return status;
        } else if ((porcentagemMemoria < 71.0) && (usoProcessador < 71.0)) {
            status = "'Moderado'";
            return status;
        } else if ((porcentagemMemoria < 81.0) || (usoProcessador < 81.0)) {
            status = "'Perigo'";
            return status;
        } else if (porcentagemMemoria >= 81.0 || usoProcessador >= 81.0) {
            status = "'Crí­tico'";
            return status;
        }
        
        return "Status com Erro";
    }

    public void setSlack(SlackController slack) {
        this.slack = slack;
    }
}