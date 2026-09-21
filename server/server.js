"use strict";


import crypto from "node:crypto";

import cors from "cors";

import dotenv from "dotenv";

import express from "express";

import rateLimit from "express-rate-limit";

import helmet from "helmet";

import multer from "multer";

import nodemailer from "nodemailer";

import {
    fileTypeFromBuffer
} from "file-type";

import {
    z
} from "zod";


dotenv.config();



/* =====================================
   APP
===================================== */

const app =
    express();


const PORT =
    Number(
        process.env.PORT
    ) || 3000;



/* =====================================
   SECURITY
===================================== */

app.disable(
    "x-powered-by"
);


app.use(
    helmet()
);



const allowedOrigins =
    new Set(
        [
            "http://localhost:5500",
            "http://127.0.0.1:5500",

            ...(process.env.FRONTEND_ORIGIN || "")
                .split(",")
                .map(
                    (origin) =>
                        origin.trim()
                )
                .filter(
                    Boolean
                )
        ]
    );



app.use(
    cors({
        origin(
            origin,
            callback
        ) {

            /*
                Requests without a browser Origin
                such as curl are allowed.
            */

            if (!origin) {

                callback(
                    null,
                    true
                );

                return;

            }


            if (
                allowedOrigins.has(
                    origin
                )
            ) {

                callback(
                    null,
                    true
                );

                return;

            }


            callback(
                new Error(
                    "Origin not allowed."
                )
            );

        },

        methods: [
            "POST",
            "GET"
        ]
    })
);



const quoteRateLimiter =
    rateLimit({

        windowMs:
            15 * 60 * 1000,

        limit: 5,

        standardHeaders:
            "draft-7",

        legacyHeaders:
            false,

        message: {
            success: false,
            message:
                "Too many quote requests were submitted. Please wait a few minutes and try again."
        }

    });



/* =====================================
   FILE SETTINGS
===================================== */

const MAX_PHOTOS =
    6;


const MAX_PHOTO_SIZE =
    8 * 1024 * 1024;


const MAX_TOTAL_PHOTO_SIZE =
    20 * 1024 * 1024;


const allowedImageTypes =
    new Set([
        "image/jpeg",
        "image/png",
        "image/webp"
    ]);



const upload =
    multer({

        storage:
            multer.memoryStorage(),

        limits: {

            files:
                MAX_PHOTOS,

            fileSize:
                MAX_PHOTO_SIZE

        }

    });



/* =====================================
   FORM SCHEMA
===================================== */

const currentYear =
    new Date()
        .getFullYear();


const quoteSchema =
    z.object({

        name:
            z.string()
                .trim()
                .min(
                    2,
                    "Name is required."
                )
                .max(100),

        phone:
            z.string()
                .trim()
                .max(30)
                .optional()
                .default(""),

        email:
            z.union([
                z.literal(""),
                z.string()
                    .trim()
                    .email()
                    .max(254)
            ])
                .optional()
                .default(""),

        contactMethod:
            z.enum([
                "phone",
                "email",
                "either"
            ]),

        boatYear:
            z.string()
                .trim()
                .max(4)
                .optional()
                .default(""),

        boatMake:
            z.string()
                .trim()
                .max(100)
                .optional()
                .default(""),

        boatModel:
            z.string()
                .trim()
                .max(100)
                .optional()
                .default(""),

        service:
            z.string()
                .trim()
                .min(
                    1,
                    "Service is required."
                )
                .max(100),

        details:
            z.string()
                .trim()
                .min(
                    15,
                    "Project details are too short."
                )
                .max(2000),

        website:
            z.string()
                .max(200)
                .optional()
                .default("")

    })
    .superRefine(
        (
            data,
            context
        ) => {

            const phoneDigits =
                data.phone.replace(
                    /\D/g,
                    ""
                );


            if (
                data.phone &&
                phoneDigits.length < 10
            ) {

                context.addIssue({

                    code:
                        z.ZodIssueCode.custom,

                    path:
                        ["phone"],

                    message:
                        "Phone number is invalid."

                });

            }


            if (
                !data.phone &&
                !data.email
            ) {

                context.addIssue({

                    code:
                        z.ZodIssueCode.custom,

                    path:
                        ["email"],

                    message:
                        "A phone number or email address is required."

                });

            }


            if (
                data.contactMethod ===
                    "phone" &&
                !data.phone
            ) {

                context.addIssue({

                    code:
                        z.ZodIssueCode.custom,

                    path:
                        ["phone"],

                    message:
                        "Phone number is required when Phone is selected."

                });

            }


            if (
                data.contactMethod ===
                    "email" &&
                !data.email
            ) {

                context.addIssue({

                    code:
                        z.ZodIssueCode.custom,

                    path:
                        ["email"],

                    message:
                        "Email is required when Email is selected."

                });

            }


            if (
                data.boatYear
            ) {

                if (
                    !/^\d{4}$/.test(
                        data.boatYear
                    )
                ) {

                    context.addIssue({

                        code:
                            z.ZodIssueCode.custom,

                        path:
                            ["boatYear"],

                        message:
                            "Boat year must contain four digits."

                    });

                } else {

                    const year =
                        Number(
                            data.boatYear
                        );


                    if (
                        year < 1900 ||
                        year >
                            currentYear + 1
                    ) {

                        context.addIssue({

                            code:
                                z.ZodIssueCode.custom,

                            path:
                                ["boatYear"],

                            message:
                                "Boat year is outside the accepted range."

                        });

                    }

                }

            }

        }
    );



