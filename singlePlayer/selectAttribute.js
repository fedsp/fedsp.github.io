let { drawCursor } = await import("./drawer.js");
const optionSound = new Audio('./media/audio/menu_alt.wav');
optionSound.playbackRate = 3;
const validOptionSelectedSound = new Audio('./media/audio/menu_confirm.wav');

export class attributeSelector{
    constructor(){
        this.currentSelection = 0;
    }    

    selectAttribute(keyUpOrDown){
        const prevSelection = this.currentSelection;
        if(keyUpOrDown=="down"){
            if(this.currentSelection==5){
                this.currentSelection = 0;
            }
            else{
                this.currentSelection++; 
            }            
        }
        else{
            if(this.currentSelection==0){
                this.currentSelection = 5;
            }
            else{
                this.currentSelection--; 
            }
        }
        drawCursor(prevSelection,this.currentSelection);
        optionSound.play();
    }
}