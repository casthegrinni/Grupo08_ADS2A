/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.ini4j.Ini;
import org.json.JSONObject;

/**
 * @author Gabriel_Prisco
 */

public class SlackModel {
    private static final HttpClient client = HttpClient.newHttpClient();
    private static String URL = "";
    
    public void initializer() {
        try {
            Ini ini = new Ini(new File("./db_config.ini"));
            URL = ini.get("prod_credentials", "URL");
        }
        catch (IOException e) {

            e.printStackTrace();
        }
    }

    public static void sendMessage(JSONObject content) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(
            URI.create(URL))
            .header("accept", "application.json")
            .POST(HttpRequest.BodyPublishers.ofString(content.toString()))
            .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        System.out.printf("Status: \n\t%s", response.statusCode());
        System.out.printf("Response: \n\t%s", response.body ());
    }
}
