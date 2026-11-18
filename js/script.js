let BtnLogin=document.querySelectorAll("header button")[0]
let BtnRegister=document.querySelectorAll("header button")[1]
let allProducts=document.querySelector(".main_products")
let BtnLogout=document.querySelector(".header_open button")
let BtnCart=document.querySelector(".header_open a")
let productContainer=document.querySelector(".product_container")


BtnLogin.addEventListener("click",goToLogin)
BtnRegister.addEventListener("click",goToRegister)
BtnLogout.addEventListener("click",goToLogout)
BtnCart.addEventListener("click", openCart)

Products=[
    {
        id:1,
        image:"images/1d17d5889293e106be21021c5ef3d2ee.jpg",
        title:"moisturizer cream",
        price:"40",
        category:"moisturizer"
    },
    {
        id:2,
        image:"images/9efa8607747399318adf76b07a451530.jpg",
        title:"aloe vera gel",
        price:"25",
        category:"moisturizer"
    },
    {
        id:3,
        image:"images/1331e716b0fc3c0a6a0c723ed4aee40b.jpg",
        title:"sunscreen",
        price:"50",
        category:"sunscreen"
    },
    {
        id:4,
        image:"images/c9dbcd41627faf27e62af56483f7a26f.jpg",
        title:"vaseline lip therapy",
        price:"17",
        category:"lip care"
    },
    {
        id:5,
        image:"images/a11564d343d6264f0867e9b372f7ef70.jpg",
        title:"shea sugar body scrub",
        price:"35",
        category:"body care"
    },
    {
        id:6,
        image:"images/0551da7897011a09676c079d35472ffe.jpg",
        title:"micellar cleansing water",
        price:"40",
        category:"cleanser"
    },
    {
        id:7,
        image:"images/c99a26301f59f6fe49654337f044f80c.jpg",
        title:"glow serum",
        price:"50",
        category:"serum"
    },
    {
        id:8,
        image:"images/658e9e780817938e6354f3ea081753b8.jpg",
        title:"lip glowy balm",
        price:"15",
        category:"lip care"
    },
    {
        id:9,
        image:"images/fae70e3f19c47aa8ea9240cd4fde1361.jpg",
        title:"face wash",
        price:"30",
        category:"cleanser"
    }

]



function drawItems(){
    let cartItems=JSON.parse(localStorage.getItem("ProductsInCart"))||[]

    let favItems=JSON.parse(localStorage.getItem("productsInFav"))||[]
  let prod=Products.map((item)=>{
    let isInCart=cartItems.some(cartItem=>cartItem.id===item.id)

    let isFav=favItems.some(element =>element.id===item.id)
    let heartColor=isFav ? "text-[red]":"text-stone-500"
   return` <div class="product_card border border-[#c6486c] rounded-lg h-[85vh]">
            <img src="${item.image}" class="rounded-lg w-[100%] h-[65%]">

            <div class="item_details capitalize text-center text-[#800f2f]" >

               <h2 class="my-3 text-2xl font-bold">${item.title}</h2>
               <p class="text-lg">price: <span>$${item.price}</span></p>
               <p class="my-3 text-lg" >category: <span>${item.category}</span></p>
               <i class="fa-solid fa-heart text-2xl ${heartColor} hover:cursor-pointer" onclick="toggleFav(${item.id})"></i>
               <button id="add-${item.id}" class="add_cart capitalize w-32 h-12 border-2 ml-3 rounded-lg bg-[#c6486c] text-[#fff]" style="display:${isInCart? 'none':'inline-block'}" onclick="addToCart(${item.id})">add to cart</button>
               <button id="remove-${item.id}" class="remove_cart capitalize w-44 h-12 border-2 ml-3 rounded-lg bg-[#d60d18] text-[#fff]" style="display:${isInCart? 'inline-block':'none'}" onclick="removeFromCart(${item.id})">remove from cart</button>


            </div>    <!-- /item_details -->

         </div>`
  })
  allProducts.innerHTML=prod.join("")
}          

