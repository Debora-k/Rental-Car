window.onload = function(){
    defaultDate();
};

function defaultDate() {
    var today = new Date();
    if (document.getElementById("displayDate1") != undefined) {
        document.getElementById("displayDate1").innerHTML = [today.getDate(), today.getMonth()+1, today.getFullYear()].join('/') +
             "  " + today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
    document.getElementById("displayDate2").innerHTML = [today.getDate(), today.getMonth()+1, today.getFullYear()].join('/') +
        "  " + today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}


