const startbtn=document.querySelector(".startGamebtn")
const message=document.querySelector(".message")
const sumText=document.querySelector(".sum")
const cardsText=document.querySelector(".cards")
const newCardbtn=document.querySelector(".newCardbtn")
const playAgainbtn=document.querySelector(".playAgainbtn")
const standbtn=document.querySelector(".standbtn")
const dealerCardsText=document.querySelector(".dealers-cards")
const dealerSumText=document.querySelector(".dealers-sum")

class Person{

            constructor(firstCard,secondCard,sum,hasBlackJack,isAlive,cards){
                this.firstCard=firstCard;
                this.secondCard=secondCard;
                this.sum=sum;
                this.hasBlackJack=hasBlackJack;
                this.isAlive=isAlive;
                this.cards=cards
            }

             renderGame(){
            }

            newCard(){
            }

}

 class Player extends Person{

            constructor(firstCard,secondCard,sum,hasBlackJack,isAlive,cards){
                super(firstCard,secondCard,sum,hasBlackJack,isAlive,cards);
            }

            renderGame=()=>{
                //console.log(player.cards)
                message.innerText=("Do you want to draw a new card?")
                cardsText.textContent="Cards:  "
                for(let i=0;i<player.cards.length;i++){
                    cardsText.textContent+=player.cards[i]+" "
                }
                sumText.textContent="Sum: "+player.sum
                
                if(player.sum<21){
                    message.innerText=("Do you want to draw a new card?")
                    
                }
                else if (player.sum == 21){
                    message.innerText=("You got black jack!!!")
                    player.hasBlackJack=true
                    
                }
                else{
                    message.innerText=("You are out of the game")
                    
                    player.isAlive=false
                    
                }

            }

            newCard(){
                if((player.isAlive==true && player.hasBlackJack==false)||dealer.dealercardsshow==false){
                    let newCard=game.getRandomCard()
                    player.cards.push(newCard)
                    player.sum+=newCard
                    player.renderGame();
                }
                else{
                    message.innerText=("You cant get another Card You lost")
                }
            }

    }


class Dealer extends Person{

            constructor(firstCard,secondCard,sum,hasBlackJack,isAlive,cards,dealercardsshow){
                super(firstCard,secondCard,sum,hasBlackJack,isAlive,cards);
                this.dealercardsshow=dealercardsshow;
            }

             renderGame(){
                //console.log(dealer.cards)
                dealerCardsText.textContent="Cards: "
                for(let i=0;i<dealer.cards.length;i++){
                    dealerCardsText.textContent+=dealer.cards[i]+"  "
                }
                dealerSumText.textContent="Sum: "+dealer.sum
                dealer.dealercardsshow=true
                
                if(dealer.sum<17){
                    dealer.newCard()
                    
                    
                }
                else if (dealer.sum == 21){
                    message.innerText=("Dealer got black jack!!")
                    dealer.hasBlackJack=true
                    
                }
                
                else if(dealer.sum>21){
                    message.innerText=("You win")
                    dealer.isAlive=false
                    
                }
                game.checkWinner()

            }

            newCard(){
                if(dealer.isAlive==true && dealer.hasBlackJack==false){
                    let newCard=game.getRandomCard()
                    dealer.cards.push(newCard)
                    dealer.sum+=newCard
                    dealer.renderGame();
                }
            }

}


class  BlackJack{

            startGame(){
                player.isAlive=true;
                dealer.cardsshow=false
                player.renderGame();
            }

            newGame(){
                if(player.isAlive==false||player.hasBlackJack==true||dealer.isAlive==false){
                    message.innerText=("New Game ")
                    player.firstCard=game.getRandomCard()
                    player.secondCard=game.getRandomCard()
                    player.cards=[player.firstCard,player.secondCard]
                    player.sum=player.firstCard+player.secondCard
                    
                    dealer.firstCard=game.getRandomCard()
                    dealer.secondCard=game.getRandomCard()
                    dealer.cards=[dealer.firstCard,dealer.secondCard]
                    dealer.sum=dealer.firstCard+dealer.secondCard
                    game.startGame(); 
                    dealerCardsText.textContent="Cards: "
                    dealerSumText.textContent="Sum: "
                    dealer.isAlive=false
                    
                }
            else{
                message.innerText=("You are already in a game")
            }
            }

            dealerTurn(){
                if(player.isAlive==true){
                    message.innerText=("Dealer Turn");
                    dealer.isAlive=true  // des to 
                
                    dealer.renderGame();
                }
                else{
                    message.innerText=("You have lost you cant stand")
                }
            }

            checkWinner(){
                if(dealer.isAlive==true){
                    if(dealer.sum>player.sum){
                        message.innerText=("Dealer Win you lose")
                        player.isAlive=false
                    }
                    else if(dealer.sum<player.sum){
                        message.innerText=("You Win")
                        dealer.isAlive=false
                    }
                    else{
                        message.innerText=("Dealer Win you lose")
                        player.isAlive=false
                        dealer.isAlive=false
                
                    }
                }
            }

                getRandomCard(){
                let result=Math.floor(Math.random()*13) +1;
                if(result==1)
                return 11;
                else if (result>10)
                return 10;
                else return result;

            }
}

// class Chips{
//     constructor(value,color,money){
//         this.value=value;
//         this.color=color;
//         this.money=money;
//     }

// }

// class Bank{
//     constructor(money){
//         this.money=money;
//     }
// }

let game=new BlackJack();


let firstCard=game.getRandomCard();
let secondCard=game.getRandomCard()
let sum=firstCard+secondCard
let hasBlackJack=false
let isAlive=false

let dealerfirstCard=game.getRandomCard()
let dealersecondCard=game.getRandomCard()
let dealersum=dealerfirstCard+dealersecondCard
let dealerhasBlackJack=false
let dealerisAlive=false
let dealercardsshow=false

let cards=[firstCard,secondCard]
let dealercards=[dealerfirstCard,dealersecondCard]


let player= new Player(firstCard,secondCard,sum,hasBlackJack,isAlive,cards);
let dealer= new Dealer(dealerfirstCard,dealersecondCard,dealersum,dealerhasBlackJack,dealerisAlive,dealercards,dealercardsshow);

startbtn.onclick=game.startGame;
newCardbtn.onclick=player.newCard;
playAgainbtn.onclick=game.newGame;
standbtn.onclick=game.dealerTurn;






 