var ui = {};

ui.navigation = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#" onclick="defaultModule()">BadBank</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#createAccount" onclick="loadCreateAccount()" id="createAccount" data-toggle="tooltip" data-placement="bottom" title="Create a new account">Create Account</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="loadLogin()" id="login" data-toggle="tooltip" data-placement="bottom" title="Log in to an existing account">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="loadDeposit()" data-toggle="tooltip" data-placement="bottom" title="Give us your money">Deposit</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="loadWithdraw()" data-toggle="tooltip" data-placement="bottom" title="Withdraw money from your account">Withdraw</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="loadBalance()" data-toggle="tooltip" data-placement="bottom" title="Check your account balance">Balance</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="loadAllData()" data-toggle="tooltip" data-placement="bottom" title="Oops all your personal info :(">AllData</a>
      </li>
    </ul>
  </div>
</nav>
`;


var navigation = document.getElementById('navigation');
navigation.innerHTML += ui.navigation;

ui.createAccount = `
<div class="card text-white bg-primary mb-3" style="width: 18rem;">
    <div class="card-header">Create Account</div> 
    <div class="card-body">
        Name<br>
        <input type="input" class="form-control" id="name" placeholder="Enter name" oninput="checkCreateAccountFields()"><br>
        Email address<br>
        <input type="input" class="form-control" id="email" placeholder="Enter email" oninput="checkCreateAccountFields()"><br>
        Password<br>
        <input type="password" class="form-control" id="password" placeholder="Enter password" oninput="checkCreateAccountFields()"><br>
        <button type="button" class="btn" onclick="create()" id="createButton" disabled>Create Account</button>
        <div id='createStatus'></div>
    </div>
</div>
`;


function checkCreateAccountFields() {
  const nameInput = document.getElementById('name').value.trim();
  const emailInput = document.getElementById('email').value.trim();
  const passwordInput = document.getElementById('password').value.trim();
  const createButton = document.getElementById('createButton');

  // Enable button if at least one field has content, otherwise disable
  if (nameInput !== '' || emailInput !== '' || passwordInput !== '') {
    createButton.removeAttribute('disabled');
  } else {
    createButton.setAttribute('disabled', 'true');
  }
}

function logout() {
  const navigationBar = document.getElementById('navbarNav');
  const usernameElement = navigationBar.querySelector('.navbar-username');

  if (usernameElement) {
    // Remove the displayed username element
    usernameElement.remove();
  }

  // Remove the Logout button
  const logoutButton = navigationBar.querySelector('.navbar-logout');
  if (logoutButton) {
    logoutButton.remove();
  }
}


ui.login = `
   <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
      <div class="card-header">Login</div>
      <div class="card-body">
        Email<br>
        <input type="input" class="form-control" id="loginEmail" placeholder="Enter email"><br>
        Password<br>
        <input type="password" class="form-control" id="loginPassword" placeholder="Enter password"><br>
        <button type="submit" class="btn" onclick="login()">Login</button>
        <div id='loginStatus'></div>
      </div>
    </div>
`;

// Modify your login() function to update the message on successful login
function login() {
  const emailInput = document.getElementById('loginEmail');
  const status = document.getElementById('loginStatus');

  // Get the entered username from the email field
  const enteredUsername = emailInput.value.trim();

  // Check if the entered username is not empty
  if (enteredUsername === '') {
    status.innerHTML = 'Username field is empty. Please enter a username.';
    return;
  }

  // Update the navigation bar to display the entered username
  const navigationBar = document.getElementById('navbarNav');
  const usernameElement = document.createElement('span');
  
  usernameElement.classList.add('navbar-text', 'ml-auto');
  usernameElement.textContent = `Welcome, ${enteredUsername}`;
  navigationBar.appendChild(usernameElement);

  const logoutButton = document.createElement('a');
  logoutButton.textContent = 'Logout';
  logoutButton.classList.add('nav-link', 'navbar-logout');
  logoutButton.href = '#'; // Set the href to '#' to make it appear as a clickable link
  logoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    logout();
  });

  const existingUsername = navigationBar.querySelector('.navbar-username');
  const existingLogoutButton = navigationBar.querySelector('.navbar-logout');
  if (existingUsername) {
    existingUsername.remove();
  }
  if (existingLogoutButton) {
    existingLogoutButton.remove();
  }

  navigationBar.appendChild(logoutButton);
  navigationBar.appendChild(usernameElement);

  // Display a success message (this can be removed if not needed)
  status.innerHTML = 'Login successful!';
  // Optionally, you can perform actions here after successful login
}






ui.deposit = `
<div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
  <div class="card-header">Deposit</div>
  <div class="card-body">
    <div id='balanceDisplay' style="margin-bottom: 10px;"></div>
    Email<br>
    <input type="input" class="form-control" id="depositEmail" placeholder="Enter email"><br>
    Amount<br>
    <input type="input" class="form-control" id="depositAmount" placeholder="Enter amount" oninput="enableDepositButton()"><br>
    <button type="submit" class="btn" onclick="deposit()" id="depositButton" disabled>Deposit</button>
    <div id='depositStatus'></div>
  </div>
