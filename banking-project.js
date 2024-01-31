import readlineSync from "readline-sync";
import colors from  'colors';

let accounts = [];
let currentAccount = {};

let email;
let fullName;
let iban;
let password;
let secretWord;
let initialBalance = 0;
let question;

// Validation for email
function isValidEmail(email) {
  let parts = email.split("@");

  if (
    !email.includes("@") ||
    email.length < 9 ||
    parts.length !== 2 ||
    parts[0].length < 3 ||
    parts[1].length < 5 ||
    parts[1].indexOf(".") === -1
  ) {
    return false;
  }
  for (let character of email) {
    if ('(){}[]|`¬¦! "£$%^&*"<>:;#~+=,'.includes(character)) {
      return false;
    }
  }
  return true;
}

// Validation for Full Name

function isValidFullName(fullName) {
  // Check if the input is a non-empty string
  if (typeof fullName !== "string" || fullName.trim().length < 5) {
    return false;
  }
  // Split the full name into surname and name
  const nameParts = fullName.split(" ");

  // Check if there are at least two parts (surname and name)
  if (nameParts.length < 2) {
    return false;
  }

  // Check if each part has at least 2 characters and consists of only letters
  const [surname, name] = nameParts;
  if (
    surname.length < 2 ||
    name.length < 2 ||
    surname !== surname[0].toUpperCase() + surname.slice(1).toLowerCase() ||
    name !== name[0].toUpperCase() + name.slice(1).toLowerCase()
  ) {
    return false;
  }

  for (let char of fullName) {
    if ('(){}[]|`¬¦!"£$%^&*"<>:;#~+=,0123456789'.includes(char)) {
      return false;
    }
  }
  // If all checks pass, the full name is valid
  return true;
}

// Validation for IBAN
function isValidIban(iban) {
  if (
    iban.length !== 7 ||
    String(Math.abs(iban.slice(3))).length !== 4 ||
    iban.slice(0, 3) !== "FGB"
  ) {
    return false;
  }
  return true;
}

// Validation for Password

function isValidPassword(password) {
  if (
    password.length < 4 ||
    password.length > 8 ||
    typeof password !== "string"
  ) {
    return false;
  }
  for (let character of password) {
    if ('(){}[]|`¬¦! £$%^&*"<>:;#~_-+=,@.'.includes(character)) {
      return false;
    }
  }

  return true;
}

function isValidSecretWord(secretWord) {
  if (secretWord.length !== 6 || typeof secretWord !== "string") {
    return false;
  }
  for (let character of secretWord) {
    if ('(){}[]|`¬¦! £$%^&*"<>:;#~_-+=,@.'.includes(character)) {
      return false;
    }
  }

  return true;
}

