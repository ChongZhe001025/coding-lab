var file = "index.html"; // 選擇語言
var ColorMode = ""; // 利用網址紀錄顏色

$(document).ready(function() {
    if (document.URL.indexOf('?dark') != -1){
        selColorMode(2);
        ColorMode = "?dark";
    }
})

function reload() {
    window.location.href = file + ColorMode;
}

function changeContent(index) {
    $("#content").attr("src", "img/img0" + index + ".jpg");
}

function selColorMode(index) {
    if (index == 1){
        $("#css").attr("href", "index.css");
        $("#github").attr("src", "img/github.png");
        ColorMode = "";
    }
    else if (index == 2){
        $("#css").attr("href", "indexDR.css");
        $("#github").attr("src", "img/githubDR.png");
        ColorMode = "?dark";
    }
}

function selLanguage(index) {
    if (index == 1) document.location.href = "index.html" + ColorMode;
    else if (index == 2) document.location.href = "indexEN.html" + ColorMode;
}

function popupWindow() {
    $("#overlay").show();
    $("#overlay").css("height", (document.body.scrollHeight + "px")); // scrollHeight 為網頁全高
    $("#popupWindow").fadeIn(280);
    $("#popupWindow").css("height", "100%");
    $("#popupWindow").css("top", document.body.scrollTop + "px"); // scrollTop 為可視範圍的高度(相較於原點)
    $("body").css("overflow", "hidden");
}

function closeWindow() {
    $("#overlay").hide();
    $("#popupWindow").hide();
    $("body").css("overflow", "auto");
}
