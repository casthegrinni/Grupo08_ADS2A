
import java.io.IOException;
import model.Slack;
import org.json.JSONObject;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Gabriel_Prisco
 */
public class App {
    public static void main(String[] args) throws IOException, InterruptedException {
        JSONObject json = new JSONObject();
        
        json.put("text", "Bot em testes :)");
        
        Slack.sendMessage(json);
    }
}