if(allProducts){
    drawItems()
}




function goToLogin(){
    location.href="login.html"
}
function goToRegister(){
    location.href="Register.html"
}

function goToLogout(){
    localStorage.clear()
    location.href="index.html"
}


        
function openCart(){

    if(productContainer.style.display==="block"){
        productContainer.style.display="none"
        return
    }

   productContainer.style.display="block"
   drawCart()
  

}         




let productNum=document.querySelector(".shopping_cart span")

function addToCart(proID){
    
    
    document.getElementById("add-"+proID).style.display="none"
    document.getElementById("remove-"+proID).style.display="inline-block"
    let chosenItem=Products.find((item) =>item.id===proID)
    if(!chosenItem)return;
    let cartItems=localStorage.getItem("ProductsInCart")?JSON.parse(localStorage.getItem("ProductsInCart")):[]
    let existingItem=cartItems.find((item) => item.id===proID)
    if(existingItem){
        return
    }
    else{
        cartItems.push(chosenItem)
    }
    
localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))
productNum.innerHTML=cartItems.length
drawCart()

}

function drawCart(){
     productContainer.innerHTML=""
   let addedItem=localStorage.getItem("ProductsInCart")?JSON.parse(localStorage.getItem("ProductsInCart")):[]
if(addedItem.length>0){
    addedItem.map(item =>{
    productContainer.innerHTML += `<p class="bg-[pink] text-center w-[90%] m-auto my-3 rounded-lg text-[18px] flex justify-around" >
    <span>${item.title}
    
    <br>
    <button class="btn_dec" onclick="decNum(event,${item.id})">-</button>
    <span class="num_prod">${item.quantity ||1}</span>
    <button class="btn_inc" onclick="incNum(event,${item.id})">+</button>
    </span>
    
    <span> price:<br> $${Number(item.price)*(item.quantity||1)}</span>
    </p>`
    
})
productContainer.innerHTML+=`
<div class="text-center">
<a href="cart.html" class="capitalize block text-[#fff] bg-[#b84364] py-2 rounded-lg mb-5 mx-3 font-bold focus:bg-[#bf204d]"> view all products</a>
</div>`
    }
}




function incNum(e,id){
    if(e) {
        e.stopPropagation()
    } 
   
  let cartItems=JSON.parse(localStorage.getItem("ProductsInCart"))||[]
  let product=cartItems.find(item =>item.id===id)
  if(product){
    product.quantity=(product.quantity ||1)+1
    localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))
    productNum.innerHTML=cartItems.length
  }drawCart()
}

function decNum(e,id){
    if(e) {
        e.stopPropagation()
    } 
   
  let cartItems=JSON.parse(localStorage.getItem("ProductsInCart"))||[]
  let product=cartItems.find(item =>item.id===id)
  if(product&& (product.quantity||1)>1){
    product.quantity=(product.quantity ||1) -1
    localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))
    productNum.innerHTML=cartItems.length
  drawCart()
  }
}


productNum.innerHTML=JSON.parse(localStorage.getItem("ProductsInCart"))?.length||0


function removeFromCart(id){

 document.getElementById("add-"+id).style.display="inline-block"
    document.getElementById("remove-"+id).style.display="none"


let cartItems=JSON.parse(localStorage.getItem("ProductsInCart"))||[]
cartItems=cartItems.filter(item=>item.id!==id)
localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))
productNum.innerHTML=cartItems.length
drawCart()
}




let favoriteCarts=document.querySelector(".favoriteCarts")
let favIcon=document.querySelector(".fav_card i")



