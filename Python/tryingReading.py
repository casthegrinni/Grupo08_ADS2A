import pyautogui
import threading
import mysql.connector


mydb = mysql.connector.connect(
		host="localhost",
		user="root",
		password="AbCdELEFOA",
		database="testandoPython"
		)
mycursor = mydb.cursor()


def execute(x):
	query = "INSERT INTO testeInsert (binNumb) VALUES ({});"
	mycursor.execute(query.format(x))
	mydb.commit()


def searchForNoPaper():
	cords = pyautogui.locateCenterOnScreen("newTab.png")
	#pyautogui.click(cords)
	print(cords)

	timer = threading.Timer(2.0, searchForNoPaper)
	timer.start()

	if cords:
		execute(1)
	else:
		execute(0)

searchForNoPaper()	

#sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
#val = ("John", "Highway 21")
#mycursor.execute(sql, val)









