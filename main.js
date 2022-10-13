const prompt = require('prompt-sync')({sigint: true});

let fish = {
    "Sm-Carp":.81,
    "Md-Carp":.56,
    "Lg-Carp":1.2,
    "Sm-Trout":.35,
    "Md-Trout":.46,
    "Lg-Trout":3.4,
    "Sm-Walleye":.6,
    "Md-Walleye":3.1,
    "Lg-Walleye":4.8,
    "Sm-Catfish":1.3,
    "Md-Catfish":1.7,
    "Lg-Catfish":4.6,
    "Sm-Gar":2.1,
    "Md-Gar":3.3,
    "Lg-Gar":5.2,
    "Sm-Bass":3.4,
    "Md-Bass":6,
    "Lg-Bass":8.2,
}

let fishValue = {
    "Carp":1.12,
    "Trout":2.26,
    "Walleye":1.75,
    "Catfish":1.6,
    "Gar":1.4,
    "Bass":1.63
}

let fishBasket = []
let weightBasket = []
let moneyBasket = []

function getMoney(){
    let moneyBasketcpy = moneyBasket
    return Math.round(moneyBasketcpy.reduce((x,i)=>x+i, 0) * 100) / 100
}
function getWeight(){
    let weightBasketcpy = weightBasket
    return Math.round(weightBasketcpy.reduce((x,i)=>x+i, 0) * 100) / 100
}

console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.")
    console.log("")
    for(let i=6;i<12;i++){
        console.log("==========================================")
        console.log("")
        console.log(`The time is ${i}:00am. So far you've caught:\n${fishBasket.length} fish, ${getWeight()} lbs, $${getMoney()}`)
        console.log("")
        catchFish()
}

function catchFish(){
    let keys = Object.keys(fish)
    let caughtFish = keys[Math.floor(Math.random() * keys.length)]
    let fishName = caughtFish.split("-")[1]
    let value = Math.round((fishValue[fishName] * fish[caughtFish]) * 100) / 100
    console.log(`You caught a '${caughtFish}' weighing ${fish[caughtFish]} lbs and valued at $${value}`)
    console.log("")
    let runningWeight = getWeight()
    if(runningWeight + fish[caughtFish] > 10){
        console.log("This fish would put you over 10 lbs, so you release it.")
        console.log("Press [enter] to continue")
        prompt(">")
    }else{
        console.log("Your action: [c]atch or [r]elease?")
        let choice = prompt(">")
        if(choice === "c"){
            fishBasket.push(caughtFish)
            weightBasket.push(fish[caughtFish])
            moneyBasket.push(value)
            console.log("You chose to keep the fish.")
        }else{
            console.log("You chose to release the fish.")
        }
    }
    console.log("")
}

console.log("")
console.log("The time is 12:00pm. Times up!")
console.log("")
console.log(`You caught ${fishBasket.length} fish:`)
for(i in fishBasket){
    console.log(`* ${fishBasket[i]}, ${weightBasket[i]} lbs, $${moneyBasket[i]}`)
}
console.log("")
console.log(`Total weight: ${getWeight()} lbs`)
console.log(`Total value: $${getMoney()}`)
