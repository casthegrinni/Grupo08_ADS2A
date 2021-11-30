package controller;

import Logs.Logs;
import Models.DataBaseModel;
import Models.PythonModel;
import java.io.IOException;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import javax.swing.JOptionPane;

public class ViewController {

    private final DataBaseModel db = new DataBaseModel();
    private final LoocaController looca = new LoocaController();
    Logs logs = new Logs();
    private final SlackController s = new SlackController();
    private final PythonModel py = new PythonModel(System.getProperty("os.name"));

    public Boolean verifyUserAndMachine(String login, String senha, String fkMaquina) throws IOException {
        String query = String.format("select email,senha,fk_estacao from [dbo].[usuario] where email ='%s' and senha = '%s';", login, senha);
        Map map = db.makeSelectQuery(query);
        Integer fkmaquinaInt = 0;
        logs.saveLogs("Aplicacao iniciada por: "+login);

        try {
            fkmaquinaInt = Integer.valueOf(fkMaquina);
            s.setFkMaquina(fkmaquinaInt);

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Insira apenas numeros no id da maquina");
            System.out.println("\nInsira apenas numeros no id da maquina");
            logs.saveLogs("Erro ao iniciar aplicacao");
        }
        if (map.isEmpty()) {
            return false;
        } else {
            Boolean checked = checkFkMaquina(fkmaquinaInt);
            if (checked) {
                py.letterToPython(String.format("%d", fkmaquinaInt));
                return true;
            } else {
                return false;
            }

        }
    }

    public Boolean checkFkMaquina(int fkMaquina) {
        String query = String.format("select * from maquina where id_maquina = %d", fkMaquina);
        Map map = db.makeSelectQuery(query);
        if (map.isEmpty()) {
            return false;
        } else {
            return true;
        }

    }

    public void start() {
        looca.setSlack(s);
        looca.insertInSeconds(5);
        looca.alertInMinutes();

    }

    public void init() {
        db.initializer();
    }

    public boolean calibratePc(Boolean requested, String fkMaquina) {
        Integer fkInt = 0;
        fkInt = Integer.valueOf(fkMaquina);
        looca.setFkMaquina(fkInt);

        if (!requested) {

            System.out.println("\nverificando se o pc ja foi checado alguma vez");

            String response = db.makeCalibrateSelect(fkMaquina);
            if (response.equals("0") || response.equals("1")) {
                looca.setStaticPcInfo();
                return true;
            } else if (response.equals("")) {
                return false;

            } else {
                looca.setStaticPcInfo();
                return true;
            }
        }
        return false;

    }

}
