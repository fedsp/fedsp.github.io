let rendered = false;
let optionSelected = "singlePlayer";
const optionSound = new Audio('./media/audio_selected/menu_alt.wav');
const optionSelectedSound = new Audio('./media/audio_selected/menu.wav');
const victorySound = new Audio('./media/audio_selected/victory.wav');

function firstRender(){
    if(rendered){
        return;
    }
    rendered = true;
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch(evt.key)
        {
            case "ArrowUp":
                optionSound.play();
                handleOptionChange();
                break;
            case "ArrowDown":
                optionSound.play();
                handleOptionChange();
                break;
            case "Enter":
                optionSelectedSound.play();
                break;
            case "Control":
                victorySound.play();
                break;
            default:
                return;
        }
};

function handleOptionChange(){
    var oldMenu = document.getElementById(optionSelected=="singlePlayer"?"singlePlayerSelect":"multiPlayerSelect");
    var oldPokeIcon = oldMenu.getElementsByClassName("pokeballSelector")[0];
    oldPokeIcon.className = "pokeballSelector hidden";
    var newMenu = document.getElementById(optionSelected=="singlePlayer"?"multiPlayerSelect":"singlePlayerSelect");
    var newPokeIcon = newMenu.getElementsByClassName("pokeballSelector")[0];
    newPokeIcon.className = "pokeballSelector";
    optionSelected = optionSelected=="singlePlayer"?"multiPlayer":"singlePlayer"    
}