console.log('custom inti')
let userG = {};

const topicNameInput = document.querySelector("#topicNameInput")
const topicDescriptionInput = document.querySelector("#topicDescriptionInput")
const topicImgInput = document.querySelector("#topicImgInput")

const onAddTopic = () => {
    const user = firebase.auth().currentUser;
    firebase.database().ref(`topics`).push({
        name: topicNameInput.value,
        description: topicDescriptionInput.value,
        image: topicImgInput.value,
        author: user.uid,
    })
        // 3. Clear the form so that we can write a new note
        .then(() => {
            topicNameInput.value = "";
            topicDescriptionInput.value = "";
            topicImgInput.value = "";
        });
}

function signOut() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
