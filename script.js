/* =========================
   MOBILE NAVIGATION
========================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});

/* Close menu after clicking a link */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});

/* =========================
   COUNTDOWN TIMER
========================= */

/*
    Change this date to your actual
    Hackbuzz event date.
*/

const eventDate = new Date("December 20, 2026 10:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = eventDate - now;


    if (difference <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );


    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   REGISTRATION FORM
========================= */


const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwGH7l6v4psJ1lfirx9gB9e60kHaagr8A4CdF0mUmaRAEulpuL2kkertc5iDtBAgx75/exec";


const form =
    document.getElementById("registrationForm");


const message =
    document.getElementById("formMessage");


const submitButton =
    document.getElementById("submitButton");


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    message.className = "form-message";

    message.innerText = "";


    const name =
        document.getElementById("name").value.trim();


    const email =
        document.getElementById("email").value.trim();


    const phone =
        document.getElementById("phone").value.trim();


    const college =
        document.getElementById("college").value.trim();


    const year =
        document.getElementById("year").value;


    const team =
        document.getElementById("team").value.trim();


    /* =========================
       VALIDATION
    ========================= */


    if (name.length < 3) {

        showError(
            "Please enter a valid name."
        );

        return;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError(
            "Please enter a valid email address."
        );

        return;
    }


    const phonePattern =
        /^[0-9]{10}$/;


    if (!phonePattern.test(phone)) {

        showError(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }


    if (college.length < 2) {

        showError(
            "Please enter your college name."
        );

        return;
    }


    if (year === "") {

        showError(
            "Please select your year."
        );

        return;
    }


    /* =========================
       PREPARE DATA
    ========================= */


    const data = {

        name: name,

        email: email,

        phone: phone,

        college: college,

        year: year,

        team: team

    };


    /* =========================
       SUBMIT
    ========================= */


    submitButton.disabled = true;

    submitButton.innerText =
        "Submitting...";


    try {

        /*
            Send data to Google Apps Script.
        */

        const response =
            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify(data)

            });

        showSuccess(
            "Registration submitted successfully! 🚀"
        );


        form.reset();


    } catch (error) {

        console.error(error);


        showError(
            "Something went wrong. Please try again."
        );

    }


    submitButton.disabled = false;

    submitButton.innerText =
        "Register for Hackbuzz →";

});


/* =========================
   MESSAGE FUNCTIONS
========================= */


function showError(text) {

    message.className =
        "form-message error";

    message.innerText = text;

}


function showSuccess(text) {

    message.className =
        "form-message success";

    message.innerText = text;

}

