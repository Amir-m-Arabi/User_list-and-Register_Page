const $ = document
let form = $.getElementById("register")
let firstname = $.getElementById("firstname")
let lastname = $.getElementById("lastname")
let username = $.getElementById("username")
let password = $.getElementById("password")
let acceptedRegister = $.getElementById("accepted-register")

form.addEventListener("submit" , function(event){
    event.preventDefault()
    let information = {
        firstname : firstname.value,
        lastname : lastname.value,
        username : username.value,               
        password : password.value
    }
    fetch("http://localhost:3000/Sabzlearn/Users/Register" , {
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(information)
    })
    .then((res)=> res.text())
    .then((data)=>
        { if(data === "User Successfully Registered"){
            form.style.display = "none"
            acceptedRegister.style.display = ""
        }
    })
    firstname.value = ""
    lastname.value = ""
    username.value = ""
    password.value = ""

});

