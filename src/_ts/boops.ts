import domLoaded from "dom-loaded";
import { makeDefaultBoops } from "booper";

makeDefaultBoops();

domLoaded.then(() => {
    const modal = document.querySelector("#portfolioModal-booper .modal-body");
    const boopList = document.querySelector(".booper") as HTMLSpanElement;

    boopList?.querySelectorAll("span").forEach(boopElement => {
        /*boopElement.addEventListener("click", () => {
            //boopElement.style.color = "green";
            setTimeout(() => {
                boopList.click();
                (document.activeElement as HTMLElement).blur();
                //boopElement.style.color = "";
                //(boopElement as HTMLInputElement).disabled = true;
            }, 50);
        });*/
//boopElement.tabIndex = -1;
       /* boopElement.addEventListener("click", event => {
            setTimeout(() => {
                //boopList.parentElement.dispatchEvent(new Event("click"));
                //boopList.parentElement.click();
                //const next = boopElement.nextSibling;
                //boopList.removeChild(boopElement);
                //setTimeout(() => boopList.insertBefore(boopElement, next), 0);
                //alert("hi");
                //(event.target as HTMLElement).blur();

                const temp: HTMLInputElement = document.createElement('input');
                temp.style.opacity = "0";
                temp.style.position = "fixed";

                modal.appendChild(temp);
                temp.click();
                temp.click();
                (document.activeElement as HTMLElement).blur();
                modal.removeChild(temp);
            }, 150);
        });*/

        boopElement.addEventListener("touchend", event => {
            boopElement.style.color = "#5a6570";

            setTimeout(() => {
                boopElement.style.color = "";


                const temp: HTMLInputElement = document.createElement('input');
                temp.style.opacity = "0";
                temp.style.position = "fixed";

                modal.appendChild(temp);
                temp.click();
                temp.focus();
                (document.activeElement as HTMLElement).blur();
                modal.removeChild(temp);
            }, 150);
        });

        //boopElement.addEventListener("touchstart", () => {});
    });
});