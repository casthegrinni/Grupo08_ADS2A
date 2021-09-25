package Models.DataBase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

 class Querrys {

    public ResultSet MakeQuerrywithStringAndSmt(String querry){
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
