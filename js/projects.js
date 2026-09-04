"use strict";


/*
=========================================
MARY'S MARINE CANVAS
PROJECT DATABASE
=========================================

This file controls the portfolio.

REAL PROJECT PHOTOS WILL LIVE IN:

assets/images/portfolio/

-----------------------------------------

PROJECT IMAGES

Each project can have multiple images:

images: [
    {
        src: "assets/images/portfolio/example-01.jpg",
        alt: "Finished marine canvas project",
        placeholder: "Finished Project"
    }
]

The FIRST image becomes the main portfolio card image.

If src is empty:

src: ""

a placeholder will appear instead.

-----------------------------------------

BEFORE / AFTER SUPPORT

This is OPTIONAL.

To add a before / after comparison:

beforeAfter: {

    before: {
        src: "assets/images/portfolio/project-before.jpg",
        alt: "Boat before upholstery restoration",
        placeholder: "Before"
    },

    after: {
        src: "assets/images/portfolio/project-after.jpg",
        alt: "Boat after upholstery restoration",
        placeholder: "After"
    }

}

If a project does NOT need before / after,
simply leave the beforeAfter property out.

-----------------------------------------

VALID CATEGORIES

covers
enclosures
upholstery
specialty

-----------------------------------------

VALID LAYOUTS

wide
normal
tall
*/


