package controller;

import Models.DataBaseModel;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class ViewController {
    private final DataBaseModel db= new DataBaseModel();
    private final LoocaController looca = new LoocaController();

    public Boolean verifyUserAndMachine(String login, String senha,int fkMaquina) {
        String query = String.format("select email,senha,fk_estacao from [dbo].[usuario] where email ='%s' and senha = '%s';", login, senha);
        Map map = db.makeSelectQuery(query);
        if (map.isEmpty()) {
            return false;
        } else {

            Boolean checked = checkFkMaquina(fkMaquina);
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
    public void startWithFkMaquina(int fkMaquina){

        looca.setFkMaquina(fkMaquina);
        looca.insertInSeconds(5);


    }

    public void init() {
        db.initializer();
    }





}
