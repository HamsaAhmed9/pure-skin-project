let firstName=document.getElementById("firstName")
let lastName=document.getElementById("lastName")
let email=document.getElementById("email")
let password=document.getElementById("password")
let BtnRegister=document.querySelector(".login_form button")






BtnRegister.addEventListener("click",clickForRegister)


function clickForRegister(e){
    e.preventDefault()
   
    if(
    firstName.value.trim()==="" || lastName.value.trim()===""|| email.value.trim()==="" || password.value.trim()===""
){
    alert("Please fill in all fields")
}
else{
    localStorage.setItem("firstName",firstName.value)
    localStorage.setItem("lastName",lastName.value)
    localStorage.setItem("email",email.value)
    localStorage.setItem("password",password.value)


    alert("Account created successfully!")
    location.href="login.html"


}



}
