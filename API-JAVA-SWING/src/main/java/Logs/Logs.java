package Logs;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class Logs {
    public static void gravarLogs(String log) throws IOException {
        FileWriter logs = new FileWriter("./logs.txt");
        PrintWriter saveLogs = new PrintWriter(logs);
        saveLogs.println(log);

        logs.close();
    }


}
