from tkinter import *
import pyodbc
from configparser import ConfigParser
import screenReader
from tkinter import messagebox

# Creating a window
login = Tk()  # Declaring the window
login.title("Pulsatrix - Screen reader")  # Window title

#Gettind .ini informations
parser = ConfigParser()
parser.read('db_config.ini')
      
# Azure connection
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

def fetchLogin(user, password):
    cursor.execute(f"SELECT * FROM usuario WHERE email ='{user}' AND senha = '{password}';")
    # print(f"SELECT * FROM usuario WHERE email ='{user}' AND senha = '{password}';")

    row = cursor.fetchone() 
    while row:
        return row
        row = cursor.fetchone()

    return row

def btnLoginAction(user, password, id):
    user_acess = fetchLogin(user,password)
    print(user_acess)

    if user_acess != None:
        print("Entry")
        anotherWindow()
        screenReader.machineId = id
        screenReader.searchForNoPaper()
    else:
        print("Can't acess")
        messagebox.showinfo("Dados inválidos", "Usuário ou senha inválidos. Tente novamente!")

def windowConfig():
    height = 300
    width = 250

    # Resolution
    heightScreen = login.winfo_screenheight()
    widthScreen = login.winfo_screenwidth()

    # Window position
    posX = widthScreen / 2 - width / 2
    posY = heightScreen / 2 - height / 2

    login.geometry(
        "%dx%d+%d+%d" % (width, height, posX, posY)
    )  # Width, height, x and Y
    login.resizable(False, False)  # Fixed height and width
    login.iconbitmap("images/logo.ico")  # icon
    login["bg"] = "#323232"  # background color

def labelsAndButtonsConfig():
    # User
    lblUser = Label(
        login, text="Usuário", bg="#323232", fg="#FFFFFF", font="Tomorrow 15", width=11
    )
    lblUser.grid(row=1, column=0, columnspan=3, sticky=W)

    txtUser = Entry(login, font="Tomorrow 10", width=20)
    txtUser.grid(row=2, column=2, sticky=N)

    # Password
    lblPassword = Label(
        login, text="Senha", bg="#323232", fg="#FFFFFF", font="Tomorrow 15", width=10
    )
    lblPassword.grid(row=4, column=0, columnspan=3, sticky=W)

    txtPassword = Entry(login, font="Tomorrow 10", show="*", width=20)
    txtPassword.grid(row=5, column=1, columnspan=20, sticky=N)

    # Machine id
    lblMachine = Label(
        login,
        text="Id máquina",
        bg="#323232",
        fg="#FFFFFF",
        font="Tomorrow 15",
        width=14,
    )
    lblMachine.grid(row=7, column=0, columnspan=3, sticky=W)

    txtMachine = Entry(login, font="Tomorrow 10", width=20)
    txtMachine.grid(row=8, column=1, columnspan=20, sticky=N)

    # Login Button
    btnLogin = Button(
        login,
        text="Login",
        command=lambda: btnLoginAction(txtUser.get(), txtPassword.get(), txtMachine.get()),
        font="Tomorrow 12",
        bg="#3CDDEC",
        fg="#323232",
        width="5",
    )

    btnLogin.grid(row=10, column=0, columnspan=3, sticky=E)
    middleLabels()


def middleLabels():
    lblAlert = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lblAlert.grid(row=9, column=0, columnspan=1)

    lbl = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lbl.grid(row=6, column=0, rowspan=1)

    lbl = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lbl.grid(row=5, column=0, columnspan=1)

    lbl = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lbl.grid(row=2, column=0, columnspan=1)

    lbl = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lbl.grid(row=0, column=0, columnspan=1)


def anotherWindow():
#Destroy current window
 login.destroy()        

windowConfig()
labelsAndButtonsConfig()
login.mainloop()  # launch

