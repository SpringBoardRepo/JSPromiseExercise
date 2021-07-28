let randoumNum = null;

function getRandomNum() {
    randoumNum = Math.floor((Math.random() * 100) + 1)
    return randoumNum;
}
//1.

async function getSingleFact() {
    getRandomNum();
    let res = await axios.get(`http://numbersapi.com/${randoumNum}?json`)
    console.log(res.data.text)
}
getSingleFact()

//2.

async function getMultipleFact() {
    let numbers = [15, 5, 78]
    let res1 = await axios.get(`http://numbersapi.com/${numbers}?json`)
    console.log(res1.data)
}
getMultipleFact()

//3.

async function getAllFacts() {
    getRandomNum();
    let p1 = await axios.get(`http://numbersapi.com/${randoumNum}?json`)
    getRandomNum();
    let p2 = await axios.get(`http://numbersapi.com/${randoumNum}?json`)
    getRandomNum();
    let p3 = await axios.get(`http://numbersapi.com/${randoumNum}?json`)

    console.log(p1.data.text)
    console.log(p2.data.text)
    console.log(p3.data.text)
}
getAllFacts()