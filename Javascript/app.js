// build the deck

class Deck {
	constructor () {
		this.cards = this.buildDeck();
		
	 }
	 buildDeck(){
	 	const finalDeck = []
	 	const suits = ['D', 'C', 'H', 'S'];
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
				let cardObj = {value: values[value], suit:suits[suit], numVal, img: `cardpics/${values[value]}${suits[suit]}.png`}
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
			$('#winnerMessage h2').text(`BUSTED CPU Wins!`)
			$('#winnerMessage').delay(100).fadeToggle("slow");
			$('#winnerMessage').delay(600).fadeToggle("medium");
		}
		else if (player1.total > cpu.total){
			console.log("Player Wins!")
			$('#winnerMessage h2').text(`You Won!`)
			$('#winnerMessage').delay(100).fadeToggle("slow");
			$('#winnerMessage').delay(600).fadeToggle("medium");
		}
		else if ((cpu.total > 21) && (player1.total <= 21)){
			console.log("Busted! Player Wins!")
			$('#winnerMessage h2').text("CPU Busted! You Won!")
			$('#winnerMessage').delay(100).fadeToggle("slow");
			$('#winnerMessage').delay(600).fadeToggle("medium");
		}
		else if (cpu.total === player1.total){
			$('#winnerMessage h2').text("ISSA PUSH")
			$('#winnerMessage').delay(100).fadeToggle("slow");
			$('#winnerMessage').delay(600).fadeToggle("medium");

		}
		else {
		console.log("CPU Wins!")
		$('#winnerMessage h2').text("CPU Wins!")
		$('#winnerMessage').delay(100).fadeToggle("slow");
		$('#winnerMessage').delay(600).fadeToggle("medium");
		}
	};
}
//human player and cpu will both be instances of Player Class
		//player class will give them the deal function
		//both of them can call deal(arr) to get cards


class Player {
	constructor (isDealer){
		this.hand = [];
		this.total = '';
		this.isDealer = isDealer;
	}
	deal(deck) {
		const randNum = Math.floor(Math.random() * deck.cards.length);
		for (let i = 0; i < 2; i++) {
		this.hand.push(deck.cards.splice(randNum, 1)[0]);}
		$('.userHand1').prepend(`<img src = "${this.hand[0].img}">`);
		$('.userHand2').prepend(`<img src = "${this.hand[1].img}">`);
	
	}
	cpuDeal(deck) {
		const randNum = Math.floor(Math.random() * deck.cards.length);
		for (let i = 0; i < 2; i++) {
		this.hand.push(deck.cards.splice(randNum, 1)[0]);}
		$('.cpuHand1').prepend(`<img src = "${this.hand[0].img}">`);
		$('.cpuHand2').prepend(`<img src = "./cardpics/backcover.png">`)
	
	}
	draw(deck){
		const randNum = Math.floor(Math.random() * deck.cards.length);
		this.hand.push(deck.cards.splice(randNum, 1)[0])
		if (this.hand.length === 3 && (this.isDealer === false) ) {
		$('.userHand3').prepend(`<img src = "${this.hand[2].img}">`)  
		}
		if (this.hand.length === 4 && (this.isDealer === false)) { 
		$('.userHand4').prepend(`<img src = "${this.hand[3].img}">`)
		}	
		if (this.hand.length === 5 && (this.isDealer === false)){
		$('.userHand5').prepend(`<img src = "${this.hand[4].img}">`) 	
		} 
		if (this.hand.length === 6 && (this.isDealer === false)){
		$('.userHand6').prepend(`<img src = "${this.hand[5].img}">`) 	
		} 
}
// hand[i].numVal
	playerValue() {
		let total = 0;
		let aceCount = 0;
		let moreAces = false; 
		let hasAce = false;
		let blackjack = false;
		for (let i = 0; i < this.hand.length; i++) {
			if (this.hand[i].value !== 'A'){
				// hasAce === true;
				total += this.hand[i].numVal;
			} /*else if (this.hand[i].value === 'A') {
				hasAce = true;
			}			
			
			*/
		}
		for (let i = 0; i < this.hand.length ; i++) {
			if (this.hand[i].numVal === 1){
				aceCount += 1;
			}
		}
		if (aceCount === 1) {
			hasAce = true
		} else if (aceCount === 2){
			moreAces = true;
			hasAce = false;
		}

		if (hasAce && (this.hand.length < 3)) {
				blackjack = true;
	}; 
		if (blackjack && (total === 10)) {
			return (total += 11);
		} else if ((aceCount === 1) && ((total + 11) <= 21 )) {
			 return total += 11;
		} else if ((moreAces === true) && ((total + 12) > 21)){
			return total += 2
        } else if (moreAces === true){
			return total += 12
		} else if (hasAce && ((total + 11) > 21)) {
			return total += 1;
		}
		  else {
			return total
		}

	};

