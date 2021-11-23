import configparser
import pyautogui
import threading
# from tkinter import *
# from PIL import Image, ImageTk
# import mysql.connector
import pyodbc

from configparser import ConfigParser

parser = ConfigParser()
parserMachine = ConfigParser()
parser.read("db_config.ini")
parserMachine.read("machine.ini")

# Prod
server = parser.get("prod_credentials", "server")
database = parser.get("prod_credentials", "database")
username = parser.get("prod_credentials", "user")
password = parser.get("prod_credentials", "password")
connect_string = (
    r"Driver={ODBC Driver 17 for SQL Server};"
    r"Server=" + server + ";"
    r"Database=" + database + ";"
    r"UID=" + username + ";"
    r"PwD=" + password
)

cnxn = pyodbc.connect(connect_string)
cursor = cnxn.cursor()

def login():
    print("------------ PULSATRIX -----------")
    user = input("Email: ")
    password = input("Senha: ")
    machineId = input("Id da máquina: ")

    user_acess = fetchLogin(user,password)

    if user_acess != None:
        searchForNoPaper(machineId)
    else:
        print("Dados incorretos. Tente novamente")
        login()


def fetchLogin(user, password):
    cursor.execute(f"SELECT * FROM usuario WHERE email ='{user}' AND senha = '{password}';")
    #print(f"SELECT * FROM usuario WHERE email ='{user}' AND senha = '{password}';")
    
    row = cursor.fetchone() 
    while row:
        return row

    row = cursor.fetchone()
    return row

def execute(x):
    cursor.execute(
        f"INSERT INTO status_papel (estoque_papel, fk_maquina) VALUES(0, {x})"
    )
    cnxn.commit()


def searchForNoPaper(id_maquina):
    cords = pyautogui.locateCenterOnScreen("images/no-paper.png")

    print(cords)
    print("Machine id: " + id_maquina)

    timer = threading.Timer(2.0, searchForNoPaper(id_maquina))
    timer.start()

    if cords:
        pyautogui.click(cords)
        print("Não tem papel...")
        execute(id_maquina)
    else:
        print("Tem papel")

login()

