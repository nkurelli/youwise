const titleTag = document.querySelector("#topic-page-title")
const descriptionTag = document.querySelector("#topic-page-description")
const heroTag = document.querySelector("#topic-page-hero")
const moduleWrapper = document.querySelector("#topic-page-module-wrapper")


const urlParams = new URLSearchParams(window.location.search);
const topicId = urlParams.get('topicId');

function fetchDataFromTopicID() {
    if (topicId) {
        const topicsRef = firebase.database().ref(`topics/${topicId}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            titleTag.innerHTML = data.name
            descriptionTag.innerHTML = data.description
            console.log(heroTag)
            heroTag.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${data.image}")`

            renderModules(data.modules)
            
        });
    }
}

const renderModules = (data) => {


    for (key in data) {

        

 

        const module = data[key];
        let contentWrapper = ""

        module.content.forEach(content => {
            contentWrapper += `
                  <li class="list-group-item d-flex justify-content-between align-items-center">
    ${content.name}
    <span class="badge badge-primary badge-pill" id="timePill">${content.time} mins</span>
  </li>
                `
        });

        moduleWrapper.innerHTML += `
                <div class="col">
                    <a class="card shadow mb-6" href="viewModule.html?topicId=${topicId}&moduleId=${key}">
            <img class= card-img-top src=${module.image}>
                    <div class="card-header py-3">
                <h5 class="m-0 font-weight-bold text-primary" id="moduleName">${module.name}</h6>
                <h6 class="card-text" style="text-align:left;">${module.description}</h6>
                               <ul class="list-group">
            ${contentWrapper}
            </ul>
            </div>
  

        </div>

                </div>
            `

    }

}

window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    fetchDataFromTopicID()
});