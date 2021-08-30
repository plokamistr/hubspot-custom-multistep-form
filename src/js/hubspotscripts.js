//Portal ID stays always the same
const PORTAL_ID = "6044336";

// Here goes the form ID, each form has a unique ID
const FORM_ID = "f510d163-04a3-4215-af2b-026efa43fcce";

// POST to Endpoint
const FORM_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

let form = document.getElementById("hs-main-form");
const messageContainer = document.getElementById("msg");

// Here is the person type options selections
let selectedPersonTypes = [];
const personTypeCheckboxes = document.querySelectorAll("[data-person-type]");
personTypeCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("click", (event) => {
        const personType = checkbox.dataset.personType;

        if (personType === "neither") {
            selectedPersonTypes = ["neither"];
            personTypeCheckboxes.forEach((checkbox) =>
                checkbox.classList.remove("selected")
            );
            checkbox.classList.add("selected");
        } else if (selectedPersonTypes.includes(personType)) {
            selectedPersonTypes = selectedPersonTypes.filter((x) => x !== personType);
            checkbox.classList.remove("selected");
        } else {
            selectedPersonTypes = [...selectedPersonTypes, personType].filter(
                (x) => x !== "neither"
            );
            personTypeCheckboxes.forEach((checkbox) => {
                if (checkbox.dataset.personType === "neither") {
                    checkbox.classList.remove("selected");
                }
            });
            checkbox.classList.add("selected");
        }
    })
);

// Here we capture the UTM parameters from the URL and convert it into an array
let params = {};
window.location.search.slice(1).split('&').forEach(elm => {
    if (elm === '') return;
    let spl = elm.split('=');
    const d = decodeURIComponent;
    params[d(spl[0])] = (spl.length >= 2 ? d(spl[1]) : true);
});
let utmValues = Object.values(params);

//console.log(params);
console.log("Array ", utmValues);



// HERE HAPPENS SUBMIT
async function submitForm() {
    const dealer_id = form.querySelector("input[name='dealer_id']").value;
    const steps_completed = form.querySelector("input[name='steps_completed']").value;
    const email = form.querySelector("input[name='email']").value;
    const postalCode = form.querySelector("input[name='zip']").value;
    const firstName = form.querySelector("input[name='firstname']").value;
    const lastName = form.querySelector("input[name='lastname']").value;
    const phoneNumber = form.querySelector("input[name='phone']").value;
    const address1 = form.querySelector("input[name='address']").value;
    const address2 = form.querySelector("input[name='street_address_2']").value;
    const city = form.querySelector("input[name='city']").value;
    const state = form.querySelector("select[name='state']").value;
    const roofStories = form.querySelector("input[name='roof_stories']:checked").value;
    const roofSize = form.querySelector("input[name='approximate_roof_size']:checked").value;
    const pageUri = document.URL;
    const pageName = document.title;
    const hCookie = document.cookie.replace(
        /(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );

    const fields = [{
        name: "dealer_id",
        value: dealer_id,
    },
    {
        name: "steps_completed",
        value: steps_completed,
    },
    {
        name: "utm_source",
        value: utmValues.length === 0 ? "Null" : utmValues[0],
    },
    {
        name: "utm_medium",
        value: utmValues.length === 0 ? "Null" : utmValues[1],
    },
    {
        name: "utm_campaign",
        value: utmValues.length === 0 ? "Null" : utmValues[2],
    },
    {
        name: "utm_content",
        value: utmValues.length === 0 ? "Null" : utmValues[3],
    },
    {
        name: "email",
        value: email,
    },
    {
        name: "zip",
        value: postalCode,
    },
    {
        name: "roof_stories",
        value: roofStories,
    },
    {
        name: "approximate_roof_size",
        value: roofSize,
    },
    {
        name: "special_contact_designation",
        value: selectedPersonTypes.join(";"),
    },
    {
        name: "firstname",
        value: firstName,
    },
    {
        name: "lastname",
        value: lastName,
    },
    {
        name: "phone",
        value: phoneNumber,
    },
    {
        name: "address",
        value: address1,
    },
    {
        name: "street_address_2",
        value: address2,
    },
    {
        name: "city",
        value: city,
    },
    {
        name: "state",
        value: state,
    },
    ];

    //Note: NAME field MUST BE same as in the form created in HUBSPOT
    const body = {
        fields,
        context: {
            hutk: pageUri.includes("127") ? undefined : hCookie,
            pageUri,
            pageName,
            ipAddress: ipAddress[0],
        },
    };

    console.log("WE SUBMIT : ", body);

    // Save to local storage
    //setLocalStorageService(fields);

    //Comment for testing NO SUMBISSION
    try {
        const response = await fetch(FORM_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const { inlineMessage, errors, redirectUri } = await response.json();
        if (errors) {
            alert(errors[0].message)
            return false;
        } else if (inlineMessage) {
            //If Inline Message Enabled to Hubspot Form show message to last step
            messageContainer.innerHTML = inlineMessage;
        } else if (redirectUri) {
            //If Redirection Enabled to Hubspot Form save redirection URL as global variable
            window.redirUrl = redirectUri;
        }
        return true;

    } catch (error) {
        console.log(error);
        alert("Something went wrong. Please try again");
    }
    //Comment for testing NO SUMBISSION


}