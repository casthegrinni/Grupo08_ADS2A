package Models;

import java.sql.*;

public class  DataBaseModel {
    private String server = "212-2a-grupo8.database.windows.net";
    private String port="1433";
    private String dbName="iris-pulsatrix";
    private String user="bandtec";
    private String password="AbCdinossauro@100";

    public ResultSet makeQuerry(String query){
        String url = String.format("jdbc:sqlserver://%s:%s;databaseName=%s;user=%s;password=%s",server,port,dbName,user,password);
        ResultSet resultSet = null;
        try (Connection c = DriverManager.getConnection(url); Statement smt = c.createStatement()){
            smt.execute(query);

        }catch (SQLException e){
            e.printStackTrace();
        }
        return resultSet;
    }
}
