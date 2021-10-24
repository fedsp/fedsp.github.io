export class attributeSelector{
    constructor(){
        this.currentSelection = 0;
    }    

    selectAttribute(keyUpOrDown){
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
        console.log(this.currentSelection);
    }
}