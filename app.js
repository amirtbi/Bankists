// "user strict";

// importing account
const account1 = {
  owner: "Amir Torabi",
  movements: [200, 1000, 130, -500, -800, 120],
  pin: "1111", //password
  interestRate: 1.2, // %
};

const account2 = {
  owner: "Mohammad Emadi",
  movements: [10000, 2000, -500, -100, -700, 5000],
  interestRate: 1.4,
  pin: "8888",
};
// data
const account3 = {
  owner: "REZA Asghar",
  movements: [2000, -1000, 1000, 500, -800, 1000],
  pin: "1511", //password,
  interestRate: 1.2, // %
};

const account4 = {
  owner: "RAHIM Javadi",
  movements: [
    10000, 2000, -10, -200, 530, 600, 100, 260, -500, -100, -700, 5000,
  ],
  interestRate: 1.4,
  pin: "1515",
};

const accounts = [account1, account2, account3, account4];

// Elements

// Action Buttons
const btnLogin = document.querySelector("#submit-button");
const btnTransferMoney = document.querySelector(".button-transfer");
const btnLoaMoney = document.querySelector(".button-loan");
const btncloseAccount = document.querySelector(".button-close");
const btnSort = document.querySelector("#button-sort");
// Input Fields
const userInput = document.querySelector("#user-account");
const pinInput = document.querySelector("#user-pin");
// Transfer inputs
const inputTransferMoneyTo = document.querySelector("#transfer-to");
const inputTransferAmountTo = document.querySelector("#transfer-amount");
// Loan Inputs
const inputLoan = document.querySelector("#loan-amount");
// Close account
const inputConfirmAccount = document.querySelector("#confirm-user");
const inputConfirmPin = document.querySelector("#confirm-pin");
// Balance
const labelBalance = document.querySelector("#current-balance__value");

// Deposit and Withdrawal labels
const totalWithdrawalValue = document.querySelector(".withdrawal-value");
const totalDepositValue = document.querySelector(".deposit-value");
const interestValue = document.querySelector(".interest-value");
const liParent = document.querySelector("ul.transactions-log__items");
let currentAccount;
// Functions

// Update movements UI
const updateMovementsUI = (moveType,movValue, time = "2 days ago") => {

  const LiElement = document.createElement("li");
  LiElement.classList.add("transactions-log__item");
  const classType = (moveType === "withdraw" ? 'withdraw' : 'deposit');
  const newMovIndex = liParent.children.length;
  const listItem = `
        <div class='item-container'>
            <p>
                <span class=${classType}>${
    newMovIndex + 1
  }&nbsp${moveType.toUpperCase()}</span>
            </p>
            <p class="transaction-date">${time}</p>
            <!-- Value of transaction-->
            </div>
            <p class="transaction-value">${Math.abs(movValue)}$</p>
    
    `;
  LiElement.insertAdjacentHTML("afterbegin", listItem);
  liParent.prepend(LiElement);
};

// Render List of logs
const renderMovements = (movements,sort=false) => {
  liParent.innerHTML = "";
  const copiedMovs = movements.slice();
  const movs = sort ? copiedMovs.sort((a,b)=>a-b) : movements;
  movs.forEach((mov, index) => {
    const LiElement = document.createElement("li");
    LiElement.classList.add("transactions-log__item");
    const moveType = mov > 0 ? "deposit" : "withdraw";
    const listItems = `
        <div class='item-container'>
            <p>
                <span class=${moveType}>${
      index + 1
    }&nbsp${moveType.toUpperCase()}</span>
            </p>
            <p class="transaction-date">2 days ago</p>
            <!-- Value of transaction-->
            </div>
            <p class="transaction-value">${Math.abs(mov)}$</p>
    
    `;
    LiElement.insertAdjacentHTML("afterbegin", listItems);
    liParent.prepend(LiElement);
  });
};

