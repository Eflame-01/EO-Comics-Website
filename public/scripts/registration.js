
/*
  registration.js is the javascript file that is responsible for handling the
  sign-up.html page for EO Comics.
*/

//================== ON READY FUNCTIONS =================//
$('select[name$="birthDay"]').ready(function(){
  addAllYears(1904);
});
$('select[name$="birthMonth"]').ready(function(){
  resetDays();
});

//================== ON CHANGE FUNCTIONS =================//
$('select[name$="birthMonth"]').change(function(){
  resetDays();
});

//================== ON CLICK FUNCTIONS =================//
$("#sign-up-button").click(function(){
  $.post("verify-registration", {
    firstName : $('input[name$="firstName"]').val(),
    lastName : $('input[name$="lastName"]').val(),
    birthMonth : $('select[name$="birthMonth"]').children("option:selected").val(),
    birthDay : $('select[name$="birthDay"]').children("option:selected").val(),
    birthYear : $('select[name$="birthYear"]').children("option:selected").val(),
    username : $('input[name$="username"]').val(),
    email : $('input[name$="email"]').val(),
    password : $('input[name$="password"]').val(),
    confirmPassword : $('input[name$="confirmPassword"]').val(),
    termsAndService : $('input[name$="termsAndService"]').is(":checked"),
  }, function(data, status){
    //data will be the list of errors gotten
    //status is the status of the post request
    if(data == null){
      //TODO: figure something out
      console.log("no data was given back...");
    }
    if(data[0] === "Error:"){
      //display errors
      clearErrors();
      displayErrors(data);
    }
    else{
      //send to home Page
      window.location.replace("index.html");
    }
  });
});

//=================== HELPER FUNCTIONS =================//
function resetDays(){
  //The months having 31 days in a year are January, March, May, July, August, October, and December.
  //30 days has September, April, June, and November.
  //February has 28 days
  switch($('select[name$="birthMonth"]').children("option:selected").val()){
    case "January":
    case "March":
    case "May":
    case "July":
    case "August":
    case "October":
    case "December":
      addAllDays(31);
      break;
    case "April":
    case "June":
    case "Spetember":
    case "November":
      addAllDays(30);
      break;
    case "February":
      addAllDays(29);
      break;
    default:
      addAllDays(30);
      break;
  }
}
function addAllDays(amount){
  var daySelector = $('select[name$="birthDay"]');

  daySelector.empty();
  daySelector.append($("<option value=''>Choose Day</option>"));
  for(var day = 1; day <= amount; day++){
    var option = $("<option value='" + day + "'></option>").text(day);
    daySelector.append(option);
  }
}
function addAllYears(limit){
  var yearSelector = $('select[name$="birthYear"]');

  yearSelector.empty();
  yearSelector.append($("<option value=''>Choose Year</option>"));
  for(var year = 2021; year >= limit; year--){
    var option = $("<option value='" + year + "'></option>").text(year);
    yearSelector.append(option);
  }
}
function clearErrors(){
  var errors = $("#error-messages");
  errors.empty();
}
function displayErrors(allErrors){

  var errors = $("#error-messages");
  var errorList = $("<ul></ul>");
  for(var i = 0; i < allErrors.length; i++){
    var errorMessage = $("<li></li>").text(allErrors[i]);
    errorList.append(errorMessage);
  }
  errors.append(errorList);
  console.log(errors.html());
}
