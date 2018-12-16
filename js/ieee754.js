'use strict';

function ieee754aBinario(numero) {
   //quitar comillas simples y dobles
   numero=quitarComas(numero);

   //comprobamos si es un numero positivo o negativo
   var primerBit=signo(numero);

   //quitar sigo negativo, en caso de que sea necesario
	numero= numero.replace(/[-]/g, "");
	//console.log("sin el signo negativo "+numero);

	//localizamos la parte decimal y la parte entera
	var arrayEnteroDecinal= numero.split(".");
	
	//Pasar a binario la parte entera
	var binarioParteEntera=deEnteroAbinario(arrayEnteroDecinal);
	//console.log("***Esto es el binario de la parte entera:::"+binarioParteEntera);

	//Pasar a binario la parte decimal
	if (!(typeof(arrayEnteroDecinal[1]) === "undefined")) {
    	var binarioParteDecimal=deDecimalAbinario(arrayEnteroDecinal[1]);
    	//console.log("***Esto es el binario de la parte decimal:::"+binarioParteDecimal);
	}else{
		var binarioParteDecimal="0";
	}

	//Normalizamos
	var exponenteMasPosicionComa=normalizar(binarioParteEntera+"."+binarioParteDecimal);
	
	//Calcular binario del exponente
	var binarioDeExponente=pasarExponenteAbinario(exponenteMasPosicionComa);
	//console.log("***esto es el binario del exponente::"+binarioDeExponente);
	//CALCULAR BINARIO DE MANTISA
	var mantisa=calculaMantisa(binarioParteEntera+binarioParteDecimal, exponenteMasPosicionComa[1]);
	
	var NumeroIeee754=primerBit+binarioDeExponente+mantisa;
   return NumeroIeee754;
}


function calculaMantisa(numeroBinario, posicionComa){
	//console.log("posicion de la coma:"+posicionComa+"--esto es el numeroBinario::"+numeroBinario);
	var mantisa= numeroBinario.substr(posicionComa,numeroBinario.length);
	//console.log("MANTISA::"+mantisa);
	while(mantisa.length<23){
		mantisa=mantisa+"0";
	}
	if(mantisa.length>23){
		mantisa=mantisa.substr(0,23);
	}
	//console.log("MANTISA FINAL::"+mantisa);
	return mantisa;
}

function pasarExponenteAbinario(exponente){
	var binarioDeExponente=deEnteroAbinario(exponente);
	//console.log("binario del exponente"+binarioDeExponente.length);
	while(binarioDeExponente.length<8){
		binarioDeExponente="0"+binarioDeExponente;
	}
	 return binarioDeExponente;
}

function normalizar(numeroBinario){
	//console.log("********************NORMALIZANDO********************");
	var primerUno=numeroBinario.indexOf("1");
	var coma=numeroBinario.indexOf(".");
	if(primerUno<coma){
		primerUno=primerUno+1;//Esta el la posicion de la coma final
	}
	//console.log("COMA es::"+coma);
	//console.log("Posicion de la coma---> "+primerUno);
	var posicionesMovidas=coma-primerUno;
	//console.log("Posiciones movidas---> "+posicionesMovidas);
	if(numeroBinario.indexOf("1")==-1){
		//console.log("estamos en exponente igual a 0...."+primerUno);
		var exponente=0;
	}else{
		var exponente= 127+posicionesMovidas;
	}
	
	
	var exponenteMasPosicionComa=[exponente, primerUno];

	return exponenteMasPosicionComa;
}

function deDecimalAbinario(numDecimal){
	//console.log("-----------BINARIO::"+numDecimal.toString(2));
	var numEntero="";
	while(!(typeof(numDecimal) === "undefined") && numEntero.length<35){
		numDecimal=0+"."+numDecimal;
		var resto= numDecimal*2;
		console.log("RESTO"+resto);
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