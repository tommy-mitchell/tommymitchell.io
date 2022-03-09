import domLoaded from "dom-loaded";
import { newBoopElement } from "booper";
declare const bootstrap: typeof import("bootstrap");

//const element = await domLoaded.then(() => document.querySelector(".im-paul"));

domLoaded.then(() => {
    const element = document.querySelector(".im-paul");
    
    if(element)
    {
        const popover = new bootstrap.Popover(element, {
            trigger: "hover",
            html:     true,
            content:  '<img class="img-fluid" src="https://thumbs.gfycat.com/MintyDirectLaughingthrush-max-1mb.gif"/>',
            delay: { 
                "show": 100,
                "hide": 250
            },
            placement: "top",
            container: element.parentElement
        });

        // load gif so it shows the first time popover appears
        popover.show();
        popover.hide();

        const aboutBlock = document.querySelector(".about");


        newBoopElement(element, {
            y: 2.5,
            /*events: {
                ['mouseenter']: (details, event) => {
                    if(details.initialMousePos === undefined)
                        return true;
        
                    // Can't boop if mouse has barely moved (no accidental double booping)
                    return (Math.abs(details.initialMousePos.x - (event as MouseEvent).screenX) > 15) ||
                           (Math.abs(details.initialMousePos.y - (event as MouseEvent).screenY) > 15);
                }
            }*/
        }, aboutBlock);
    }
});