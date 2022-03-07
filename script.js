// Take the input and Fetch the Phones data link
const inputValue = () => {
  const inputAria = document.getElementById("input-aria");
  const inputText = inputAria.value;
  if (inputText == "" || Number(inputText)) {
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
    // div.classList.add("grid grid-cols-3");
    div.innerHTML = `
      <div>
                <img src=${inputDatas.image} class=""/>
                <div class="w-full">
                  <h5 class="w-full">${inputDatas.phone_name}</h5>
                  <p class="w-full">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <button  onclick="allPhoneDetails('${inputDatas.slug}')" type="button" class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-5 rounded-full">Details</button>
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
  const releaseDateCondition = document.createElement("div");
  phoneDetails.textContent = "";
  // detailsDiv.classList.add("w-full");
  const commonDetails = () => {
    detailsDiv.innerHTML = `
    <div>
    <p>- ${allDetails.data.mainFeatures.storage}</p>
    <p>- ${allDetails.data.mainFeatures.displaySize}</p>
    <p>- ${allDetails.data.mainFeatures.chipSet}</p>
    <p>- ${allDetails.data.mainFeatures.memory}</p>
    <p class="mb-4">- ${allDetails.data.mainFeatures.sensors}</p>
    <a href="#" class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-5 rounded-full w-full">Buy Now</a>
    </div>
  </div>
  `;
    releaseDateCondition.appendChild(detailsDiv);
  };
  if (allDetails.data.releaseDate == "") {
    commonDetails();
    releaseDateCondition.innerHTML = `
    <div><img src="${allDetails.data.image}"></div>
    <h1 class="text-3xl">${allDetails.data.name}</h1>
    <p>- Release Date not found</p>;
    `;
    phoneDetails.appendChild(releaseDateCondition);
    console.log(commonDetails());
  } else {
    releaseDateCondition.innerHTML = `
    <div><img src="${allDetails.data.image}"></div>
    <h1 class="text-3xl">${allDetails.data.name}</h1>
    <p>- ${allDetails.data.releaseDate}</p>;
    `;
    commonDetails();
    phoneDetails.appendChild(releaseDateCondition);
  }
};
