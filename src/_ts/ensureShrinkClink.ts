import domLoaded from "dom-loaded";

/**
 * When shrinking a button on click with the ':active' psuedo-class and resizing ':focus',
 * the location of the cursor may now be outside of the button's bounds, causing it's
 * 'onclick' event to not fire¹. This script ensures that the click event is still fired².
 * For best results, make the size of the button's parent element no bigger than it is to
 * ensure there are no accidental clicks.
 * 
 * ¹: An element's 'onclick' event is fired if a pointer is pressed and released within the 
 *    same element (i.e., a 'mousedown' and a 'mouseup' event both occur on the same element).
 *    If the pointer is moved outside of the element prior to the pointer being released,
 *    the 'onclick' event instead occurs on the element's "most specific ancestor" element.
 *    Since the shrinking of a button may result in this depending on where the button is
 *    pressed, the solution is to watch the button's 'mousedown' event and click the button
 *    if a 'mouseup' event fires on it's parent afterwards.
 * 
 * ²: Currently only applies to buttons on carousel indicators.
 * 
 * https://stackoverflow.com/a/70972273/10292952
 * 
 */
domLoaded.then(() => {
    // The CSS selector for the buttons to monitor
    const selectors = ".carousel-indicators button";

    document.querySelectorAll(selectors).forEach(button => {
        // Watch for button press
        button.addEventListener('mousedown', event => {
            // The button is the event's original target
            const element = event.target as HTMLElement;
    
            // Click if the cursor is released over the button's parent
            element.parentElement.addEventListener('mouseup', () => {
                element.click();
            }, { once: true });
        });
    });
});