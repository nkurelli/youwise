const handleNoteSubmit = () => {
  // 1. Capture the form data
  const courseTopic = document.querySelector("#courseTopic");
  const courseModule = document.querySelector("#courseModule");
  const courseType = document.querySelector("#courseType");
  const courseDescription = document.querySelector("#courseDescription");
  const courseLink = document.querySelector("#courseLink");
  // 2. Format the data and write it to our database
  firebase
    .database()
    .ref(`users/${googleUser.uid}/${courseTopic.value}`)
    .push({

      module: courseModule.value,
      type: courseType.value,
      description: noteCreated,
      link: googleUser.photoURL,
    })
    // 3. Clear the form so that we can write a new note
    .then(() => {
      noteTitle.value = "";
      noteText.value = "";
      label.value = "";
      document.getElementById("labellist").innerHTML = "";
      labelArray = [];
    });
};
