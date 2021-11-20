package Views;

import controller.ViewController;
import java.io.IOException;

import javax.swing.*;
import java.util.Scanner;

public class Cli {
    public static void main(String[] args) throws IOException {
        ViewController vc = new ViewController();
        Scanner inputUser = new Scanner(System.in);
        Scanner inputPasswd = new Scanner(System.in);
        Scanner inputId = new Scanner(System.in);
        String user, password, idMachine;

        System.out.println("Digite seu usuário: ");
        user = inputUser.nextLine();

        System.out.println("Digite sua senha: ");
        password = inputPasswd.nextLine();

        System.out.println("Digite o id da máquina: ");
        idMachine = inputId.nextLine();

        vc.init();
        
        Boolean result = vc.verifyUserAndMachine(user,password,idMachine);
        System.out.println(result);
        if (result){
            Boolean checkFirstTime = vc.calibratePc(false, idMachine);

            if(checkFirstTime) {
                vc.start();
            }

        }

        else {
            System.out.println("Erro ao verificar a máquina, por favor tente novamente!");
        }

    }
}
