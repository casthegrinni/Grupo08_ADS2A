package Models.DataBase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Querrys {

    public ResultSet MakeQuerrywithString(String querry){
        ResultSet resultSet= null;
        ConnectWithSql smt = new ConnectWithSql();
        try {
            resultSet = smt.connect().executeQuery(querry);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return resultSet;
    }
}