function createAccount() {
  email = readlineSync.question('Please enter email to create your account.\nEmail should have next format "(at least 3 characters)@domain":\n');

  do {
    if (!isValidEmail(email)) {
      email = readlineSync.question("Incorrect email. Try another email:\n");
    }
  } while (!isValidEmail(email));

  for (let account of accounts) {
    do {
      if (account.email === email) {
        email = readlineSync.question(
          "Account with such email already exists. Try another email:\n"
        );
      }
    } while (account.email === email);
  }

  console.clear();
  fullName = readlineSync.question(
    'Please enter your full name.\nFull name should have next format "(Surname - at least 2 characters) (Name - at least 2 characters)":\n'
  );

  do {
    if (!isValidFullName(fullName)) {
      fullName = readlineSync.question(
        'Incorrect full name.\nCorrect format: format "(Surname - at least 2 characters) (Name - at least 2 characters)". Please try again:\n'
      );
    }
  } while (!isValidFullName(fullName));

  console.clear();
  iban = readlineSync.question(
    "Please enter your IBAN. Correct format is FGB(4 digits):\n"
  );
  // Validation for IBAN

  do {
    if (!isValidIban(iban)) {
      iban = readlineSync.question(
        "Incorrect input. Correct format is FGB(4 digits). Please try again:\n"
      );
    }
  } while (!isValidIban(iban));

  let isIbanExist;

  do {
    isIbanExist = accounts.find(item => item.iban === iban);
    if (accounts.includes(isIbanExist)) {
      iban = readlineSync.question("Sorry account with such IBAN already registered. Please try again:\n");
    }
  } while (accounts.includes(isIbanExist))

  console.clear();
  password = readlineSync.question(
    "Please enter the password, that you received from our bank via post.\nRemember in your password should be 4-8 characters and no special characters:\n"
  );
  // Validation for password
  do {
    if (!isValidPassword(password)) {
      password = readlineSync.question(
        "Incorrect input.\nRemember your password should be 4-8 characters long and have no special characters.\nPlease try again:\n"
      );
    }
  } while (!isValidPassword(password));

  console.clear();
  secretWord = readlineSync.question(
    "Please create your secret word.\nRemember your Secret Word should be 6 characters long and have no special characters:\n"
  );
  // Validation for secret word

  do {
    if (!isValidSecretWord(secretWord)) {
      secretWord = readlineSync.question(
        "Incorrect input.\nRemember your Secret Word should be 6 characters long and have no special characters.\nPlease try again:\n"
      );
    }
  } while (!isValidSecretWord(secretWord));

  // Since I can`t access any banking data, for example I will add random balance
  initialBalance = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;

  let currentNewUser = {};
  currentNewUser.email = email;
  currentNewUser.fullName = fullName;
  currentNewUser.iban = iban;
  currentNewUser.password = password;
  currentNewUser.secretWord = secretWord;
  currentNewUser.balance = initialBalance;
  currentNewUser.blocked = false;
  currentNewUser.transactions = [];

  accounts.push(currentNewUser);
  currentAccount = currentNewUser;
  console.clear();
  console.log(
    `Welcome ${fullName}! Your account has been successfully created.\nIBAN: ${iban}\nBalance: ${initialBalance.toFixed(
      2
    )}€`
  );
}
function deposit(accountToDeposit, amount) {
  let userToDeposit = accounts.find((item) => item.iban === accountToDeposit);
  amount = +amount;

  userToDeposit.balance += amount;
  userToDeposit.transactions.push({
    amount: amount.toFixed(2),
    type: "Deposit",
  });

  console.clear();
  console.log(`Deposit successful.\nNew balance: €${userToDeposit.balance.toFixed(2)}`.brightGreen);
}

function withdraw(accountToWithdraw, amount) {
  amount = +amount;
  const userToWithdraw = accounts.find(
    (item) => item.iban === accountToWithdraw
  );
  
  let password = readlineSync.question("Enter your password:\n");

  do {
    if (userToWithdraw.password !== password) {
      password = readlineSync.question(
        "Incorrect password. Please try again:\n"
      );
    }
  } while (userToWithdraw.password !== password);

  userToWithdraw.balance -= amount;
  userToWithdraw.transactions.push({
    amount: amount.toFixed(2),
    type: "Withdrawal",
  });
  console.clear();
  console.log(
    `Withdrawal successful.\nNew balance: €${userToWithdraw.balance.toFixed(2)}`.brightRed
  );
}

function checkBalance() {
  let password = readlineSync.question("Enter your password:\n");

  do {
    if (currentAccount.password !== password) {
      password = readlineSync.question(
        "Incorrect password.Please try again:\n"
      );
    }
  } while (currentAccount.password !== password);

  console.clear();
  console.log(`Current balance: €${currentAccount.balance.toFixed(2)}`);
}

// Function to view transaction history
function viewTransactions() {
  let password = readlineSync.question("Enter your password:\n");

  do {
    if (currentAccount.password !== password) {
      password = readlineSync.question(
        "Incorrect password.Please try again:\n"
      );
    }
  } while (currentAccount.password !== password);

  console.clear();
  console.log("Transaction History:".brightBlue);
  currentAccount.transactions.forEach((transaction, index) => {
    console.log(`${index + 1}. ${transaction.type} ${transaction.amount}€`);
  });
}