</div>
`;

function enableDepositButton() {
  const depositButton = document.getElementById('depositButton');
  depositButton.removeAttribute('disabled');
}


function checkDepositFields() {
  const emailInput = document.getElementById('depositEmail').value.trim();
  const amountInput = document.getElementById('depositAmount').value.trim();
  const depositButton = document.getElementById('depositButton');

  // Parse the amount to check if it's a valid number
  const amount = parseFloat(amountInput);

  // Enable button if both fields have content and amount is a valid number, otherwise disable
  if (emailInput !== '' && amountInput !== '' && !isNaN(amount) && amount > 0) {
    depositButton.removeAttribute('disabled');
  } else {
    depositButton.setAttribute('disabled', 'true');
  }
}

// Modify your deposit() function to update the message on successful deposit and balance
function deposit() {
  const emailInput = document.getElementById('depositEmail');
  const amountInput = document.getElementById('depositAmount');
  const status = document.getElementById('depositStatus');

  // Check if either email or amount is empty
  if (emailInput.value.trim() === '' || amountInput.value.trim() === '') {
    status.innerHTML = 'Email and amount fields are required. Please fill in both fields.';
    return;
  }

  // Parse the amount
  const amount = parseFloat(amountInput.value);

  // Check if the amount is not a number
  if (isNaN(amount)) {
    status.innerHTML = 'Not a number. Please enter a valid number for the amount.';
    return;
  }

  // Check if the amount is negative
  if (amount < 0) {
    status.innerHTML = 'A negative number cannot be deposited.';
    return;
  }

  // For demonstration purposes, let's assume the user's email is stored in a variable
  const userEmail = "peter@mit.edu"; // Replace this with your logic to fetch the user's email

  // Perform deposit logic here
  // Find the user's account based on the email
  const userAccount = ctx.accounts.find(account => account.email === userEmail);

  if (!userAccount) {
    status.innerHTML = 'User account not found.';
    return;
  }

  // Update the user's balance with the deposited amount
  userAccount.balance += amount;

  // Display the updated balance in the deposit module
  status.innerHTML = `Deposit successful!`;

  // You may also want to update the balance in the Balance module
  updateBalanceInBalanceModule(userAccount.balance);
}









// Function to update the balance
function updateBalance(email, amount) {
  // Fetch the user's current balance (you may replace this with your logic)
  const currentBalance = 500; // Example balance value
  
  // Update the balance with the deposited amount
  const newBalance = currentBalance + amount;
  
  // Display the updated balance in the balance module
  document.getElementById('balanceStatus').innerHTML = `New Balance: $${newBalance.toFixed(2)}`;
}


ui.withdraw = `
<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
  <div class="card-header">Withdraw</div>
  <div class="card-body">
    <div id='balanceDisplay' style="margin-bottom: 10px;"></div>
    Email<br>
    <input type="input" class="form-control" id="withdrawEmail" placeholder="Enter email"><br>
    Amount<br>
    <input type="input" class="form-control" id="withdrawAmount" placeholder="Enter amount" oninput="enableWithdrawButton()"><br>
    <button type="submit" class="btn" onclick="withdraw()" id="withdrawButton" disabled>Withdraw</button>
    <div id='withdrawStatus'></div>
  </div> 
