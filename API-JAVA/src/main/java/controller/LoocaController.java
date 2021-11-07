package controller;

import Models.DataBaseModel;
import Models.LoocaMoodel;
import Models.SlackModel;
import controller.utils.Conversor;
import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;
import org.json.JSONObject;

public class LoocaController {

    private final LoocaMoodel looca = new LoocaMoodel();
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
            looca.setStaticPcInfo();
            String query = String.format(
                    "INSERT INTO status_maquina "
                    + "(uso_processador,temperatura_cpu,uso_disco,uso_ram,fk_maquina) "
                    + "values (%s,'%s',%s,%d,%d)",
                    looca.getUsoProcessador(),
                    looca.getTemperaturaCpu(),
                    looca.getUsoDissco(),
                    looca.getUsoRam(),
                    fkMaquina
            );
            try {
                sendingMessageSlack(
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

    public void insertStatusPc(Double usoProcessador, Long usoMemoria, Long totalMemoria, Long usoDisco, Long totalDisco)
            throws IOException, InterruptedException {
        Conversor conversor = new Conversor();
        Double memoria = conversor.longToDouble(usoMemoria);
        Double memoriaTotal = conversor.longToDouble(totalMemoria);
        Double disco = conversor.longToDouble(usoDisco);
        Double discoTotal = conversor.longToDouble(totalDisco);
        Double porcentagemDisco = disco * (discoTotal / 100.0);
        Double porcentagemMemoria = memoria * (memoriaTotal / 100.0);
        String status = "";

        if ((porcentagemDisco >= 0 && porcentagemDisco <= 50.0) && (porcentagemMemoria >= 0 && porcentagemMemoria <= 50.0) && (usoProcessador >= 0 && usoProcessador <= 50.0)) {
            status = "Normal";
            String query = String.format(
                    "INSERT INTO status_maquina "
                    + "(uso_processador,temperatura_cpu,uso_disco,uso_ram,status_web,fk_maquina) "
                    + "values (%s,'%s',%s,%d,%s,%d)",
                    looca.getUsoProcessador(),
                    looca.getTemperaturaCpu(),
                    looca.getUsoDissco(),
                    looca.getUsoRam(),
                    status,
                    fkMaquina
            );
            System.out.println(query);
            db.initializer();
            db.makeQueryWithoutReturn(query);
            System.out.println("inseriu");
        } else if ((porcentagemDisco > 50.0 && porcentagemDisco < 71.0) && (porcentagemMemoria > 50.0 && porcentagemMemoria < 71.0) && (usoProcessador > 50.0 && usoProcessador < 71.0)) {
            status = "Moderado";
            String query = String.format(
                    "INSERT INTO status_maquina "
                    + "(uso_processador,temperatura_cpu,uso_disco,uso_ram,status_web,fk_maquina) "
                    + "values (%s,'%s',%s,%d,%s,%d)",
                    looca.getUsoProcessador(),
                    looca.getTemperaturaCpu(),
                    looca.getUsoDissco(),
                    looca.getUsoRam(),
                    status,
                    fkMaquina
            );
            System.out.println(query);
            db.initializer();
            db.makeQueryWithoutReturn(query);
            System.out.println("inseriu");
        } else if ((porcentagemDisco >= 71.0 && porcentagemDisco < 81.0) || (porcentagemMemoria >= 71.0 && porcentagemMemoria < 81.0) || (usoProcessador >= 71.0 && usoProcessador < 81.0)) {
            status = "Perigo";
            String query = String.format(
                    "INSERT INTO status_maquina "
                    + "(uso_processador,temperatura_cpu,uso_disco,uso_ram,status_web,fk_maquina) "
                    + "values (%s,'%s',%s,%d,%s,%d)",
                    looca.getUsoProcessador(),
                    looca.getTemperaturaCpu(),
                    looca.getUsoDissco(),
                    looca.getUsoRam(),
                    status,
                    fkMaquina
            );
            System.out.println(query);
            db.initializer();
            db.makeQueryWithoutReturn(query);
            System.out.println("inseriu");
        } else if (porcentagemDisco >= 81.0 || porcentagemMemoria >= 81.0 || usoProcessador >= 81.0) {
            status = "Crítico";
            String query = String.format(
                    "INSERT INTO status_maquina "
                    + "(uso_processador,temperatura_cpu,uso_disco,uso_ram,status_web,fk_maquina) "
                    + "values (%s,'%s',%s,%d,%s,%d)",
                    looca.getUsoProcessador(),
                    looca.getTemperaturaCpu(),
                    looca.getUsoDissco(),
                    looca.getUsoRam(),
                    status,
                    fkMaquina
            );
            System.out.println(query);
            db.initializer();
            db.makeQueryWithoutReturn(query);
            System.out.println("inseriu");
        }

    }

    public void sendingMessageSlack(
            Double usoProcessador,
            Long usoMemoria,
            Long totalMemoria,
            Long usoDisco,
            Long totalDisco
    ) throws IOException, InterruptedException {
        Conversor conversor = new Conversor();
        Double memoria = conversor.longToDouble(usoMemoria);
        Double memoriaTotal = conversor.longToDouble(totalMemoria);
        Double disco = conversor.longToDouble(usoDisco);
        Double discoTotal = conversor.longToDouble(totalDisco);
        Double porcentagemDisco = disco * (discoTotal / 100.0);
        Double porcentagemMemoria = memoria * (memoriaTotal / 100.0);

        if (porcentagemDisco >= 71.0 && porcentagemDisco < 81.0) {
            System.out.println("Disco em risco");
            slack.initializer();
            json.put("text", String.format(":warning:? ALERTA LARANJA NO DISCO RÍGIDO, COMPONENTE COM %.1f% EM USO! :warning:", porcentagemDisco));
            SlackModel.sendMessage(json);
        } else if (porcentagemDisco >= 81.0) {
            System.out.println("Disco em alerta critico");
            slack.initializer();
            json.put("text", String.format(":rotating_light: ALERTA CRÍTICO DO SISTEMA NO DISCO RÍGIDO COM OS NÍVEIS EM %.1f%!  :rotating_light:", porcentagemDisco));
            SlackModel.sendMessage(json);
        }

        if (porcentagemMemoria >= 71.0 && porcentagemMemoria < 81.0) {
            System.out.println("Memoria em risco");
            slack.initializer();
            json.put("text", String.format(":warning:? ALERTA LARANJA NA MEMÓRIA RAM, COMPONENTE COM %.1f% EM USO! :warning:?", porcentagemMemoria));
            SlackModel.sendMessage(json);
        } else if (porcentagemMemoria >= 81.0) {
            System.out.println("Memoria em alerta critico");
            slack.initializer();
            json.put("text", String.format(":rotating_light: ALERTA CRÍTICO DO SISTEMA NA MEMÓRIA RAM COM OS NÍVEIS EM %.1f%! :rotating_light:", porcentagemMemoria));
            SlackModel.sendMessage(json);
        }

        if (usoProcessador >= 71.0 && usoProcessador < 81.0) {
            System.out.println("CPU em risco");
            slack.initializer();
            json.put("text", String.format(":warning:? ALERTA LARANJA EM CPU, COMPONENTE COM %.1f% EM USO! :warning:", usoProcessador));
            SlackModel.sendMessage(json);
        } else if (usoProcessador >= 81.0) {
            System.out.println("CPU em alerta critico");
            slack.initializer();
            json.put("text", String.format(":rotating_light: ALERTA CRÍTICO DO SISTEMA NA CPU COM OS NÍVEIS EM %.1f%! :rotating_light:", usoProcessador));
            SlackModel.sendMessage(json);
        }
    }

}
