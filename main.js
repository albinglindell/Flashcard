const frontField = document.querySelector("#front");
const backField = document.querySelector("#back");
const saveBtn = document.querySelector(".save");
const cardWrapper = document.querySelector(".cardWrapper");
const filterField = document.querySelector("#filter");
const filterBtn = document.querySelector(".filterBtn");
const cardData = JSON.parse(localStorage.getItem("cardList"));
let cardList = [];


const cardComponentContainer = (card) =>{
    const cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.classList.add("frontStyle");
    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.className = "close";
    
    cardContainer.innerHTML += `
        <h2 class="frontSide">${card.frontText}</h2>
       
        <h2 class="hidden backSide">${card.backText}</h2>
    `;
    const switchButton = document.createElement("button");
    switchButton.innerText = "Byt till baksidan";


    switchButton.addEventListener("click", e =>{
        const frontSide = cardContainer.querySelector(".frontSide");
        const backSide = cardContainer.querySelector(".backSide");

        //flip from front to bakside
        if(card.isFront){
            
           setTimeout(()=>{frontSide.classList.add("hidden")},100);
           setTimeout(()=>{backSide.classList.remove("hidden")},100);
            cardContainer.classList.remove("frontStyle");
            cardContainer.classList.add("backStyle");
            switchButton.innerText = "Byt till framsidan";
            card.isFront = false;
        }

        //flip from bakside to front
        else{
            
            setTimeout(()=>{frontSide.classList.remove("hidden")},100);
            setTimeout(()=>{backSide.classList.add("hidden")},100);
            cardContainer.classList.add("frontStyle");
            cardContainer.classList.remove("backStyle");
            switchButton.innerText = "Byt till baksidan";
            card.isFront = true;
        }
    });

    closeButton.addEventListener("click", () =>{

        cardList.splice(cardList.indexOf(card), 1); //remove item from cardList array
        localStorage.setItem("cardList", JSON.stringify(cardList)); //set local storage with new array
        cardWrapper.removeChild(cardContainer);
    });  
    cardContainer.appendChild(closeButton);
    cardContainer.appendChild(switchButton);
    return cardContainer;
}

const createCard = () => {
    return {
        frontText: frontField.value,
        backText: backField.value,
        isFront: true
    }
};

document.querySelector(".save").addEventListener("click", e =>{
    e.preventDefault();
    if(frontField.value==="" || backField.value===""){
        alert("Fyll in de tomma fälten");
        return;
    }

    const card = createCard();
    cardList.push(card);
    frontField.value = "";
    backField.value = "";


    cardWrapper.appendChild(cardComponentContainer(card, cardList.indexOf(card)));
    localStorage.setItem("cardList", JSON.stringify(cardList));
});

if(cardData){
    cardList = cardData;
    renderCards(cardList);
}


function renderCards(list){
    list.forEach((card, i) => {
        // console.log(card);
        const cardContainer = cardComponentContainer(card);
        cardWrapper.appendChild(cardContainer);
    });
}

function clearAllElements(parentElem){
    while(parentElem.firstChild){
        parentElem.removeChild(parentElem.lastChild);
    }
};

filterBtn.addEventListener("click", ()=>{
    
    const arr = cardList.filter(card => {
        return card.frontText.toLowerCase().includes(filterField.value.toLowerCase()) || card.backText.toLowerCase().includes(filterField.value.toLowerCase());
    })
    clearAllElements(cardWrapper);
    renderCards(arr);
})


