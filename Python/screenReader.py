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

machineId=parserMachine.get('machine_config', 'machine_id')

# local
# mydb = mysql.connector.connect (
# 		host= parser.get('local_credentials','host'),
# 		user= parser.get('local_credentials', 'user'),
# 		password= parser.get('local_credentials', 'password'),
# 		database= parser.get('local_credentials', 'database')
# 		)

# mycursor = mydb.cursor()

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

# def main():
#     screenReader = Tk()  # Declaring the window
#     screenReader.title("Pulsatrix")  # Window title
#     screenConfig()
#     owlImageAndLabels()
#     screenReader.mainloop()

    
def execute(x):
    cursor.execute(
        f"INSERT INTO status_papel (estoque_papel, fk_maquina) VALUES(0, {x})"
    )
    cnxn.commit()


def searchForNoPaper():
    cords = pyautogui.locateCenterOnScreen("images/no-paper.png")

    print(cords)
    print("Machine id: " + machineId)

    timer = threading.Timer(2.0, searchForNoPaper)
    timer.start()

    if cords:
        pyautogui.click(cords)
        print("Não tem papel...")
        execute(machineId)
    else:
        print("Tem papel")


# def screenConfig():
#     height = 500
#     width = 705
#     heightScreen = screenReader.winfo_screenheight()
#     widthScreen = screenReader.winfo_screenwidth()

#     posX = widthScreen / 2 - width / 2
#     posY = heightScreen / 2 - height / 2

#     screenReader.geometry(
#         "%dx%d+%d+%d" % (width, height, posX, posY)
#     )  # Width, height, x and Y

#     screenReader.resizable(False, False)  # Fixed height and width
#     screenReader.iconbitmap("images/logo.ico")  # icon
#     screenReader["bg"] = "#767676"  # background color


# def owlImageAndLabels():
#     path = Image.open("images/owl.png")
#     img = ImageTk.PhotoImage(path)
#     imgOwl = Label(screenReader, image=img, bg="#767676")
#     imgOwl.image = img

#     pulsatrixText = Label(
#         screenReader,
#         text="Pulsatrix",
#         fg="#FFFFFF",
#         background="#767676",
#         font="Tomorrow 30",
#         width=10,
#     )

#     pulsatrixText.grid(row=0, column=0)
#     imgOwl.grid(row=1, column=0)

# if __name__ == '__main__':
#     screenReader = Tk()  # Declaring the window
#     screenReader.title("Pulsatrix")  # Window title
#     screenConfig()
#     owlImageAndLabels()
#     screenReader.mainloop()

searchForNoPaper()