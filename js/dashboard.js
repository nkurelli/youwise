window.onload = event => {
  // Firebase authentication goes here.
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Console log the user to confirm they are logged in
      console.log("Logged in as: " + user.displayName);
      document.querySelector("#nameStuff").innerHTML = user.displayName;
      document.querySelector("#namey").innerHTML = user.displayName;
      document.querySelector("#userDropdown").innerHTML+=`<img class="img-profile rounded-circle" src="${user.photoURL}">`;
      document.querySelector("#dash").innerHTML+=`<img class="img-radius" alt="User-Profile-Image" src="${user.photoURL}">`;
      document.querySelector("#email").innerHTML = user.email;
      document.querySelector("#emailV").innerHTML = user.providerId;
      getSavedTopics();
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
}; 
function signOut() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
