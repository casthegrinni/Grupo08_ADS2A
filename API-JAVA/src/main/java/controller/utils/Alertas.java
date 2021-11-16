/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.utils;

/*
A máquina id_maquina localizada na estação nome_estacao ultrapassou o percentual de processamento atingindo  percent_use.
A máquina id_maquina localizada na estação nome_estacao  ultrapassou o percentual de armazenamento interno atingindo  percent_use. 
A máquina id_maquina localizada na estação nome_estacao ultrapassou o percentual de uso de Mémoria RAM atingindo  percent_use.
*/

/**
 *
 * @author Gabriel_Prisco
 */
public enum Alertas {
    ALERTA_PADRAO_MEMORIA(":disk: A máquina %s localizada na estação %s atingiu %.1f% de armazenamento interno."),
    ALERTA_CRITICO_MEMORIA(":disk: A máquina %s localizada na estação %s ultrapassou o percentual de armazenamento interno, atingindo %.1f%!"),
    ALERTA_PADRAO_RAM(":memory: A máquina %s localizada na estação %s atingiu %.1f% de uso de Mémoria RAM."),
    ALERTA_CRITICO_RAM(":memory: A máquina %s localizada na estação %s ultrapassou o percentual de uso de Mémoria RAM, atingindo %.1f%!"),
    ALERTA_PADRAO_PROCESSADOR(":cpu: A máquina %s localizada na estação %s atingiu %.1f% de processamento."),
    ALERTA_CRITICO_PROCESSADOR(":cpu: A máquina %s localizada na estação %s ultrapassou o percentual de processamento, atingindo %.1f%!");

    private String alertas;

    private Alertas(String alertas) {
        this.alertas = alertas;  
    }

    public String getAlertas() {
        return alertas;
    }
}
