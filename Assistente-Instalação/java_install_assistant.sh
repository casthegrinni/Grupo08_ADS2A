#!/bin/bash

PURPLE='0;35'
NC='\033[0m' 
VERSAO=11
MYSQL=17
	
echo  "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Olá Aluno, serei seu assistente para instalação do Java!;"
echo  "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Verificando aqui se você possui o Java instalado...;"

java -version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) : Olá você já tem o java instalado!!"
		sleep 4
	else
		echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Opa! Não identifiquei nenhuma versão do Java instalado, mas sem problemas, irei resolver isso agora!"
		echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Confirme para mim se realmente deseja instalar o Java (S/N)?"
	read inst
	if [ \"$inst\" == \"s\" ]
		then
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Ok! Você escolheu instalar o Java ;D"
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Adicionando o repositório!"
			sleep 2
			sudo add-apt-repository ppa:webupd8team/java -y
			clear
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Atualizando! Quase lá."
			sleep 2
			sudo apt update -y
			clear
			if [ $VERSAO -eq 11 ]
				then
					echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Preparando para instalar a versão 11 do Java. Confirme a instalação quando solicitado ;D"
					sudo apt install default-jre ; apt install openjdk-11-jre-headless; -y
					clear
					echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Java instalado com sucesso!"
			fi
		else 	
		echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Você optou por não instalar o Java por enquanto, até a próxima então!"
		sleep 2
	fi
fi
					
clear
echo  "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Agora, seguiremos para a conexão com o banco de dados!"
echo  "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Deseja realizar esta operação? (S/N)?"
read con
	if [ \"$con\" == \"s\" ]
		then 
	        curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
			curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
			sleep 2
			clear
			echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Atualizando..."
			sleep 2
		    sudo apt-get update
			clear					
			if [ $MYSQL -eq 17 ]
				then
				    echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Preparando para realizar a conexão"
					sudo ACCEPT_EULA=Y apt-get install -y msodbcsql17
					sleep 5
					clear
					echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7) Conexão criada com sucesso!"
			fi
	    else
		echo "$(tput setaf 10)[J.A.R.V.I.S]:$(tput setaf 7)  Você optou por não conectar com o banco, até a próxima!"
	fi



# ===================================================================
# Todos direitos reservados para o autor: Dra. Profa. Marise Miranda.
# Sob licença Creative Commons @2020
# Podera modificar e reproduzir para uso pessoal.
# Proibida a comercialização e a exclusão da autoria.
# ===================================================================
