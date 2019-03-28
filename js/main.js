var titulo = document.querySelector(".container");
// console.log('te perder:', titulo);
var title = "testes";
window['main'] = this;
isValid = false;


function calculoImc() {

    var imc = peso / (altura * altura);

}

function carregaDashboard() {
    var arrayCategoria = [ 'Nome', 'Peso(kg)', 'Altura(m)', 'Gordura Corporal(%)', 'IMC' ];

    var trCategory = document.querySelector('.categoria');
    var colunas;

    arrayCategoria.forEach((item) => {
        colunas = document.createElement('th');
        colunas.textContent = item;
        trCategory.appendChild(colunas);
    });

}

function loadColumns() {
    
    loadJSON( (response) => {
       var patients = JSON.parse(response);
       
       var tbodyPaciente = document.querySelector('.patients-table');
       var nomes;
   
       patients.forEach((item) => {
           let tr = `
               <tr>
               <td>${item.nome}</td>
               <td>${item.peso}</td>
               <td>${item.altura}</td>
               <td>${item.gordura}</td>
               <td>${item.imc}</td>
               </tr>`;    
   
           nomes = document.createElement('myElem');
           tbodyPaciente.appendChild(nomes);
           document.querySelector('myElem').outerHTML = tr;
       });
    });
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './json/pacientes.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function openModalAdd() {
    
    var modal = document.getElementById('modal-add');

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    
    span.onclick = function() { modal.style.display = "none"; }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

 }

 function submitForm1(event) {
    var form = document.getElementById('form-add');
    event.preventDefault();

    var objeto = [
        {
            nome: form.nome.value,
            peso: form.peso.value,
            altura: form.altura.value,
            gordura: form.gordura.value
        }
    ];

    this.addColumn(objeto);

 }

 function addColumn(patients) {
    var tbodyPaciente = document.querySelector('.patients-table');
    var form = document.getElementById('form-add');
    var nomes;

    var isValid = this.validateFields(form);
    
    if(isValid) {
        patients.forEach((item) => {
    
            var imc = item.peso / (item.altura * item.altura);
            let tr = `
                <tr>
                <td>${item.nome}</td>
                <td>${item.peso}</td>
                <td>${item.altura}</td>
                <td>${item.gordura}</td>
                <td>${imc.toFixed(2)}</td>
                </tr>`;    
    
            nomes = document.createElement('elemento');
            tbodyPaciente.appendChild(nomes);
            document.querySelector('elemento').outerHTML = tr;
        });
    }

    var modal = document.getElementById('modal-add');

    // modal.style.display = "none";

}

function validateFields(form) {

    var item_div = form.querySelectorAll('div');
    var p = form.querySelectorAll('p');
    console.log('item: ', p);

    if(p.length != 0){
        p.forEach((item) => {
            item.outerHTML = '';
        });
    }

    form.querySelectorAll('input').forEach( (item,index) => {

        if(!item.value.length){
            let newElement = `<p>Campo Obrigatório!</p>`;
            var elemento = document.getElementById(item_div[index].id);
            messageError = document.createElement('newElement');
            elemento.appendChild(messageError);
            document.querySelector('newElement').outerHTML = newElement;
        }
    });

    retorno = form.querySelectorAll('p');

    return retorno.length == 0;

}
