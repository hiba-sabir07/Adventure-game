#! /usr/bin/env node
import inquirer from "inquirer";

class Player {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 25;
    }

    fuelIncrease() {
        this.fuel = 100;
    }
}

class Opponent {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    takeDamage() {
        this.fuel -= 25;
    }
}

async function handleGame(player: Player, opponent: Opponent) {
    while (true) {
        const { opt } = await inquirer.prompt([
            {
                name: "opt",
                type: "list",
                message: "What would you like to do?",
                choices: ["Attack", "Drink Potion", "Run For Your Life.."]
            }
        ]);

        if (opt === "Attack") {
            const num = Math.floor(Math.random() * 2);
            if (num > 0) {
                player.fuelDecrease();
                console.log(`${player.name} fuel is ${player.fuel}`);
                console.log(`${opponent.name} fuel is ${opponent.fuel}`);
                if (player.fuel <= 0) {
                    console.log("You Lose, Better Luck Next Time");
                    process.exit();
                }
            } else {
                opponent.takeDamage();
                console.log(`${player.name} fuel is ${player.fuel}`);
                console.log(`${opponent.name} fuel is ${opponent.fuel}`);
                if (opponent.fuel <= 0) {
                    console.log("You Win");
                    process.exit();
                }
            }
        } else if (opt === "Drink Potion") {
            player.fuelIncrease();
            console.log(`You drank a health potion. Your fuel is now ${player.fuel}`);
        } else if (opt === "Run For Your Life..") {
            console.log("You Lose, Better Luck Next Time");
            process.exit();
        }
    }
}

async function main() {
    const { name: playerName } = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please Enter Your Name:"
        }
    ]);

    const { select: opponentName } = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Please Select Your Opponent:",
            choices: ["Skeleton", "Alien", "Zombie"]
        }
    ]);

    const player = new Player(playerName);
    const opponent = new Opponent(opponentName);

    console.log(`You are facing a ${opponent.name}!`);

    await handleGame(player, opponent);
}

// Run the game
main().catch(err => {
    console.error("An error occurred:", err);
});





