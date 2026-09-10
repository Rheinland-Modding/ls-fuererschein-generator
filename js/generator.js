function generateLicenseNumber() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let result = "RP-DE-";

    for (let i = 0; i < 8; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        result += characters[randomIndex];
    }

    return result;
}


function generateId() {

    return Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 8);
}


function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString("de-DE");
}


function getSelectedClasses() {

    const checkboxes =
        document.querySelectorAll(
            ".class-option input:checked"
        );

    return Array.from(checkboxes)
        .map(checkbox => checkbox.value);
}


function getFormData() {

    return {

        id: window.currentLicenseId || generateId(),

        firstName:
            document.getElementById("firstName").value.trim(),

        lastName:
            document.getElementById("lastName").value.trim(),

        birthDate:
            document.getElementById("birthDate").value,

        birthPlace:
            document.getElementById("birthPlace").value.trim(),

        issueDate:
            document.getElementById("issueDate").value,

        issuePlace:
            document.getElementById("issuePlace").value.trim(),

        licenseNumber:
            document.getElementById("licenseNumber").value,

        classes:
            getSelectedClasses(),

        photo:
            document.getElementById("previewPhoto").src,

        createdAt:
            new Date().toISOString()
    };
}


function loadFormData(license) {

    window.currentLicenseId = license.id;

    document.getElementById("firstName").value =
        license.firstName || "";

    document.getElementById("lastName").value =
        license.lastName || "";

    document.getElementById("birthDate").value =
        license.birthDate || "";

    document.getElementById("birthPlace").value =
        license.birthPlace || "";

    document.getElementById("issueDate").value =
        license.issueDate || "";

    document.getElementById("issuePlace").value =
        license.issuePlace || "";

    document.getElementById("licenseNumber").value =
        license.licenseNumber || generateLicenseNumber();


    document.querySelectorAll(
        ".class-option input"
    ).forEach(checkbox => {

        checkbox.checked =
            license.classes?.includes(
                checkbox.value
            ) || false;

    });


    if (license.photo) {

        document.getElementById(
            "previewPhoto"
        ).src = license.photo;

    }

    updatePreview();
}


function clearForm() {

    window.currentLicenseId = null;

    document.getElementById(
        "firstName"
    ).value = "";

    document.getElementById(
        "lastName"
    ).value = "";

    document.getElementById(
        "birthDate"
    ).value = "";

    document.getElementById(
        "birthPlace"
    ).value = "";

    document.getElementById(
        "issuePlace"
    ).value = "";


    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    document.getElementById(
        "issueDate"
    ).value = today;


    document.getElementById(
        "licenseNumber"
    ).value =
        generateLicenseNumber();


    document.querySelectorAll(
        ".class-option input"
    ).forEach(
        checkbox => checkbox.checked = false
    );


    document.getElementById(
        "previewPhoto"
    ).src =
        "assets/default-avatar.svg";


    updatePreview();
}
