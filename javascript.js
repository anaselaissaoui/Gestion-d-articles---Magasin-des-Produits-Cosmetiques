const form = document.querySelector("form");
let tableSection=document.querySelector("#section2");
let ajout=document.getElementById("ajouter");
var nomInput = document.getElementById('nomInp');
var marqueInput = document.getElementById('marqueInp');
var prixInput = document.getElementById('prixInp');
var dateInput =document.getElementById('dateInp');
var typeInput = document.getElementById('typeInp');
var nomValid="";
var marqueValid="";
var prixValid="";
var dateValid="";
var typeValid="";
var promotionValid="";
var promoOuiNon;
var row_edit;
var Array= [];
        if (localStorage.product != null) {
            Array = JSON.parse(localStorage.product);
          }
          else{
              Array = [];
          }
        
class Article { 
    constructor(name, marque, prix, date, type, promo) {
        this.name = nomInput.value;
        this.marque = marqueInput.value;
        this.prix = prixInput.value;
        this.date = dateInput.value;;
        this.type = typeInput.value;
        this.promo = promoOuiNon;
  }
  details() {
    return (
      "Nom : " +
      this.name +
      "<br>" +
      "Marque :" +
      this.marque +
      "<br>" +
      " Prix : " +
      this.prix + "Dhs"+
      "<br>" +
      " Date :" +
      this.date +
      "<br>" +
      "Type :" +
      this.type +
      "<br>" +
      " Promotion :" +
      promoOuiNon
    )
  }
  
}

ajout.addEventListener("click", submit);

