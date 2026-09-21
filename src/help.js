import '../help.css'

const backButton = document.getElementById("backbutton");

const params = new URLSearchParams(window.location.search);
const returnPage = params.get("return");

backButton.addEventListener("click", () => {

    if (returnPage) {
        window.location.href = `./${returnPage}`;
    } else {
        window.location.href = "./index.html";
    }

});