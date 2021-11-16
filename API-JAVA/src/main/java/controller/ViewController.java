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
    private final SlackControler s = new SlackControler();

    public Boolean verifyUserAndMachine(String login, String senha,String fkMaquina) {
        String query = String.format("select email,senha,fk_estacao from [dbo].[usuario] where email ='%s' and senha = '%s';", login, senha);
        Map map = db.makeSelectQuery(query);
        Integer fkmaquinaInt = 0;
        try {
            fkmaquinaInt = Integer.valueOf(fkMaquina);
            s.setFkMaquina(fkmaquinaInt);
            
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
        System.out.println(query);
        Map map = db.makeSelectQuery(query);
        if (map.isEmpty()){
            return false;
        }
        else return true;


    }
    public void start(){
        looca.setSlack(s);
        looca.insertInSeconds(5);

    }

    public void init() {
        db.initializer();
    }

    public boolean calibratePc(Boolean requested, String fkMaquina){
        Integer fkInt = 0;
        fkInt = Integer.valueOf(fkMaquina);
        looca.setFkMaquina(fkInt);



        if (!requested){
            System.out.println("verificando se o pc já foi checkado alguma vez");

           String response =  db.makeCalibrateSelect(fkMaquina);
           if (response.equals("0") || response.equals("1")){
               looca.setStaticPcInfo();
               return true;
           }
           else if(response.equals("")){
               return false;

           }
           else {
               looca.setStaticPcInfo();
               return true;
           }
        }
        return false;



    }





}
