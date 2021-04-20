class Produs
{
    constructor(nume, cantitate, pret)
    {
        this.nume_crypto = nume;
        this.cantitate = cantitate;
        this.pret = pret;
    }
    toString(){
        return `Nume: ${this.nume_crypto}  Cantitate: ${this.cantitate}   Pret: ${this.pret}`;
    }
}


function AdaugaProdus(){
    var nume = document.getElementById("nume_crypto").value;
    var cantitate = document.getElementById("cantitate").value;
    var pret = document.getElementById("pret").value;

    var temp_produs = new Produs(nume, cantitate, pret);

    localStorage.setItem(localStorage.length+1, temp_produs.toString())
}