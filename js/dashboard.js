
let useriddd;

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
      getSavedTopics(user.uid);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
}; 

 
const getSavedTopics = userId => {
   console.log("Getsavednotes called" + userId)
 
   const notesRef3 = firebase.database().ref(`users/`);
   notesRef3.on("value", snapshot => {
       const data4 = snapshot.val();
       for (const noteItem in data4) {
           const note = data4[noteItem];
           console.log("note item" + note.name);
           if(document.querySelector("#nameStuff").innerHTML===note.name){
               useriddd = noteItem;
               console.log("user found: " + useriddd);
               console.log("name found: " + note.name)
           }
       }
       console.log("hello");
   const notesRef = firebase.database().ref(`users/${useriddd}/savedTopics`);
   console.log("hello" + useriddd);
  
   notesRef.on("value", snapshot => {
       const data = snapshot.val();
       databob = data;
       console.log("notesref for topics called");
       renderDataAsHtml(data);
   });
   });
  
};
 
const renderDataAsHtml = data => {
 let cards = "";
 for (const noteItem in data) {
   const note = data[noteItem];
   cards += createCard(noteItem, note);
 }
 document.querySelector("#savedTopics").innerHTML = cards;
};
const createCard = (noteId, note) => {
 return `
       
           <div class="col-xl-3 col-md-6 mb-4">
                           <div class="card border-left-primary shadow h-100 py-2">
                               <div class="card-body">
                                   <div class="row no-gutters align-items-center">
                                       <div class="col mr-2">
                                           <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               ${note.name}</div>
                                           <p> ${note.description} </p>   
                                       </div>
                                       <div class="col-auto">
                                           <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
            `;
};
 

