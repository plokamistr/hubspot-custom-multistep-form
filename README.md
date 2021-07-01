# hubspot-custom-multistep-form
This is an intention of a multi-step form using hubspot form API v3 and JS vanilla and Jquery

## INSTRUCTIONS
- Set class **ignore** to the fields that you want to validate but are not visible on first sight
- In any case modify the field order per needs
- Modify as wanted animation transitions

## TO IMPROVE
- Ability to move progress bar to the bottom
- Syntax
- Click to progress bar and return to step clicked
- Optimize HTML code

## INCLUDES
- Validation for @ to email field
- Validation 5 digits for zip code
- Validation for "space" character into fields
- Redirect or Inline message option in last step after final submission. 
  • Depends on the option chosen in hubspot form
  • Comment/Uncomment related section at multistep.js
- Previous Step button Option added (Comment/Uncomment related section at multistep.js + modify HTML  )
- Reset button Option added (Comment/Uncomment related section at multistep.js + modify HTML )
- Styling via SCSS
- Submissions start at the step where the email field is present
- Auto assign id to sections like "step-1, step-2 etc"
- IP is included by https://www.ipify.org/ API (needed for hubspot actions)
- Autocomplete of city and state field is done through the https://www.zippopotam.us/ API (98% accuracy)
