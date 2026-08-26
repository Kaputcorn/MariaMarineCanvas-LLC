"use strict";


document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       GET PAGE ELEMENTS
    ============================ */

    const siteHeader =
        document.querySelector(".site-header");


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


    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );



    /* ============================
       MOBILE MENU
    ============================ */

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

                const menuIsOpen =
                    mainNavigation
                        .classList
                        .toggle("active");


                mobileMenuButton
                    .classList
                    .toggle(
                        "active",
                        menuIsOpen
                    );


                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    menuIsOpen.toString()
                );


                document.body
                    .classList
                    .toggle(
                        "menu-open",
                        menuIsOpen
                    );

            }
        );



        /* Close after clicking menu link */

        const navigationLinks =
            mainNavigation
                .querySelectorAll("a");


        navigationLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            }
        );



        /* Close with Escape key */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    closeMobileMenu();

                }

            }
        );



        /* Close if resized to desktop */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 800
                ) {

                    closeMobileMenu();

                }

            }
        );

    }



    /* ============================
       HEADER SCROLL EFFECT
    ============================ */

    function updateHeader() {

        if (!siteHeader) {
            return;
        }


        if (
            window.scrollY > 40
        ) {

            siteHeader.classList.add(
                "header-scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "header-scrolled"
            );

        }

    }



    /* ============================
       BACK TO TOP BUTTON
    ============================ */

    function updateBackToTopButton() {

        if (!backToTopButton) {
            return;
        }


        if (
            window.scrollY > 500
        ) {

            backToTopButton
                .classList
                .add("visible");

        } else {

            backToTopButton
                .classList
                .remove("visible");

        }

    }



    if (backToTopButton) {

        backToTopButton.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* ============================
       SCROLL REVEAL
    ============================ */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    if (prefersReducedMotion) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

    } else {

        const revealObserver =
            new IntersectionObserver(
                (
                    entries,
                    observer
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


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {

                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"

                }
            );



        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* ============================
       SCROLL HANDLER
    ============================ */

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



    /* Run when page first loads */

    handleScroll();

});