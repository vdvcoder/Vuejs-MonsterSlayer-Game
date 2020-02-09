new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            //Start the game.
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            // ** Player Attack **
            var damage = this.calculateDamage(3, 10); // Calculates the damage to give.
            this.monsterHealth -= damage // Reduces the damage of the monsters health
            this.turns.unshift({ // Add a li with the text in the object. to the overviewlog
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWin()) { //check if player won
                return;
            }

            // ** Monster Attacks **
            this.monsterAttacks();

        },
        specialAttack: function () {
            // ** Player Special Attack **
            var damage = this.calculateDamage(10, 20); // Calculates the damage to give.
            this.monsterHealth -= damage; // Reduces the damage of the monsters health
            this.turns.unshift({ // Add a li with the text in the object. to the overviewlog
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWin()) { //check if player won
                return;
            }

            // ** Monster Attack **
            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) { // Check if players health is 90 or less, true then you can heal player by 10hp
                this.playerHealth += 10; // Heal player by 10hp
            } else {
                this.playerHealth = 100; // Else, players health is above 90hp so you can't heal the players health.
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player HEALS.........*******MAGIC****** for 10' // Add a li with the text in the object. to the overviewlog
            });

            // ** Monster Attack **
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false; // Set the gameIsRunning on false to stop the game.
            this.turns = []; // Set the turns array to be empty.
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12); // Calculates the damage to give.
            this.playerHealth -= this.calculateDamage(5, 12); // Reduces the damage of the players health
            this.checkWin(); // Check if the monster or player has won.
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min) // Creates a random number between min and max (bv. 1 and 10)
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) { // Check if monsters health is 0 or less
                if (confirm('You won! New Game?')) { // if monsters healt is 0 or less , popup a confirmbox with, You Won, new game? 
                    this.startGame(); // user clicks OK, start a new game.
                } else {
                    this.gameIsRunning = false; // user clicks cancel, stop the game.
                }
                return true;

            } else if (this.playerHealth <= 0) { // Check if players health is 0 or less
                if (confirm('oohhh LOST! New Game?')) { // if 0 or less, player lost the game. new game?
                    this.startGame(); // user clicks OK, start a new game.
                } else {
                    this.gameIsRunning = false; // user clicks cancel, stop game.
                }
                return true;
            }
            return false;
        }
    }
});