// build the deck

class Deck {
	constructor () {
		this.cards = this.buildDeck();
		
	 }
	 buildDeck(){
	 	const finalDeck = []
	 	const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
		const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
		for (let suit in suits){
			for (let value in values){
				let numVal = values[value]
				if(values[value]==="A"){
					numVal=1;
				}
				if(values[value] === "J" || values[value] === "Q" || values[value] === "K"){
					numVal=10;
				}
				let cardObj = {value: values[value], suit:suits[suit], numVal,}
				finalDeck.push(cardObj);
			}
		}
		return finalDeck;
	 }
	 shuffle() { 
		 	//https://bost.ocks.org/mike/shuffle/
			  let m = this.cards.length, t, i;
			  while (m) {
			    i = Math.floor(Math.random() * m--);
			    t = this.cards[m];
			    this.cards[m] = this.cards[i];
			    this.cards[i] = t;
	  }
	}
	checkWinner(player1, cpu) {
		if (player1.total > 21) {
			console.log("Busted! CPU Wins!")
		}
		else if (player1.total > cpu.total){
			console.log("Player Wins!")
		}
		else {console.log("CPU Wins!")}
	}	
};
//human player and cpu will both be instances of Player Class
		//player class will give them the deal function
		//both of them can call deal(arr) to get cards


class Player {
	constructor (){
		this.hand = [];
		this.total = '';
	}
	deal(deck) {
		const randNum = Math.floor(Math.random() * deck.cards.length);
		for (let i = 0; i < 2; i++) {
		this.hand.push(deck.cards.splice(randNum, 1)[0])
		}
	}
	draw(deck){
		const randNum = Math.floor(Math.random() * deck.cards.length);
		this.hand.push(deck.cards.splice(randNum, 1)[0])
	}
// hand[i].numVal
	playerValue() {
		let total = 0;
		let hasAce = false;
		let blackjack = false;
		for (let i = 0; i < this.hand.length; i++) {
			if (this.hand[i].value !== 'A'){
				// hasAce === true;
				total += this.hand[i].numVal;
			} else if (this.hand[i].value === 'A') {
				
				hasAce = true;
			}
			if (hasAce && (this.hand.length < 3)) {
				blackjack = true;

			}
		}

		if (blackjack && (total === 10)) {
			return (total + 11);
		} else if (hasAce && (total < 10)) {
			return total += 1;
		} else if (hasAce && (total > 10)) {
			return total += 1;
		}
		  else {
			return total
		}

	};

	cpuHit() {
		while ((cpu.total = cpu.playerValue()) <= 15) {
			cpu.draw(gameDeck)
		}
		if (cpu.total = cpu.playerValue() >= 22) {
			console.log("CPU busts!")
		} else {return cpu.total = cpu.playerValue()
		}
	}
}

	/*cpuValue() {
		let total = 0;
		let hasAce = false;
		let blackjack = false;
		for (let i = 0; i < this.hand.length; i++) {
			if (this.hand[i].value !== 'A'){
				// hasAce === true;
				total += this.hand[i].numVal;
			} else if (this.hand[i].value === 'A') {
				console.log('ACE HERE')
				hasAce = true;
			}
			if (hasAce && (this.hand.length < 3)) {
				blackjack = true;

			}
		}
			if (blackjack && (total === 10)) {
				console.log('BlackJack!')
				return (total + 11);
			} else if (hasAce && (total < 10)) {
				console.log('yerrr')
				return total += 1;
			} else if (hasAce && (total > 10)) {
				console.log("please")
				return total += 1;
			} else {
				console.log('RETURN TOTAL ONLY')
				return total
			} 
	} */

	  

//player hand = []
// player class
// draw card(gamedeck){
// this.hand.push(gamedeck.deal())
//}
const gameDeck = new Deck ();
const player1 = new Player ()
const cpu = new Player();

//gameDeck.shuffle();
// player1.deal(gameDeck);
/*player1.hand.push({value: "A", suit: "Spades", numVal: 1});
player1.hand.push({value: "Q", suit: "Spades", numVal: 10});
//player1.hand.push({value: 5, suit: "Spades", numVal: 5}); */

//player1.deal(gameDeck);
//cpu.deal(gameDeck);
/* cpu.hand.push({value: "A", suit: "Spades", numVal: 1});
cpu.hand.push({value: 7, suit: "Spades", numVal: 7});
cpu.hand.push({value: 8, suit: "Spades", numVal: 8}); */
//console.log(cpu);
//console.log(player1)
// player1.draw(gameDeck); // for the hit me button
//console.log(player1);
//console.log(gameDeck);

/*player1.total = player1.checkValue()
cpu.total = cpu.checkValue(); */

//gameDeck.checkWinner(player1, cpu)

$(document).on("click", "#start", function() {
	gameDeck.shuffle();
	player1.deal(gameDeck);
	cpu.deal(gameDeck);
	player1.total = player1.playerValue();
    cpu.total = cpu.playerValue();
	console.log(player1);
    console.log(cpu);
});

$(document).on("click",'#hit', function(){
	player1.draw(gameDeck)
	player1.total = player1.playerValue();
	console.log(player1)
}) 

$(document).on('click', '#stay', function(){
	player1.total = player1.playerValue();
	cpu.cpuHit(gameDeck);
	cpu.total = cpu.playerValue();
	//cpu.total = cpu.cpuValue();
	console.log(player1);
	console.log(cpu);
	gameDeck.checkWinner(player1,cpu);
})
