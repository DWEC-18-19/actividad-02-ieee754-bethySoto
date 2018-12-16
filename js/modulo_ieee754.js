"use strict";


function ieee754aBinario(numero) {
   //quitar comillas simples y dobles
   numero=quitarComas(numero);

   //comprobamos si es un numero positivo o negativo
   var primerBit=signo(numero);

   //quitar sigo negativo, en caso de que sea necesario
	numero= numero.replace(/[-]/g, "");
	

	//localizamos la parte decimal y la parte entera
	var arrayEnteroDecinal= numero.split(".");
	
	//Pasar a binario la parte entera
	var binarioParteEntera=deEnteroAbinario(arrayEnteroDecinal);
	

	//Pasar a binario la parte decimal
	if (!(typeof(arrayEnteroDecinal[1]) === "undefined")) {
    	var binarioParteDecimal=deDecimalAbinario(arrayEnteroDecinal[1]);
    	
	}else{
		var binarioParteDecimal="0";
	}

	//Normalizamos
	var exponenteMasPosicionComa=normalizar(binarioParteEntera+"."+binarioParteDecimal);
	
	//Calcular binario del exponente
	var binarioDeExponente=pasarExponenteAbinario(exponenteMasPosicionComa);
	
	//CALCULAR BINARIO DE MANTISA
	var mantisa=calculaMantisa(binarioParteEntera+binarioParteDecimal, exponenteMasPosicionComa[1]);
	
	var NumeroIeee754=primerBit+binarioDeExponente+mantisa;
	
   return NumeroIeee754;
}


function calculaMantisa(numeroBinario, posicionComa){
	var mantisa= numeroBinario.substr(posicionComa,numeroBinario.length);
	while(mantisa.length<23){
		mantisa=mantisa+"0";
	}
	if(mantisa.length>23){
		mantisa=mantisa.substr(0,23);
	}
	return mantisa;
}

function pasarExponenteAbinario(exponente){
	var binarioDeExponente=deEnteroAbinario(exponente);
	while(binarioDeExponente.length<8){
		binarioDeExponente="0"+binarioDeExponente;
	}
	 return binarioDeExponente;
}

function normalizar(numeroBinario){
	var primerUno=numeroBinario.indexOf("1");
	var coma=numeroBinario.indexOf(".");
	if(primerUno<coma){
		primerUno=primerUno+1;//Esta el la posicion de la coma final
	}
	var posicionesMovidas=coma-primerUno;
	if(numeroBinario.indexOf("1")==-1){
		var exponente=0;
	}else{
		var exponente= 127+posicionesMovidas;
	}
	var exponenteMasPosicionComa=[exponente, primerUno];
	return exponenteMasPosicionComa;
}

function deDecimalAbinario(numDecimal){
	
	var numEntero="";
	while(!(typeof(numDecimal) === "undefined") && numEntero.length<35){
		numDecimal=0+"."+numDecimal;
		var resto= numDecimal*2;
		resto=""+resto;
		var arrayEnteroDecinal= resto.split(".");
		numEntero=numEntero+""+arrayEnteroDecinal[0];
		numDecimal=arrayEnteroDecinal[1];
	}
	return numEntero;
}

function deEnteroAbinario(arrayEnteroDecinal){
	var numeroEntero= arrayEnteroDecinal[0];
	var numeroIEEE="";
	while(numeroEntero>=2){
		var resto=numeroEntero%2;
		numeroEntero=Math.floor(numeroEntero/2);
		numeroIEEE=numeroIEEE+""+resto;
	}
	numeroIEEE=numeroIEEE+numeroEntero;
	return invertirCadena(numeroIEEE);
}

function invertirCadena(numeroIEEE){
	var x = numeroIEEE.length;
	var numeroIEEEFinal = "";
	while (x>=0) {
		numeroIEEEFinal = numeroIEEEFinal + numeroIEEE.charAt(x);
		x--;
	}
	return numeroIEEEFinal;
}

function quitarComas(numero){
	numero=numero.toString();
	numero=numero.replace(/["']/g, "");
	return numero;
}

function signo(numero) {
	var primerBit=0;
	if(!numero.indexOf("-")){
		primerBit=1;
	}
	return primerBit;
}

function enteroDecimal(numero){
	arrayEnteroDecinal= numero.split(".");
	return arrayEnteroDecinal;
}

module.exports = {  
  ieee754aBinario
};