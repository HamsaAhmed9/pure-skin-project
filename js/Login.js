let Email=document.getElementById("email")
let password=document.getElementById("password")
let LoginBtn=document.querySelector(".login_form button")


LoginBtn.addEventListener("click",clickForLogin)



function clickForLogin(e){
    e.preventDefault()
    if(Email.value.trim()===""||password.value.trim()==""){
        alert("Invalid email or password.")
    }
    else{
        location.href="index.html"
    }
}