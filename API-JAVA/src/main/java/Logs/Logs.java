package Logs;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Logs {
    List<String> listLog = new ArrayList<>();
    DateTimeFormatter dateLog = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public void saveLogs(String log){
        listLog.add(log+" --> "+dateLog.format(LocalDateTime.now()));
        try {
            writeLogs();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
    
        public static void createFile(String fullPath) throws IOException {
    File file = new File("Logs");
    file.getParentFile().mkdirs();
    file.createNewFile();
}

    public void writeLogs() throws IOException {
        File file = new File("Logs/logs"
                +dateLog.format(LocalDateTime.now()).replaceAll("/", "-").replaceAll(":", "-")
                +".txt");
        
        file.createNewFile();
        FileWriter logs = new FileWriter(file);
        PrintWriter saveLogs = new PrintWriter(logs);
        for (String i:listLog){
            saveLogs.println(i);
        }
        logs.close();
    }


}
