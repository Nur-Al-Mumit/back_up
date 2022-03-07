// Take the input and Fetch the Phones data link
const inputValue = () => {
  const inputAria = document.getElementById("input-aria");
  const inputText = inputAria.value;
  if (inputText == "" || Number(inputText)) {
    alert("We can't find any phone");
  } else {
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
  if (inputData.length == 0) {
    alert("We can't find any phone");
  } else {
    const display = document.getElementById("display-container");
    display.textContent = "";
    phoneDetails.textContent = "";
    inputData.forEach((inputDatas) => {
      console.log(inputData.length);
      const div = document.createElement("div");
      div.innerHTML = `
        <div><img src=${inputDatas.image} class=""/>
        <div class="w-full">
        <h2 class="text-3xl">${inputDatas.phone_name}</h2>
        <p class="mb-4">${inputDatas.brand}</p>
        <button onclick="allPhoneDetails('${inputDatas.slug}')" class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-5 rounded-full">Details</button>
        </div>
        </div>
        `;
      display.appendChild(div);
    });
  }
};
// To make the Details button dynamic and show phone's Details on UI

const allPhoneDetails = (detailsId) => {
  const detailsUrl = `https://openapi.programming-hero.com/api/phone/${detailsId}`;
  console.log(detailsId);
  fetch(detailsUrl)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data));
};
const showPhoneDetails = (allDetails) => {
  const detailsDiv = document.createElement("div");
  const releaseDateCondition = document.createElement("div");
  phoneDetails.textContent = "";
  // For the common Details in phones
  const commonDetails = () => {
    // Handle the error if phone doesn't carry Others
    if (!allDetails.data.others) {
      detailsDiv.innerHTML = `
      <div>
      <p>- Brand: ${allDetails.data.brand}</p>
      <p>- Storage: ${allDetails.data.mainFeatures.storage}</p>
      <p>- Display: ${allDetails.data.mainFeatures.displaySize}</p>
      <p>- ChipSet: ${allDetails.data.mainFeatures.chipSet}</p>
      <p>- Memory: ${allDetails.data.mainFeatures.memory}</p>
      <p class="mb-4">- Sensors: ${allDetails.data.mainFeatures.sensors}</p>
      <a href="#" class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-5 rounded-full w-full">Buy Now</a>
      </div>
      `;
    } else {
      detailsDiv.innerHTML = `
      <div>
      <p>- Brand: ${allDetails.data.brand}</p>
      <p>- Storage: ${allDetails.data.mainFeatures.storage}</p>
      <p>- Display: ${allDetails.data.mainFeatures.displaySize}</p>
      <p>- ChipSet: ${allDetails.data.mainFeatures.chipSet}</p>
      <p>- Memory: ${allDetails.data.mainFeatures.memory}</p>
      <p>- WLAN: ${allDetails.data.others.WLAN}</p>
      <p>- Bluetooth: ${allDetails.data.others.Bluetooth}</p>
      <p>- GPS: ${allDetails.data.others.GPS} NFC:${allDetails.data.others.NFC} Radio:${allDetails.data.others.Radio}</p>
      <p>- USB: ${allDetails.data.others.USB}</p>
      <p class="mb-4">- Sensors: ${allDetails.data.mainFeatures.sensors}</p>
      <a href="#" class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-5 rounded-full w-full">Buy Now</a>
      </div>
      `;
    }
    releaseDateCondition.appendChild(detailsDiv);
  };
  // If the phone haven't any Release Date
  if (allDetails.data.releaseDate == "") {
    commonDetails();
    releaseDateCondition.innerHTML = `
    <div><img src="${allDetails.data.image}"></div>
    <h1 class="text-3xl">${allDetails.data.name}</h1>
    <p>- Release Date not found</p>
    `;
    phoneDetails.appendChild(releaseDateCondition);
    console.log(commonDetails());
  } else {
    releaseDateCondition.innerHTML = `
    <div><img src="${allDetails.data.image}"></div>
    <h1 class="text-3xl">${allDetails.data.name}</h1>
    <p>- ${allDetails.data.releaseDate}</p>
    `;
    commonDetails();
    phoneDetails.appendChild(releaseDateCondition);
  }
};
