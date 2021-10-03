from tkinter import *
from tkinter import font

# Creating a window
login = Tk() # Declaring the window
login.title("Pulsatrix - Screen reader") # Window title

def windowConfig():
     height = 500
     width = 900
     
     # Resolution
     heightScreen = login.winfo_screenheight()
     widthScreen = login.winfo_screenwidth()

     # Window position
     posX = widthScreen/2 - width/2
     posY = heightScreen/2 - height/2
 
     login.geometry("%dx%d+%d+%d" %(width, height, posX, posY) )# Width, height, x and Y
     login.resizable(False, False) # Fixed height and width
     login.iconbitmap("images/logo.ico") # icon
     login["bg"] = "#323232" # background color

def btnLoginAction(user, password):
    if user == "admin" and password == "admin":
        print("Entry")
    else:
        print("Can't acess")

def labelsAndButtonsConfig():
    lblUser = Label(
        login, 
        text="Usuário",
        bg="#323232",
        fg="#FFFFFF",
        font="Tomorrow 20",
        )
    lblUser.grid(row=1, column=0, sticky=W)

    txtUser = Entry(login)
    txtUser.grid(row=2, column=0, sticky=W)

    lblPassword = Label(
        login,
        text="Senha",
        bg="#323232",
        fg="#FFFFFF",
        font="Tomorrow 20",
        )
    lblPassword.grid(row=4, column=0, sticky=W)

    txtPassword = Entry(login)
    txtPassword.grid(row=5, column=0, sticky=W)

    btnLogin = Button(
        login, 
        text="Login", 
        command=lambda:btnLoginAction("admin","admin"), 
        font="Tomorrow 15", 
        bg="#3CDDEC",
        fg="#323232",
        width="20")

    btnLogin.grid(row=6, column=0)

windowConfig()
labelsAndButtonsConfig()
login.mainloop() # launch