function sendMoney() {
  let senderIban = readlineSync.question(
    "Enter IBAN from which you want to send money:\n"
  );
  do {
    if (senderIban !== currentAccount.iban) {
      senderIban = readlineSync.question(
        "Incorrect IBAN. Please try again:\n"
      );
    }
  } while (senderIban !== currentAccount.iban);

  let receiverIban = readlineSync.question(
    "Enter IBAN of receiver:\n"
  );

  let receiveAcc;
  do {
    receiveAcc = accounts.find((item) => item.iban === receiverIban);
    if (receiveAcc === undefined || receiverIban === currentAccount.iban) {
      receiverIban = readlineSync.question(
        "Incorrect input or such account not exist. Please try again:\n"
      );
    }
  } while (receiveAcc === undefined || receiverIban === currentAccount.iban)

  receiveAcc = accounts.find((item) => item.iban === receiverIban);

  let amount = readlineSync.question(
    "Enter the amount to send:\n"
  );
  do {
    if (
      isNaN(+amount) ||
      amount <= 0 ||
      currentAccount.balance - +amount < 0 ||
      String(Math.abs(amount)).length !==
        String(amount).length
    ) {
      amount = readlineSync.question(
        `Invalid transfer amount. Your balance: ${currentAccount.balance.toFixed(2)}€.\nPlease try again:\n`
      );
    }
  } while (
    isNaN(+amount) ||
      amount <= 0 ||
      currentAccount.balance - +amount < 0 ||
      String(Math.abs(amount)).length !==
        String(amount).length
  );
  
  amount = +amount;

  let password = readlineSync.question("Enter your password:\n");

  do {
    if (currentAccount.password !== password) {
      password = readlineSync.question(
        "Incorrect password. Please try again:\n"
      );
    }
  } while (currentAccount.password !== password);

  currentAccount.balance -= amount;
  currentAccount.transactions.push({
    amount: amount.toFixed(2),
    type: `Money transfer to ${receiveAcc.iban}`,
  });
  

  receiveAcc.balance += amount;
  receiveAcc.transactions.push({
    amount: amount.toFixed(2),
    type: `Money transfer from ${currentAccount.iban}`,
  });

  console.clear();
  console.log(
    `Money transfer successful.\nNew balance: €${currentAccount.balance.toFixed(2)}`.brightRed
  );
}

function switchAccounts() {
  let newAccountEmail = readlineSync.question("Enter your new email:\n");
  let allUsers = accounts.filter((user) => user.email === newAccountEmail);
  if (allUsers) {
    currentAccount = allUsers[0];
  } else {
    do {
      newAccountEmail = readlineSync.question(`No user with such email found. Please try again:\n`);
    } while (!allUsers)
  }
}

function blockAccount() {
  currentAccount.blocked = true;
}

function unblockAccount() {
  let inputSecretWord = readlineSync.question(
    "Please enter secret word to unblock your account:\n"
  );
  while (currentAccount.blocked) {
    if (currentAccount.secretWord !== inputSecretWord) {
      inputSecretWord = readlineSync.question(
        "Invalid secret word.Please try again:\n"
      );
    } else {
      currentAccount.blocked = false;
      console.clear();
      console.log("Account unblocked.");
      break;
    }
  }
}

// Further we can connect data from Google Maps

const branches = {
  berlin: [
    "Grevesmühlener Str. 8, 13059",
    "Friedrichstraße 85, 10117",
    "Schloßstraße 17, 12163",
    "Wilmersdorfer Str. 28, 10627",
  ],
  hamburg: [
    "Fuhlsbüttler Str. 389, 22309",
    "Rathausstraße 22, 20095",
    "Lüneburger Str. 77, 21073",
    "Alte Elbgaustraße 44, 22523",
  ],
  munich: [
    "Leonrodstraße 21, 80634",
    "Knorrstraße 46, 80807",
    "Plinganserstraße 23, 81369",
    "Landsberger Str. 321, 81241",
  ],
  dusseldorf: [
    "Schadowstraße 34, 40212",
    "Hauptstraße 66, 40597",
    "Bahnhofsvorstadt 58, 40212",
    "Kasernenstraße 102, 40213",
  ],
  leipzig: [
    "Leipziger Str. 43, 60487",
    "Berliner Str. 32, 10997",
    "Bayerischer Platz 15, 80997",
    "Frankfurter Str. 69, 63263",
  ],
  hannover: [
    "Planetenring 35, 30823",
    "Lister Meile 62, 30161",
    "Kirchenallee 37, 90431",
    "Robert-Koch-Straße 11, 30880",
  ],
};

