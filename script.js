function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// COOKIE CONSENT

const consentKey = "analytics-consent";
const cookieBanner = document.getElementById("cookie-banner");

function loadAnalytics() {
    if (document.getElementById("ga4-script")) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    gtag("js", new Date());
    gtag("config", "G-G3V1XWJRVD");

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-G3V1XWJRVD";

    document.head.appendChild(script);
}

function deleteAnalyticsCookies() {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const name = cookie.split("=")[0].trim();

        if (name === "_ga" || name.startsWith("_ga_")) {
            document.cookie = `${name}=; Max-Age=0; Path=/`;
            document.cookie = `${name}=; Max-Age=0; Path=/; Domain=kavisan.ch`;
        }
    }
}


function saveConsent(accepted) {
    localStorage.setItem(
        consentKey,
        accepted ? "accepted" : "rejected"
    );

    if (!accepted) {
        deleteAnalyticsCookies();
    }

    location.reload();
}

document.getElementById("cookie-accept").addEventListener("click", () => {
    saveConsent(true);
});

document.getElementById("cookie-reject").addEventListener("click", () => {
    saveConsent(false);
});

const savedConsent = localStorage.getItem(consentKey);

if (savedConsent === "accepted") {
    loadAnalytics();
} else if (savedConsent !== "rejected") {
    cookieBanner.hidden = false;
}

// Reopen cookie preferences
document.getElementById("cookie-settings").addEventListener("click", () => {
    cookieBanner.hidden = false;
});