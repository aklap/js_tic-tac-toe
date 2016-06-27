document.addEventListener("DOMContentLoaded", function() { 

    var buttons = document.getElementsByClassName("button");

    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
            var mode = e.target.innerText;
            document.getElementById('board').style.visibility = "visible";
        });
    }
});