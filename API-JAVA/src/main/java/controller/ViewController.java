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


    public Boolean verifyUser(String login, String senha){
        String query = String.format("select email,senha from [dbo].[usuario] where email ='%s' and senha = '%s';",login,senha);
        Map map = db.makeSelectQuery(query);
        if (map.isEmpty()){
            return false;
        }
        return true;
    }
    public void startWithFkMaquina(int fkMaquina){
        looca.setFkMaquina(fkMaquina);
        looca.insertInSeconds(5);


    }






}
