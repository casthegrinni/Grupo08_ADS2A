package Models;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

public class  DataBaseModel {
    private String server = "212-2a-grupo8.database.windows.net";
    private String port = "1433";
    private String dbName = "iris-pulsatrix";
    private String user = "bandtec";
    private String password = "AbCdinossauro@100";

    public Map makeSelectQuery(String query) {
        String url = String.format("jdbc:sqlserver://%s:%s;databaseName=%s;user=%s;password=%s", server, port, dbName, user, password);
        Map<String, String> map = new HashMap<>();
        try (Connection c = DriverManager.getConnection(url); Statement smt = c.createStatement()) {
            ResultSet rs = smt.executeQuery(query);

            while (rs.next()) {
                map.put("User", rs.getString(1));
                map.put("Password", rs.getString(2));
            }
            return map;


        } catch (SQLException e) {
            e.printStackTrace();
        }

        return map;
    }
    public void makeInsertQuery(String query){
        String url = String.format("jdbc:sqlserver://%s:%s;databaseName=%s;user=%s;password=%s", server, port, dbName, user, password);
        try (Connection c = DriverManager.getConnection(url); Statement smt = c.createStatement()) {
            smt.execute(query);

        }catch (SQLException e) {
            e.printStackTrace();
        }

        }
    }

