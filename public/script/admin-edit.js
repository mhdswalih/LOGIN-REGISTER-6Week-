let  currName;
let  currEmail;
let  currPhone;

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const submitError = document.getElementById("submit-error")

document.addEventListener("DOMContentLoaded",function(){    
    currName = name.value.trim();
    currEmail = email.value.trim();
    currPhone = phone.value.trim();
})

const form =document.getElementById("userEdit")

form.addEventListener("submit", async function(event){
 event.preventDefault();

 const nameRegex = /^[a-zA-Z]+$/;
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const phoneRegex = /^[1-9]\d{9}$/;

 if(!nameRegex.test(name.value.trim())){
    submitError.innerHTML = "Please enter avalid name"

 } else if (!emailRegex.test(email.value.trim())){
    submitError.innerHTML = "Invalid email"
 }else if(!phoneRegex.test(phone.value.trim())){
    submitError.innerHTML = "Invalid number"
 }else{
    submitError.innerHTML = "";
    let body = {};
    if(currName != name.value.trim()){
        body.name = name.value.trim()
    }
    if(currEmail != email.value.trim()){
        body.email = email.value.trim()
    }
    if(currPhone != phone.value.trim()){
        body.phone = phone.value.trim()
    }
    body.userId = form.getAttribute('data-user-id');
    console.log(body);
    const response = await fetch("/admin/userEdit",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify(body)
    })
    if(response.ok){
        window.location.href = '/admin/dashboard';
    }
    else if(response.status == 400){
        const data = await response.json();
        alert(data.message);
    }
 }

})