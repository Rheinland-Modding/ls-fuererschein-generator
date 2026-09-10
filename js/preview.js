function updatePreview() {

    const firstName =
        document.getElementById("firstName").value;

    const lastName =
        document.getElementById("lastName").value;

    const birthDate =
        document.getElementById("birthDate").value;

    const birthPlace =
        document.getElementById("birthPlace").value;

    const issueDate =
        document.getElementById("issueDate").value;

    const issuePlace =
        document.getElementById("issuePlace").value;

    const licenseNumber =
        document.getElementById("licenseNumber").value;


    document.getElementById(
        "previewFirstName"
    ).textContent =
        firstName || "MAX";


    document.getElementById(
        "previewLastName"
    ).textContent =
        lastName || "MUSTERMANN";


    document.getElementById(
        "previewBirthDate"
    ).textContent =
        formatDate(birthDate);


    document.getElementById(
        "previewBirthPlace"
    ).textContent =
        birthPlace || "MUSTERSTADT";


    document.getElementById(
        "previewIssueDate"
    ).textContent =
        formatDate(issueDate);


    document.getElementById(
        "previewIssuePlace"
    ).textContent =
        issuePlace || "MUSTERSTADT";


    document.getElementById(
        "previewNumber"
    ).textContent =
        licenseNumber || "RP-DE-000000";
}


function handlePhotoUpload(event) {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        showToast(
            "Bitte eine Bilddatei auswählen."
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload = function () {

        document.getElementById(
            "previewPhoto"
        ).src =
            reader.result;

    };


    reader.readAsDataURL(file);
}


function toggleLicenseSide() {

    const front =
        document.getElementById(
            "licenseFront"
        );

    const back =
        document.getElementById(
            "licenseBack"
        );


    const button =
        document.getElementById(
            "flipBtn"
        );


    if (front.classList.contains("hidden")) {

        front.classList.remove("hidden");

        back.classList.add("hidden");

        button.textContent =
            "↔ Rückseite";

    } else {

        front.classList.add("hidden");

        back.classList.remove("hidden");

        button.textContent =
            "↔ Vorderseite";
    }
}
