"use strict";


/* =====================================
   SHARED SITE UTILITIES
===================================== */

window.MarysSite =
    window.MarysSite || {};


window.MarysSite.prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;



/* =====================================
   SHARED REVEAL SYSTEM
===================================== */

window.MarysSite.observeRevealElements =
    function (elements) {

        const revealElements =
            Array.from(
                elements || []
            );


        if (
            revealElements.length === 0
        ) {
            return;
        }


        if (
            window.MarysSite
                .prefersReducedMotion
        ) {

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "reveal-visible"
                    );

                }
            );


            return;

        }


        const observer =
            new IntersectionObserver(
                (
                    entries,
                    revealObserver
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry
                                    .target
                                    .classList
                                    .add(
                                        "reveal-visible"
                                    );


                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },
                {

                    threshold: 0.10,

                    rootMargin:
                        "0px 0px -35px 0px"

                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    };



document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================
           SHARED PAGE ELEMENTS
        ===================================== */

        const siteHeader =
            document.querySelector(
                ".site-header"
            );


        const mobileMenuButton =
            document.getElementById(
                "mobileMenuButton"
            );


        const mainNavigation =
            document.getElementById(
                "mainNavigation"
            );


        const backToTopButton =
            document.getElementById(
                "backToTop"
            );



        /* =====================================
           MOBILE MENU
        ===================================== */

        function closeMobileMenu() {

            if (
                !mobileMenuButton ||
                !mainNavigation
            ) {
                return;
            }


            mainNavigation.classList.remove(
                "active"
            );


            mobileMenuButton.classList.remove(
                "active"
            );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            document.body.classList.remove(
                "menu-open"
            );

        }



        if (
            mobileMenuButton &&
            mainNavigation
        ) {

            mobileMenuButton.addEventListener(
                "click",
                () => {

                    const isOpen =
                        mainNavigation
                            .classList
                            .toggle(
                                "active"
                            );


                    mobileMenuButton
                        .classList
                        .toggle(
                            "active",
                            isOpen
                        );


                    mobileMenuButton
                        .setAttribute(
                            "aria-expanded",
                            isOpen.toString()
                        );


                    document.body
                        .classList
                        .toggle(
                            "menu-open",
                            isOpen
                        );

                }
            );


            mainNavigation
                .querySelectorAll("a")
                .forEach(
                    (link) => {

                        link.addEventListener(
                            "click",
                            closeMobileMenu
                        );

                    }
                );


            window.addEventListener(
                "resize",
                () => {

                    if (
                        window.innerWidth >
                        820
                    ) {

                        closeMobileMenu();

                    }

                }
            );

        }



        /* =====================================
           HEADER
        ===================================== */

        function updateHeader() {

            if (!siteHeader) {
                return;
            }


            siteHeader.classList.toggle(
                "header-scrolled",
                window.scrollY > 40
            );

        }



        /* =====================================
           BACK TO TOP
        ===================================== */

        function updateBackToTopButton() {

            if (!backToTopButton) {
                return;
            }


            backToTopButton
                .classList
                .toggle(
                    "visible",
                    window.scrollY > 600
                );

        }



        if (backToTopButton) {

            backToTopButton.addEventListener(
                "click",
                () => {

                    window.scrollTo({

                        top: 0,

                        behavior:
                            window.MarysSite
                                .prefersReducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        }



        /* =====================================
           INITIAL REVEALS
        ===================================== */

        window.MarysSite
            .observeRevealElements(
                document.querySelectorAll(
                    ".reveal"
                )
            );



        /* =====================================
           ESCAPE CLOSES MOBILE MENU
        ===================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeMobileMenu();

                }

            }
        );



        /* =====================================
           SCROLL EVENTS
        ===================================== */

        function handleScroll() {

            updateHeader();

            updateBackToTopButton();

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );


        handleScroll();

    }
);