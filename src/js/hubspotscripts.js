//Portal ID stays always the same
const PORTAL_ID = "6044336";

// Here goes the form ID, each form has a unique ID
const FORM_ID = "1549b018-2b79-4094-9eb3-db71aef6f89e";

// POST to Endpoint
const FORM_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

let form = document.getElementById("hs-main-form");
const messageContainer = document.getElementById("msg");

// Here is the person type options selections
let selectedPersonTypes = [];
const personTypeCheckboxes = document.querySelectorAll("[data-person-type]");
personTypeCheckboxes.forEach(checkbox => checkbox.addEventListener("click", (event) => {
  const personType = checkbox.dataset.personType;

  if (personType === 'neither') {
    selectedPersonTypes = ['neither']
    personTypeCheckboxes.forEach(checkbox => checkbox.classList.remove('selected'))
    checkbox.classList.add('selected')
  } else if (selectedPersonTypes.includes(personType)) {
    selectedPersonTypes = selectedPersonTypes.filter(x => x !== personType)
    checkbox.classList.remove('selected')
  } else {
    selectedPersonTypes = [...selectedPersonTypes, personType].filter(x => x !== 'neither');
    personTypeCheckboxes.forEach(checkbox => {
      if (checkbox.dataset.personType === 'neither') {
        checkbox.classList.remove('selected');
      }
    })
    checkbox.classList.add('selected')
  }
}))

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
  //const propertyType = form.querySelector("select[name='property_type']").value;
  const roofStories = form.querySelector("input[name='roof_stories']:checked").value;
  const roofSize = form.querySelector("input[name='approximate_roof_size']:checked").value;
  const pageUri = document.URL;
  const pageName = document.title;
  const hCookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );


  const fields = [
    {
      name: "dealer_id",
      value: dealer_id,
    },
    {
      name: "steps_completed",
      value: steps_completed,
    },
    {
      name: "email",
      value: email,
      required: true,
    },
    {
      name: "zip",
      value: postalCode,
      required: true,
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
      value: selectedPersonTypes.join(';'),
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
      required: true,
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
    /*
    {
      name: "property_type",
      value: propertyType,
    },
    */
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

  /*
    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const { inlineMessage } = await response.json();
      messageContainer.innerHTML = inlineMessage;
    } catch (error) {
      messageContainer.innerHTML = "Something went wrong. Please try again";
    }
  */



}
