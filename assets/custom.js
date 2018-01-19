function makeTOC(){
    var h2s = document.getElementsByTagName("h2");
    var toc = document.getElementById("toc");

    for (var i = 0; i<h2s.length; i++){
        var h = h2s[i];
        var el = document.createElement("a");
        el.text = h.innerHTML;
        el.href = "#" + h.id;
        toc.appendChild(el);
        toc.appendChild(document.createElement("br"))
    }
}

document.addEventListener("DOMContentLoaded", makeTOC)
