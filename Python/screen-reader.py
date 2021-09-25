import pyautogui
import threading
import mysql.connector

from configparser import ConfigParser

parser = ConfigParser()
parser.read('db_config.ini')

mydb = mysql.connector.connect (
		host= parser.get('local_credentials','host'),
		user= parser.get('local_credentials', 'user'),
		password= parser.get('local_credentials', 'password'),
		database= parser.get('local_credentials', 'database')
		)

mycursor = mydb.cursor()

def execute(x):
	query = "INSERT INTO testeInsert (binNumb) VALUES ({});"
	mycursor.execute(query.format(x))
	mydb.commit()
	

def searchForNoPaper():
	cords = pyautogui.locateCenterOnScreen("no-paper.png")

	print(cords)

	timer = threading.Timer(2.0, searchForNoPaper)
	timer.start()

	if cords:
		pyautogui.click(cords)
		print("Não tem papel...")
		execute(1)
	else:
		print("Tem papel")

searchForNoPaper()