/* =====================================
   EMAIL
===================================== */

const transporter =
    nodemailer.createTransport({

        service:
            "gmail",

        auth: {

            user:
                process.env.EMAIL_USER,

            pass:
                process.env.EMAIL_APP_PASSWORD

        }

    });



/* =====================================
   HELPERS
===================================== */

function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}



function createConfirmationId() {

    const date =
        new Date()
            .toISOString()
            .slice(
                0,
                10
            )
            .replaceAll(
                "-",
                ""
            );


    const random =
        crypto
            .randomBytes(3)
            .toString("hex")
            .toUpperCase();


    return (
        `MMC-${date}-${random}`
    );

}



async function validateUploadedPhotos(
    files
) {

    const totalSize =
        files.reduce(
            (
                total,
                file
            ) =>
                total +
                file.size,
            0
        );


    if (
        totalSize >
        MAX_TOTAL_PHOTO_SIZE
    ) {

        throw new Error(
            "Photo attachments cannot exceed 20 MB total."
        );

    }


    for (
        const file
        of files
    ) {

        const detectedType =
            await fileTypeFromBuffer(
                file.buffer
            );


        if (
            !detectedType ||
            !allowedImageTypes.has(
                detectedType.mime
            )
        ) {

            throw new Error(
                `Unsupported image file: ${file.originalname}`
            );

        }

    }

}



/* =====================================
   HEALTH CHECK
===================================== */

app.get(
    "/api/health",
    (
        request,
        response
    ) => {

        response.json({

            success: true,

            service:
                "Mary's Marine Canvas Quote API"

        });

    }
);



/* =====================================
   QUOTE ROUTE
===================================== */

