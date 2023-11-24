// context is globally shared 
const ctx = {
   "accounts": [
        {
          "name": "peter",
          "email": "peter@mit.edu",
          "balance": 0,
          "password": "secret"
        }
    ]
}



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

  // Check if the amount is a valid number
  if (isNaN(amount) || amount <= 0) {
    status.innerHTML = 'Invalid amount. Please enter a valid positive number.';
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
  status.innerHTML = `Deposit successful! New Balance: $${userAccount.balance.toFixed(2)}`;

  // You may also want to update the balance in the Balance module
  updateBalanceInBalanceModule(userAccount.balance);
}

// Function to update the balance in the Balance module
function updateBalanceInBalanceModule(newBalance) {
  document.getElementById('balanceStatus').innerHTML = `New Balance: $${newBalance.toFixed(2)}`;
}









function create() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const status = document.getElementById('createStatus');
  const createButton = document.getElementById('createButton');

  // Check which fields are empty
  if (name.value.trim() === '' && email.value.trim() === '' && password.value.trim() === '') {
      status.innerHTML = 'All fields are empty. Please fill in at least one field.';
      return;
  }

  let errorMessage = '';

  if (name.value.trim() === '') {
      errorMessage += 'Name field is empty. ';
  }

  if (email.value.trim() === '') {
      errorMessage += 'Email field is empty. ';
  }

  if (password.value.trim() === '') {
      errorMessage += 'Password field is empty. ';
  } else if (password.value.trim().length < 8) {
      errorMessage += 'Password must be at least 8 characters long. ';
  }

  // Display the appropriate error message
  if (errorMessage !== '') {
      status.innerHTML = errorMessage + 'Please fill in the required fields.';
      return;
  }

  // Create the account if all fields are filled
  ctx.accounts.push({
      name: name.value,
      email: email.value,
      password: password.value,
      balance: 0,
  });

  // Clear input fields
  name.value = '';
  email.value = '';
  password.value = '';

  status.innerHTML = 'Account Created!';
}













function allData(){
     const status = document.getElementById('allDataStatus');
     status.innerHTML = JSON.stringify(ctx.accounts);
}