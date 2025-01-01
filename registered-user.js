let main = document.getElementById("main")
let edit = document.getElementById("editInformation")
let form = document.getElementById("editInformation-form")
let firstnameInput = document.getElementById("firstname")
let lastnameInput = document.getElementById("lastname")
let usernameInput = document.getElementById("username")
let passwordInput = document.getElementById("password")
let exitButton = document.getElementById("exit")
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/Sabzlearn/Manager/RegisterUser", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    })
    .then((res) => res.json())
    .then((data) => {
        let registeredUserInformation = data;
        let html = ''; 
        registeredUserInformation.forEach(element => { 
            html += '<div class="w-[38vw] h-[16vh] shadow-[2px_2px_10px_-2px_black] bg-slate-100 mx-1 mt-[3vh] mb-[3vh] rounded-[5px]">'; 
            html += '<div class="text-[1.5vw] pr-3 flex items-center gap-3">'; 
            html += '<img src="images/profile-image.png" alt="" class="w-[7vw] bg-slate-950 inline-block mt-3 ml-3">'; 
            html += '<div>'; 
            html += '<h2 class="text-gray-600 " style="filter: drop-shadow(0px 0px 1px gray);"><b class="username">' + element.username + '</b></h2>'; 
            html += '<p class="text-gray-800" style="filter: drop-shadow(0px 0px 1px rgb(114, 114, 114));"><b>' + element.firstname + " " + element.lastname + '</b></p>'; 
            html += '</div>'; 
            html += '</div>'; 
            html += '<div class="grid grid-rows-2 ml-[28vw] mt-[-7.89vw] text-[1.7vw]">'; 
            html += '<button class="text-center h-[8vh] bg-slate-500 text-blue-100 shadow-[2px_2px_10px_-2px_black] remove" data-username="' + element.username + '"><b style="filter: drop-shadow(0px 0px 2px black);">Remove</b></button>'; 
            html += '<button class="text-center h-[8vh] bg-red-900 text-blue-100 shadow-[2px_2px_10px_-2px_black] edit" data-id="' + element.ID + '"><b style="filter: drop-shadow(0px 0px 2px black);">Edit</b></button>'; 
            html += '</div>'; 
            html += '</div>'; 
        }); 
        main.innerHTML += html;
        
        document.querySelectorAll(".remove").forEach(button => { 
            button.addEventListener("click", function() { 
                const username = this.getAttribute("data-username");
                fetch(`http://localhost:3000/Sabzlearn/Manager/RemoveUser`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username })
                })
                .then(res => res.text())
                .then(data => {
                    console.log('User deleted:', data);
                })
            }); 
        });

        document.querySelectorAll(".edit").forEach(button =>{
            button.addEventListener("click" , function(){
                const id = this.getAttribute("data-id")
                fetch("http://localhost:3000/Sabzlearn/Manager/EditUser",{
                    method:"PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({id : id})
                })
                .then((res) => res.json())
                .then((data) =>{
                    firstnameInput.value = data[0].firstname
                    lastnameInput.value = data[0].lastname
                    usernameInput.value = data[0].username
                    passwordInput.value = data[0].password
                    edit.style.display = ""
                    exitButton.addEventListener("click" , function(){
                        edit.style.display = "none" 
                    })
                    form.addEventListener("submit" , event=>{
                        event.preventDefault()
                        info = {
                            id : data[0].ID,
                            firstname:firstnameInput.value,
                            lastname:lastnameInput.value,
                            username:usernameInput.value,
                            password:passwordInput.value
                        }
                        fetch("http://localhost:3000/Sabzlearn/Manager/UpdateUserInformation" , {
                            method:"POST",
                            headers:{"Content-Type" : "application/json"},
                            body:JSON.stringify(info)
                        })
                        .then((res)=>res.text())
                        .then((data)=>{
                            if (data === "User information updated"){
                                edit.style.display = "none" 
                            }
                        })
                    })
                })
            })
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
