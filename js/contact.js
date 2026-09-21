"use strict";


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================
           FORM
        ===================================== */

        const quoteForm =
            document.getElementById(
                "quoteForm"
            );


        if (!quoteForm) {
            return;
        }


        const nameInput =
            document.getElementById(
                "quoteName"
            );


        const phoneInput =
            document.getElementById(
                "quotePhone"
            );


        const emailInput =
            document.getElementById(
                "quoteEmail"
            );


        const boatYearInput =
            document.getElementById(
                "boatYear"
            );


        const serviceInput =
            document.getElementById(
                "quoteService"
            );


        const detailsInput =
            document.getElementById(
                "quoteDetails"
            );


        const detailsCount =
            document.getElementById(
                "quoteDetailsCount"
            );


        const submitButton =
            document.getElementById(
                "quoteSubmitButton"
            );


        const formStatus =
            document.getElementById(
                "quoteFormStatus"
            );


        const quoteFormHeading =
            document.getElementById(
                "quoteFormHeading"
            );


        const quoteFormLayout =
            document.getElementById(
                "quoteFormLayout"
            );


        const quoteReceipt =
            document.getElementById(
                "quoteReceipt"
            );


        const printReceiptButton =
            document.getElementById(
                "printQuoteReceipt"
            );


        const submitAnotherButton =
            document.getElementById(
                "submitAnotherQuote"
            );


        const receiptFields = {

            confirmationId:
                document.getElementById(
                    "receiptConfirmationId"
                ),

            submittedAt:
                document.getElementById(
                    "receiptSubmittedAt"
                ),

            name:
                document.getElementById(
                    "receiptName"
                ),

            phone:
                document.getElementById(
                    "receiptPhone"
                ),

            email:
                document.getElementById(
                    "receiptEmail"
                ),

            contactMethod:
                document.getElementById(
                    "receiptContactMethod"
                ),

            boatYear:
                document.getElementById(
                    "receiptBoatYear"
                ),

            boatMake:
                document.getElementById(
                    "receiptBoatMake"
                ),

            boatModel:
                document.getElementById(
                    "receiptBoatModel"
                ),

            service:
                document.getElementById(
                    "receiptService"
                ),

            details:
                document.getElementById(
                    "receiptDetails"
                ),

            photoCount:
                document.getElementById(
                    "receiptPhotoCount"
                )

        };



        /* =====================================
           PHOTOS
        ===================================== */

        const photoInput =
            document.getElementById(
                "quotePhotos"
            );


        const photoPreviewGrid =
            document.getElementById(
                "quotePhotoPreviewGrid"
            );


        const photoCount =
            document.getElementById(
                "quotePhotoCount"
            );


        const photoError =
            document.getElementById(
                "quotePhotosError"
            );


        const uploadArea =
            document.getElementById(
                "quoteUploadArea"
            );



        /* =====================================
           SETTINGS
        ===================================== */

        const MIN_NAME_LENGTH =
            2;


        const MIN_DETAILS_LENGTH =
            15;


        const MAX_DETAILS_LENGTH =
            2000;


        const MIN_BOAT_YEAR =
            1900;


        const MAX_BOAT_YEAR =
            new Date()
                .getFullYear() + 1;


        const MAX_PHOTOS =
            6;


        const MAX_PHOTO_SIZE =
            8 * 1024 * 1024;


        const MAX_TOTAL_PHOTO_SIZE =
            20 * 1024 * 1024;


        const ALLOWED_PHOTO_TYPES =
            new Set([
                "image/jpeg",
                "image/png",
                "image/webp"
            ]);


        const API_URL =
            quoteForm.dataset.apiUrl;



        /* =====================================
           PHOTO STATE
        ===================================== */

        let selectedPhotos =
            [];


        let isSubmitting =
            false;



        /* =====================================
           HELPERS
        ===================================== */

        function cleanValue(
            value
        ) {

            return value.trim();

        }



        function getDigits(
            value
        ) {

            return value.replace(
                /\D/g,
                ""
            );

        }



        function isValidEmail(
            value
        ) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(
                    value
                );

        }



        function getPreferredContactMethod() {

            const selected =
                quoteForm.querySelector(
                    'input[name="contactMethod"]:checked'
                );


            return selected
                ? selected.value
                : "";

        }



        function getErrorElement(
            field
        ) {

            if (!field) {
                return null;
            }


            const describedBy =
                field.getAttribute(
                    "aria-describedby"
                );


            if (!describedBy) {
                return null;
            }


            const errorId =
                describedBy
                    .split(/\s+/)
                    .find(
                        (id) =>
                            id.endsWith(
                                "Error"
                            )
                    );


            return errorId
                ? document
                    .getElementById(
                        errorId
                    )
                : null;

        }



        function setFieldState(
            field,
            errorMessage = ""
        ) {

            if (!field) {
                return;
            }


            const hasError =
                Boolean(
                    errorMessage
                );


            const errorElement =
                getErrorElement(
                    field
                );


            field.classList.toggle(
                "is-invalid",
                hasError
            );


            field.classList.toggle(
                "is-valid",
                !hasError &&
                cleanValue(
                    field.value
                ) !== ""
            );


            field.setAttribute(
                "aria-invalid",
                hasError.toString()
            );


            if (errorElement) {

                errorElement.textContent =
                    errorMessage;

            }

        }



        function setContactMethodError(
            message
        ) {

            const errorElement =
                document.getElementById(
                    "contactMethodError"
                );


            if (errorElement) {

                errorElement.textContent =
                    message;

            }

        }



        function displayReceiptValue(
            value
        ) {

            const normalized =
                String(
                    value ?? ""
                ).trim();


            return normalized ||
                "Not provided";

        }



        function getServiceLabel(
            value
        ) {

            const option =
                Array.from(
                    serviceInput.options
                ).find(
                    (item) =>
                        item.value === value
                );


            return option
                ? option.textContent.trim()
                : displayReceiptValue(
                    value
                );

        }



        function formatReceiptDate(
            value
        ) {

            const date =
                new Date(
                    value
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {
                return "Not available";
            }


            return new Intl.DateTimeFormat(
                "en-US",
                {
                    dateStyle:
                        "medium",

                    timeStyle:
                        "short",

                    timeZone:
                        "America/New_York"
                }
            ).format(
                date
            );

        }



        function showReceipt(
            result
        ) {

            const receipt =
                result.receipt || {};


            receiptFields.confirmationId.textContent =
                displayReceiptValue(
                    result.confirmationId
                );


            receiptFields.submittedAt.textContent =
                formatReceiptDate(
                    result.submittedAt
                );


            receiptFields.name.textContent =
                displayReceiptValue(
                    receipt.name
                );


            receiptFields.phone.textContent =
                displayReceiptValue(
                    receipt.phone
                );


            receiptFields.email.textContent =
                displayReceiptValue(
                    receipt.email
                );


            receiptFields.contactMethod.textContent =
                displayReceiptValue(
                    receipt.contactMethod
                );


            receiptFields.boatYear.textContent =
                displayReceiptValue(
                    receipt.boatYear
                );


            receiptFields.boatMake.textContent =
                displayReceiptValue(
                    receipt.boatMake
                );


            receiptFields.boatModel.textContent =
                displayReceiptValue(
                    receipt.boatModel
                );


            receiptFields.service.textContent =
                getServiceLabel(
                    receipt.service
                );


            receiptFields.details.textContent =
                displayReceiptValue(
                    receipt.details
                );


            const photoCount =
                Number(
                    receipt.photoCount
                ) || 0;


            receiptFields.photoCount.textContent =
                `${photoCount} photo${photoCount === 1 ? "" : "s"}`;


            quoteFormHeading.hidden =
                true;


            quoteFormLayout.hidden =
                true;


            quoteReceipt.hidden =
                false;


            quoteReceipt.focus({
                preventScroll:
                    true
            });


            quoteReceipt.scrollIntoView({

                behavior:
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth",

                block:
                    "start"

            });

        }



        function clearFormFieldStates() {

            quoteForm
                .querySelectorAll(
                    ".is-valid, .is-invalid"
                )
                .forEach(
                    (element) => {

                        element.classList.remove(
                            "is-valid",
                            "is-invalid"
                        );


                        if (
                            element.matches(
                                "input, select, textarea"
                            )
                        ) {

                            element.setAttribute(
                                "aria-invalid",
                                "false"
                            );

                        }

                    }
                );


            quoteForm
                .querySelectorAll(
                    ".quote-field-error"
                )
                .forEach(
                    (element) => {

                        element.textContent =
                            "";

                    }
                );

        }



        function resetForAnotherQuote() {

            quoteForm.reset();


            selectedPhotos =
                [];


            syncPhotoInput();

            clearFormFieldStates();

            clearPhotoError();

            renderPhotoPreviews();

            updateDetailsCounter();


            quoteReceipt.hidden =
                true;


            quoteFormHeading.hidden =
                false;


            quoteFormLayout.hidden =
                false;


            formStatus.classList.remove(
                "is-ready",
                "is-error"
            );


            formStatus.textContent =
                "Complete the required fields to prepare your quote request.";


            updateSubmitButton();


            nameInput.focus({
                preventScroll:
                    true
            });


            quoteFormHeading.scrollIntoView({

                behavior:
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth",

                block:
                    "start"

            });

        }



        /* =====================================
           VALIDATORS
        ===================================== */

        function validateName(
            showErrors = true
        ) {

            const value =
                cleanValue(
                    nameInput.value
                );


            let error =
                "";


            if (!value) {

                error =
                    "Please enter your name.";

            } else if (
                value.length <
                MIN_NAME_LENGTH
            ) {

                error =
                    "Please enter at least 2 characters.";

            }


            if (showErrors) {

                setFieldState(
                    nameInput,
                    error
                );

            }


            return !error;

        }



        function validatePhone(
            showErrors = true
        ) {

            const value =
                cleanValue(
                    phoneInput.value
                );


            let error =
                "";


            if (
                value &&
                getDigits(
                    value
                ).length < 10
            ) {

                error =
                    "Please enter a valid phone number.";

            }


            if (showErrors) {

                setFieldState(
                    phoneInput,
                    error
                );

            }


            return !error;

        }



        function validateEmail(
            showErrors = true
        ) {

            const value =
                cleanValue(
                    emailInput.value
                );


            let error =
                "";


            if (
                value &&
                !isValidEmail(
                    value
                )
            ) {

                error =
                    "Please enter a valid email address.";

            }


            if (showErrors) {

                setFieldState(
                    emailInput,
                    error
                );

            }


            return !error;

        }



        function validatePreferredContact(
            showErrors = true
        ) {

            const method =
                getPreferredContactMethod();


            const phone =
                cleanValue(
                    phoneInput.value
                );


            const email =
                cleanValue(
                    emailInput.value
                );


            let error =
                "";


            if (
                !phone &&
                !email
            ) {

                error =
                    "Please provide a phone number or email address.";

            } else if (
                method === "phone" &&
                !phone
            ) {

                error =
                    "You selected Phone, so please provide a phone number.";

            } else if (
                method === "email" &&
                !email
            ) {

                error =
                    "You selected Email, so please provide an email address.";

            }


            if (showErrors) {

                setContactMethodError(
                    error
                );

            }


            return !error;

        }



        function validateBoatYear(
            showErrors = true
        ) {

            const value =
                cleanValue(
                    boatYearInput.value
                );


            let error =
                "";


            if (value) {

                if (
                    !/^\d{4}$/.test(
                        value
                    )
                ) {

                    error =
                        "Enter a four-digit year.";

                } else {

                    const year =
                        Number(
                            value
                        );


                    if (
                        year <
                            MIN_BOAT_YEAR ||
                        year >
                            MAX_BOAT_YEAR
                    ) {

                        error =
                            `Enter a year between ${MIN_BOAT_YEAR} and ${MAX_BOAT_YEAR}.`;

                    }

                }

            }


            if (showErrors) {

                setFieldState(
                    boatYearInput,
                    error
                );

            }


            return !error;

        }



        function validateService(
            showErrors = true
        ) {

            const error =
                serviceInput.value
                    ? ""
                    : "Please select the type of work you need.";


            if (showErrors) {

                setFieldState(
                    serviceInput,
                    error
                );

            }


            return !error;

        }



        function validateDetails(
            showErrors = true
        ) {

            const value =
                cleanValue(
                    detailsInput.value
                );


            let error =
                "";


            if (!value) {

                error =
                    "Please tell us a little about the project.";

            } else if (
                value.length <
                MIN_DETAILS_LENGTH
            ) {

                error =
                    `Please enter at least ${MIN_DETAILS_LENGTH} characters.`;

            }


            if (showErrors) {

                setFieldState(
                    detailsInput,
                    error
                );

            }


            return !error;

        }



        function validateForm(
            showErrors = true
        ) {

            return [
                validateName(
                    showErrors
                ),

                validatePhone(
                    showErrors
                ),

                validateEmail(
                    showErrors
                ),

                validatePreferredContact(
                    showErrors
                ),

                validateBoatYear(
                    showErrors
                ),

                validateService(
                    showErrors
                ),

                validateDetails(
                    showErrors
                )

            ].every(
                Boolean
            );

        }



        /* =====================================
           PHOTOS
        ===================================== */

        function getTotalPhotoSize(
            files = selectedPhotos
        ) {

            return files.reduce(
                (
                    total,
                    file
                ) =>
                    total +
                    file.size,
                0
            );

        }



        function formatFileSize(
            bytes
        ) {

            return (
                `${(
                    bytes /
                    1024 /
                    1024
                ).toFixed(1)} MB`
            );

        }



        function clearPhotoError() {

            photoError.textContent =
                "";


            uploadArea.classList.remove(
                "is-invalid"
            );

        }



        function setPhotoError(
            message
        ) {

            photoError.textContent =
                message;


            uploadArea.classList.add(
                "is-invalid"
            );

        }



        function updatePhotoCount() {

            photoCount.textContent =
                `${selectedPhotos.length} / ${MAX_PHOTOS} photos`;

        }



        function isDuplicatePhoto(
            file
        ) {

            return selectedPhotos.some(
                (existing) =>
                    existing.name ===
                        file.name &&
                    existing.size ===
                        file.size &&
                    existing.lastModified ===
                        file.lastModified
            );

        }



        function validatePhotoFile(
            file
        ) {

            if (
                !ALLOWED_PHOTO_TYPES.has(
                    file.type
                )
            ) {

                return (
                    `${file.name} is not a supported image type.`
                );

            }


            if (
                file.size >
                MAX_PHOTO_SIZE
            ) {

                return (
                    `${file.name} is larger than 8 MB.`
                );

            }


            return "";

        }



        function syncPhotoInput() {

            if (
                typeof DataTransfer ===
                "undefined"
            ) {
                return;
            }


            const transfer =
                new DataTransfer();


            selectedPhotos.forEach(
                (file) => {

                    transfer.items.add(
                        file
                    );

                }
            );


            photoInput.files =
                transfer.files;

        }



        function renderPhotoPreviews() {

            photoPreviewGrid
                .replaceChildren();


            selectedPhotos.forEach(
                (
                    file,
                    index
                ) => {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.classList.add(
                        "quote-photo-preview"
                    );


                    const imageWrapper =
                        document.createElement(
                            "div"
                        );


                    imageWrapper.classList.add(
                        "quote-photo-preview-image"
                    );


                    const image =
                        document.createElement(
                            "img"
                        );


                    const objectUrl =
                        URL.createObjectURL(
                            file
                        );


                    image.src =
                        objectUrl;


                    image.alt =
                        `Selected project photo ${index + 1}`;


                    image.addEventListener(
                        "load",
                        () => {

                            URL.revokeObjectURL(
                                objectUrl
                            );

                        },
                        {
                            once: true
                        }
                    );


                    imageWrapper.appendChild(
                        image
                    );


                    const information =
                        document.createElement(
                            "div"
                        );


                    information.classList.add(
                        "quote-photo-preview-info"
                    );


                    const filename =
                        document.createElement(
                            "strong"
                        );


                    filename.textContent =
                        file.name;


                    const size =
                        document.createElement(
                            "span"
                        );


                    size.textContent =
                        formatFileSize(
                            file.size
                        );


                    const removeButton =
                        document.createElement(
                            "button"
                        );


                    removeButton.type =
                        "button";


                    removeButton.classList.add(
                        "quote-photo-remove"
                    );


                    removeButton.textContent =
                        "Remove";


                    removeButton.setAttribute(
                        "aria-label",
                        `Remove ${file.name}`
                    );


                    removeButton.addEventListener(
                        "click",
                        () => {

                            selectedPhotos.splice(
                                index,
                                1
                            );


                            clearPhotoError();

                            syncPhotoInput();

                            renderPhotoPreviews();

                            updateSubmitButton();

                        }
                    );


                    information.appendChild(
                        filename
                    );


                    information.appendChild(
                        size
                    );


                    information.appendChild(
                        removeButton
                    );


                    card.appendChild(
                        imageWrapper
                    );


                    card.appendChild(
                        information
                    );


                    photoPreviewGrid.appendChild(
                        card
                    );

                }
            );


            updatePhotoCount();


            uploadArea.classList.toggle(
                "is-full",
                selectedPhotos.length >=
                    MAX_PHOTOS
            );

        }



        function addPhotos(
            files
        ) {

            clearPhotoError();


            const incoming =
                Array.from(
                    files
                );


            let errorMessage =
                "";


            for (
                const file
                of incoming
            ) {

                if (
                    selectedPhotos.length >=
                    MAX_PHOTOS
                ) {

                    errorMessage =
                        "You can add up to 6 photos.";

                    break;

                }


                if (
                    isDuplicatePhoto(
                        file
                    )
                ) {
                    continue;
                }


                const fileError =
                    validatePhotoFile(
                        file
                    );


                if (fileError) {

                    errorMessage =
                        fileError;

                    continue;

                }


                const proposedTotal =
                    getTotalPhotoSize() +
                    file.size;


                if (
                    proposedTotal >
                    MAX_TOTAL_PHOTO_SIZE
                ) {

                    errorMessage =
                        "Your photos cannot exceed 20 MB total.";

                    continue;

                }


                selectedPhotos.push(
                    file
                );

            }


            if (errorMessage) {

                setPhotoError(
                    errorMessage
                );

            }


            syncPhotoInput();

            renderPhotoPreviews();

            updateSubmitButton();

        }



        photoInput.addEventListener(
            "change",
            () => {

                addPhotos(
                    photoInput.files
                );

            }
        );



        /* =====================================
           FORM STATE
        ===================================== */

        function updateSubmitButton() {

            const valid =
                validateForm(
                    false
                );


            submitButton.disabled =
                !valid ||
                isSubmitting;


            if (
                isSubmitting
            ) {
                return;
            }


            formStatus.classList.remove(
                "is-error"
            );


            if (valid) {

                formStatus.classList.add(
                    "is-ready"
                );


                formStatus.textContent =
                    selectedPhotos.length
                        ? `Your request is ready with ${selectedPhotos.length} photo${selectedPhotos.length === 1 ? "" : "s"} attached.`
                        : "Your quote request is ready to submit.";

            } else {

                formStatus.classList.remove(
                    "is-ready"
                );


                formStatus.textContent =
                    "Complete the required fields to prepare your quote request.";

            }

        }



        function updateDetailsCounter() {

            detailsCount.textContent =
                `${detailsInput.value.length} / ${MAX_DETAILS_LENGTH}`;

        }



        /* =====================================
           FIELD EVENTS
        ===================================== */

        nameInput.addEventListener(
            "blur",
            () => validateName()
        );


        phoneInput.addEventListener(
            "blur",
            () => {

                validatePhone();

                validatePreferredContact();

            }
        );


        emailInput.addEventListener(
            "blur",
            () => {

                validateEmail();

                validatePreferredContact();

            }
        );


        boatYearInput.addEventListener(
            "blur",
            () =>
                validateBoatYear()
        );


        serviceInput.addEventListener(
            "change",
            () => {

                validateService();

                updateSubmitButton();

            }
        );


        detailsInput.addEventListener(
            "input",
            () => {

                updateDetailsCounter();

                updateSubmitButton();

            }
        );


        detailsInput.addEventListener(
            "blur",
            () =>
                validateDetails()
        );


        quoteForm
            .querySelectorAll(
                'input[name="contactMethod"]'
            )
            .forEach(
                (radio) => {

                    radio.addEventListener(
                        "change",
                        () => {

                            validatePreferredContact();

                            updateSubmitButton();

                        }
                    );

                }
            );


        [
            nameInput,
            phoneInput,
            emailInput,
            boatYearInput
        ].forEach(
            (field) => {

                field.addEventListener(
                    "input",
                    updateSubmitButton
                );

            }
        );



        printReceiptButton.addEventListener(
            "click",
            () => {

                window.print();

            }
        );


        submitAnotherButton.addEventListener(
            "click",
            resetForAnotherQuote
        );



        /* =====================================
           SUBMIT TO BACKEND
        ===================================== */

        quoteForm.addEventListener(
            "submit",
            async (
                event
            ) => {

                event.preventDefault();


                if (
                    isSubmitting
                ) {
                    return;
                }


                const valid =
                    validateForm(
                        true
                    );


                if (!valid) {

                    formStatus.classList.remove(
                        "is-ready"
                    );


                    formStatus.classList.add(
                        "is-error"
                    );


                    formStatus.textContent =
                        "Please correct the highlighted fields before submitting.";


                    const firstInvalid =
                        quoteForm.querySelector(
                            ".is-invalid"
                        );


                    firstInvalid?.focus();


                    return;

                }


                if (!API_URL) {

                    formStatus.classList.add(
                        "is-error"
                    );


                    formStatus.textContent =
                        "The quote service is not configured yet.";


                    return;

                }


                isSubmitting =
                    true;


                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Sending...";


                formStatus.classList.remove(
                    "is-error",
                    "is-ready"
                );


                formStatus.textContent =
                    "Sending your quote request securely...";


                try {

                    const formData =
                        new FormData(
                            quoteForm
                        );


                    /*
                        Use our controlled photo array
                        rather than trusting the browser's
                        file-input state.
                    */

                    formData.delete(
                        "photos"
                    );


                    selectedPhotos.forEach(
                        (file) => {

                            formData.append(
                                "photos",
                                file,
                                file.name
                            );

                        }
                    );


                    const response =
                        await fetch(
                            API_URL,
                            {
                                method:
                                    "POST",

                                body:
                                    formData
                            }
                        );


                    const result =
                        await response.json()
                            .catch(
                                () => ({})
                            );


                    if (
                        !response.ok ||
                        !result.success
                    ) {

                        throw new Error(
                            result.message ||
                            "The quote request could not be sent."
                        );

                    }


                    formStatus.classList.add(
                        "is-ready"
                    );


                    formStatus.textContent =
                        `Quote request sent successfully. Confirmation: ${result.confirmationId}`;


                    showReceipt(
                        result
                    );

                } catch (
                    error
                ) {

                    formStatus.classList.add(
                        "is-error"
                    );


                    formStatus.textContent =
                        error.message ||
                        "We couldn't send your quote request. Please try again or call 914-565-3426.";

                } finally {

                    isSubmitting =
                        false;


                    submitButton.textContent =
                        "Submit Quote Request";


                    updateSubmitButton();

                }

            }
        );



        /* =====================================
           INITIAL STATE
        ===================================== */

        updateDetailsCounter();

        updatePhotoCount();

        renderPhotoPreviews();

        updateSubmitButton();

    }
);