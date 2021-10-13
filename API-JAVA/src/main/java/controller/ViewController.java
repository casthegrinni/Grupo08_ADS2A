package controller;

import Models.DataBaseModel;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import javax.swing.JOptionPane;

public class ViewController {
    private final DataBaseModel db= new DataBaseModel();
    private final LoocaController looca = new LoocaController();

    public Boolean verifyUserAndMachine(String login, String senha,String fkMaquina) {
        String query = String.format("select email,senha,fk_estacao from [dbo].[usuario] where email ='%s' and senha = '%s';", login, senha);
        Map map = db.makeSelectQuery(query);
        Integer fkmaquinaInt = 0;
        try {
            fkmaquinaInt = Integer.valueOf(fkMaquina);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Insira apenas números no id da maquina");
        }
        if (map.isEmpty()) {
            return false;
        } else {

            Boolean checked = checkFkMaquina(fkmaquinaInt);
            if ( checked){
                return true;
            }
            else return false;

        }
    }
    public Boolean checkFkMaquina(int fkMaquina) {
        String query = String.format("select * from maquina where id_maquina = %d",fkMaquina);
        Map map = db.makeSelectQuery(query);
        if (map.isEmpty()){
            return false;
        }
        else return true;


    }
    public void startWithFkMaquina(String fkMaquina){
          Integer fkInt = 0;
            fkInt = Integer.valueOf(fkMaquina);
        
        looca.setFkMaquina(fkInt);
        looca.insertInSeconds(5);


    }

    public void init() {
        db.initializer();
    }





}
