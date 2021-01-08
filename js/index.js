// initializing aos lib
AOS.init();
//landing page class select 
const landingPage = document.querySelector('.landing-page')
//array of imgs 
let imgArr = ['img1.jpg' , 'img2.jpg' , 'img3.jpg' , 'img4.jpg' , 'img5.jpg'];
var enabled ;
// fucntion change images within intervals of time
function carusel(arr){
    // check localStorage 
    let backgroundOption = localStorage.getItem('backgroundOption');
            if( backgroundOption == 'yes'){
                enabled = true;
            }else if(backgroundOption == 'no'){
                enabled = false;
            }

    var intId =  setInterval(() => {
            if(enabled){
                //generate random number 
                let random = Math.floor(Math.random() * arr.length);
                //setting background image 
                landingPage.style.backgroundImage = `url(imgs/${arr[random]})`
            }
            if(!enabled){
                clearInterval(intId)
            }
        }, 10000);
}

//check if mainColor in localStorage
let mainColor = localStorage.getItem("mainColor") 
if(mainColor !== null){
    // set main-color variable from localStorage
    document.documentElement.style.setProperty('--main-color' , mainColor)

    // loop through colors array 
    let elemColors = document.querySelectorAll('.color');
    
    elemColors.forEach(element => {
        // remove class active 
        element.classList.remove('active')

        // find matching color with localStorage 
        if(element.textContent === mainColor){
            // add class active to matching element
            element.classList.add('active')
        }
    })
}
// onclick options 
document.onclick = function(e){
    // change color 
    if(e.target.classList.contains('color')){

        let color = e.target.firstChild.innerHTML;
        // set color to local Storage 
        localStorage.setItem("mainColor" ,color)

        // change main-color variable 
        document.documentElement.style.setProperty('--main-color' , color);

        // looping through arr of elements remove active class
        let arr =  e.target.parentElement.querySelectorAll('.active')
        arr.forEach(element => {
           element.classList.remove('active') 
        });

        // add active class onClick
        e.target.classList.add('active') 

    }
    // change background options
    if(e.target.classList.contains('yes')) {
        enabled = true;
        localStorage.setItem('backgroundOption' , 'yes' )
        carusel(imgArr)

    }
    if(e.target.classList.contains('no')){
        enabled = false;
        localStorage.setItem('backgroundOption' , 'no' )
        carusel(imgArr)

    }
}

//select gear icon
const gear = document.querySelector('.icon');

gear.onclick = function(){
    this.classList.toggle('fa-spin')
    this.parentElement.classList.toggle('toggle')    
}

// create popup 

let thumbnails = document.querySelectorAll(".gallery-img");
let popupContent = document.querySelector('#popup-content')
let popupBackground = document.querySelector("#popup-background");
let popupImage = document.querySelector("#popup-img");



thumbnails.forEach(thumbnail => {

    thumbnail.addEventListener("click", function(){
        popupBackground.style.display = "block";
        popupImage.src = this.src;

    })
});

popupBackground.addEventListener("click", function(){
    popupBackground.style.display = "none";
})

// let closeBtn = document.createElement("span");
// closeBtn.classList.add('closeBtn')

// closeBtn.innerHTML = '&times;'

// popupContent.appendChild(closeBtn);

// closeBtn.onclick = () => {
//     popupBackground.style.display = "none"
// }


// testimonials 
let testArr = document.querySelectorAll('.testimonials');
let myArr =Array.from(testArr)

function testimonials(){    
    let i=0;
    setInterval(() => {

        myArr.forEach(element => {
            if(!element.classList.contains('d-none')){
                element.classList.add('d-none')
            }
        });

        if(i < myArr.length){
            myArr[i].classList.remove('d-none');
            i++
        }else{
            i=0;
            myArr[i].classList.remove('d-none');
        }

    }, 5000);
}
testimonials()



let myLinks = document.querySelectorAll('.myScroll')
function myScroll(e){

    let myId = e.target.textContent;
    var myDiv = document.getElementById(myId)

    myDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })

    myLinks.forEach(link => {
        link.classList.remove('active')
    });

    if(e.target.parentElement.classList.contains('links')){
        e.target.classList.add('active')
    }
}

for(i=0 ; i < myLinks.length ; i++){
    myLinks[i].addEventListener('click' , myScroll);
}