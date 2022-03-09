import domLoaded from "dom-loaded";

domLoaded.then(() => {
    const _scrollButton = document.getElementById("scroll-top-button");
    const    FadedClass = "scroll-faded";
    const   HiddenClass = "scroll-hidden";
    const  WindowCutoff = window.screen.height / 4; // 1.25 screen height
    
    let scrollValue = 0;
    
    function buttonVisible(): Boolean
    {
        return window.getComputedStyle(_scrollButton).display !== 'none';   
    }
    
    function handleScrollToTop(newScrollValue: number): void
    {
        // unfade on scroll
        _scrollButton.classList.remove(FadedClass);
    
        setTimeout(() => {
            // refade if stopped scrolling (short circuit if not visible)
            if(buttonVisible() && scrollValue >= WindowCutoff && scrollValue === newScrollValue)
                _scrollButton.classList.add(FadedClass);
        }, 3000); // 3 seconds
    
        scrollValue = newScrollValue;
    }
    
    document.addEventListener("scroll", () => {
        let canTick = false;
    
        if(buttonVisible())
        {
            if(!canTick)
            {
                window.requestAnimationFrame(() => {
                    // show scroll button if past cutoff
                    if(window.scrollY >= WindowCutoff)
                    {
                        _scrollButton.classList.remove(HiddenClass);
                        handleScrollToTop(window.scrollY);
                    }
                    else
                        _scrollButton.classList.add(HiddenClass);
    
                    canTick = false;
                });
    
                canTick = true;
            }
        }
        else
            _scrollButton.classList.add(HiddenClass);
    });
});