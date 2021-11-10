package Logs;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class Logs {
    public static void main(String[] args) throws IOException {


        FileWriter logs = new FileWriter("API-JAVA/logs.txt");
        PrintWriter gravarLogs = new PrintWriter(logs);

        gravarLogs.println("\n brunno Castanha");


        logs.close();
    }





}
