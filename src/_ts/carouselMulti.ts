import domLoaded from "dom-loaded";
// https://github.com/microsoft/TypeScript/issues/24279#issuecomment-391037775
// use 'declare' to remove during compilation
declare const Carousel: typeof import("bootstrap").Carousel;

function getFirst<T>(arr: T[]): T { return arr[0]; }
function  getLast<T>(arr: T[]): T { return [...arr].pop(); }

function  getLeft(element: Element, arr: Element[]) { return element.previousElementSibling ??  getLast(arr); }
function getRight(element: Element, arr: Element[]) { return element.nextElementSibling     ?? getFirst(arr); }

function setMarkers(left: Element, right: Element, add: Boolean): void
{
    if(add)
    {
         left.classList.add( 'left');
        right.classList.add('right');
    }
    else // remove
    {
         left.classList.remove( 'left');
        right.classList.remove('right');
    }
}

domLoaded.then(() => {
    const carousels = document.querySelectorAll('.carousel');

    // add event listeners to each carousel
    carousels.forEach(carousel => {
        // get all .carousel-items and show first left/right
        const items = Array.from(carousel.querySelectorAll('.carousel-item'));
        const first = items.find(item => item.classList.contains('active'));
        let    left =  getLeft(first, items);
        let   right = getRight(first, items);

        // add markers to show first left/right
        setMarkers(left, right, true);
        
        // at start of slide
        carousel.addEventListener(Carousel.Events.slide, event => {
            // reset left/right markers
            setMarkers(left, right, false);
            
            // event stores new active item
            const active = event.relatedTarget;
            
            // get left/right, wrapping if necessary
             left =  getLeft(active, items);
            right = getRight(active, items);
            
            // add markers
            setMarkers(left, right, true);
        });
    });
});