const form = document.querySelector(".form");
const dataInput = document.querySelector(".fieldset_data-input");
const bill = dataInput.querySelector(".fieldset__input_type_bill");
const selectButtons = dataInput.querySelectorAll(".btn");
const costumNumber = dataInput.querySelector(".fieldset__input_type_costom");
const clicked = [];
const numberOfPeople = dataInput.querySelector(".fieldset__input_type_people");
const dataOutput = document.querySelector(".fieldset_data-output");
const tipAmount = dataOutput.querySelector(".fieldset__calculate_tip");
const total = dataOutput.querySelector(".fieldset__calculate_total");
const resetButton = dataOutput.querySelector(".fieldset__reset-button");
let selectTip = 1;
let selectButton;
const spanZeroPeople = dataInput.querySelector(".fieldset__zero-people");

function clickSelectButton(clickedButton) {
  selectButton = clickedButton;
  resetButton.classList.remove("fieldset__reset-button_disabled");
  selectTip = 1;
  selectButtons.forEach(function (button) {
    button.classList.remove("btn-toggle");
  });
  clickedButton.classList.add("btn-toggle");

  if (clickedButton.value === "") {
    costumNumber.addEventListener("input", function () {
      setToPrecent = costumNumber.value / 100 + 1;
      clickedButton.value = setToPrecent;
      selectTip = Number(clickedButton.value);
    });
  } else {
    selectTip = Number(clickedButton.value) * selectTip;
  }
  calcTotal();
}

function calcTotal() {
  peopleNumber = Number(numberOfPeople.value);
  if (peopleNumber === 0) {
    numberOfPeople.style.border = "2px solid #e17457";
    spanZeroPeople.classList.remove("fieldset__zero-people_hide");
  } else {
    numberOfPeople.style.border = "none";
    spanZeroPeople.classList.add("fieldset__zero-people_hide");
    let billSum = (Number(bill.value) * selectTip) / peopleNumber;
    let tipSum = billSum - Number(bill.value) / peopleNumber;
    total.textContent = `$${billSum.toFixed(2)}`;
    tipAmount.textContent = `$${tipSum.toFixed(2)}`;
  }
  resetButton.classList.remove("fieldset__reset-button_disabled");
}

bill.addEventListener("input", calcTotal);
numberOfPeople.addEventListener("input", calcTotal);

resetButton.addEventListener("click", function () {
  form.reset();
  selectButton.classList.remove("btn-toggle");
  total.textContent = `$0.00`;
  tipAmount.textContent = `$0.00`;

  resetButton.classList.add("fieldset__reset-button_disabled");
});

selectButtons.forEach(function (button) {
  button.addEventListener("click", () => clickSelectButton(button));
});