// Set username foreach of accounts
const setUsername = function (accs) {
  accs.forEach((acc, index) => {
    acc.username = acc.owner
      .split(" ")
      .map((name) => {
        return name[0];
      })
      .join("");
  });
};

setUsername(accounts);

// Calculating the account balance
const balance = (movements) => {
  let sum = 0;
  movements.reduce((acc, curr, index) => {
    sum = acc + curr;
    return sum;
  }, 0);
  return sum;
};

// Calculation of acccounts balance
const accountBalances = (accs) => {
  accs.forEach((acc, index) => {
    const balance = acc.movements.reduce((accu, curr, index) => {
      return accu + curr;
    }, 0);
    acc.balance = balance;
  });
  return accs;
};

// Print Account Balance function
const printCalcBalance = (accountBalance) => {
  labelBalance.textContent = accountBalance + " EUR";
};

accountBalances(accounts);


// Calc of maximum value of account
// const maxValue = (movements) => {
//   return movements.reduce((acc, mov) => {
//     if (acc > mov) {
//       return acc;
//     } else {
//       return mov;
//     }
//   }, movements[0]);
// };

// const account1MaxValue = maxValue(account2.movements);

// Account1 Balance

const EUROTOUSD = 1.2;


accounts.forEach((acc) => {
  acc.euroUnitMovements = acc.movements.map((mov) => {
    return mov * EUROTOUSD;
  });
});

// 

const displayTotalDeposit = (account) => {
  const deposit = account.movements.filter((mov) => {
    return mov > 0;
  });
  const totalDepositi = deposit.reduce((acc, curr) => {
    return acc + curr;
  });
  // Interets
  const interest = deposit
    .map((deposit) => {
      
      return (deposit * account.interestRate) / 100;
    })
    .filter((depos) => {
    
      return depos > 1;
    })
    .reduce((acc, int) => {
      return acc + int;
    });

  totalDepositValue.textContent = totalDepositi + "$";
  interestValue.textContent = Math.floor(interest) + "$";
};

const displayTotalWithdraw = (account) => {
  const withdrawal = account.movements.filter((mov) => {
    return mov < 0;
  });
  const totalwithdrwal = withdrawal.reduce((acc, curr) => {
    return acc + curr;
  });
  totalWithdrawalValue.textContent = Math.abs(totalwithdrwal) + "$";
};

// Current balance
const currentBalance = (acc) => {
  acc.balance;
};

// Transfer Money function

const transferMoney = (value, username) => {
  const ReceivedAccount = accounts.find((acc) => {
    return acc.username === username;
  });
  const enoughCreditIsAvailable = currentAccount.balance >= value;

  if (enoughCreditIsAvailable) {
    // Set time of transfer money
    ReceivedAccount.lastMovementTime = new Date().toLocaleDateString();
    currentAccount.lastMovementTime = new Date().toLocaleDateString();

    ReceivedAccount.movements.push(value);
    // Update current Account movements
    currentAccount.movements.push(-value);
    // Update total deposit
    displayTotalDeposit(currentAccount);
    // Update total withdrawals
    displayTotalWithdraw(currentAccount);
    // Update accounts balance
    accountBalances(accounts);
    // Update currentAccount balance
    printCalcBalance(currentAccount.balance);
    // Render and displate movements and UI
    updateMovementsUI('withdraw',value, currentAccount.lastMovementTime);
    //renderMovements(currentAccount.movements,currentAccount.lastMovementTime);
  } else {
    console.log("You may not have enough money");

    inputTransferMoneyTo.style["background-color"] = "#301e3a";
  }
  inputTransferMoneyTo.style["background-color"] = "#301e3a";
  console.log("Updated received account,", ReceivedAccount);
};

