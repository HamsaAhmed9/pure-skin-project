let selectedObjects=document.querySelector(".selectedObjects")


let totalPrice=document.querySelector(".total_price")
let priceNum=document.querySelector(".totalPrice span")



function drawSelectedItem(){
    
    let addedItem=JSON.parse(localStorage.getItem("ProductsInCart"))||[]


if(addedItem.length===0){
    selectedObjects.innerHTML=""
    if(totalPrice){
        totalPrice.style.display="none"
    }
    return;
}
selectedObjects.innerHTML=""
addedItem.forEach(item => {
    selectedObjects.innerHTML+=`
 <div class="selectedCard text-[#800f2f] border border-1 border-pink-600 flex justify-around w-[100%] h-[300px] m-auto rounded-xl">
                <div class="selectedImage w-[50%] h-[100%] px-5 py-10">
                 <img src="${item.image}" class="w-full h-[100%] rounded-lg">
                </div>      <!-- /selectedImage -->
                <div class="selectedText capitalize p-3 text-lg">
                <h2 class="font-bold text-2xl">${item.title}</h2>
                <p class="my-2">category: <span>${item.category}</span></p>
                <p class="my-2">price: $<span>${Number(item.price)*(item.quantity||1)}</span></p>
                <button class="w-[30px] h-[30px] text-[gray] border border-2 border-gray text-xl hover:bg-zinc-600 hover:border-none hover:text-[#fff]" onclick="decreament(${item.id})">-</button>
                <span>${item.quantity || 1}</span>
                <button class="w-[30px] h-[30px] text-[gray] border border-2 border-gray text-xl hover:bg-zinc-600 hover:border-none hover:text-[#fff]" onclick="increament(${item.id})">+</button>
                <button class="remove_cart capitalize w-44 h-12 border-2 rounded-lg bg-[#d60d18] text-[#fff] mt-3 hover:bg-[#a21f25]" onclick="deleteFromCart(${item.id})">remove from cart</button>
                </div>       <!-- /selectedText -->

            </div> `
});


let total=0;
addedItem.forEach(item=>{
    total+=Number(item.price)*(item.quantity||1)
})
let priceNum=document.querySelector(".total_price span")
priceNum.innerHTML=total.toFixed(2)
}
drawSelectedItem()




function increament(id){
      let cartItems=JSON.parse(localStorage.getItem("ProductsInCart")) ||[]
      let product=cartItems.find(item => item.id===id)
      if(product){
        product.quantity=(product.quantity||1)+1
        localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))
        drawSelectedItem()
      }
}


function decreament(id){
    let cartItems=JSON.parse(localStorage.getItem("ProductsInCart"))||[]
  let product=cartItems.find(item =>item.id==id)
  if(product&& (product.quantity||1)>1){
    product.quantity=(product.quantity ||1) -1
    localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))
   
  drawSelectedItem()
  }
}



function deleteFromCart(id){

    let cartItems=JSON.parse(localStorage.getItem("ProductsInCart"))
    cartItems=cartItems.filter(item=>item.id!==id)
    localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))
    productNum.innerHTML=cartItems.length
    drawSelectedItem()
}



