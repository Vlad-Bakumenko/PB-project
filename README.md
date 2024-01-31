# Project "First Galaxy Bank's Mobile Banking App"
## Before running the project do next steps in Terminal:
- `npm i readline-sync` ;
- `npm i colors` ;

## What is in the project?
This project is about Mobile Banking App. Here user has next options:
1. **Create Account** 
This option, the user will need to enter his data such as Email, IBAN of account, the password that he received by post from our bank, secret word that will be necessary for unblocking his account. During registration the user will be faced with a number of validations and guidelines for input data. He will be asked to enter correct data that meets the validation requirements, in case if he enter incorrect data. 
2. **Deposit Money**
This option allows the user to top up the bank account. To do this, the user will need to enter his IBAN number and also the amount of money with which he wants to top up his account. In case of entering a non-existent, incorrect IBAN number and amount, the user will be asked to try again.
3. **Withdraw Money**
This option allows the user to make payments online. If the user wants to pay for something, he needs to enter his IBAN number from which he wants to withdraw money, the amount he wants to withdraw and also the password for Mobile banking. If one of these data is incorrect, the user will be asked to do it again.
4. **Check Balance**
This option allows the user to check the balance on a current account. To do this the user will have to enter the Mobile Banking password; in case of entering an incorrect password, the user will be asked to try again.
5. **View Transaction History**
This option saves all transactions that have been made with this account; in order to view the transaction history, the user must enter the Mobile Banking password; if the password is entered incorrectly, the user will be asked to try again.
6. **Send Money**
This option allows the user to send money from his account to other accounts. To do this, he must enter his correct IBAN number, also correct IBAN number of the user to whom the money is sent and the amount. If the amount exceeds the user’s balance or if the user enters incorrect data for account numbers or amounts, he will be asked to try it again.
7. **Block Account**
This option allows the user to block his bank account in case of loss or theft of a bank card or suspicion of fraudulent activity on the account. When a user's account is blocked, the user can perform only a limited number of actions with his account, such as unblock the account, view the addresses of branches, view the addresses of ATMs.
8. **Unblock Account**
This option allows the user to unblock their account in the application. The user can do this by entering a secret word. If the secret word does not match or incorrect data is entered, the user will be asked to do it again.
9. **View Branches**
This option allows the user to view the addresses of bank branches in his city. The bank has branches in the following cities: Berlin, Munich, Hannover, Hamburg, Düsseldorf and Frankfurt am Main. If the entered data does not match the name of any of the cities, the user will be asked to try it again.
10. **View ATMs**
This option allows the user to view the addresses of ATMs in his city. Just like in the previous option, ATMs exist in the following cities: Berlin, Munich, Hamburg, Frankfurt am Main, Hannover and Dusseldorf. In case of entering incorrect data or data that does not match the name of any of the cities, the user will be asked to try it again.
11. **Switch Account**
This option allows you to switch between accounts. This option is necessary to show how the "Send Money" option works. Since we need to make sure that the money was sent from one account and the money was received in another account.
12. **Exit**
This function to stop the execution of code in the terminal.
## What was used in the project:
1. Readline-Sync ;
2. Functions ;
3. Loops ;
4. Object and Array methods ;
5. "Switch" and "if" statements