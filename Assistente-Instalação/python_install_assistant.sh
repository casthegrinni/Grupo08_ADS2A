#!/bin/bash

PURPLE='0;35'
NC='\033[0m' 
VERSAO=3.8

python3 --version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) : Você já possui o python instalado!!"
	else
		echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Não foi identificado nenhuma versão do python, vamos resolver isso!"
		echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Deseja instalar o Python (S/N)?"
	read inst
	 if [ \"$inst\" == \"s\" ]
		then
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Iniciando instalação..."
			sudo apt update -y
			sudo apt install software-properties-common -y
			sleep 2
			clear
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Adicionando repositório..."
			sudo add-apt-repository ppa:deadsnakes/ppa
			sleep 1
			clear
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Atualizando! Quase lá."
			sleep 2	
			sudo apt update -y
			sleep 2	
    	    clear
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Instalando..."
			sudo apt-get install python3
			sleep 3
			clear
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Python instalado com sucesso!"
	    else
	 	echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Você optou por não instalar o Python por enquanto, até a próxima então!"
	fi
fi

# ===================================================================
# Todos direitos reservados para o autor: Dra. Profa. Marise Miranda.
# Sob licença Creative Commons @2020
# Podera modificar e reproduzir para uso pessoal.
# Proibida a comercialização e a exclusão da autoria.
# ===================================================================