</div>
`;

function enableWithdrawButton() {
  const withdrawButton = document.getElementById('withdrawButton');
  withdrawButton.removeAttribute('disabled');
}


// Function to update the withdrawal success message and balance display
function updateWithdrawStatus(message) {
  document.getElementById('withdrawStatus').innerHTML = message;
  updateBalanceDisplay(); // Call function to update the balance display
}

// Function to update the balance display
function updateBalanceDisplay() {
  const email = document.getElementById('withdrawEmail').value;
  const amount = parseFloat(document.getElementById('withdrawAmount').value);

  // Check if both email and amount are entered
  if (email.trim() !== '' && !isNaN(amount) && amount > 0) {
    // Fetch the user's current balance (you may replace this with your logic)
    const currentBalance = 500; // Example balance value
    const newBalance = currentBalance - amount; // Use a negative amount to simulate withdrawal

    // Display the updated balance above the withdrawal form
    document.getElementById('balanceDisplay').innerHTML = `Balance: $${newBalance.toFixed(2)}`;
  } else {
    // Clear the balance display if the fields are not filled
    document.getElementById('balanceDisplay').innerHTML = '';
  }
}

// Modify your withdraw() function to handle overdraft
function withdraw() {
  const email = document.getElementById('withdrawEmail').value;
  const amountInput = document.getElementById('withdrawAmount');
  const status = document.getElementById('withdrawStatus');
  const amount = parseFloat(amountInput.value);

  // Check if either email or amount is empty
  if (email.trim() === '' || amountInput.value.trim() === '') {
    status.innerHTML = 'Email and amount fields are required. Please fill in both fields.';
    return;
  }

  // Check if the input is not a valid number
  if (isNaN(amount)) {
    status.innerHTML = 'Not a number. Please enter a valid number for the amount.';
    return;
  }

  // Check if the amount is negative
  if (amount <= 0) {
    if (amount < 0) {
      status.innerHTML = 'Cannot withdraw negative numbers.';
    } else {
      status.innerHTML = 'Please enter a valid positive number for the amount.';
    }
    return;
  }

  // Perform withdrawal logic here
  if (amount > userBalance) {
    status.innerHTML = 'Account Overdraft: Insufficient funds to make the withdrawal.';
    return;
  }

  // Withdrawal is within the available balance
  updateWithdrawStatus('Withdrawal successful!');

  // Update the balance (deduct the amount)
  updateBalance(email, -amount); // Deduct the amount from the balance on the Balance page
}









ui.balance = `
<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
<div class="card-header">Balance</div>
<div class="card-bodv">
Email<br>
<input type="input" class="form-control" id="balanceEmail" placeholder="Enter email"><br>
<button type="submit" class="btn" onclick="balance()">Show Balance</button>
<div id='balanceStatus'></div>
</div>
</div>
`;


ui.default = `
    </div>
</nav>
<div class="card bg-light mb-3" style="max-width: 18rem;">
    <div class="card-header">BadBank</div>
    <div class="card-body">
        <h5 class="card-title">Welcome to the bank</h5>
        <p class="card-text">You can move around using the navigation bar.</p>
        <img src="bank.png" class="img-fluid" alt="Responsive image">
    </div>
</div>
`;


// Function to load BadBank content
var loadBadBank = function() {
    target.innerHTML = ui.default; // Load BadBank content on click or as default
};

// Load BadBank content by default when the page starts
loadBadBank();


// Function to load BadBank content
var loadBadBank = function() {
    target.innerHTML = ui.default; // Load BadBank content on click or as default
};

// Load BadBank content by default when the page starts
loadBadBank();


ui.allData = `
<h5>ALL Data in Store</h5>
<button type="button" class="btn btn-secondary" onclick="allData()">Show All Data</button>
<div id="allDataStatus"></div>
`;

var loadCreateAccount = function(){
target.innerHTML = ui.createAccount;
};

var loadLogin = function(){
    target.innerHTML = ui.login;
};

var loadDeposit = function(){
    target.innerHTML = ui.deposit;
};

var loadWithdraw = function(){
    target.innerHTML = ui.withdraw;
};

var loadBalance = function(){
    target.innerHTML = ui.balance;
};

var defaultModule = function(){
    target.innerHTML = ui.default;
};

var loadAllData = function() {
    target.innerHTML = ''; // Clear the target area first

    // Loop through each account and create a Bootstrap card for each user
    ctx.accounts.forEach(account => {
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'text-white', 'bg-dark');

        // Create card header with user's email
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.textContent = account.email;
        card.appendChild(cardHeader);

        // Create card body for user details
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Display user details - name, email, balance, etc.
        const userDetails = document.createElement('p');
        userDetails.textContent = `Name: ${account.name}, Email: ${account.email}, Balance: $${account.balance.toFixed(2)}`;
        cardBody.appendChild(userDetails);

        card.appendChild(cardBody);

        // Append the card to the target area
        target.appendChild(card);
    });
};


// Global variable to store the user's balance
let userBalance = 500; // Initial balance, adjust as needed

// Function to update the balance
function updateBalance(email, amount) {
  // Update the client-side balance
  userBalance += amount;

  // Display the updated balance in the balance module
  document.getElementById('balanceStatus').innerHTML = `New Balance: $${userBalance.toFixed(2)}`;
}

// Function to display the balance
function balance() {
  const email = document.getElementById('balanceEmail').value;

  // Fetch the user's current balance (you may replace this with your logic)
  const currentBalance = userBalance; // Use the global userBalance variable
  
  // Display the user's current balance
  document.getElementById('balanceStatus').innerHTML = `Balance: $${currentBalance.toFixed(2)}`;
}

// Add an event listener to the "Show Balance" button
document.querySelector('#balance button').addEventListener('click', balance);

var defaultModule = function(){
  // Check if the target is empty or no specific page is loaded
  if (!target.innerHTML || target.innerHTML.trim() === '') {
      target.innerHTML = ui.default; // Load the BadBank content as default
  }
  // Other initialization code if needed
};

// Load the default module when the application starts
defaultModule();