const atms = {
  berlin: [
    "Goethestraße 25 12345,",
    "Mozartallee 54 56789 Berlin",
    "Bachweg 15 98765",
    "Schillerplatz 67 43210",
  ],
  hamburg: [
    "Hafenstraße 123, 20095",
    "Elbchaussee 567, 22609",
    "Reeperbahn 890, 20359",
    "Eppendorfer Landstraße 432, 20249",
  ],
  munich: [
    "Marienplatz 123, 80331",
    "Viktualienmarkt 567, 80331",
    "Schwabingstraße 890, 80805",
    "Sendlinger Straße 432, 80331",
  ],
  dusseldorf: [
    "Königsallee 123, 40212",
    "Altstadtstraße 567, 40213",
    "Medienhafenweg 890, 40221",
    "Rheinuferpromenade 432, 40213",
  ],
  leipzig: [
    "Zeil 123, 60313",
    "Römerberg 567, 60311",
    "Sachsenhausenstraße 890, 60594",
    "Westendallee 432, 60325",
  ],
  hannover: [
    "Kröpckeplatz 123, 30159",
    "Herrenhäuser Allee 567, 30419",
    "Aegidientorplatz 890, 30159",
    "Lister Meile 432, 30161",
  ],
};

function viewBranches(city) {
  const availableCities = Object.keys(branches);
  let isValidCity = false;
  do {
    if (availableCities.includes(city.toLowerCase())) {
      console.clear();
      console.log(
        `Branches in ${
          city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
        }:`
      );
      console.log(branches[city.toLowerCase()].join(", "));
      isValidCity = true;
    } else {
      city = readlineSync.question(
        "Incorrect input. Please choose from Berlin, Hamburg, Munich, Dusseldorf, Leipzig and Hannover:\n"
      );
    }
  } while (!isValidCity);
}

function viewATMs(cityAtm) {
  const availableCities = Object.keys(atms);
  let isValidCity = false;
  do {
    if (availableCities.includes(cityAtm.toLowerCase())) {
      console.clear();
      console.log(
        `ATMs in ${
          cityAtm.charAt(0).toUpperCase() + cityAtm.slice(1).toLowerCase()
        }:`
      );
      console.log(atms[cityAtm.toLowerCase()].join(", "));
      isValidCity = true;
    } else {
      cityAtm = readlineSync.question(
        "Incorrect input. Please choose from Berlin, Hamburg, Munich, Dusseldorf, Leipzig and Hannover:\n"
      );
    }
  } while (!isValidCity);
}
// Progress

