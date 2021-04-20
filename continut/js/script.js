

function invat(){
    var myVar = setInterval(funcA,1000);
    var myVar2 = setTimeout(funcB,1000);
    var myVar3 = setTimeout(funcC,1000);
    var myVar4 = setTimeout(init,5000);
}

function funcA(){
    var d = new Date();
    document.getElementById("date").innerHTML = "<b>" + d + "</b>";
}


function funcB(){
    navigator.geolocation.getCurrentPosition(
    (pos) => {
        document.getElementById("loc").innerHTML = "<b>Lat:" + pos.coords.latitude  + "      Long:" +
        pos.coords.longitude + "</b>";
    }
    );
}

function funcC(){
    document.getElementById("brow").innerHTML = "<b>" + navigator.appName +"   " + navigator.appVersion + "</b>";
}

function funcD(){
    let c = 0;
    let x = [];

    for(j=0;j<8;j++){
        let y = (Math.trunc(Math.random()*256)).toString(16).toUpperCase();
        x.push(y);
        for(i=0;i<8;i++)
            if(document.getElementById(i.toString()).value == y)
                ++c;
    }

    document.getElementById("loto").innerHTML = "<b> Ați nimerit " + c + " numere! </b> <br><b> Numerele generate sunt: " + x + "</b>";
}


var rect = {};
var drag = false;
var ctx = null;
var imageObj = null;

function init() {
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
}

function mouseDown(e) {
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
}

function mouseUp() { drag = false; }

function mouseMove(e) {
    if (drag) {
        ctx.clearRect(0, 0, 800, 800);
        rect.w = (e.pageX - this.offsetLeft) - rect.startX;
        rect.h = (e.pageY - this.offsetTop) - rect.startY;
        ctx.strokeStyle = document.getElementById("c_contur").value;
        ctx.fillStyle = document.getElementById("c_umplere").value;
        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
        ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h)
    }
}

function schimbaContinut(resursa, jsFisier, jsFunctie){
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
         document.getElementById("continut").innerHTML = this.responseText;

         if (jsFisier) {
            var elementScript = document.createElement('script');
            elementScript.onload = function () {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            };
            elementScript.src = jsFisier;
            document.head.appendChild(elementScript);
        } else {
            if (jsFunctie) {
                window[jsFunctie]();
            }
        }

        }
    };
    xhttp.open("GET",resursa+".html");
    xhttp.send();
}


function verificare_utilizator(){
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj.length)
            for( let i=0; i<myObj.length; i++)
            {
                if(name == myObj[i].utilizator & password == myObj[i].parola)
                {    
                    document.getElementById("verificare").innerHTML = "Utilizatorul exista!";
                    return;
                }
            }
            document.getElementById("verificare").innerHTML = "Utilizatorul nu exista!";
                
        }
    
    };
    xhttp.open("GET","./resurse/utilizatori.json");
    xhttp.send();
}

