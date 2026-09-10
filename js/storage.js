const STORAGE_KEY = "rp_fuehrerschein_generator";


function getSavedLicenses() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(
            "Gespeicherte Daten konnten nicht gelesen werden.",
            error
        );

        return [];
    }
}


function saveLicense(license) {

    const licenses = getSavedLicenses();

    const existingIndex = licenses.findIndex(
        item => item.id === license.id
    );

    if (existingIndex >= 0) {

        licenses[existingIndex] = license;

    } else {

        licenses.push(license);

    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(licenses)
    );
}


function deleteLicense(id) {

    const licenses = getSavedLicenses();

    const filtered = licenses.filter(
        license => license.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(filtered)
    );
}


function clearAllLicenses() {

    localStorage.removeItem(STORAGE_KEY);
}
