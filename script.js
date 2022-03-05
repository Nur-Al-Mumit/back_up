// Take the input and Fetch the Phones data link
const inputValue = () => {
  const inputAria = document.getElementById("input-aria");
  const inputText = inputAria.value;
  if (inputText == "" || Number(inputText)){
    alert("please enter right option");
  } else {
    console.log(inputText);
    inputAria.value = "";
    const url = ` https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayItems(data.data));
  }
};
// Show the Fetch data on UI
const phoneDetails = document.getElementById("phone-details");
const displayItems = (inputData) => {
  const display = document.getElementById("display-container");
  display.textContent = "";
  phoneDetails.textContent = "";
  inputData.forEach((inputDatas) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card">
                <img src=${inputDatas.image} class="card-img-top w-50"/>
                <div class="card-body">
                  <h5 class="card-title">${inputDatas.phone_name}</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <button  onclick="allPhoneDetails('${inputDatas.slug}')" type="button" class="btn btn-outline-secondary">Details</button>
                </div>
              </div>
              `;
    display.appendChild(div);
  });
};
// To make the Details button dynamic and show phone's Details on UI

const allPhoneDetails = (detailsId) => {
  const detailsUrl = `https://openapi.programming-hero.com/api/phone/${detailsId}`;
  fetch(detailsUrl)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data));
};
const showPhoneDetails = (allDetails) => {
  const detailsDiv = document.createElement("div");
  phoneDetails.textContent = "";
  detailsDiv.innerHTML = `
    <div class="card mx-auto w-50 d-flex flex-row mb-4">
    <img src="${allDetails.data.image}" class="card-img-top" alt="">
    <div class="card-body">
    <h1 class="card-title">${allDetails.data.name}</h1>
    <p class="card-text">- ${allDetails.data.release}</p>;
    <p class="card-text">- ${allDetails.data.mainFeatures.storage}</p>
    <p class="card-text">- ${allDetails.data.mainFeatures.displaySize}</p>
    <p class="card-text">- ${allDetails.data.mainFeatures.chipSet}</p>
    <p class="card-text">- ${allDetails.data.mainFeatures.memory}</p>
    <p class="card-text">- ${allDetails.data.mainFeatures.sensors}</p>
    <a href="#" class="btn btn-primary">Buy Now</a>
    </div>
  </div>
  `;
  phoneDetails.appendChild(detailsDiv);
};