function submit(e){
    e.preventDefault();
    tableSection.style.display="flex";
    const checkRadio = document.querySelector('input[name="promotion"]:checked');
    

/* ---------------------------------nom section---------------------------------*/ 
    if(nomInput.value.length <=30 && nomInput.value.length>0){
        document.getElementById("nomMsg").innerHTML="";
        nomInput.style.border="2px solid green";
        nomValid=1;
    }else{
        nomInput.style.border="2px solid red";
        document.getElementById("nomMsg").innerHTML="&#9746;&nbsp Entrer un nom entre 1 et 30 vartres";
        nomValid=0;
    }

    /* ---------------------------------marque section---------------------------------*/ 

    if(marqueInput.value.length <=30 && marqueInput.value.length>0){
        document.getElementById("marqueMsg").innerHTML="";
        marqueInput.style.border="2px solid green";
        marqueValid=1;
    }else{
        marqueInput.style.border="2px solid red";
        document.getElementById("marqueMsg").innerHTML="&#9746;&nbsp Entrer un nom entre 1 et 30 vartres";
        marqueValid=0;
    }

/* ---------------------------------prix section---------------------------------*/ 
    let regex = /[0-9].*[0-9]$/;
        if(regex.test(prixInput.value)==false){
            document.getElementById("prixMsg").innerHTML="&#9746;&nbsp Entrer prix valide";
            prixValid=0;
        }else{
            document.getElementById("prixMsg").innerHTML="";
            prixInput.style.border="2px solid green";
            prixValid=1;    
        }

/* ---------------------------------date section---------------------------------*/ 
        if(dateInput.value==""){
            document.getElementById("dateMsg").innerHTML="&#9746;&nbsp vous devez choiser la date";
            dateValid=0;
        }else{
            document.getElementById("dateMsg").innerHTML="";
            dateValid=1;
        }
/* ---------------------------------type section---------------------------------*/ 
    if(productsListForm.type.selectedIndex==0){
        document.getElementById("selectMsg").innerHTML="&#9746;&nbsp vous devez selectionner 1 option";
        typeValid=0;
    }else{
        document.getElementById("selectMsg").innerHTML="";
        typeInput.style.border="2px solid green";
        typeValid=1;
    }

    /* ---------------------------------promotion section---------------------------------*/ 
    if(checkRadio !=null) {
        document.getElementById("promotionMsg").innerHTML="";
        promotionValid=1;
    }else{
        document.getElementById("promotionMsg").innerHTML="vous devez choiser 1 option";
        promotionValid=0;
    }

    /* ---------------------------------validation section---------------------------------*/ 
    if(nomValid==1 && marqueValid==1 && prixValid==1 && dateValid==1 &&typeValid==1 && promotionValid==1 ){
        document.getElementById("error").innerHTML="";
        
        
            if (document.getElementById("ouiOption").checked){
                promoOuiNon = "Oui";
            }else{ promoOuiNon="Non"}
        var nArticle = new Article ();
            Array.push(nArticle);
            sortedArray();
       
            localStorage.setItem('product', JSON.stringify(Array)); 
            document.getElementById("listDetails").innerHTML = nArticle.details();
           document.getElementById("details").style.display="flex";

            var modalOk = document.getElementById("confirmer");
        modalOk.onclick = ok;
        function ok() {
        document.getElementById("details").style.display = "none";
        
        }
        var  tbody = document.getElementById("tbody");
        tbody.innerHTML="";

        addToHtml();
       
}

    else{
        document.getElementById("error").innerHTML="You have invalid input(s)";
        
    }
}
function addToHtml(){
    for(let i = 0 ; i < Array.length ; i++){

        let line = document.createElement('tr');
        let collNom = document.createElement('td');
        let collMarque = document.createElement('td');
        let collPrix = document.createElement('td');
        let collDate = document.createElement('td');
        let collType = document.createElement('td');
        let collPromotion = document.createElement('td');
        let collModifier = document.createElement('td');
        let collSupprimer = document.createElement('td');
        let btnmodifier = document.createElement('button');
        let btnsupprimer = document.createElement('button');
        btnsupprimer.innerHTML = "Supprimer";
        btnmodifier.innerHTML = "Modifier";
        tbody.appendChild(line);
        
            
            line.appendChild(collNom);
            line.appendChild(collMarque);
            line.appendChild(collPrix);
            line.appendChild(collDate);
            line.appendChild(collType);
            line.appendChild(collPromotion);
            line.appendChild(collModifier);
            line.appendChild(collSupprimer);


            collModifier.appendChild(btnmodifier);
            collSupprimer.appendChild(btnsupprimer);
            
            collNom.innerHTML = Array[i].name;
              collMarque.innerHTML =Array[i].marque;
              collPrix.innerHTML = Array[i].prix;
              collDate.innerHTML = Array[i].date;
              collType.innerHTML = Array[i].type;
              collPromotion.innerHTML = Array[i].promo;
              

              btnsupprimer.onclick = supprimer;
              function supprimer() {
                document.getElementById("deletesec").style.display="flex";
                let supp = document.getElementById("supprimer");
                let ann = document.getElementById("annuler");
                supp.onclick = function() {
                document.getElementById("deletesec").style.display="none";
                Array.splice(Array[i],1);
                localStorage.setItem('product', JSON.stringify(Array)); 
                line.remove();
                  }
                ann.onclick = function() {
                    document.getElementById("deletesec").style.display="none";
          }
            }
            btnmodifier.onclick=edit;
            function edit(){
            nomInput.value=Array[i].name
            marqueInput.value=Array[i].marque
            prixInput.value= Array[i].prix
            dateInput.value = Array[i].date
            typeInput.value= Array[i].type
                if (Array[i].promo == "Oui"){
                    document.getElementById("ouiOption").checked=true
                }else{
                    document.getElementById("nonOption").checked=true
                }
                document.getElementById("ajouter").style.display="none";
            document.getElementById("modifier").style.display="block";
             row_edit=i;

                
            }
            
            document.getElementById("modifier").onclick = ModifierdeAjouterRow;
            function ModifierdeAjouterRow() {
                tbody.innerHTML = "";
            document.getElementById("ajouter").style.display="block";
            document.getElementById("modifier").style.display="none";
            console.log("he"+ i);
                Array[row_edit].name=nomInput.value;
                Array[row_edit].marque=marqueInput.value;
                Array[row_edit].prix=prixInput.value;
                Array[row_edit].date=dateInput.value; 
                Array[row_edit].type=typeInput.value;
                if (document.getElementById("ouiOption").checked){
                    Array[row_edit].promo = "Oui";
                }else{
                    Array[row_edit].promo = "Non";
                }
                 
            sortedArray();
            addToHtml();
            localStorage.setItem('product', JSON.stringify(Array));
            }
    
   
          
    }
}
function sortedArray(){
Array.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
}
addToHtml();
