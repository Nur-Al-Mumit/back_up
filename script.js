const inputValue = () => {
  const inputAria = document.getElementById("input-aria");
  const inputText = inputAria.value;
  console.log(inputText);
  inputAria.value = "";
  const url = ` https://openapi.programming-hero.com/api/phones?search=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayItems(data.data));
};

const displayItems = (inputData) => {
  const display = document.getElementById("display-container");
  display.textContent = "";
  inputData.forEach((inputDatas) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card" onclick="allPhoneDetails('${inputDatas.slug}')">
                <img src=${inputDatas.image} class="card-img-top w-50"/>
                <div class="card-body">
                  <h5 class="card-title">${inputDatas.phone_name}</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                </div>
              </div>
              `;
    display.appendChild(div);
  });
};