function displayHash() {
    var theHash = window.location.hash;
    theHash = theHash.substring(1); 
    if (theHash.length > 0) {
        const topicsRef = firebase.database().ref(`topics/${theHash}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            var elems = document.querySelectorAll("#caption");
            elems[0].innerText = "Current Hash: " + JSON.stringify(data);
        });
    }
}

window.addEventListener("hashchange", function () {
    console.log("hashchange event");
    displayHash();
});

window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    displayHash();
});