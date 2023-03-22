var productNameInput = document.getElementById('productName') ;
var productPriceInput = document.getElementById('productPrice') ;
var productCategoryInput = document.getElementById('productCategory'); 
var productDescInput = document.getElementById('productDesc') ;
var addBtn = document.getElementById('addBtn') ;
var searchTxt = document.getElementById('search') ;
var inputs=document.getElementsByClassName('form-control');
var currentIndex = 0;

var products=[];
if (JSON.parse(localStorage.getItem('productList')) != null)
{
    products= JSON.parse(localStorage.getItem('productList'))
    displayData()  
}



addBtn.onclick=function()
{
    if (addBtn.innerHTML == 'Add product') //add mode
    {
      addProduct()
    }
    else {  //update mode
      updateProduct()
    }
       
    displayData()   
    resetForm()
}

function addProduct()
{
    var product=
    {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value, 
        desc:productDescInput.value,
    }
    products.push(product)
    localStorage.setItem('productList',JSON.stringify(products))
}

function displayData()
{
    var Box=""
    for(var i=0;i<products.length;i++)
    {
        Box+=
        ` 
        <tr>
         <td>${products[i].name}</td>
         <td>${products[i].price} </td>
         <td>${products[i].category}</td>
         <td>${products[i].desc}</td>
         <td> <button  onclick=getProductInfo(${i}) class="btn text-white"  > Update </button>  </td>
         <td> <button  onclick=deleteProduct(${i}) class="btn text-white " > Delete </button>  </td>
        </tr>
         `
    }
    document.getElementById('tableBody').innerHTML=Box
    
}
function getProductInfo(index) {
    currentIndex = index;
    var currentProduct = products[index];
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescInput.value = currentProduct.desc;
    addBtn.innerHTML = "update product"
  }
  function updateProduct() {
    var product =
    {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    }
    products[currentIndex] = product
    localStorage.setItem('productList', JSON.stringify(products))
    addBtn.innerHTML = 'Add product'
  
  }
function deleteProduct(index)
{
    products.splice(index,1)
    displayData()
    localStorage.setItem('productList',JSON.stringify(products))

}

function resetForm()
{
    for(var i=0;i<inputs.length;i++)
    {
        inputs[i].value=''
    }
}

searchTxt.addEventListener('keyup',function()
{
    search(this.value)
})

function search(searchTxt)
{  
    var Box=""
    for(var i=0;i<products.length;i++)
    {
        if(products[i].name.toLowerCase().includes(searchTxt.toLowerCase()))
        {
            Box+=` 
            <tr>
             <td>${products[i].name}</td>
             <td>${products[i].price} </td>
             <td>${products[i].category}</td>
             <td>${products[i].desc}</td>
             <td> <button  onclick=getProductInfo(${i}) class="btn text-white"  > Update </button>  </td>
             <td> <button  onclick=deleteProduct(${i}) class="btn text-white " > Delete </button>  </td>
            </tr> `
        }
       
    }
    document.getElementById('tableBody').innerHTML=Box
}

var nameAlert= document.getElementById('nameAlert')
productNameInput.onkeyup=function()
{
    var nameRejex=/^[A-Z][a-z]{2,9} ?([0-9]{1,2})?$/
    if(nameRejex.test(productNameInput.value))
    {
        addBtn.removeAttribute('disabled')
        productNameInput.classList.add('is-valid')
        productNameInput.classList.remove('is-invalid')
        nameAlert.classList.add('d-none')


    }
    else
    {
        addBtn.disabled='true'
        productNameInput.classList.add('is-invalid')
        productNameInput.classList.remove('is-valid')
        nameAlert.classList.remove('d-none')
    }
}
var priceAlert= document.getElementById('priceAlert')
productPriceInput.onkeyup=function()
{
    var priceRejex=/^([3-4][0-9]{3,4}|50000)$/
    if(priceRejex.test(productPriceInput.value))
    {
        addBtn.removeAttribute('disabled')
        productPriceInput.classList.add('is-valid')
        productPriceInput.classList.remove('is-invalid')
        priceAlert.classList.add('d-none')


    }
    else
    {
        addBtn.disabled='true'
        productPriceInput.classList.add('is-invalid')
        productPriceInput.classList.remove('is-valid')
        priceAlert.classList.remove('d-none')
    }
}


