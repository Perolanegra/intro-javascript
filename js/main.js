var _this = document;
window['main'] = this;
this.carregaDashboard();
this.loadColumns();
var isValidForm = false;

function carregaDashboard() {
    var arrayCategoria = [ 'Nome', 'Peso(kg)', 'Altura(m)', 'Gordura Corporal(%)', 'IMC' ];

    var trCategory = _this.querySelector('.categoria');
    var colunas;

    arrayCategoria.forEach((item) => {
        colunas = _this.createElement('th');
        colunas.textContent = item;
        trCategory.appendChild(colunas);
    });

}

function loadColumns() {
    
    loadJSON( (response) => {
       var patients = JSON.parse(response);
       
       var tbodyPaciente = _this.querySelector('.patients-table');
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
   
           nomes = _this.createElement('myElem');
           tbodyPaciente.appendChild(nomes);
           _this.querySelector('myElem').outerHTML = tr;
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
    
    var modal = _this.getElementById('modal-add');
    var arrayNomes = [];
    var span = _this.getElementsByClassName("close")[0];
    
    var form = _this.getElementById('form-add');
    var inputs = form.querySelectorAll('input');
    console.log('inputs: ', inputs);
    modal.style.display = "block";
    
    span.onclick = function() { 
        modal.style.display = "none";
        
        inputs.forEach((item, index) => {
            item.value = '';
            arrayNomes.push('form-' + item.name);
            var div = _this.getElementById(arrayNomes[index]);
            var p = div.querySelector('p');
            if(p)
                p.outerHTML = '';
        });
        
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            inputs.forEach((item, index) => {
                item.value = '';
                arrayNomes.push('form-' + item.name);
                var div = _this.getElementById(arrayNomes[index]);
                var p = div.querySelector('p');
                if(p)
                    p.outerHTML = '';
                });
        }
    }
    

 }

 function submitForm1(event) {
    var form = _this.getElementById('form-add');
    event.preventDefault();

    var objeto = [
        {
            nome: form.nome.value,
            peso: form.peso.value,
            altura: form.altura.value,
            gordura: form.gordura.value
        }
    ];

    this.isValidForm = this.validateFields(form);

    if(this.isValidForm) {
        this.addColumn(objeto);
    }
 }

 function addColumn(patients) {
    var tbodyPaciente = _this.querySelector('.patients-table');
    var nomes;

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
    
            nomes = _this.createElement('elemento');
            tbodyPaciente.appendChild(nomes);
            _this.querySelector('elemento').outerHTML = tr;
        });

    var modal = _this.getElementById('modal-add');
    console.log('modal: ', modal);
    modal.style.display = "none";

}

function validateFields(form) {

    var item_div = form.querySelectorAll('div');
    var p = form.querySelectorAll('p');
    

    if(p.length != 0){ // significa que existem inputs inválidos
        console.log('item: ', p);
        p.forEach((item) => {
            item.outerHTML = '';
        });
    }

    form.querySelectorAll('input').forEach( (item,index) => {

        if(!item.value.length){
            let newElement = `<p>Campo Obrigatório!</p>`;
            var elemento = _this.getElementById(item_div[index].id);
            messageError = _this.createElement('newElement');
            elemento.appendChild(messageError);
            _this.querySelector('newElement').outerHTML = newElement;
        }
    });

    retorno = form.querySelectorAll('p');

    return retorno.length == 0;

}
