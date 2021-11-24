package Logs;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Logs {
    List<String> listLog = new ArrayList<>();
    DateTimeFormatter dateLog = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");

    public void saveLogs(String log){
        listLog.add(log+" --> "+dateLog.format(LocalDateTime.now()));
        try {
            writeLogs();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public void writeLogs() throws IOException {
        FileWriter logs = new FileWriter("logs.txt");
        PrintWriter saveLogs = new PrintWriter(logs);
        for (String i:listLog){
            saveLogs.println(i);
        }
        logs.close();
    }


}
