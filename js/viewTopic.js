const titleTag = document.querySelector("#topic-page-title")
const descriptionTag = document.querySelector("#topic-page-description")
const heroTag = document.querySelector("#topic-page-hero")

function getContentFromHash() {
    console.log('its working')
    var theHash = window.location.hash;
    theHash = theHash.substring(1);
    if (theHash.length > 0) {
        const topicsRef = firebase.database().ref(`topics/${theHash}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            titleTag.innerHTML = data.name
            descriptionTag.innerHTML = data.description
            console.log(heroTag)
            heroTag.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${data.image}")`
        });
    }
}

window.addEventListener("hashchange", function () {
    console.log("hashchange event");
    getContentFromHash();
});

window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    getContentFromHash();
});