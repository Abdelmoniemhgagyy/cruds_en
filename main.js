let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let ads =document.getElementById("ads");
let discount =document.getElementById("discount");
let total =document.getElementById("total");
let count =document.getElementById("count");
let category =document.getElementById("category");
let create =document.getElementById("create");
let mood="create";
let tmp;
// Start Get Total 
function getTotal(){

    if (price.value != '' ){
        let result = +price.value + +taxes.value + +ads.value - +discount.value ;
        total.innerHTML=result;
        total.style.backgroundColor="green";
    }
    else{
        total.innerHTML=" ";
        total.style.backgroundColor="#2a009e";
    }
}

//Create Product 

let addPro
if(localStorage.Product != null){
    addPro=JSON.parse(localStorage.Product)
}else{
    addPro = []
}

create.onclick=function(){
    let objPro={
                title : title.value.toLowerCase(),
                price : price.value,
                taxes : taxes.value,
                ads   : ads.value,
                total : total.innerHTML,
                count : count.value,
             discount : discount.value,
             category : category.value.toLowerCase(),
    }
   
if(title.value !="" && price.value !="" && category.value !=""){
    if(mood==="create"){
        // count 
        if(objPro.count > 1){
           for(let i = 0 ;i < objPro.count ;i++){
            addPro.push(objPro)
           }
       }else{
            addPro.push(objPro)
       }
           }
           else{
               addPro[tmp]=objPro;
               count.style.display="block"
               create.innerHTML="Create"
               mood="create";
             
           }
           clearInputs()
}
  

// --------------------------------

    localStorage.setItem("Product",JSON.stringify(addPro))

    readData()
}



// Clear inputs 

function clearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}


// Read 

function readData(){
    getTotal()
let table ='';
for (let i =0; i< addPro.length;i++){
table += `
<tr>
<td>${i+1}</td>
<td>${addPro[i].title}</td>
<td>${addPro[i].price}</td>
<td>${addPro[i].taxes}</td>
<td>${addPro[i].ads}</td>
<td>${addPro[i].discount}</td>
<td>${addPro[i].count}</td>
<td>${addPro[i].category}</td>
<td><button onclick="updataData(${i})" class="btn">update</button></td>
<td><button onclick="deleteElement(${i})" class="btn">delete</button></td>
</tr>

`
}
document.getElementById("tbody").innerHTML=table;
//delete all condition
let btn =document.getElementById("deleteall");
if (addPro.length > 0){
    btn.innerHTML=`<button onclick="deleteall()"> delete all ( ${addPro.length} ) </button>`
}else {
    btn.innerHTML=''
}

}

readData()


// delete element 

function deleteElement(i){
    
    addPro.splice(i,1);
    localStorage.Product = JSON.stringify(addPro);

readData()
}

// delete all 

function deleteall(){
    localStorage.clear();
    addPro.splice(0);
    readData()
}

//count 
//for loop under push


//Updata

function updataData(i){
    title.value =addPro[i].title;
    price.value=addPro[i].price
    taxes.value=addPro[i].taxes
    ads.value=addPro[i].ads
    getTotal()
    // total.innerHTML=addPro[i].total
    count.style.display="none"
    category.value=addPro[i].category
    mood="updata"
    create.innerHTML="Updata"
    tmp=i;
    scroll({
        top:0 ,
        behavior:"smooth",
    })

}

// Search
let searchMood="Title"

function search(id){
let search =document.getElementById("search")
    if(id=="SearchByTitle"){
        searchMood="Title"
    }else{
        searchMood="Category"
    }

search.focus()
search.placeholder=`Search by ${searchMood}`;
search.value ="";
readData()
}

function searchData(value){
    let table ='';
    for(let i=0 ; i<addPro.length;i++){
if(searchMood==="Title"){
if(addPro[i].title.includes(value.toLowerCase())){
    
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${addPro[i].title}</td>
    <td>${addPro[i].price}</td>
    <td>${addPro[i].taxes}</td>
    <td>${addPro[i].ads}</td>
    <td>${addPro[i].discount}</td>
    <td>${addPro[i].count}</td>
    <td>${addPro[i].category}</td>
    <td><button onclick="updataData(${i})" class="btn">update</button></td>
    <td><button onclick="deleteElement(${i})" class="btn">delete</button></td>
    </tr>
    
    `
}}

else{
        if(addPro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${addPro[i].title}</td>
            <td>${addPro[i].price}</td>
            <td>${addPro[i].taxes}</td>
            <td>${addPro[i].ads}</td>
            <td>${addPro[i].discount}</td>
            <td>${addPro[i].count}</td>
            <td>${addPro[i].category}</td>
            <td><button onclick="updataData(${i})" class="btn">update</button></td>
            <td><button onclick="deleteElement(${i})" class="btn">delete</button></td>
            </tr>
            
            `
        }
        }
}

document.getElementById("tbody").innerHTML=table;

}
