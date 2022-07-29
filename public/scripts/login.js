

//================== ON CLICK FUNCTIONS =================//
$("#sign-in-button").click(function(){
  $.post("sign-in", {
    email : $('input[name$="email"]').val(),
    password : $('input[name$="password"]').val()
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
