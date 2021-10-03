from tkinter import *
from tkinter import font

# Creating a window
login = Tk() # Declaring the window
login.title("Pulsatrix - Screen reader") # Window title

def windowConfig():
     height = 250
     width = 270
     
     # Resolution
     heightScreen = login.winfo_screenheight()
     widthScreen = login.winfo_screenwidth()

     # Window position
     posX = widthScreen/2 - width/2
     posY = heightScreen/2 - height/2
 
     login.geometry("%dx%d+%d+%d" %(width, height, posX, posY))# Width, height, x and Y
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
        font="Tomorrow 15",
        width=11
        )
    lblUser.grid(row=1, column=0, columnspan=3, sticky=W)

    txtUser = Entry(
        login,
        font="Tomorrow 10",
        width=20)
    txtUser.grid(row=2, column=2, sticky=N)
   
    lblPassword = Label(
        login,
        text="Senha",
        bg="#323232",
        fg="#FFFFFF",
        font="Tomorrow 15",
        width=10
        )
    lblPassword.grid(row=4, column=0, columnspan=3, sticky=W)
    
    txtPassword = Entry(
        login,
        font="Tomorrow 10",
        show="*",
        width=20
        )
    txtPassword.grid(row=5, column=1, columnspan=20, sticky=N)

    btnLogin = Button(
        login, 
        text="Login", 
        command=lambda:btnLoginAction(txtUser.get(),txtUser.get()), 
        font="Tomorrow 10", 
        bg="#3CDDEC",
        fg="#323232",
        width="10",
        )

    btnLogin.grid(row=7, column=0, columnspan=3, sticky=E)
    middleLabels()

def middleLabels():
    lbl = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lbl.grid(row=6, column=0, rowspan=1)

    lbl = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lbl.grid(row=5, column=0, columnspan=1)

    lbl = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lbl.grid(row=2, column=0, columnspan=1)

    lbl = Label(background="#323232", foreground="#323232", text="ㅤㅤ")
    lbl.grid(row=0, column=0, columnspan=1)


windowConfig()
labelsAndButtonsConfig()
login.mainloop() # launch