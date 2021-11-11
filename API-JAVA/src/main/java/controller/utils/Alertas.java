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
public enum Alertas {
    ALERTA_PROCESSADOR("A máquina %d localizada na estação %s atingiu %.1f% de processamento."),
    ALERTA_MEMORIA("A máquina %d localizada na estação %s atingiu %.1f% de armazenamento interno."),
    ALERTA_RAM("A máquina %d localizada na estação %s atingiu %.1f% de uso de Mémoria RAM.");
    
    private String alertas;

    private Alertas(String alertas) {
        this.alertas = alertas;  
    }

    public String getAlertas() {
        return alertas;
    }
}