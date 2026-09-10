document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeApp();

    }
);


function initializeApp() {

    setupNavigation();

    setupFormEvents();

    setupButtons();

    clearForm();

    renderSavedLicenses();

}


function setupNavigation() {

    document.querySelectorAll(
        ".nav-btn"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const page =
                    button.dataset.page;

                switchPage(page);

            }
        );

    });
}


function switchPage(page) {

    document.querySelectorAll(
        ".nav-btn"
    ).forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === page
        );

    });


    document.querySelectorAll(
        ".page"
    ).forEach(section => {

        section.classList.remove(
            "active"
        );

    });


    if (page === "generator") {

        document
            .getElementById("generatorPage")
            .classList.add("active");

    }


    if (page === "saved") {

        document
            .getElementById("savedPage")
            .classList.add("active");

        renderSavedLicenses();

    }
}


function setupFormEvents() {

    const inputs =
        document.querySelectorAll(
            "#generatorPage input"
        );


    inputs.forEach(input => {

        input.addEventListener(
            "input",
            updatePreview
        );

    });


    document
        .querySelectorAll(
            ".class-option input"
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                updatePreview
            );

        });


    document
        .getElementById(
            "photoInput"
        )
        .addEventListener(
            "change",
            handlePhotoUpload
        );

}


function setupButtons() {

    document
        .getElementById(
            "generateNumberBtn"
        )
        .addEventListener(
            "click",
            () => {

                document.getElementById(
                    "licenseNumber"
                ).value =
                    generateLicenseNumber();

                updatePreview();

            }
        );


    document
        .getElementById(
            "flipBtn"
        )
        .addEventListener(
            "click",
            toggleLicenseSide
        );


    document
        .getElementById(
            "saveBtn"
        )
        .addEventListener(
            "click",
            saveCurrentLicense
        );


    document
        .getElementById(
            "clearBtn"
        )
        .addEventListener(
            "click",
            () => {

                if (
                    confirm(
                        "Formular wirklich zurücksetzen?"
                    )
                ) {

                    clearForm();

                    showToast(
                        "Formular zurückgesetzt."
                    );

                }

            }
        );


    document
        .getElementById(
            "newLicenseBtn"
        )
        .addEventListener(
            "click",
            () => {

                clearForm();

                switchPage(
                    "generator"
                );

            }
        );


    document
        .getElementById(
            "clearStorageBtn"
        )
        .addEventListener(
            "click",
            clearSavedLicenses
        );

}


function saveCurrentLicense() {

    const license =
        getFormData();


    if (
        !license.firstName ||
        !license.lastName
    ) {

        showToast(
            "Bitte mindestens Vor- und Nachnamen eingeben."
        );

        return;
    }


    if (!license.licenseNumber) {

        license.licenseNumber =
            generateLicenseNumber();

        document.getElementById(
            "licenseNumber"
        ).value =
            license.licenseNumber;

    }


    saveLicense(
        license
    );


    window.currentLicenseId =
        license.id;


    renderSavedLicenses();

    showToast(
        "Führerschein gespeichert!"
    );
}


function renderSavedLicenses() {

    const container =
        document.getElementById(
            "savedLicenses"
        );


    const licenses =
        getSavedLicenses();


    container.innerHTML = "";


    if (licenses.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <div>🪪</div>
                <h3>Noch keine Führerscheine</h3>
                <p>
                    Erstelle deinen ersten RP-Führerschein
                    im Generator.
                </p>
            </div>
        `;

        return;
    }


    licenses
        .slice()
        .reverse()
        .forEach(license => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "saved-card";


            const classes =
                license.classes?.length
                    ? license.classes.join(" • ")
                    : "Keine Klassen";


            card.innerHTML = `

                <div class="saved-card-photo">
                    <img
                        src="${
                            license.photo ||
                            "assets/default-avatar.svg"
                        }"
                        alt="Foto"
                    >
                </div>

                <div class="saved-card-info">

                    <h3>
                        ${
                            escapeHtml(
                                license.firstName
                            )
                        }
                        ${
                            escapeHtml(
                                license.lastName
                            )
                        }
                    </h3>

                    <p>
                        ${
                            escapeHtml(
                                license.licenseNumber
                            )
                        }
                    </p>

                    <span>
                        ${escapeHtml(classes)}
                    </span>

                </div>

                <div class="saved-card-actions">

                    <button
                        class="secondary-btn"
                        data-load="${license.id}"
                    >
                        Öffnen
                    </button>

                    <button
                        class="danger-btn"
                        data-delete="${license.id}"
                    >
                        Löschen
                    </button>

                </div>
            `;


            container.appendChild(card);

        });


    container
        .querySelectorAll(
            "[data-load]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.load;

                    const license =
                        getSavedLicenses()
                            .find(
                                item =>
                                    item.id === id
                            );


                    if (!license) {
                        return;
                    }


                    loadFormData(
                        license
                    );

                    switchPage(
                        "generator"
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-delete]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.delete;


                    if (
                        confirm(
                            "Diesen Führerschein löschen?"
                        )
                    ) {

                        deleteLicense(
                            id
                        );

                        renderSavedLicenses();

                        showToast(
                            "Führerschein gelöscht."
                        );

                    }

                }
            );

        });
}


function clearSavedLicenses() {

    const licenses =
        getSavedLicenses();


    if (!licenses.length) {

        showToast(
            "Es sind keine Daten gespeichert."
        );

        return;
    }


    if (
        confirm(
            "Wirklich ALLE gespeicherten Führerscheine löschen?"
        )
    ) {

        clearAllLicenses();

        renderSavedLicenses();

        showToast(
            "Alle Führerscheine gelöscht."
        );

    }
}


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );
}


function escapeHtml(value) {

    if (!value) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
