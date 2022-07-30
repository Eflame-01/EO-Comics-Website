
/*
  member.js is the file that verifies if the user is logged in or needs to
  login/sign up
*/

//================= GLOBAL VARIABLES ===========================//
var data = localStorage.getItem("memberData"); //global variable that has user's login and some subscription data

//================= ON READY FUNCTIONS =========================//
$(document.body).ready(function(){
  if(data != null || data != undefined){
    //parse data
    data = JSON.parse(data);

    //hide sign-in/sign-up features
    $("#sign-up-login-information").attr("hidden", "true");

    //show welcome [username] text and settings dropdown
    $("#member-information").removeAttr("hidden");
    $('p[name$="welcome-user-sign"]').text("Welcome " + data.merge_fields.USERNAME);
  }
  else{
    //show sign in/sign up features
    $("#sign-up-login-information").removeAttr("hidden");

    //hide welcome [username] text and settings dropdown
    $("#member-information").attr("hidden", "true");
  }
});

//================ ON CLICK FUNCTIONS ==========================//
$("a[name$=logoff-link]").click(function(){
  localStorage.removeItem("memberData");
  window.location.replace("index.html"); //TODO: Try to refresh page if it gives same result
});
