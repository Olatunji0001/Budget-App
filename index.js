const budgetInput = document.querySelector(".budgetInput");
const setBudgetBtn = document.querySelector(".setBudgetBtn");
const expensesName = document.querySelector(".expensesName");
const expensesCost = document.querySelector(".expensesCost");
const amount = document.querySelector(".amount");
const totalBudget = document.querySelector(".totalBudget");
const expenses = document.querySelector(".expenses");
const balance = document.querySelector(".balance");
const list = document.querySelector(".list");
const error = document.querySelector(".error");
const me = document.querySelector(".e");
const cancleEdit = document.querySelector(".cancle");
const edit = document.querySelector(".hold");
const clear = document.querySelector(".clear");


function diplayExpenses() {
  const goods = JSON.parse(localStorage.getItem("goods")) || [];
  goods.forEach((exp) => {
    list.innerHTML += `
    <div class="you">
      <p class="name5">${exp.name.charAt(0).toUpperCase() + exp.name.slice(1)}</p>
      <p class="spending">${exp.value}</p>
      <div>
        <button class="editBtn" data-edit=${exp.id}>Edit</button>
        <button class="deleteBtn" data-id=${exp.id}>Delete</button>
      </div>
    </div>
  `;
  });
}
diplayExpenses();

function showExpenses() {
  const value = JSON.parse(localStorage.getItem("goods")) || [];
  const add = value.map((e) => Number(e.value));
  const total = add.reduce((sum, num) => sum + num, 0);

  const currentBudget = Number(localStorage.getItem("budgetAmt")) || 0;

  totalBudget.textContent = currentBudget;
  expenses.textContent = total;
  const moneyBalance = currentBudget - total;
  balance.textContent = moneyBalance;
}
showExpenses();


let currentBudget = totalBudget.textContent
let currentExpenses = 0;
let moneyBalance = 0;





const btn = setBudgetBtn.addEventListener("click", (event) => {
  const number = Number(budgetInput.value);
  const value = Number(localStorage.getItem("budgetAmt"));
  const total = number + value;
  localStorage.setItem("budgetAmt", total.toString());
  showExpenses()
  budgetInput.value = "";
});

const btn2 = amount.addEventListener("click", (event) => {

  if (currentBudget === 0) {
    error.textContent = "Set budget before expenses";
    return setTimeout(() => {
      error.textContent = "";
    }, 5000);
  }
  if (!(expensesCost.value && expensesName.value)) {
    error.textContent = "Fill out all input";
    return setTimeout(() => {
      error.textContent = "";
    }, 5000);
  }



  const goods = JSON.parse(localStorage.getItem("goods")) || [];
  const check = edit.dataset.id;

  if (check) {
    const updatedData = goods.map((todos) =>
      todos.id === check
        ? { ...todos, name: expensesName.value, value: expensesCost.value }
        : todos
    );

    localStorage.setItem("goods", JSON.stringify(updatedData));

    delete edit.dataset.id;
    list.innerHTML = "";
    diplayExpenses();
    cancleEdit.style.display = "none";
  } else {
    const newGood = {
      id: crypto.randomUUID(),
      name: expensesName.value,
      value: expensesCost.value,
    };

    goods.push(newGood);
    localStorage.setItem("goods", JSON.stringify(goods));

    list.innerHTML += `<div class="you">
        <p class="name5">${newGood.name.charAt(0).toUpperCase() + newGood.name.slice(1)}</p>
        <p class="spending">${newGood.value}</p>
        <div class="deledit">
          <button class="editBtn" data-edit=${newGood.id}>Edit</button>
          <button class="deleteBtn" data-id=${newGood.id}>Delete</button>
        </div>
      </div>`;
  }

  expensesName.value = "";
  expensesCost.value = "";
  showExpenses();
});

const deleteFun = list.addEventListener("click", (event) => {
  const delBtn = event.target.dataset.id;
  if (delBtn) {
    const id = JSON.parse(localStorage.getItem("goods")) || [];
    const allId = id.filter((item) => item.id !== delBtn);
    localStorage.setItem("goods", JSON.stringify(allId));
    event.target.closest(".you").remove();
    showExpenses();
  }
});

const editFun = list.addEventListener("click", (event) => {
  const editData = event.target.dataset.edit;
  if (editData) {
    const data = JSON.parse(localStorage.getItem("goods"));
    const clikedData = data.find((datas) => datas.id === editData);
    const dataName = clikedData.name;
    const dataPrice = Number(clikedData.value);
    const id = clikedData.id;
    console.log(dataName, dataPrice);

    edit.dataset.id = id;
    expensesName.value = dataName;
    expensesCost.value = dataPrice;
    cancleEdit.style.display = "Block";
  }
});

const cancle = cancleEdit.addEventListener("click", (event) => {
  let id = edit.dataset.id;
  console.log(id);

  edit.dataset.id = "";
  cancleEdit.style.display = "none";
  expensesName.value = "";
  expensesCost.value = "";
});

const clearBtn = clear.addEventListener("click", () => {
  localStorage.setItem("goods", "[]");
  localStorage.setItem("budgetAmt", "0");

  list.innerHTML = "";
  expenses.textContent = "0";
  balance.textContent = "0";
  totalBudget.textContent = "0";
  showExpenses();
});
