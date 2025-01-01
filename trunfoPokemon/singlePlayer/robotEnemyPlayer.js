export class robotEnemy{
    constructor(){
        console.log("I am dangerous!");
    }
    automaticPlayTurn(card){
        let scores = [
        (card.hp/self.consts.AVG_HP),
        (card.attack/self.consts.AVG_ATK),
        (card.defense/self.consts.AVG_DEF),
        (card.spAttack/self.consts.AVG_SP_ATK),
        (card.spDefense/self.consts.AVG_SP_DEF),
        (card.weight/self.consts.AVG_WEIGHT)
        ]
        scores = scores.map((item)=>{
            return item.toFixed(2);
        });
        let biggestScore = Math.max(...scores);
        let scoreIndex = scores.indexOf(biggestScore.toString());
        return scoreIndex;
    }
}

