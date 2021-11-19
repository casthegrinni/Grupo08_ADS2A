package controller;

import Models.DataBaseModel;
import Models.SlackModel;
import controller.utils.Alertas;
import controller.utils.Conversor;
import org.json.JSONObject;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

public class SlackController {
    private final SlackModel slack = new SlackModel();
    JSONObject json = new JSONObject();
    DataBaseModel db = new DataBaseModel();
    Alertas[] alerta = Alertas.values();
    Map<String, String> response = new HashMap<>();
    private Integer fkMaquina;

        public void sendingMessageSlack(
                Double usoProcessador,
                Long usoMemoria,
                Long totalMemoria,
                Long usoDisco,
                Long totalDisco
        ) throws IOException, InterruptedException {
            Double memoria = Conversor.longToDouble(usoMemoria);
            Double memoriaTotal = Conversor.longToDouble(totalMemoria);
            Double disco = Conversor.longToDouble(usoDisco);
            Double discoTotal = Conversor.longToDouble(totalDisco);
            Double porcentagemDisco = (disco * 100.0) / discoTotal;
            Double porcentagemMemoria = (memoria * 100.0) / memoriaTotal;

            db.initializer();
            response = db.makeSelectQuery(String.format("select maquina.id_maquina, nome_estacao from maquina join estacao on id_estacao = maquina.fk_estacao WHERE id_maquina = %s;", fkMaquina));
            String fkMaquina = response.get("label1");
            String nomeEstacao = response.get("label2");

            System.out.println(fkMaquina + "--" + nomeEstacao);

            if (porcentagemDisco >= 71.0 && porcentagemDisco < 81.0) {
                System.out.println("Disco em risco");
                slack.initializer();
                json.put("text", String.format(String.valueOf(alerta[0].getAlertas()), fkMaquina, nomeEstacao, porcentagemDisco));
                SlackModel.sendMessage(json);
            } else if (porcentagemDisco >= 81.0) {
                System.out.println("Disco em alerta critico");
                slack.initializer();
                json.put("text", String.format(String.valueOf(alerta[1].getAlertas()), fkMaquina, nomeEstacao, porcentagemDisco));
                SlackModel.sendMessage(json);
            }

            if (porcentagemMemoria >= 71.0 && porcentagemMemoria < 81.0) {
                System.out.println("Memoria em risco");
                slack.initializer();
                json.put("text", String.format(String.valueOf(alerta[2].getAlertas()), fkMaquina, nomeEstacao, porcentagemMemoria));
                SlackModel.sendMessage(json);
            } else if (porcentagemMemoria >= 81.0) {
                System.out.println("Memoria em alerta critico");
                slack.initializer();
                json.put("text", String.format(String.valueOf(alerta[3].getAlertas()), fkMaquina, nomeEstacao, porcentagemMemoria));
                SlackModel.sendMessage(json);
            }

            if (usoProcessador >= 71.0 && usoProcessador < 81.0) {
                System.out.println("CPU em risco");
                slack.initializer();
                json.put("text", String.format(String.valueOf(alerta[4].getAlertas()), fkMaquina, nomeEstacao, usoProcessador));
                SlackModel.sendMessage(json);
            } else if (usoProcessador >= 81.0) {
                System.out.println("CPU em alerta critico");
                slack.initializer();
                json.put("text", String.format(String.valueOf(alerta[5].getAlertas()), fkMaquina, nomeEstacao, usoProcessador));
                SlackModel.sendMessage(json);
            }
        }


    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
    

}
