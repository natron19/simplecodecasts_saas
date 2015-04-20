$(document).ready(function() {
  //set stripe key, get permission to work with stripe 
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content')); 
  //watch for a form submission: 
  $("#form-submit-btn").click(function(event) {
    event.preventDefault(); 
    //disable button so it can't be clicked twice 
    $('input[type=submit]').prop('disabled', true); 
    var error = false; 
    //grab values and store in variables 
    var ccNum = $('#card_number').val(), 
        cvcNum = $('#card_code').val(), 
        expMonth = $('#card_month').val(), 
        expYear = $('#card_year').val(); 
    //if no errors, send values off to stripe 
    if (!error) {
      //get the Stripe token: 
      Stripe.createToken({
        number: ccNum, 
        cvc: cvcNum, 
        exp_month: expMonth, 
        exp_year: expYear 
        //run the function defined below to grab the response token
      }, stripeResponseHandler); 
    }
    return false; 
  }); //form submission 

  //stripe sends back status and response 
  function stripeResponseHandler(status, response) {
    //get a reference to the form: 
    var f = $("#new_user"); 

    //get the toekn from the response: 
    var token = response.id; 

    //add the token to the form in a hidden field: 
    f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />'); 

    //submit the form 
    f.get(0).submit(); 
  }
}); 