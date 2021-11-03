let { sleep } = await import("./utils.js");

export class animationsController{
    constructor(){
        console.log("oe");
    }

    async player1Attack(){
        const player1PokemonTile = document.getElementById("player1PokemonTile");
        player1PokemonTile.className = "pokemonTile player1PokemonTileAttacking";
        await sleep(1000);
        player1PokemonTile.className = "pokemonTile";

        const player2PokemonTile = document.getElementById("player2PokemonTile");
        player2PokemonTile.className = "pokemonTile player2PokemonTileDefending";
        await sleep(1000);
        player2PokemonTile.className = "pokemonTile";
    }
    async player2Attack(){
        console.log("attack 2");
    }
}