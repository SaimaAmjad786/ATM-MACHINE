#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000;
let myPin = 1234;
//print welcome message
console.log(chalk.blueBright("\n \tWelcome to code with saima -ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellowBright("Enter your pin code"),
        type: "number",
    },
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.greenBright("\nPin is correct,login Sucessfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "select an operation",
            type: "list",
            choices: ["Withdraw Amount", "Checkbalance"],
        },
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let WithdrawAns = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: "select a Withdrawal method:",
                choices: ["fast Cash", "enter amount"],
            }
        ]);
        if (WithdrawAns.WithdrawMethod === "fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000],
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash}Withdraw sucessfully`);
                console.log(chalk.magentaBright(`Your Remaining Balance is : ${myBalance}`));
            }
        }
        else if (WithdrawAns.WithdrawMethod === "enter amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter your amount to withdraw",
                    type: "number",
                },
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount}Withdraw sucessfully`);
                console.log(chalk.magentaBright(`Your Remaining Balance is : ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Checkbalance") {
        console.log(chalk.cyanBright(`Your Amount Balance is ${myBalance}`));
    }
}
else {
    console.log(chalk.redBright("Pin is incorrect ,Try again"));
}
