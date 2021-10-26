const intToAttribute = [
    "attack",
    "defense",
    "spAttack",
    "spDefense",
    "weight"
]


export function battle(player1Card,player2Card,attributeChosenIndex){
    let attributeChosen = intToAttribute[attributeChosenIndex];
    if((player1Card[attributeChosen])>(player2Card[attributeChosen])){
        return 1;
    }
    else if((player1Card[attributeChosen])<(player2Card[attributeChosen])){
        return 2;
    }
    else{
        return 3;
    }
}
