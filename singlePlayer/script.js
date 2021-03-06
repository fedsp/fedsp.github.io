
let { sleep } = await import("./utils.js");
let { keyboardInputController } = await import("./keyboardInputController.js");
const { roundController } = await import("./roundController.js");
const roundControllerObj = new roundController();
roundControllerObj.controllersLocked = true;

self.consts = {
    POKEMON_QTY: 760,
    DECK_QTY: 10,
    AVG_HP: 68.12,
    AVG_ATK: 74.97,
    AVG_DEF: 70.49,
    AVG_SP_ATK: 68.53,
    AVG_SP_DEF: 69.12,
    AVG_WEIGHT: 680
}

async function main() {
    await roundControllerObj.waitToBeginMatch();
}

document.onkeydown = async function (evt) {
    await keyboardInputController(evt, roundControllerObj);
};

await main();











