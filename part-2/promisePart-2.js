
let BASEURL = "http://deckofcardsapi.com/api/deck"

//1 . Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
//Once you have the card, console.log the value and the suit(e.g.“5 of spades”, “queen of diamonds”).

let res = axios.get(`${BASEURL}/new/draw`)
    .then(data => {
        let { suit, value } = data.data.cards[0];
        console.log(`${value} of ${suit}`)
    })

//2.Make a request to the deck of cards API to request a single card from a newly shuffled deck.
//Once you have the card, make a request to the same API to get one more card from the same deck.

let res1 = axios.get(`${BASEURL}/new/draw`)
    .then(data => {
        let deck_id = data.data.deck_id;
        return axios.get(`${BASEURL}/${deck_id}/draw/?count=2`)
    })
    .then(data => {

        let firstCard = data.data.cards[0]
        let secondCard = data.data.cards[1];
        [firstCard, secondCard].forEach(function (card) {
            console.log(`${card.value} of ${card.suit}`)
        })
    })

//3. Build an HTML page that lets you draw cards from a deck. When the page loads, 
//go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.
//Every time you click the button, display a new card, until there are no cards left in the deck.

const btn = document.querySelector('button')
const cardArea = document.querySelector('.card-area')
let deck_id = null;

let response = axios.get(`${BASEURL}/new/shuffle`)
    .then(data => {
        deck_id = data.data.deck_id;
    })

btn.addEventListener('click', function () {
    axios.get(`${BASEURL}/${deck_id}/draw`)
        .then(data => {

            if (data.data.remaining === 0) {
                btn.remove();
            }

            let cardimg = data.data.cards[0].image
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            const image = document.createElement('img');
            image.src = cardimg;
            image.style.transform = `rotate(${angle}deg)`;
            image.style.transform = `translate(${randomX}, ${randomY})`;

            cardArea.append(image)


        });

});

