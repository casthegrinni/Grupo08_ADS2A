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
    ALERTA_PADRAO_PROCESSADOR("A máquina %d localizada na estação %s atingiu %.1f% de processamento."),
    ALERTA_PADRAO_MEMORIA("A máquina %d localizada na estação %s atingiu %.1f% de armazenamento interno."),
    ALERTA_PADRAO_RAM("A máquina %d localizada na estação %s atingiu %.1f% de uso de Mémoria RAM.");
    
    private String alertas;

    private Alertas(String alertas) {
        this.alertas = alertas;  
    }

    public String getAlertas() {
        return alertas;
    }
}

/*
A máquina id_maquina localizada na estação nome_estacao ultrapassou o percentual de processamento atingindo  percent_use.
A máquina id_maquina localizada na estação nome_estacao  ultrapassou o percentual de armazenamento interno atingindo  percent_use. 
A máquina id_maquina localizada na estação nome_estacao ultrapassou o percentual de uso de Mémoria RAM atingindo  percent_use.
*/