// Adds numbered id to each section
$("section").each(function (i) {
  i = i + 1;
  $(this).prop('id', 'step-' + i);
});

// Define Privacy policy links


// Dynamic width of progress bar steps
$("#progressbar").each(function () {
  let liNumber = $(this).children().length;
  let liWidth = 100 / liNumber;
  $(this)
    .find("li")
    .css("width", liWidth + "%");
});

// Get IP of Client-User
let ipAddress = [];
const urlIp = "https://api64.ipify.org?format=json";

fetch(urlIp)
  .then((response) => response.json())
  .then((result) => {
    ipAddress.push(result.ip);
  });

/*
async function fetchAsync() {
  // await response of fetch call
  let response = await fetch(urlIp);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}
// trigger async function
// log response or catch error of fetch promise
fetchAsync()
  .then((data) => {
    ipAddress.push(data.ip);
    console.log("Your IP is: ", ipAddress[0]);
  })
  .catch((reason) => console.log(reason.message));
*/

// Local Storage Service from hubspotscripts
function setLocalStorageService(fields) {
  setTimeout(function () {
    let insertedFields = localStorage.setItem('Fields', JSON.stringify(fields));
    console.log("Inserted:", insertedFields);

    let retrievedFields = JSON.parse(localStorage.getItem('fields'));
    console.log("Retrieved:", retrievedFields);
    console.log(typeof retrievedFields);


  }, 500);
}


// Autocomplete state n city function
$("input[name='zip']").on("keyup", function () {
  const zipValue = $(this).val();
  const zipUrl = `http://api.zippopotam.us/us/${form.querySelector("input[name='zip']").value}`
  // We execute when length is 5 digits
  if ((zipValue.length == 5)) {

    async function fetchZip() {

      const response = await fetch(zipUrl);
      if (response.status === 200) {
        const data = await response.json();

        places = data['places'][0];
        $("input[name='city']").val(places['place name']);
        $("select[name='state']").val(places['state']);
        console.log(`WE GET : Zip Code: ${data['post code']} | City: ${places['place name']} | State: ${places['state']} `);
      } else {
        alert("Postal Code Not Found. Please try again.");
      }
    }
    fetchZip().then(data => {
      data; // fetched data
    });
  }
});


// Form Validation
function formValidation() {

  $.validator.addMethod("customEmail", function (value, element) {
    return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
  }, "Please enter valid email address!");


  // Add class ignore to active section
  $(form).validate({

    rules: {
      zip: {
        required: true,
      },
      roof_stories: {
        required: true,
      },
      approximate_roof_size: {
        required: true,
      },
      email: {
        required: true,
        customEmail: true,
      },
      phone: {
        required: true,
      },
    },
    messages: {
      zip: {
        required: 'A zip code is required!',
        //noSpace: true, 
      },
      roof_stories: {
        required: 'Please choose Level/s'
      },
      approximate_roof_size: {
        required: 'Please choose a Range'
      },
      email: {
        required: 'Please enter a valid email',
        email: 'You are missing @ right?'
      },
      phone: {
        required: 'Please enter a correct US phone number'
      },
    },
    ignore: ".ignore",
    focusInvalid: true,

    /*
    errorPlacement: function (error, element) {
      element.parent('').insertBefore(error);
    },
    */

  });

}


