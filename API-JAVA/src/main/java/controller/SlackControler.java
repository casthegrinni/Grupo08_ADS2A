package controller;

import Models.SlackModel;
import controller.utils.Alertas;
import controller.utils.Conversor;
import org.json.JSONObject;

import java.io.IOException;

public class SlackControler {
    private final SlackModel slack = new SlackModel();
    JSONObject json = new JSONObject();
    Alertas[] alerta = Alertas.values();

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
        Double porcentagemDisco = disco * (discoTotal / 100.0);
        Double porcentagemMemoria = memoria * (memoriaTotal / 100.0);

        if (porcentagemDisco >= 71.0 && porcentagemDisco < 81.0) {
            System.out.println("Disco em risco");
            slack.initializer();
            json.put("text", String.format(String.valueOf(alerta[0]), porcentagemDisco));
            SlackModel.sendMessage(json);
        } else if (porcentagemDisco >= 81.0) {
            System.out.println("Disco em alerta critico");
            slack.initializer();
            json.put("text", String.format(String.valueOf(alerta[1]), porcentagemDisco));
            SlackModel.sendMessage(json);
        }

        if (porcentagemMemoria >= 71.0 && porcentagemMemoria < 81.0) {
            System.out.println("Memoria em risco");
            slack.initializer();
            json.put("text", String.format(String.valueOf(alerta[2]), porcentagemMemoria));
            SlackModel.sendMessage(json);
        } else if (porcentagemMemoria >= 81.0) {
            System.out.println("Memoria em alerta critico");
            slack.initializer();
            json.put("text", String.format(String.valueOf(alerta[3]), porcentagemMemoria));
            SlackModel.sendMessage(json);
        }

        if (usoProcessador >= 71.0 && usoProcessador < 81.0) {
            System.out.println("CPU em risco");
            slack.initializer();
            json.put("text", String.format(String.valueOf(alerta[4]), usoProcessador));
            SlackModel.sendMessage(json);
        } else if (usoProcessador >= 81.0) {
            System.out.println("CPU em alerta critico");
            slack.initializer();
            json.put("text", String.format(String.valueOf(alerta[5]), usoProcessador));
            SlackModel.sendMessage(json);
        }
    }

}
