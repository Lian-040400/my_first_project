const image = document.querySelector(".image");
const slide = document.querySelector(".slider");
const circles=document.querySelector(".circles");
const imgArray = ["1.jpg", "2.jpg", "3.jpg"];
const circle=document.createElement("div");
const addImageButton = document.querySelector('.addImageButton');
const workImageRow = document.querySelector('.workImageRow');
const upButton=document.querySelector(".up-button");

let imgsCount = 0;
let clickCount = 0;

circle.classList.add("circle");
const nodesArray=[];
 for(let i=0;i<imgArray.length;i++){
    
     const node=circle.cloneNode();
     if(i===0){
         node.classList.add("active");

    }
     nodesArray.push(node);
     circles.appendChild(node);
     node.dataset.index=i;
     node.onclick=handelCircleClick;
    
 }

 let indexNow = 0;
 let prevIndex;
 function goRight() {
    prevIndex=indexNow;
    indexNow++;
    if (indexNow === imgArray.length ) {
        indexNow = 0;
    }
    cangeImage();
}


let interval = null;
start();

function start() {
    interval = setInterval(goRight, 2000);
}
function end() {
    clearInterval(interval);
    interval = null;
}

image.onmouseover = end;
image.onmouseleave = start;
 function handelCircleClick(event) {
    prevIndex=indexNow;
   indexNow= +event.target.dataset.index;
   if(prevIndex===indexNow){
       return 0;
   }

   cangeImage();

}
function cangeImage() {
    image.src = "./slide-images/" + imgArray[indexNow];
    nodesArray[indexNow].classList.add("active");
    nodesArray[prevIndex].classList.remove("active");
}



addImageButton.onclick = ()=> {
    clickCount++;

    request('get', 'https://jsonplaceholder.typicode.com/photos/', null, (res)=>{
const urls = res.splice(imgsCount, 6).map(el => el.thumbnailUrl);

imgsCount = urls.length;

urls.forEach(url => {
    const template = ` <div class=" col-12 col-xl-4"><img class="work-images" src="${url}"></div>`;
    workImageRow.insertAdjacentHTML('beforeend', template);
});

if(clickCount>3){
    addImageButton.onclick = null;
}

});

}







const form = document.forms[0];
const firstInput=document.querySelector("#first-input");
const secondInput=document.querySelector("#second-input");
const textArrea=document.querySelector("#text-arrea");

console.log(form);

form.onsubmit = (event)=>{
   event.preventDefault();

    const data = {};
    data[firstInput.name] = firstInput.value;
    data[secondInput.name] = secondInput.value;
   data[textArrea.name] = textArrea.value;
    console.log(data);

    request("post","https://jsonplaceholder.typicode.com/",data,(result)=>{
        console.log(result);
});
}
function request(method, url, data, callback){
    const xhr = new XMLHttpRequest();
    console.log(url);
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
   
    xhr.onreadystatechange = function(){
       if(this.readyState === 4 && this.status>=200 && this.status <400){
           callback(JSON.parse(this.response));
       }
   };
   
   if(data){
       console.log(JSON.stringify(data));
    xhr.send(JSON.stringify(data)); 
   }
   else {
    xhr.send(); 
   }

}





upButton.onclick=()=>{
    document.documentElement.scroll(0,0);
}

document.addEventListener("scroll",(event)=>{
    const scrolPosition=document.documentElement.scrollTop;
    const documentHeight=document.body.clientHeight;

    if(documentHeight-scrolPosition<1000){
        upButton.classList.remove("hidden");
    }
    else{
        upButton.classList.add("hidden");
    }
});


const fullYear=new Date();
fullYear.getFullYear();
const date=document.querySelector(".date");
date.innerText=fullYear.getFullYear();