window.MarysProjects = [

    /* =====================================
       PROJECT 1
    ===================================== */

    {
        id: "custom-boat-cover",

        title: "Custom Boat Cover",

        category: "covers",

        categoryLabel: "Boat Canvas",

        description:
            "A custom-fit marine cover designed to protect the boat while maintaining a clean profile and professional finish.",

        layout: "wide",

        images: [

            {
                src: "",

                alt:
                    "Custom boat cover project by Mary's Marine Canvas",

                placeholder:
                    "Finished Boat Cover"
            },

            {
                src: "",

                alt:
                    "Custom boat cover side view",

                placeholder:
                    "Side View"
            },

            {
                src: "",

                alt:
                    "Custom boat cover detail",

                placeholder:
                    "Canvas Detail"
            }

        ]
    },



    /* =====================================
       PROJECT 2
       BEFORE / AFTER EXAMPLE
    ===================================== */

    {
        id: "marine-seating",

        title: "Marine Seating",

        category: "upholstery",

        categoryLabel: "Marine Upholstery",

        description:
            "Custom marine upholstery focused on comfort, fit, durability, and a clean finished appearance.",

        layout: "tall",

        images: [

            {
                src: "",

                alt:
                    "Marine seating upholstery project by Mary's Marine Canvas",

                placeholder:
                    "Finished Marine Seating"
            },

            {
                src: "",

                alt:
                    "Marine upholstery stitching detail",

                placeholder:
                    "Stitching Detail"
            },

            {
                src: "",

                alt:
                    "Marine seating cushion detail",

                placeholder:
                    "Cushion Detail"
            }

        ],


        beforeAfter: {

            before: {

                src: "",

                alt:
                    "Marine seating before upholstery work",

                placeholder:
                    "Before Upholstery"
            },


            after: {

                src: "",

                alt:
                    "Marine seating after upholstery work by Mary's Marine Canvas",

                placeholder:
                    "After Upholstery"
            }

        }
    },



    /* =====================================
       PROJECT 3
    ===================================== */

    {
        id: "full-marine-enclosure",

        title: "Full Enclosure",

        category: "enclosures",

        categoryLabel: "Enclosures",

        description:
            "A custom marine enclosure designed to improve comfort, weather protection, visibility, and usability.",

        layout: "normal",

        images: [

            {
                src: "",

                alt:
                    "Full marine enclosure project by Mary's Marine Canvas",

                placeholder:
                    "Finished Enclosure"
            },

            {
                src: "",

                alt:
                    "Marine enclosure clear panel detail",

                placeholder:
                    "Clear Panel Detail"
            },

            {
                src: "",

                alt:
                    "Marine enclosure side view",

                placeholder:
                    "Enclosure Side View"
            }

        ]
    },



    /* =====================================
       PROJECT 4
    ===================================== */

    {
        id: "custom-fabrication",

        title: "Custom Fabrication",

        category: "specialty",

        categoryLabel: "Specialty",

        description:
            "A custom marine fabrication project built around a unique need where an off-the-shelf solution would not provide the right fit.",

        layout: "normal",

        images: [

            {
                src: "",

                alt:
                    "Custom marine fabrication project by Mary's Marine Canvas",

                placeholder:
                    "Finished Custom Project"
            },

            {
                src: "",

                alt:
                    "Custom marine fabrication detail",

                placeholder:
                    "Fabrication Detail"
            }

        ]
    },



    /* =====================================
       PROJECT 5
    ===================================== */

    {
        id: "cockpit-cover",

        title: "Cockpit Cover",

        category: "covers",

        categoryLabel: "Boat Canvas",

        description:
            "A fitted cockpit cover designed to protect the boat while keeping installation and everyday use straightforward.",

        layout: "wide",

        images: [

            {
                src: "",

                alt:
                    "Cockpit cover project by Mary's Marine Canvas",

                placeholder:
                    "Finished Cockpit Cover"
            },

            {
                src: "",

                alt:
                    "Cockpit cover attachment detail",

                placeholder:
                    "Attachment Detail"
            },

            {
                src: "",

                alt:
                    "Cockpit cover rear view",

                placeholder:
                    "Rear View"
            }

        ]
    },



    /* =====================================
       PROJECT 6
    ===================================== */

    {
        id: "clear-panels",

        title: "Clear Panels",

        category: "enclosures",

        categoryLabel: "Enclosures",

        description:
            "Replacement clear panels designed to restore visibility while fitting the existing enclosure properly.",

        layout: "normal",

        images: [

            {
                src: "",

                alt:
                    "Clear marine enclosure panels by Mary's Marine Canvas",

                placeholder:
                    "Finished Clear Panels"
            },

            {
                src: "",

                alt:
                    "Clear panel edge and stitching detail",

                placeholder:
                    "Panel Edge Detail"
            }

        ]
    },



    /* =====================================
       PROJECT 7
    ===================================== */

    {
        id: "custom-cushions",

        title: "Custom Cushions",

        category: "upholstery",

        categoryLabel: "Marine Upholstery",

        description:
            "Custom cushions designed for the seating area with attention to comfort, fit, seams, and finished details.",

        layout: "normal",

        images: [

            {
                src: "",

                alt:
                    "Custom marine cushions by Mary's Marine Canvas",

                placeholder:
                    "Finished Cushions"
            },

            {
                src: "",

                alt:
                    "Marine cushion seam detail",

                placeholder:
                    "Seam Detail"
            },

            {
                src: "",

                alt:
                    "Custom cushion installation",

                placeholder:
                    "Installed Cushions"
            }

        ]
    },



    /* =====================================
       PROJECT 8
       BEFORE / AFTER EXAMPLE
    ===================================== */

    {
        id: "canvas-repair",

        title: "Canvas Repair",

        category: "specialty",

        categoryLabel: "Repair",

        description:
            "Marine canvas repair focused on restoring function, extending the life of the existing piece, and maintaining a clean appearance.",

        layout: "tall",

        images: [

            {
                src: "",

                alt:
                    "Marine canvas repair by Mary's Marine Canvas",

                placeholder:
                    "Finished Canvas Repair"
            },

            {
                src: "",

                alt:
                    "Marine canvas repair stitching detail",

                placeholder:
                    "Repair Detail"
            }

        ],


        beforeAfter: {

            before: {

                src: "",

                alt:
                    "Damaged marine canvas before repair",

                placeholder:
                    "Before Repair"
            },


            after: {

                src: "",

                alt:
                    "Marine canvas after repair by Mary's Marine Canvas",

                placeholder:
                    "After Repair"
            }

        }
    }

];