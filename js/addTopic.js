console.log('custom inti')

const topicNameInput = document.querySelector("#topicNameInput")
const topicDescriptionInput = document.querySelector("#topicDescriptionInput")
const topicImgInput = document.querySelector("#topicImgInput")

const onAddTopic = () => {
    firebase.database().ref(`topics`).push({
        name: topicNameInput.value,
        description: topicDescriptionInput.value,
        image: topicImgInput.value
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
