let firstName=document.getElementById("firstName")
let headerBtns=document.querySelector(".header_Btns")
let headerOpen=document.querySelector(".header_open")
let welcomeName=document.querySelector(".header_open span")



if(localStorage.getItem("firstName")){
    headerBtns.remove()
    headerOpen.style.display="flex"
    headerOpen.style.alignItems="center"
    welcomeName.innerHTML=localStorage.getItem("firstName")

    

}