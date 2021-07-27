const button = document.querySelector('button')
//Use the API to get 4 facts on your favorite number.Once you have them all, put them on the page.It’s okay if some of the facts are repeats.

function getRandomNum() {
    let ramdomNum = Math.floor((Math.random() * 100) + 1)
    return ramdomNum;
}


function getRandomFact() {
    let ramdomNum = getRandomNum()
    let res = axios.get(`http://numbersapi.com/${ramdomNum}?json`)
    return res;

}

function getFact() {
    getRandomFact()
        .then(data => {
            $('body').append(`<p>${data.data.text}</p>`)
            return getRandomFact();
        })
        .then(data => {
            $('body').append(`<p>${data.data.text}</p>`)
            return getRandomFact();
        })
        .then(data => {
            $('body').append(`<p>${data.data.text}</p>`)
            return getRandomFact();
        })
        .then(data => {
            $('body').append(`<p>${data.data.text}</p>`)
        })
        .catch(err => console.log(err))
}
button.addEventListener('click', function (evt) {
    evt.preventDefault();
    getFact()
})
