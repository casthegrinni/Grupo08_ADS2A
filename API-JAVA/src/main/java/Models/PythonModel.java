package Models;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class PythonModel {

    private final String os;

    public PythonModel(String os) {
        this.os = os;
    }

    public void letterToPython(String id)
            throws IOException {
        System.out.println("\n " +os);
        String path;
        if (os.contains("Windows")) {
            path = "../SCREEN-READER-WINDOWS/dist/machine.ini";
        } else {
            path = "../SCREEN-READER-LINUX/dist/machine.ini";
        }

        FileWriter file = new FileWriter(path);
        PrintWriter writer = new PrintWriter(file);
        writer.print("[machine_config]");
        writer.println("");
        writer.printf("machine_id = %s", id);
        writer.close();

        openPython();
    }

    public void openPython() throws IOException {
        String command;
        if (os.contains("Windows")) {
            command = "cd ../SCREEN-READER-WINDOWS/dist && start ScreenReader.exe";
            final Process exec = new ProcessBuilder("CMD", "/C", command).start();
        } else {
                command = "cd ../SCREEN-READER-LINUX/dist; ./screenReader";
            final Process exec = new ProcessBuilder("bash", "-c", command).start();
        } 
    }
}
