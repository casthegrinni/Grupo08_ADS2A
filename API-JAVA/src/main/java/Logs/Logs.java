package Logs;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class Logs {
        public static void gravarLog(String log) throws IOException { 
        FileWriter archiver = new FileWriter("API-JAVA/logs.txt");
        PrintWriter writeLog = new PrintWriter(archiver);
        writeLog.write(log);
        archiver.close();
    }

}