function drawFavItems(){

    let favoriteCarts = document.querySelector(".favoriteCarts");
if(!favoriteCarts) return
 let favItems=JSON.parse(localStorage.getItem("productsInFav"))||[]
 if(favItems.length===0){
    favoriteCarts.innerHTML=`
     <p class="ml-12 text-2xl text-[#4d363d]">You have no favorite items.</p>`
     return
 }

    let cartContent=""
favItems.forEach(item => {
    
    cartContent+=`
    <div class="fav_card text-[#800f2f] border border-1 border-pink-600 min-w-[300px] h-[400px] flex-shrink-0 rounded-xl">
            
                <div class="selectedImage w-full h-[60%]">
                 <img src="${item.image}" class="w-full h-[100%] rounded-lg">
                </div>      

                <div class="selectedText capitalize p-3 text-lg">
                <h2 class="font-bold text-2xl">${item.title}</h2>
                <p class="my-2">category: <span>${item.category}</span></p>
                <i class="fa-solid fa-heart text-[red] text-2xl hover:cursor-pointer" onclick="toggleFav(${item.id})"></i>
                </div>      

            
          </div>`
    
})
favoriteCarts.innerHTML=cartContent

}


function toggleFav(id){
    

    let chooseFavItem=Products.find((item)=>item.id===id)

    let favItems=localStorage.getItem("productsInFav")? JSON.parse(localStorage.getItem("productsInFav")):[]

    let favExist=favItems.findIndex((item)=>item.id===id)
    if(favExist > -1){
        favItems=favItems.filter((item)=>item.id !==id)
    }
    else{
        favItems.push(chooseFavItem)
    }
    localStorage.setItem("productsInFav",JSON.stringify(favItems))
    
     drawFavItems();
    drawItems();
   
}


if (favoriteCarts) {
    drawFavItems();
}



let selectSearch=document.getElementById("select-search")
let textSearch=document.querySelector(".main-search input")
let btnSearch=document.querySelector(".main-search button")


btnSearch.addEventListener("click",function(e){
      e.preventDefault();
      searchProducts()
})

function searchProducts(){
    let text=textSearch.value.toLowerCase().trim()
    let searchType=selectSearch.value


    let selectedItems=Products.filter((item)=>{
        if(searchType==="search by product name"){
            return item.title.toLowerCase().includes(text)
        }
        else if(searchType==="search by category"){
            return item.category.toLowerCase().includes(text)
        }

    })






    let cartItems=JSON.parse(localStorage.getItem("ProductsInCart"))||[]
    let favItems=JSON.parse(localStorage.getItem("productsInFav"))||[]

    let prod=selectedItems.map((item)=>{
        let isInCart=cartItems.some(cartItem=>cartItem.id===item.id)
        let isFav=favItems.some(element=>element.id===item.id)
        let heartColor=isFav? "text-[red]":"text-stone-500"
        return `<div class="product_card border border-[#c6486c] rounded-lg h-[85vh]">
            <img src="${item.image}" class="rounded-lg w-[100%] h-[65%]">

            <div class="item_details capitalize text-center text-[#800f2f]" >

               <h2 class="my-3 text-2xl font-bold">${item.title}</h2>
               <p class="text-lg">price: <span>$${item.price}</span></p>
               <p class="my-3 text-lg" >category: <span>${item.category}</span></p>
               <i class="fa-solid fa-heart text-2xl ${heartColor} hover:cursor-pointer" onclick="toggleFav(${item.id})"></i>
               <button id="add-${item.id}" class="add_cart capitalize w-32 h-12 border-2 ml-3 rounded-lg bg-[#c6486c] text-[#fff]" style="display:${isInCart? 'none':'inline-block'}" onclick="addToCart(${item.id})">add to cart</button>
               <button id="remove-${item.id}" class="remove_cart capitalize w-44 h-12 border-2 ml-3 rounded-lg bg-[#d60d18] text-[#fff]" style="display:${isInCart? 'inline-block':'none'}" onclick="removeFromCart(${item.id})">remove from cart</button>


            </div>    <!-- /item_details -->

         </div>`
        
    })


    if(selectedItems.length>0){
        allProducts.innerHTML=prod.join("")
    }

}

