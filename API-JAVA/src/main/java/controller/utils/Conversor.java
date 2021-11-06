/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.utils;

/**
 *
 * @author Gabriel_Prisco
 */
public class Conversor {
    public static Double longToDouble(Long l) {
        String aux = l.toString();
        Double converted = Double.valueOf(aux);
        return converted;
    }
}
