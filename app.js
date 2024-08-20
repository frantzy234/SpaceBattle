// Ship class
class Ship {
    constructor(name) {
        this.name = name;
        this.hull = 50;
        this.firePower = 5;
        this.accuracy = 0.7;
    }

    attack(target) {
        if (Math.random() < this.accuracy) {
            logMessage(`${this.name} hits ${target.name}!`);
            target.hull -= this.firePower;
            if (target.hull <= 0) {
                target.hull = 0;
                logMessage(`${target.name} has been destroyed!`);
            }
            return true;
        } else {
            logMessage(`${this.name} missed!`);
            return false;
        }
    }
}

class Alien extends Ship {
    constructor(name) {
        super(name);
        this.hull = Math.floor(Math.random() * 25) + 10; 
        this.firePower = Math.floor(Math.random() * 3) + 2; 
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10; 
    }
}


let playerShip = new Ship("Player 1");
let alienShip = new Alien("Mr.Swackammer");


function update() {
    document.getElementById('playerStats').innerHTML = `Player Ship Hull: ${playerShip.hull}`;
    document.getElementById('alienStats').innerHTML = `Alien Ship Hull: ${alienShip.hull}`;
}


function attack() {
    if (playerShip.hull > 0 && alienShip.hull > 0) {
        playerShip.attack(alienShip);
        update();
        if (alienShip.hull > 0) {
            alienShip.attack(playerShip);
            update();
        }
        if (playerShip.hull <= 0) {
            document.getElementById('log').innerHTML = 'Your ship has been wrecked. Game Over!';
            disableButtons();
        } else if (alienShip.hull <= 0) {
            document.getElementById('log').innerHTML = 'You have destroyed the alien ship. Good Win!';
            disableButtons();
        }
    }
}


function logMessage(message) {
    const logDiv = document.getElementById('log');
    const p = document.createElement('p');
    p.textContent = message;
    logDiv.appendChild(p);
   
}


function disableButtons() {
    document.getElementById('fightButton').disabled = true;
    document.getElementById('retreatButton').disabled = true;
}

document.getElementById('fightButton').addEventListener('click', attack);
document.getElementById('retreatButton').addEventListener('click', endGame);


function endGame() {
    logMessage('Game Over! Retreating...');
    disableButtons();
}


function startGame() {
    const title = document.getElementById('title');
    title.innerHTML = "Fightttttttttttt!!!!";
    title.style.fontWeight = "bold";
    title.style.color = "red";
    title.style.fontSize = "45px";
}