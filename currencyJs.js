const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropDown = document.querySelectorAll(".fromTo select");
const but = document.querySelector(".convert");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#exchangeMsg");

for (let select of dropDown) {
    for (let currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name === "from" && currCode ==="USD"){
        newOption.selected = "Selected";
      }
      else if(select.name === "to" && currCode ==="INR"){
        newOption.selected = "Selected";
      }
         select.append(newOption);    
    }
    select.addEventListener("change",(evt) =>{
        upDateFlag(evt.target);
    });
}


const upDateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

but.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});


const updateExchangeRate = async () => {
  let amount = document.querySelector(".input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; // data ka ander date or countrycode dono tha es leya phala square brace[]  ka andar ka code date and countrycode mai say kya choose kerna hai es leya
                                                                                                                                  // or second square brace[] different different ka code mai say kon sa choose kerna hai es leya hai
  console.log(rate);
  let finalValue = amtVal*rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalValue} ${toCurr.value}`;
}