// Main menu
while (true) {
  console.log(
    "Welcome to First Galaxy Bank's Mobile Banking App, where seamless financial management meets the convenience of your fingertips".magenta.bgBrightWhite
  );
  console.log("Please select the option:".yellow);
  let message;
  if (currentAccount.blocked) {
    message =
      "Account is blocked\n\n8. Unblock Account\n9. View Branches\n10. View ATMs\n12. Exit";
  } else {
    message =
      "1. Create Account\n2. Deposit Money\n3. Withdraw Money\n4. Check Balance\n5. View Transaction History\n6. Send Money\n7. Block Account\n8. Unblock Account\n9. View Branches\n10. View ATMs\n11. Switch Accounts\n12. Exit";
  }
  console.log(message);

  const selectedOption = readlineSync.questionInt("Select an option: ");

  switch (selectedOption) {
    case 1:
      // Create Account
      if (!currentAccount.blocked) {
        createAccount();
      } else {
        console.log("Account is blocked");
      }
      break;
    case 2:
      // Deposit Money
      if (!currentAccount.blocked) {
        do {
          question = readlineSync.question(
            "Do you want to deposit your account? (y/n):\n"
          );
        } while (question !== "y" && question !== "n");

        if (question === "n") {
          console.clear();
          break;
        } else if (question === "y") {
          let accountToDeposit = readlineSync.question(
            "Enter IBAN  which you want to deposit money:\n"
          );
          do {
            if (accountToDeposit !== currentAccount.iban) {
              accountToDeposit = readlineSync.question(
                "Incorrect input. Please try again:\n"
              );
            }
          } while (accountToDeposit !== currentAccount.iban);
          let depositAmount = readlineSync.question(
            "Enter the amount to deposit:\n"
          );
          do {
            if (
              isNaN(+depositAmount) ||
              depositAmount <= 0 ||
              String(Math.abs(depositAmount)).length !==
                String(depositAmount).length
            ) {
              depositAmount = readlineSync.question(
                "Invalid deposit amount. Please try again:\n"
              );
            }
          } while (
            isNaN(+depositAmount) ||
            depositAmount <= 0 ||
            String(Math.abs(depositAmount)).length !==
              String(depositAmount).length
          );
          deposit(accountToDeposit, depositAmount);
        }
      } else {
        console.clear();
        console.log(
          "Account is blocked. You need to unblock account to deposit it."
        );
      }
      break;
    case 3:
      if (!currentAccount.blocked) {
        do {
          question = readlineSync.question(
            "Do you want to withdraw money from your account? (y/n):\n"
          );
        } while (question !== "y" && question !== "n");

        if (question === "n") {
          console.clear();
          break;
        } else if (question === "y") {
          let accountToWithdraw = readlineSync.question(
            "Enter IBAN from which you want to withdraw money:\n"
          );
          do {
            if (accountToWithdraw !== currentAccount.iban) {
              accountToWithdraw = readlineSync.question(
                "Incorrect input. Please try again:\n"
              );
            }
          } while (accountToWithdraw !== currentAccount.iban);

          let withdrawAmount = readlineSync.question(
            "Enter the amount to withdraw:\n"
          );
          do {
            if (
              isNaN(+withdrawAmount) ||
              withdrawAmount <= 0 ||
              currentAccount.balance - +withdrawAmount < 0 ||
              String(Math.abs(withdrawAmount)).length !==
                String(withdrawAmount).length
            ) {
              withdrawAmount = readlineSync.question(
                `Invalid withdraw amount. Your balance: ${currentAccount.balance.toFixed(2)}€. Please try again:\n`
              );
            }
          } while (
            isNaN(+withdrawAmount) ||
            withdrawAmount <= 0 ||
            currentAccount.balance - +withdrawAmount < 0 ||
            String(Math.abs(withdrawAmount)).length !==
              String(withdrawAmount).length
          );

          withdraw(accountToWithdraw, withdrawAmount);
        }
      } else {
        console.clear();
        console.log(
          "Account is blocked. You need to unblock account to withdraw money."
        );
      }
      break;
    case 4:
      // Check Balance
      if (!currentAccount.blocked) {
        do {
          question = readlineSync.question(
            "Do you want to check balance? (y/n):\n"
          );
        } while (question !== "y" && question !== "n");

        if (question === "n") {
          console.clear();
          break;
        } else if (question === "y") {
          checkBalance();
        }
      } else {
        console.clear();
        console.log(
          "Account is blocked. You need to unblock account to check balance."
        );
      }
      break;
    case 5:
      // View Transaction History
      if (!currentAccount.blocked) {
        do {
          question = readlineSync.question(
            "Do you want to view transaction history? (y/n):\n"
          );
        } while (question !== "y" && question !== "n");

        if (question === "n") {
          console.clear();
          break;
        } else if (question === "y") {
          viewTransactions();
        }
      } else {
        console.clear();
        console.log(
          "Account is blocked. You need to unblock account to view transaction history."
        );
      }
      break;
    case 6:
      // Send Money
      if (!currentAccount.blocked) {
        do {
          question = readlineSync.question(
            "Do you want to transfer money? (y/n):\n"
          );
        } while (question !== "y" && question !== "n");

        if (question === "n") {
          console.clear();
          break;
        } else if (question === "y") {
          sendMoney();
        }
      } else {
        console.clear();
        console.log(
          "Account is blocked. You need to unblock account to transfer money."
        );
      }
      break;
    case 7:
      // Block Account
      blockAccount();
      break;
    case 8:
      // Unblock Account
      unblockAccount();
      break;
    case 9:
      // View Branches
      let city = readlineSync.question(
        "Our company has branches in Berlin, Hamburg, Munich, Dusseldorf, Leipzig and Hannover.\nPlease enter the city in which you want to check the addresses of branches:\n"
      );
      viewBranches(city);
      break;
    case 10:
      // View ATMs
      let cityAtm = readlineSync.question(
        "Our company has ATMs in Berlin, Hamburg, Munich, Dusseldorf, Leipzig and Hannover.\nPlease enter the city in which you want to check the addresses of ATMs:\n"
      );
      viewATMs(cityAtm);
      break;
    case 11:
      if (!currentAccount.blocked) {
        do {
          question = readlineSync.question(
            "Do you want to switch an account? (y/n):\n"
          );
        } while (question !== "y" && question !== "n");

        if (question === "n") {
          console.clear();
          break;
        } else if (question === "y") {
          switchAccounts();
        }
      } else {
        console.clear();
        console.log(
          "Account is blocked. You need to unblock account to switch an account."
        );
      }
      break;
    case 12:
      // Exit
      console.log("Goodbye!");
      process.exit(0);
    default:
      console.log("Invalid option, please try again.");
  }
}