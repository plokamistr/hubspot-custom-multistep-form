let currentStep, nextStep, prevStep; //sections
let left, opacity, scale; //section properties which we will animate
let animating; //flag to prevent quick multi-click glitches
let clicks = 0; // iniciate clicks on next button
const nextBtn = $(".next");
const prevBtn = $(".previous");
//const resetBtn = $(".btn-reset");

//################## ON NEXT CLICK #########################
$(nextBtn).on("click", function () {

  formValidation()

  if ($(form).valid() === true) {

    //increase next button count and assign the steps completed value to steps_completed
    clicks++;
    form.querySelector("input[name='steps_completed']").value = clicks;


    if (animating) return false;
    animating = true;

    currentStep = $(this).parent().parent();
    nextStep = $(this).parent().parent().next();

    // To validate only the indicated fields if not remove class ignore when activeStep
    let toIgnoreItem= $(nextStep).find(".ignore");
    console.log("Next element with class ignore is:",toIgnoreItem)
    $(toIgnoreItem).removeClass();



    // HERE WE SUBMIT ON EACH NEXT STEP CLICK
    submitForm();

    //activate next step on progressbar using the index of nextStep
    $("#progressbar li").eq($("section").index(nextStep)).addClass("active");
    $(currentStep).removeClass("activeStep");
    $(nextStep).addClass("activeStep");
 


    // HERE WE PASS clicks TO USER INFO REGISTRATION
    //clickRegister(clicks);

    //show the next section
    nextStep.css("visibility", "visible");
    //hide the current section with style
    currentStep.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of currentStep reduces to 0 - stored in "now"
          //1. scale currentStep down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring nextStep from the right(50%)
          left = now * 50 + "%";
          //3. increase opacity of nextStep to 1 as it moves in
          opacity = 1 - now;
          currentStep.css({ transform: "scale(" + scale + ")" });
          nextStep.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function () {
          currentStep.css("visibility", "hidden");
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  } else {
    return;
  }
});
//####################################################################

//################## ON PREVIOUS CLICK #########################
$(prevBtn).on("click", function () {
  if (animating) return false;
  animating = true;

  currentStep = $(this).parent().parent();
  prevStep = $(this).parent().parent().prev();

  //de-activate current step on progressbar
  $("#progressbar li")
    .eq($("section").index(currentStep))
    .removeClass("active");
  $(currentStep).removeClass("activeStep");
  $(prevStep).addClass("activeStep");

  // show the previous section
  prevStep.css("visibility", "visible");
  //hide the current section with style
  currentStep.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of currentStep reduces to 0 - stored in "now"
        //1. scale previousStep from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take currentStep to the right(50%) - from 0%
        left = (1 - now) * 50 + "%";
        //3. increase opacity of previousStep to 1 as it moves in
        opacity = 1 - now;
        currentStep.css({ left: left });
        prevStep.css({
          transform: "scale(" + scale + ")",
          opacity: opacity,
        });
      },
      duration: 800,
      complete: function () {
        currentStep.css("visibility", "hidden");
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: "easeInOutBack",
    }
  );
});
//####################################################################

//################## IF RESET BUTTON IS WANTED #########################
/*
$(resetBtn).on("click", function () {
  // Reset all fields of form IF RESET BUTTON EXISTS
  $(form)[0].reset();

  if (animating) return false;
  animating = true;

  currentStep = $(this).parent().parent();
  firstStep = $("section").first();
  allSteps = $("section");

  //de-activate current step and set active class to the first step on progressbar
  $("#progressbar li").removeClass("active");
  $("#progressbar li").first().addClass("active");

  //de-activate ActiveStep on currentStep and set active class to the firstStep
  $(currentStep).removeClass("activeStep");
  $(firstStep).addClass("activeStep");

  // show the first section
  $(firstStep).css({
    visibility: "visible",
  });

  // Reset All step to original size
  $(allSteps).css({ transform: "scale(" + 1 + ")" });

  //hide the current section with style
  currentStep.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of currentStep reduces to 0 - stored in "now"
        //1. scale previousStep from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take currentStep to the right(50%) - from 0%
        left = (1 - now) * 50 + "%";
        //3. increase opacity of previousStep to 1 as it moves in
        opacity = 1 - now;
        currentStep.css({ left: left });
        firstStep.css({
          transform: "scale(" + scale + ")",
          opacity: opacity,
        });
      },
      duration: 600,
      complete: function () {
        currentStep.css("visibility", "hidden");
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: "easeOutBack",
    }
  );
});
*/
//####################################################################

//################## IF AUTO RESET IS WANTED #########################
function resetForm() {
  $(form)[0].reset();
  clicks = 0;
  $(".valid").removeClass();
}

function returnToFirst() {
  if (animating) return false;
  animating = true;

  currentStep = $("section.activeStep");
  firstStep = $("section").first();
  allSteps = $("section");

  //de-activate current step and set active class to the first step on progressbar
  $("#progressbar li").removeClass("active");
  $("#progressbar li").first().addClass("active");

  //de-activate ActiveStep on currentStep and set active class to the firstStep
  $(currentStep).removeClass("activeStep");
  $(firstStep).addClass("activeStep");

  // show the first section
  $(firstStep).css({
    visibility: "visible",
  });

  // Reset All step to original size
  $(allSteps).css({ transform: "scale(" + 1 + ")" });

  //hide the current section with style
  currentStep.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of currentStep reduces to 0 - stored in "now"
        //1. scale previousStep from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take currentStep to the right(50%) - from 0%
        left = (1 - now) * 50 + "%";
        //3. increase opacity of previousStep to 1 as it moves in
        opacity = 1 - now;
        currentStep.css({ left: left });
        firstStep.css({
          transform: "scale(" + scale + ")",
          opacity: opacity,
        });
      },
      duration: 600,
      complete: function () {
        currentStep.css("visibility", "hidden");
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: "easeOutBack",
    }
  );
}

let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.attributeName === "class") {
      if ($(mutation.target).hasClass("activeStep")) {
        // CountDown Timer to reset Progress bar
        let timeToReset = 6;
        let downTimer = setInterval(function () {
          if (timeToReset <= 0) {
            clearInterval(downTimer);
            resetForm();
            returnToFirst();
          }
          document.getElementById("countProgressBar").value = 6 - timeToReset;
          document.querySelector("#timeRem p").innerHTML =
            timeToReset + " seconds to reset the form";
          timeToReset -= 1;
        }, 1000);
      }
    }
  });
  document.getElementById("countProgressBar").value = 0;
});
observer.observe(document.getElementById("hs-main-form").lastElementChild, {
  attributes: true,
});
