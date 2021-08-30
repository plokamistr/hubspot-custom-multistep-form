// Document Title URL name
document.title = `Hubspot Multistep Form at ${window.location.hostname}`;

// Adds numbered id to each section
$("#hs-main-form section").each(function (i) {
    i = i + 1;
    $(this).prop('id', 'step-' + i);
});

// Dynamic width of progress bar steps
$("#hs-main-form #progressbar").each(function () {
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

// Local Storage Service from hubspotscripts
/*
function setLocalStorageService(fields) {
  setTimeout(function () {
    let insertedFields = localStorage.setItem('Fields', JSON.stringify(fields));
    console.log("Inserted:", insertedFields);

    let retrievedFields = JSON.parse(localStorage.getItem('fields'));
    console.log("Retrieved:", retrievedFields);
    console.log(typeof retrievedFields);


  }, 500);
}
*/

// Autocomplete state n city function
$("#hs-main-form input[name='zip']").on("keyup", function () {
    const zipValue = $(this).val();
    const zipUrl = `https://api.zippopotam.us/us/${form.querySelector("input[name='zip']").value}`
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

    // Email validation
    $.validator.addMethod("customEmail", function (value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Please enter valid email address!");

    $.validator.addMethod("noSpace", function (value, element) {
        return value == '' || value.trim().length != 0;
    }, "Please fill the field correctly. Avoid 'space' characters");


    // Add class ignore to active section
    // Add class ignore to active section
    $(form).validate({

        rules: {
            zip: {
                required: true,
                noSpace: true,
                maxlength: 5,
            },
            roof_stories: {
                required: true,
            },
            approximate_roof_size: {
                required: true,
            },
            firstname: {
                required: true,
                noSpace: true,
            },
            lastname: {
                required: true,
                noSpace: true,
            },
            email: {
                required: true,
                customEmail: true,
                noSpace: true,
            },
            phone: {
                required: true,
                noSpace: true,
                minlength: 10,
                maxlength: 10,
                number: true,
            },
            address: {
                required: true,
                noSpace: true,
            },
            city: {
                required: true,
                noSpace: true,
            },
        },
        messages: {
            zip: {
                required: 'A 5 digit zip code is required!'
            },
            roof_stories: {
                required: 'Please choose Level/s'
            },
            approximate_roof_size: {
                required: 'Please choose a Range'
            },
            email: {
                required: 'Please enter a valid email',
                email: 'Don\'t forget the @ character!',
            },
            firstname: {
                required: 'Please enter your first name',
            },
            lastname: {
                required: 'Please enter your last name',
            },
            phone: {
                required: 'Please enter a valid phone number with 10 digits',
                number: 'Please, only numbers without "+", "-" or letters',
            },
            address: {
                required: 'Please enter a valid address',
            },
            city: {
                required: 'Please enter a valid city name',
            },
        },
        ignore: ".ignore",
        focusInvalid: true,

        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.insertBefore($(element).parent().parent());
            }
            // Uncomment if other type of element
            /* 
            else if(element.is( ":text" )){
              error.insertBefore($(element));
            }*/
            else {
                error.insertBefore($(element));
            }
        },
    });
}