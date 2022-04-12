const textUm = () =>{
  const head = document.querySelector('titulo')
  head.textContent = ('LL Nutrições - Luan e Luis')
}
function test (peso, altura, nome) {
    var imCc
    var classific
    classific = 'info-class';
    peso = '.info-peso';
    altura = '.info-altura';
    imCc = (peso / altura * altura)
    imCc = '.info-imc';

    
}



function calculaImc(peso,altura,nome){



  //declarando validadores
  var pesoEhValido = true;
  var alturaEhValido = true;
  
    //valida idade, o peso e altura inputado pelo usuario
  if (nome.length<2){
    pesoEhValido = false;
    imc = "Preencha o campo nome com no minimo 2 letras";
    return imc;
  } else if ( (peso <= 5 || peso >= 500)&&(altura <= 1 || altura >= 2.99) ){
    pesoEhValido = false;
    imc = "Peso Inválido: " + peso + " :: Altura Invalida: " + altura ;
    return imc;
  } else if ( (peso <= 5 || peso >= 500)&&(altura <= 1 || altura >= 2.99) ){
    pesoEhValido = false;
    imc = "Peso Inválido: " + peso + " :: Altura Invalida: " + altura;
    return imc;
  } else if ( (peso <= 5 || peso >= 500) ){
    pesoEhValido = false;
    imc = "Peso Invalido: " + peso ;
    return imc;
  } else if ( (altura <= 1 || altura >= 2.99) ){
    pesoEhValido = false;
    imc = "Altura Invalida: " + altura ;
    return imc;
  } else if (peso <= 5 || peso >= 500){
    pesoEhValido = false;
    imc = "Peso Invalido: " + peso;

    return imc;
  } else if (altura <= 1 || altura >= 2.99){
    alturaEhValido = false;
    imc = "Altura Invalido: " + altura;

    return imc;
  }

  if(alturaEhValido && pesoEhValido){
    imc = peso / (altura * altura);
    return imc.toFixed(2);
  }


}


//funcao que classifica de acordo com valor do IMC


function classe (valorIMC){

	if (altura ==true){

	   if (valorIMC<18.5){
	       classificacao="Baixo peso";
	   }else if (valorIMC<=24.9){
	       classificacao="Peso normal";
	   }else if (valorIMC<=29.9){
	       classificacao="Sobrepeso";
	   }else if (valorIMC<=34.9){
	       classificacao="Obesidade 1";
	   }else if (valorIMC<=39.9){
	       classificacao="Obesidade 2";
	   }else{
	       classificacao="Obesidade 3";
	   }

   
	}else{
 
	   if (valorIMC<=22){
	       classificacao="Baixo peso";
	   }else if (valorIMC<27){
	       classificacao="Adequado";
	   }else{
	       classificacao="Sobrepeso";
	   }
 
 
	}
	return classificacao;
}





var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click",function(event){
  event.preventDefault();


  var form = document.querySelector("#form-adiciona");


  var paciente = obtemPacienteDoFormulario(form);


var mensagemErro = document.querySelector("#mensagem-erro");
   if (isNaN(paciente.imc)){
      mensagemErro.textContent = "Paciente invalido, nao sera incluido uma nova linha na tabela: " + paciente.imc;
      return;
   }else{
      mensagemErro.textContent = "";
   }
     

   adicionaPacienteNaTabela(paciente);

   // limpar os campos digitados do formulario
   form.reset();

}); // fim do botaoAdicionar

function adicionaPacienteNaTabela(paciente){

  var pacienteTr = montaTr(paciente);
 
  var tabela = document.querySelector("#tabela-pacientes");
  //usar o appendChild para colocar o TR dentro do tbody(tabela)
    tabela.appendChild(pacienteTr);

}
// tudo isso abaixo sao dados do paciente, o que representa algo no mundo real,
function obtemPacienteDoFormulario(form){

//objeto paciente(caracteristicas do paciente: nome, peso, altura, etc.)
    var paciente = {
      nome: form.nome.value,
      peso: form.peso.value,
      altura: form.altura.value,
      gordura: form.gordura.value,
      imc: calculaImc(form.peso.value, form.altura.value,form.nome.value),
      classificacao: classe(imc)
    }

    return paciente;

}

// definindo a funcao monta TR - melhoria na refatoracao e organiza�ao do codigo
function montaTr(paciente){
  //criar uma TR(linha da tabela), ja que eu quero uma nova linha da tabela
    var pacienteTr = document.createElement("tr");

  // adicionar a classe paciente a minha variavel pacienteTr
    pacienteTr.classList.add("paciente");

  
  //colocar um elemente filho dentro do elemento pai: appendChild
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    pacienteTr.appendChild(montaTd(paciente.classificacao, "info-class"));

    return pacienteTr;
}

function montaTd(dado,classe){
  var td = document.createElement("td");
  //colocar o dado digitado dentro da TD
  td.textContent =  dado;
  td.classList.add(classe);

  return td;
}

var titulo = document.querySelector(".titulo");
titulo.textContent = "Calculo IMC";

var pacientes = document.querySelectorAll(".paciente");

// looping utilizado porque existe mais de 1 paciente no formulario fixo do html
for(var i = 0; i < pacientes.length ; i++){

  var paciente = pacientes[i];

  var tdNome = paciente.querySelector(".info-nome");
  var tdPeso = paciente.querySelector(".info-peso");
  var tdAltura = paciente.querySelector(".info-altura");
  var nome = tdNome.textContent;
  
  var peso = tdPeso.textContent;
  var altura = tdAltura.textContent;

  var tdImc = paciente.querySelector(".info-imc");

  tdImc.textContent = calculaImc(peso,altura,nome);
  
  var tdClass = paciente.querySelector(".info-class");
                               
  tdClass.textContent = classe(imc);

// aplica o CSS para paciente invalido para as infos que ja estao no HTML
  if (isNaN(imc)){
    paciente.classList.add("paciente-invalido");
  }

}

// selecionar todos os pacientes que tem a classe pacientes

var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event){
  event.target.parentNode.classList.add("fadeOut");

  setTimeout(function(){
      event.target.parentNode.remove();
  },500);
});