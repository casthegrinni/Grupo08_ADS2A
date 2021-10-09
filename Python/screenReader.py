import pyautogui
import threading
import mysql.connector
import pyodbc

from configparser import ConfigParser

parser = ConfigParser()
parser.read('db_config.ini')
machineId = 0

#local
# mydb = mysql.connector.connect (
# 		host= parser.get('local_credentials','host'),
# 		user= parser.get('local_credentials', 'user'),
# 		password= parser.get('local_credentials', 'password'),
# 		database= parser.get('local_credentials', 'database')
# 		)

# mycursor = mydb.cursor()

# Prod
server = parser.get('prod_credentials','server')     
database = parser.get('prod_credentials', 'database') 
username = parser.get('prod_credentials', 'user') 
password = parser.get('prod_credentials', 'password') 
connect_string = (            
    r"Driver={SQL Server};"
    r"Server="+server+";"
    r"Database="+database+";"
    r"UID="+username+";"
    r"PwD=" + password)
    
cnxn = pyodbc.connect(connect_string)
cursor = cnxn.cursor()

def execute(x):
	cursor.execute(f"INSERT INTO status_papel (estoque_papel, fk_maquina) VALUES(0, {x})")
	cnxn.commit()
	

def searchForNoPaper():
	cords = pyautogui.locateCenterOnScreen("images/no-paper.png")
	
	print(cords)

	timer = threading.Timer(2.0, searchForNoPaper)
	timer.start()

	if cords:
		pyautogui.click(cords)
		print("Não tem papel...")
		execute(machineId)
	else:
		print("Tem papel")