console.log('init')

const urlParams = new URLSearchParams(window.location.search);
const topicId = urlParams.get('topicId');
const moduleId = urlParams.get('moduleId');

const titleTag = document.querySelector("#topic-page-title")
const descriptionTag = document.querySelector("#topic-page-description")
const heroTag = document.querySelector("#topic-page-hero")
const moduleWrapper = document.querySelector("#topic-page-module-wrapper")

let moduleContents = []

function fetchData() {
    if (topicId && moduleId) {
        const topicsRef = firebase.database().ref(`topics/${topicId}/${moduleId}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();

            titleTag.innerHTML = data.name
            descriptionTag.innerHTML = data.description
            console.log(heroTag)
            heroTag.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${data.image}")`
            console.log(data.content);

            moduleContents = data.content;

            renderContent()
        });
    }
}

window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    fetchData()
});