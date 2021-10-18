let { mountData } = await import("./mountData.js");
let { keyboardInputController } = await import("./keyboardInputController.js");

(() => {
    let rendered = false;
    self.controllersLocked = true;

    self.consts = {
        POKEMON_QTY: 760,
        DECK_QTY: 20,
        AVG_HP: 68.12,
        AVG_ATK: 74.97,
        AVG_DEF: 70.49,
        AVG_SP_ATK: 68.53,
        AVG_SP_DEF: 69.12
    }

    self.player1Cards = [];
    self.player2Cards = [];

    async function main() {
        if (rendered) {
            return;
        }
        await sleep(1000);
        mountData();
    }

    document.onkeydown = function (evt) {
        if (controllersLocked) {
            return;
        }
        keyboardInputController(evt);
    };



    window.doStuff = function () {
        playRound(player1Cards, player2Cards);
    }

    main();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})();










