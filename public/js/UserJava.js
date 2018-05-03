var button = document.getElementById("btnSubmit");

function send(){

    var UserName = document.querySelector('#txtName').value;
    var UserAge = document.querySelector('#cbbDay').value;
    var UserPass = document.querySelector('#txtPass').value;
    var Exp = 0;
    

    $.getJSON('users/'+ UserName + '/' + UserPass + '/' + UserAge.toString() + '/' +  Exp.toString());

 
}

function getTiles(){
    
}

function login()
{
    var Name = document.querySelector("#txtUserName").value;
    var Password = document.querySelector('#txtUserPass').value;
    
    
    $.getJSON('userName/'+ Name + '/' + Password);

   
    
}
function setGame(userName)
{
    
    console.log(Username);
}
