package Models.DataBase;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.concurrent.locks.StampedLock;

class ConnectWithSql {
public Statement connect(){
    DataBaseModel db = new DataBaseModel();
    String url = String.format("jdbc:sqlserver://%s:%s;databaseName=%s;user=%s;password=%s",db.getServer(),db.getPort(),db.getDbName(),db.getUser(),db.getPassword());
    Statement s = null;
    try (Connection c = DriverManager.getConnection(url); Statement smt = c.createStatement()){
        s = smt;

    }catch (SQLException e){
        e.printStackTrace();
    }

    return s;
}
}
