/*!
* Start Bootstrap - Freelancer v7.0.5 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/

import { Easing, ScrollTo } from "scroll-to-position";
import sleep from "sleep-promise";
import domLoaded from "dom-loaded";
declare const bootstrap: typeof import("bootstrap");

//const mainNav = await domLoaded.then(() => document.body.querySelector('#mainNav'));

domLoaded.then(() => {
    const EasingDuration = 1000; // 1s
    const mainNav = document.body.querySelector('#mainNav');

    if(mainNav)
    {
        // Function to shrink navbar based on scroll height
        function navbarShrink(scrollDown: Boolean = false)
        {
            if(scrollDown)
            mainNav.classList.add('navbar-shrink');
            else if(window.scrollY === 0)
                mainNav.classList.remove('navbar-shrink');
            else
                mainNav.classList.add('navbar-shrink');
        }
    
        // Shrink the navbar to establish class at start
        navbarShrink();
    
        // Shrink the navbar when page is scrolled
        document.addEventListener('scroll', () => navbarShrink());
    
        // Activate Bootstrap scrollspy on the main nav element
        mainNav.classList.add('spy');
        new bootstrap.ScrollSpy(document.body, {
            target: '.spy',
            offset: 72,
        });
    
        const navbarToggler      = document.body.querySelector('.navbar-toggler') as HTMLElement;
        const responsiveNavItems = [...document.querySelectorAll('#navbarResponsive .nav-link')];
        const togglerVisible     = () => window.getComputedStyle(navbarToggler).display !== 'none';
    
        // Collapse responsive navbar menu toggler when it's visible and is clicked
        responsiveNavItems.forEach(responsiveNavItem => {
            responsiveNavItem.addEventListener('click', () => {
                if(togglerVisible())
                    navbarToggler.click();
            });
        });
    
        const navbarResponsive = document.getElementById('navbarResponsive');
    
        // Collapse responsive navbar toggler menu when clicked away from or page is scrolled
        ['click', 'scroll'].forEach(eventType => {
            document.addEventListener(eventType, event => {
                // Don't collapse if clicking on inside of navbar element
                if(mainNav.contains(event.target as Node))
                    return;
    
                // Collapse if visible and not already collapsed
                if(togglerVisible() && navbarResponsive.classList.contains('show'))
                    navbarToggler.click();
            });
        });
    
        // Add scroll-top button to navbar items for easing
        const easedNavItems = responsiveNavItems.concat([document.querySelector('.scroll-top a')]);
    
        // Function to unfocus navbar item button after clicked
        const unfocusNavItem = () => {
            if(document.activeElement.classList.contains('nav-link'))
                (document.activeElement as HTMLElement).blur();
        }
    
        // Ease scrolling to navbar items on click
        easedNavItems.forEach(navItem => {
            navItem.addEventListener('click', event => {
                // Get ID of clicked navItem (last part of link)
                let    href = (navItem as HTMLAnchorElement).href.split('/').pop().substring(1);
                
                // Get HTMLElement of clicked navItem from ID
                let element = document.getElementById(href);
    
                // Shrink navbar during scrolling
                navbarShrink(!href.includes('socials'));
    
                // Pause ScrollSpy
                mainNav.classList.remove('spy');
    
                // Ease scroll to section, unfocus clicked link after
                ScrollTo(element, {
                    duration: EasingDuration,
                      easing: Easing.easeInOutExpo, // exponential
                }).finally(() => {
                    // Unfocus button for styling
                    unfocusNavItem();
    
                    // Unpause ScrollSpy
                    sleep(1000).then(() => mainNav.classList.add('spy'));
                });
    
                // Only scroll, don't go to clicked link
                event.preventDefault();
            });
        });
    }
});