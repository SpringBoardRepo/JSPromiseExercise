
let BASEURL = 'http://deckofcardsapi.com/api/deck'


//1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
//Once you have the card, console.log the value and the suit(e.g.“5 of spades”, “queen of diamonds”).

async function getSingleCard() {
    let response = await axios.get(`${BASEURL}/new/draw`);
    let { suit, value } = response.data.cards[0];
    console.log(`${value} of ${suit}`);
}
getSingleCard()

//2.Make a request to the deck of cards API to request a single card from a newly shuffled deck.
//Once you have the card, make a request to the same API to get one more card from the same deck.


async function getShuffleCards() {

    let firstCard = await axios.get(`${BASEURL}/new/draw`);
    let deckId = firstCard.data.deck_id;
    let secCard = await axios.get(`${BASEURL}/${deckId}/draw`);

    [firstCard, secCard].forEach((card) => {
        let { suit, value } = card.data.cards[0];
        console.log(`${value} of ${suit}`);

    });
}
getShuffleCards()


//3. Build an HTML page that lets you draw cards from a deck. When the page loads, 
//go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.
//Every time you click the button, display a new card, until there are no cards left in the deck.
const cardArea = document.querySelector('.card-area')
const btn = document.querySelector('button')
async function getCards() {

    let res = await axios.get(`${BASEURL}/new/shuffle`);
    let deckId = res.data.deck_id;

    btn.addEventListener('click', async function () {

        let data = await axios.get(`${BASEURL}/${deckId}/draw`);
        if (data.data.remaining === 0) {
            btn.remove();
        }

        let cardimg = data.data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        const image = document.createElement('img');
        image.src = cardimg;
        image.style.transform = `rotate(${angle}deg)`;
        image.style.transform = `translate(${randomX}x, ${randomY}y)`;

        cardArea.append(image);
    })
}
getCards()
