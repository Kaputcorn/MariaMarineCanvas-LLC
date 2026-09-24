"use strict";


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================
           PROJECT DATA
        ===================================== */

        const projects =
            Array.isArray(
                window.MarysProjects
            )
                ? window.MarysProjects
                : [];



        /* =====================================
           WORK PAGE ELEMENTS
        ===================================== */

        const portfolioGrid =
            document.getElementById(
                "portfolioGrid"
            );


        const projectCount =
            document.getElementById(
                "projectCount"
            );


        /*
            Allows this script to safely exist
            without running on pages that do not
            contain the portfolio.
        */

        if (!portfolioGrid) {
            return;
        }



        const prefersReducedMotion =
            window.MarysSite &&
            typeof window.MarysSite
                .prefersReducedMotion ===
                "boolean"
                ? window.MarysSite
                    .prefersReducedMotion
                : window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;



        /* =====================================
           IMAGE HELPERS
        ===================================== */

        function getProjectImages(
            project
        ) {

            if (
                Array.isArray(
                    project.images
                ) &&
                project.images.length > 0
            ) {

                return project.images;

            }


            return [

                {
                    src: "",

                    alt:
                        project.title,

                    placeholder:
                        "Project Photo"
                }

            ];

        }



        function createImageElement(
            imageData,
            options = {}
        ) {

            const {
                lazy = true
            } = options;


            if (
                imageData &&
                imageData.src
            ) {

                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    imageData.src;


                image.alt =
                    imageData.alt ||
                    "Marine project photo";


                image.decoding =
                    "async";


                if (lazy) {

                    image.loading =
                        "lazy";

                }


                return image;

            }



            const placeholder =
                document.createElement(
                    "span"
                );


            placeholder.textContent =
                imageData?.placeholder ||
                "Project Photo";


            return placeholder;

        }



        function renderImageInsideContainer(
            container,
            imageData,
            options = {}
        ) {

            if (!container) {
                return;
            }


            container.replaceChildren();


            container.classList.remove(
                "placeholder-image"
            );


            if (
                !imageData ||
                !imageData.src
            ) {

                container.classList.add(
                    "placeholder-image"
                );

            }


            container.appendChild(
                createImageElement(
                    imageData,
                    options
                )
            );

        }



        /* =====================================
           CREATE PROJECT CARD
        ===================================== */

        function createProjectCard(
            project
        ) {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.classList.add(
                "portfolio-card",
                "reveal"
            );


            if (
                project.layout ===
                "wide"
            ) {

                card.classList.add(
                    "portfolio-card-wide"
                );

            }


            if (
                project.layout ===
                "tall"
            ) {

                card.classList.add(
                    "portfolio-card-tall"
                );

            }


            card.dataset.projectId =
                project.id;


            card.dataset.category =
                project.category;


            card.setAttribute(
                "aria-label",
                `View ${project.title} gallery`
            );



            const projectImages =
                getProjectImages(
                    project
                );


            const firstImage =
                projectImages[0];



            /* IMAGE */

            const imageContainer =
                document.createElement(
                    "div"
                );


            imageContainer.classList.add(
                "portfolio-image"
            );


            if (!firstImage.src) {

                imageContainer.classList.add(
                    "placeholder-image"
                );

            }


            imageContainer.appendChild(
                createImageElement(
                    firstImage
                )
            );



            /* VIEW PROJECT */

            const viewProject =
                document.createElement(
                    "span"
                );


            viewProject.classList.add(
                "portfolio-view-project"
            );


            viewProject.textContent =
                "View Project";


            imageContainer.appendChild(
                viewProject
            );



            /* PHOTO COUNT */

            if (
                projectImages.length > 1
            ) {

                const photoCount =
                    document.createElement(
                        "span"
                    );


                photoCount.classList.add(
                    "portfolio-photo-count"
                );


                photoCount.textContent =
                    `${projectImages.length} photos`;


                imageContainer.appendChild(
                    photoCount
                );

            }



            /* BEFORE / AFTER BADGE */

            if (
                project.beforeAfter &&
                project.beforeAfter.before &&
                project.beforeAfter.after
            ) {

                const badge =
                    document.createElement(
                        "span"
                    );


                badge.classList.add(
                    "portfolio-before-after-badge"
                );


                badge.textContent =
                    "Before / After";


                imageContainer.appendChild(
                    badge
                );

            }



            /* CAPTION */

            const caption =
                document.createElement(
                    "div"
                );


            caption.classList.add(
                "portfolio-caption"
            );


            const captionText =
                document.createElement(
                    "div"
                );


            const category =
                document.createElement(
                    "span"
                );


            category.textContent =
                project.categoryLabel;


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                project.title;


            captionText.appendChild(
                category
            );


            captionText.appendChild(
                title
            );


            const arrow =
                document.createElement(
                    "span"
                );


            arrow.classList.add(
                "portfolio-arrow"
            );


            arrow.textContent =
                "↗";


            arrow.setAttribute(
                "aria-hidden",
                "true"
            );


            caption.appendChild(
                captionText
            );


            caption.appendChild(
                arrow
            );


            card.appendChild(
                imageContainer
            );


            card.appendChild(
                caption
            );


            return card;

        }



        /* =====================================
           PROJECT COUNT
        ===================================== */

        function updateProjectCount(
            count
        ) {

            if (!projectCount) {
                return;
            }


            const label =
                count === 1
                    ? "project"
                    : "projects";


            projectCount.textContent =
                `Showing ${count} ${label}`;

        }



        /* =====================================
           RENDER PROJECTS
        ===================================== */

        function renderProjects() {

            portfolioGrid
                .replaceChildren();


            projects.forEach(
                (project) => {

                    portfolioGrid
                        .appendChild(
                            createProjectCard(
                                project
                            )
                        );

                }
            );


            updateProjectCount(
                projects.length
            );


            /*
                The cards were created after the
                shared reveal observer initially ran,
                so register them now.
            */

            if (
                window.MarysSite &&
                typeof
                    window.MarysSite
                        .observeRevealElements ===
                    "function"
            ) {

                window.MarysSite
                    .observeRevealElements(
                        portfolioGrid
                            .querySelectorAll(
                                ".reveal"
                            )
                    );

            } else {

                portfolioGrid
                    .querySelectorAll(
                        ".reveal"
                    )
                    .forEach(
                        (element) => {

                            element.classList.add(
                                "reveal-visible"
                            );

                        }
                    );

            }

        }


        renderProjects();



        /* =====================================
           PROJECT FILTERS
        ===================================== */

        const filterButtons =
            document.querySelectorAll(
                "[data-filter]"
            );



        function getProjectCards() {

            return portfolioGrid
                .querySelectorAll(
                    "[data-project-id]"
                );

        }



        function filterProjects(
            selectedFilter
        ) {

            let visibleCount =
                0;


            getProjectCards()
                .forEach(
                    (card) => {

                        const shouldShow =
                            selectedFilter ===
                                "all" ||
                            card.dataset
                                .category ===
                                selectedFilter;


                        card.classList.toggle(
                            "is-hidden",
                            !shouldShow
                        );


                        if (shouldShow) {

                            visibleCount += 1;

                        }

                    }
                );


            updateProjectCount(
                visibleCount
            );

        }



        filterButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const selectedFilter =
                            button.dataset.filter;


                        filterButtons.forEach(
                            (
                                filterButton
                            ) => {

                                const isActive =
                                    filterButton ===
                                    button;


                                filterButton
                                    .classList
                                    .toggle(
                                        "active",
                                        isActive
                                    );


                                filterButton
                                    .setAttribute(
                                        "aria-pressed",
                                        isActive
                                            .toString()
                                    );

                            }
                        );


                        filterProjects(
                            selectedFilter
                        );

                    }
                );

            }
        );



        /* =====================================
           MODAL ELEMENTS
        ===================================== */

        const projectModal =
            document.getElementById(
                "projectModal"
            );


        const projectModalDialog =
            document.querySelector(
                ".project-modal-dialog"
            );


        const projectModalClose =
            document.getElementById(
                "projectModalClose"
            );


        const projectModalTitle =
            document.getElementById(
                "projectModalTitle"
            );


        const projectModalType =
            document.getElementById(
                "projectModalType"
            );


        const projectModalDescription =
            document.getElementById(
                "projectModalDescription"
            );


        const projectModalImageContainer =
            document.getElementById(
                "projectModalImageContainer"
            );


        const galleryPrevious =
            document.getElementById(
                "galleryPrevious"
            );


        const galleryNext =
            document.getElementById(
                "galleryNext"
            );


        const galleryCounter =
            document.getElementById(
                "galleryCounter"
            );


        const galleryThumbnails =
            document.getElementById(
                "galleryThumbnails"
            );


        const projectModalQuote =
            document.getElementById(
                "projectModalQuote"
            );


        const beforeAfterSection =
            document.getElementById(
                "beforeAfterSection"
            );


        const beforeImageContainer =
            document.getElementById(
                "beforeImageContainer"
            );


        const afterImageContainer =
            document.getElementById(
                "afterImageContainer"
            );


        const modalCloseElements =
            document.querySelectorAll(
                "[data-modal-close]"
            );



        let lastFocusedElement =
            null;


        let activeProjectImages =
            [];


        let activeImageIndex =
            0;



        /* =====================================
           GALLERY MAIN IMAGE
        ===================================== */

        function renderGalleryImage() {

            if (
                !projectModalImageContainer ||
                activeProjectImages.length ===
                    0
            ) {
                return;
            }


            const imageData =
                activeProjectImages[
                    activeImageIndex
                ];


            renderImageInsideContainer(
                projectModalImageContainer,
                imageData,
                {
                    lazy: false
                }
            );


            if (galleryCounter) {

                galleryCounter.textContent =
                    `${activeImageIndex + 1} / ${activeProjectImages.length}`;

            }


            const hasMultipleImages =
                activeProjectImages.length >
                1;


            if (galleryPrevious) {

                galleryPrevious.hidden =
                    !hasMultipleImages;

            }


            if (galleryNext) {

                galleryNext.hidden =
                    !hasMultipleImages;

            }


            if (galleryCounter) {

                galleryCounter.hidden =
                    !hasMultipleImages;

            }


            updateThumbnailState();

        }



        /* =====================================
           GALLERY THUMBNAILS
        ===================================== */

        function renderGalleryThumbnails() {

            if (!galleryThumbnails) {
                return;
            }


            galleryThumbnails
                .replaceChildren();


            if (
                activeProjectImages.length <=
                1
            ) {

                galleryThumbnails.hidden =
                    true;


                return;

            }


            galleryThumbnails.hidden =
                false;


            activeProjectImages.forEach(
                (
                    imageData,
                    index
                ) => {

                    const thumbnail =
                        document.createElement(
                            "button"
                        );


                    thumbnail.type =
                        "button";


                    thumbnail.classList.add(
                        "gallery-thumbnail"
                    );


                    thumbnail.dataset.index =
                        index.toString();


                    thumbnail.setAttribute(
                        "aria-label",
                        `View photo ${index + 1}`
                    );


                    if (!imageData.src) {

                        thumbnail.classList.add(
                            "placeholder-image"
                        );

                    }


                    thumbnail.appendChild(
                        createImageElement(
                            imageData
                        )
                    );


                    thumbnail.addEventListener(
                        "click",
                        () => {

                            activeImageIndex =
                                index;


                            renderGalleryImage();

                        }
                    );


                    galleryThumbnails.appendChild(
                        thumbnail
                    );

                }
            );


            updateThumbnailState();

        }



        function updateThumbnailState() {

            if (!galleryThumbnails) {
                return;
            }


            const thumbnails =
                galleryThumbnails
                    .querySelectorAll(
                        ".gallery-thumbnail"
                    );


            thumbnails.forEach(
                (
                    thumbnail,
                    index
                ) => {

                    const isActive =
                        index ===
                        activeImageIndex;


                    thumbnail
                        .classList
                        .toggle(
                            "active",
                            isActive
                        );


                    if (isActive) {

                        thumbnail.setAttribute(
                            "aria-current",
                            "true"
                        );


                        thumbnail.scrollIntoView({

                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth",

                            block:
                                "nearest",

                            inline:
                                "nearest"

                        });

                    } else {

                        thumbnail.removeAttribute(
                            "aria-current"
                        );

                    }

                }
            );

        }



        /* =====================================
           GALLERY NAVIGATION
        ===================================== */

        function showPreviousImage() {

            if (
                activeProjectImages.length <=
                1
            ) {
                return;
            }


            activeImageIndex =
                (
                    activeImageIndex -
                    1 +
                    activeProjectImages.length
                ) %
                activeProjectImages.length;


            renderGalleryImage();

        }



        function showNextImage() {

            if (
                activeProjectImages.length <=
                1
            ) {
                return;
            }


            activeImageIndex =
                (
                    activeImageIndex +
                    1
                ) %
                activeProjectImages.length;


            renderGalleryImage();

        }



        if (galleryPrevious) {

            galleryPrevious.addEventListener(
                "click",
                showPreviousImage
            );

        }


        if (galleryNext) {

            galleryNext.addEventListener(
                "click",
                showNextImage
            );

        }



        /* =====================================
           TOUCH / SWIPE
        ===================================== */

        let touchStartX = 0;

        let touchStartY = 0;

        let touchEndX = 0;

        let touchEndY = 0;


        const minimumSwipeDistance =
            50;



        function handleGallerySwipe() {

            const horizontalDistance =
                touchEndX -
                touchStartX;


            const verticalDistance =
                touchEndY -
                touchStartY;


            if (
                Math.abs(
                    horizontalDistance
                ) <
                minimumSwipeDistance
            ) {
                return;
            }


            if (
                Math.abs(
                    horizontalDistance
                ) <=
                Math.abs(
                    verticalDistance
                )
            ) {
                return;
            }


            if (
                horizontalDistance < 0
            ) {

                showNextImage();

            } else {

                showPreviousImage();

            }

        }



        if (
            projectModalImageContainer
        ) {

            projectModalImageContainer
                .addEventListener(
                    "touchstart",
                    (event) => {

                        if (
                            event.touches
                                .length !==
                            1
                        ) {
                            return;
                        }


                        touchStartX =
                            event
                                .touches[0]
                                .clientX;


                        touchStartY =
                            event
                                .touches[0]
                                .clientY;


                        touchEndX =
                            touchStartX;


                        touchEndY =
                            touchStartY;

                    },
                    {
                        passive: true
                    }
                );


            projectModalImageContainer
                .addEventListener(
                    "touchmove",
                    (event) => {

                        if (
                            event.touches
                                .length !==
                            1
                        ) {
                            return;
                        }


                        touchEndX =
                            event
                                .touches[0]
                                .clientX;


                        touchEndY =
                            event
                                .touches[0]
                                .clientY;

                    },
                    {
                        passive: true
                    }
                );


            projectModalImageContainer
                .addEventListener(
                    "touchend",
                    handleGallerySwipe,
                    {
                        passive: true
                    }
                );

        }



        /* =====================================
           BEFORE / AFTER
        ===================================== */

        function renderBeforeAfter(
            project
        ) {

            if (
                !beforeAfterSection ||
                !beforeImageContainer ||
                !afterImageContainer
            ) {
                return;
            }


            const comparison =
                project.beforeAfter;


            const hasBeforeAfter =
                comparison &&
                comparison.before &&
                comparison.after;


            if (!hasBeforeAfter) {

                beforeAfterSection.hidden =
                    true;


                beforeImageContainer
                    .replaceChildren();


                afterImageContainer
                    .replaceChildren();


                return;

            }


            beforeAfterSection.hidden =
                false;


            renderImageInsideContainer(
                beforeImageContainer,
                comparison.before
            );


            renderImageInsideContainer(
                afterImageContainer,
                comparison.after
            );

        }



        /* =====================================
           OPEN PROJECT MODAL
        ===================================== */

        function openProjectModal(
            project
        ) {

            if (
                !projectModal ||
                !project
            ) {
                return;
            }


            activeProjectImages =
                getProjectImages(
                    project
                );


            activeImageIndex =
                0;


            lastFocusedElement =
                document.activeElement;


            if (projectModalTitle) {

                projectModalTitle.textContent =
                    project.title;

            }


            if (projectModalType) {

                projectModalType.textContent =
                    project.categoryLabel;

            }


            if (
                projectModalDescription
            ) {

                projectModalDescription
                    .textContent =
                    project.description;

            }


            renderGalleryThumbnails();


            renderGalleryImage();


            renderBeforeAfter(
                project
            );


            projectModal.hidden =
                false;


            document.body.classList.add(
                "modal-open"
            );


            if (projectModalDialog) {

                projectModalDialog.scrollTop =
                    0;

            }


            if (projectModalClose) {

                projectModalClose.focus();

            }

        }



        /* =====================================
           CLOSE PROJECT MODAL
        ===================================== */

        function closeProjectModal() {

            if (
                !projectModal ||
                projectModal.hidden
            ) {
                return;
            }


            projectModal.hidden =
                true;


            document.body.classList.remove(
                "modal-open"
            );


            activeProjectImages =
                [];


            activeImageIndex =
                0;


            if (
                beforeAfterSection
            ) {

                beforeAfterSection.hidden =
                    true;

            }


            if (
                lastFocusedElement &&
                typeof
                    lastFocusedElement
                        .focus ===
                    "function"
            ) {

                lastFocusedElement.focus();

            }

        }



        /* =====================================
           PROJECT CARD CLICK
        ===================================== */

        portfolioGrid.addEventListener(
            "click",
            (event) => {

                const card =
                    event.target.closest(
                        "[data-project-id]"
                    );


                if (!card) {
                    return;
                }


                const project =
                    projects.find(
                        (item) =>
                            item.id ===
                            card.dataset
                                .projectId
                    );


                openProjectModal(
                    project
                );

            }
        );



        /* =====================================
           MODAL CLOSE EVENTS
        ===================================== */

        if (projectModalClose) {

            projectModalClose.addEventListener(
                "click",
                closeProjectModal
            );

        }


        modalCloseElements.forEach(
            (element) => {

                element.addEventListener(
                    "click",
                    closeProjectModal
                );

            }
        );


        if (projectModalQuote) {

            projectModalQuote.addEventListener(
                "click",
                closeProjectModal
            );

        }



        /* =====================================
           MODAL FOCUS TRAP
        ===================================== */

        function getModalFocusableElements() {

            if (!projectModalDialog) {
                return [];
            }


            const focusableSelector =
                [
                    'a[href]',
                    'button:not([disabled])',
                    'input:not([disabled])',
                    'select:not([disabled])',
                    'textarea:not([disabled])',
                    '[tabindex]:not([tabindex="-1"])'
                ].join(",");


            return Array.from(
                projectModalDialog
                    .querySelectorAll(
                        focusableSelector
                    )
            ).filter(
                (element) =>
                    !element.hidden &&
                    element.getClientRects()
                        .length > 0 &&
                    window.getComputedStyle(
                        element
                    ).visibility !==
                        "hidden"
            );

        }



        function trapModalFocus(
            event
        ) {

            const focusableElements =
                getModalFocusableElements();


            if (
                focusableElements.length === 0
            ) {
                return;
            }


            const firstFocusableElement =
                focusableElements[0];


            const lastFocusableElement =
                focusableElements[
                    focusableElements.length - 1
                ];


            const activeElement =
                document.activeElement;


            const focusIsInsideModal =
                projectModalDialog &&
                projectModalDialog.contains(
                    activeElement
                );


            if (event.shiftKey) {

                if (
                    activeElement ===
                        firstFocusableElement ||
                    !focusIsInsideModal
                ) {

                    event.preventDefault();


                    lastFocusableElement.focus();

                }


                return;

            }


            if (
                activeElement ===
                    lastFocusableElement ||
                !focusIsInsideModal
            ) {

                event.preventDefault();


                firstFocusableElement.focus();

            }

        }



        /* =====================================
           KEYBOARD CONTROLS
        ===================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                const modalIsOpen =
                    projectModal &&
                    !projectModal.hidden;


                if (!modalIsOpen) {
                    return;
                }


                if (
                    event.key ===
                    "Tab"
                ) {

                    trapModalFocus(
                        event
                    );


                    return;

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    showPreviousImage();

                    return;

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    showNextImage();

                    return;

                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeProjectModal();

                }

            }
        );

    }
);