app.post(
    "/api/quote",

    quoteRateLimiter,

    upload.array(
        "photos",
        MAX_PHOTOS
    ),

    async (
        request,
        response
    ) => {

        try {

            const parsed =
                quoteSchema.safeParse(
                    request.body
                );


            if (!parsed.success) {

                return response
                    .status(400)
                    .json({

                        success:
                            false,

                        message:
                            "Some quote information is invalid.",

                        errors:
                            parsed.error.flatten()

                    });

            }


            const data =
                parsed.data;



            /*
                Honeypot field.
                Human customers never see this field.
            */

            if (
                data.website
            ) {

                return response.json({

                    success: true,

                    confirmationId:
                        createConfirmationId()

                });

            }



            const files =
                Array.isArray(
                    request.files
                )
                    ? request.files
                    : [];


            await validateUploadedPhotos(
                files
            );



            if (
                !process.env.EMAIL_USER ||
                !process.env.EMAIL_APP_PASSWORD
            ) {

                console.error(
                    "Email credentials are missing."
                );


                return response
                    .status(503)
                    .json({

                        success:
                            false,

                        message:
                            "Email delivery is not configured yet."

                    });

            }



            const confirmationId =
                createConfirmationId();


            const submittedAt =
                new Date();



            const contactPreference = {

                phone:
                    "Phone",

                email:
                    "Email",

                either:
                    "Either"

            }[
                data.contactMethod
            ];



            const textMessage =
`NEW QUOTE REQUEST

Confirmation: ${confirmationId}

CUSTOMER
Name: ${data.name}
Phone: ${data.phone || "Not provided"}
Email: ${data.email || "Not provided"}
Preferred Contact: ${contactPreference}

BOAT
Year: ${data.boatYear || "Not provided"}
Make: ${data.boatMake || "Not provided"}
Model: ${data.boatModel || "Not provided"}

PROJECT
Service: ${data.service}

Details:
${data.details}

ATTACHMENTS
${files.length} photo${files.length === 1 ? "" : "s"}

Submitted:
${submittedAt.toLocaleString("en-US", {
    timeZone: "America/New_York"
})}
`;



            const htmlMessage =
`
<h2>New Quote Request</h2>

<p>
    <strong>Confirmation:</strong>
    ${escapeHtml(confirmationId)}
</p>

<hr>

<h3>Customer</h3>

<p>
    <strong>Name:</strong>
    ${escapeHtml(data.name)}
</p>

<p>
    <strong>Phone:</strong>
    ${escapeHtml(data.phone || "Not provided")}
</p>

<p>
    <strong>Email:</strong>
    ${escapeHtml(data.email || "Not provided")}
</p>

<p>
    <strong>Preferred Contact:</strong>
    ${escapeHtml(contactPreference)}
</p>

<hr>

<h3>Boat</h3>

<p>
    <strong>Year:</strong>
    ${escapeHtml(data.boatYear || "Not provided")}
</p>

<p>
    <strong>Make:</strong>
    ${escapeHtml(data.boatMake || "Not provided")}
</p>

<p>
    <strong>Model:</strong>
    ${escapeHtml(data.boatModel || "Not provided")}
</p>

<hr>

<h3>Project</h3>

<p>
    <strong>Service:</strong>
    ${escapeHtml(data.service)}
</p>

<p>
    <strong>Details:</strong>
</p>

<p>
    ${escapeHtml(data.details)
        .replaceAll(
            "\n",
            "<br>"
        )}
</p>

<hr>

<p>
    <strong>Attachments:</strong>
    ${files.length}
    photo${files.length === 1 ? "" : "s"}
</p>

<p>
    <strong>Confirmation:</strong>
    ${escapeHtml(confirmationId)}
</p>
`;



            const attachments =
                files.map(
                    (
                        file,
                        index
                    ) => ({

                        filename:
                            `project-photo-${index + 1}-${file.originalname}`,

                        content:
                            file.buffer,

                        contentType:
                            file.mimetype

                    })
                );



            await transporter.sendMail({

                from:
                    `"Mary's Marine Canvas Website" <${process.env.EMAIL_USER}>`,

                to:
                    process.env.QUOTE_RECIPIENT ||
                    process.env.EMAIL_USER,

                replyTo:
                    data.email ||
                    undefined,

                subject:
                    `New Quote Request - ${data.name} - ${confirmationId}`,

                text:
                    textMessage,

                html:
                    htmlMessage,

                attachments

            });



            return response.json({

                success:
                    true,

                confirmationId,

                submittedAt:
                    submittedAt.toISOString(),

                receipt: {

                    name:
                        data.name,

                    phone:
                        data.phone,

                    email:
                        data.email,

                    contactMethod:
                        contactPreference,

                    boatYear:
                        data.boatYear,

                    boatMake:
                        data.boatMake,

                    boatModel:
                        data.boatModel,

                    service:
                        data.service,

                    details:
                        data.details,

                    photoCount:
                        files.length

                }

            });

        } catch (
            error
        ) {

            console.error(
                "Quote submission error:",
                error
            );


            return response
                .status(500)
                .json({

                    success:
                        false,

                    message:
                        "We couldn't send your quote request. Please try again or call 914-565-3426."

                });

        }

    }
);



/* =====================================
   MULTER / SERVER ERRORS
===================================== */

app.use(
    (
        error,
        request,
        response,
        next
    ) => {

        if (
            error instanceof
            multer.MulterError
        ) {

            if (
                error.code ===
                "LIMIT_FILE_SIZE"
            ) {

                return response
                    .status(400)
                    .json({

                        success:
                            false,

                        message:
                            "Each photo must be 8 MB or smaller."

                    });

            }


            if (
                error.code ===
                "LIMIT_FILE_COUNT"
            ) {

                return response
                    .status(400)
                    .json({

                        success:
                            false,

                        message:
                            "You can upload up to 6 photos."

                    });

            }

        }


        console.error(
            error
        );


        return response
            .status(500)
            .json({

                success:
                    false,

                message:
                    "A server error occurred."

            });

    }
);



/* =====================================
   START
===================================== */

app.listen(
    PORT,
    () => {

        console.log(
            `Mary's Marine Canvas API running on http://localhost:${PORT}`
        );

    }
);