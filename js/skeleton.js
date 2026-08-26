"use strict";


window.addEventListener("load", () => {

    const skeleton =
        document.getElementById(
            "pageSkeleton"
        );


    if (!skeleton) {
        return;
    }


    skeleton.classList.add(
        "skeleton-hidden"
    );


    /*
        Wait until the fade animation
        finishes before removing it
        from the page completely.
    */

    window.setTimeout(() => {

        skeleton.remove();

    }, 400);

});