	 cpuHit() {
		while ((cpu.total = cpu.playerValue()) <= 15) {
			cpu.draw(gameDeck)
			//console.log(cpu.hand.length)
			if (cpu.hand.length === 3 && (this.isDealer === true)) {
			$('.cpuHand3').prepend(`<img src = "${this.hand[2].img}">`);
			}
			if (cpu.hand.length === 4 && (this.isDealer === true)){
			$('.cpuHand4').prepend(`<img src = "${this.hand[3].img}">`);
			}
			if (cpu.hand.length === 5 && (this.isDealer === true)) {
				$('.cpuHand5').prepend(`<img src = "${this.hand[4].img}">`);
			}
			if (cpu.hand.length === 6 && (this.isDealer === true)) {
				$('.cpuHand6').prepend(`<img src = "${this.hand[5].img}">`);
			}
		}
		if (cpu.total = cpu.playerValue() >= 22) {
			console.log("CPU busts!")
		} else {return cpu.total = cpu.playerValue()
		}
	}
	flipCard() {
		if (this.isDealer === true) {
		$('.cpuHand2').html(`<img src = "${this.hand[1].img}">`)  
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
const player1 = new Player (false)
const cpu = new Player(true);




//gameDeck.shuffle();
// player1.deal(gameDeck);
////player1.hand.push({value: 7, suit: "C", numVal: 7, img: "cardpics/7C.png"});
//player1.hand.push({value: "Jack", suit: "Hearts", numVal: 10, img: "cardpics/JH.png"});
//cpu.hand.push({value: "Jack", suit: "Hearts", numVal: 10, img: "cardpics/JH.png"});
//cpu.hand.push({value: 7, suit: "C", numVal: 7, img: "cardpics/7C.png"});
//player1.hand.push({value: "A", suit: "Spades", numVal: 1});
//player1.hand.push({value: 10, suit: "Spades", numVal: 10});
//player1.hand.push({value: 5, suit: "Spades", numVal: 5}); 
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
/*
 function clear() {
          document.getElementsByClassName(".clear").innerHTML = "";
        } */

  function clear() {
  	$('.clear').empty();

  }

$(document).on("click", "#start", function() {
	gameDeck.shuffle();
	player1.deal(gameDeck);
	cpu.cpuDeal(gameDeck);
	//player1.total = player1.playerValue();
   // cpu.total = cpu.playerValue();
	//console.log(player1);
    //console.log(cpu);
});

$(document).on("click",'#hit', function(){
	player1.draw(gameDeck)
	player1.total = player1.playerValue();
	cpu.total=cpu.playerValue();
	//console.log(player1)
}) 

$(document).on('click', '#stay', function(){
	cpu.total = cpu.playerValue();
	cpu.flipCard();
	cpu.cpuHit(gameDeck);
	player1.total = player1.playerValue();
	cpu.total = cpu.playerValue();
	//cpu.total = cpu.cpuValue();
	console.log(player1);
	console.log(cpu);
	gameDeck.checkWinner(player1,cpu);
})

$(document).on('click','#nextRound', function(){
	clear();
	player1.hand.splice(0,player1.hand.length)
	cpu.hand.splice(0,cpu.hand.length)
	player1.deal(gameDeck);
	cpu.cpuDeal(gameDeck);
	console.log(gameDeck)
})
/*
$(document).ready(function(){
  $("#stay").click(function(){
    $("#winnerMessage").fadeToggle("slow");
  });
}); */