// Login
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  const username = userInput.value.trim();
  // finding account for entered username
  currentAccount = accounts.find((acc) => {
    return acc.username === username;
  });

  if (currentAccount && currentAccount.pin === pinInput.value) {
    // Display welcome message
    document.querySelector(".welcome").innerHTML = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    } `;

    userInput.value = "";
    pinInput.value = "";
    // Calculation of total deposit
    displayTotalDeposit(currentAccount);
    // Calculation of totla withdrawals
    displayTotalWithdraw(currentAccount);
    // Print account balance
    accountBalances(accounts);
    printCalcBalance(currentAccount.balance);
    // Render and displate movements and UI
    renderMovements(currentAccount.movements);

    document.querySelector(".app-container").style.opacity = 100;
  } else {
    userInput.value = "";
    pinInput.value = "";
    alert("Please enter valid data or Use the default accounts in code");
  }
});

//  transfer money
btnTransferMoney.addEventListener("click", (e) => {
  e.preventDefault();
  const enteredUsername = inputTransferMoneyTo.value.trim();
  const enteredValue = Number(inputTransferAmountTo.value.trim());
  const receiverAccount = accounts.find((acc) => {
    return enteredUsername === acc.username.trim();
  });

  // Transfer money
  if (
    receiverAccount.username !== currentAccount.username &&
    enteredUsername != "" &&
    enteredValue != ""
  ) {
    transferMoney(enteredValue, enteredUsername);
  } else {
    console.log("Please check your entry data");
  }
  // Reset the bg of input element
  inputTransferMoneyTo.style["background-color"] = "#301e3a";
  inputTransferMoneyTo.value = "";
  inputTransferAmountTo.value = "";
});


btncloseAccount.addEventListener("click",(e)=>{
  e.preventDefault();
  const loggedAccount = currentAccount.username;
  const loggedPin = currentAccount.pin;
  const enteredAccount = inputConfirmAccount.value.trim();
  const enteredPin = inputConfirmPin.value.trim();
  if(loggedAccount === enteredAccount && enteredPin === loggedPin){

    currentAccount = '';
    // HIDE UI
    document.querySelector(".app-container").style.opacity = 0;
  
  }else{
    alert("Please enter valid data");
  }
  
})

btnLoaMoney.addEventListener("click",(e)=>{
  e.preventDefault();
  console.log("clicked");
  const amount = Number(inputLoan.value);
  if(amount > 0 && currentAccount.movements.some(mov=>mov >= amount*0.01)){
     currentAccount.movements.push(amount);
     currentAccount.lastMovementTime = new Date().toLocaleDateString();  
     // Calculation of total deposit
     displayTotalDeposit(currentAccount);
     // Calculation of totla withdrawals
     displayTotalWithdraw(currentAccount);
     // Print account balance
     accountBalances(accounts);
     printCalcBalance(currentAccount.balance);
     // Render and displate movements and UI
     updateMovementsUI('deposit',amount, currentAccount.lastMovementTime);
    

  }else{
    alert("Please enter valid data");
  }
  inputLoan.value = '';
  
})

//-1 const accountMovements = accounts.map(acc=>acc.movements);
//-2 const  allMovements = accountMovements.flat();
// Alteranative of step-1 and step-2
// const allMovements = accounts.flatMap((mov)=>{
//   return acc.movements;
// });
// const totalMovements = allMovements.reduce((acc,mov)=>{
//   return acc + mov;
// })


// Sorting movements, Ascending
let sorted  = false;
btnSort.addEventListener("click",(e)=>{
  console.log(currentAccount.movements);
  const currentTimeStamp = new Date().toLocaleDateString();
  renderMovements(currentAccount.movements,!sorted);
  
  sorted = !sorted;
});

// Code Challenge
// Convert any words to upperCase with exceptions
const convertTitleCase = (title) => {
  const exceptions = ["a", "an","and", "the", "is", "or"];
  const capitalized = str => str[0].toUpperCase() + str.slice(1);
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return exceptions.includes(word)
        ? word
        : capitalized(word);
    });

  return titleCase.join(" ");
};


console.log(convertTitleCase("this is A Long exercise from me and i hope you like it"));