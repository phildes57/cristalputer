/*ea_import:WvEmbed*/
<<<<<<< HEAD
=======
//_________________________
WvEmbedEvent.ERROR_TYPE_DISPLAY		= 0;
WvEmbedEvent.ERROR_TABVAL_NOT_TAB	= 1;
WvEmbedEvent.ERROR_TABVAL_NOT_3		= 2;
WvEmbedEvent.ERROR_TABVAL0_NOT_TAB	= 3;
WvEmbedEvent.ERROR_TABVAL1_NOT_START= 4;
WvEmbedEvent.ERROR_VAL_CASE			= 5;
WvEmbedEvent.ERROR_VAL_CASE_MAX		= 6;
WvEmbedEvent.ERROR_CASE_MAX			= 7;
WvEmbedEvent.ERROR_SCRIPT_ERROR		= 8;

WvEmbedEvent.MESSAGES=[
	"displayType(message) * Type d'affichage des valeurs erroné. message=/%1/\n   attendu 0=décimal,1=héxa et 2=interrupteurs",
	"tabVal2Ram(message) * message doit être un tableau : %1\n format : [[val0,val1,val2...], début, fin]",
	"tabVal2Ram(message) * le tableau-message daoit compoter 2 cases : %1\n format : [[val0,val1,val2...], début]",
	"tabVal2Ram(message) * la case #0 de message doit être un tableau : %1\n format : [[val0,val1,val2...], début]",
	"tabVal2Ram(message) * la case #1 indique le début de la zone à poser : %1\n format : [[val0,val1,val2...], début]",
	"%1(message) * message doit être un tableau à 2 case : %2\n format : [valeur, numCase]",
	"%1(message) * 'val' et 'octetNum' sont des entiers compris dans [0,%4]: val=%2, octetNum=%3\n format : [valeur, numCase]",
	"%1(message) * 'numOctet' doit être un nombre compris dans [0,%3] : %2\n format : numCase",
	"%1(message) * 'script' inscrit dans la zone de sasie script, devrait etre un texte :\n /%2/",
];
/**
 * Rafraichit les méémoires. 
 * Aucun parammètre
 */
WvEmbedEvent.refreshDisplay=function(messageP, returnP){AsmEditor.refreshDisplay();return true;};
WvEmbedEvent.DISPLAY_TYPE = {n:0,d:0,e:0,h:1,i:2,b:2};
/**
 * Modife le type d'affichage : 
 * Paramètre / String : 
 * - message/type : 0=décimal,1=héxa et 2=interrupteurs
 */
WvEmbedEvent.displayType=function(messageP, returnP){
	if(messageP===null || messageP===undefined) {
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_TYPE_DISPLAY], "<inconnu>");		
	}
	let n = parseInt(messageP);
	if(!isNaN(n)){
		if (n<0 || n>2){n=-1;}
	}else{
		n=-1;
		if(messageP.length && messageP.length>0){ 
			n = WvEmbedEvent.DISPLAY_TYPE[messageP.substring(0,1).toLowerCase()];
			if(n==null || n==undefined) n=-1;
		}
	}
	if(n<0){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_TYPE_DISPLAY], messageP);
	}
	AsmEditor.displayType(n);
	return true;
};
/**
 * Avance l'exécution du programme d'une instruction
 * Aucun paramètre
 */
WvEmbedEvent.exe1step=function(messageP, returnP){AsmEditor.exe1step();return true;};
/**
 * Exécute le programme pas-à-pas
 * Aucun paramètre
 */
WvEmbedEvent.exeStepByStepStop=function(messageP, returnP){AsmEditor.exeStepByStepStop();return true;};
/**
 * Exécute le programme jusqu'au point d'arrêt
 * Aucun paramètre
 */
WvEmbedEvent.exe=function(messageP, returnP){AsmEditor.exe();return true;};
/**
 * Remplit une zone de la RAM
 * Paramètres :
 * - messageP / tableau = [[mems], start]
 *		- mems : suite de nombres à placer dans la mémoire
 * 		- position de départ de la pause 
 */
WvEmbedEvent.tabVal2Ram=function(messageP, returnP, numType){
	if(!Array.isArray(messageP)){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_TABVAL_NOT_TAB], messageP);		
	}
	if(messageP.length!=2){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_TABVAL_NOT_3], messageP);				
	}
	let tab = messageP[0];
	if(!Array.isArray(tab)){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_TABVAL0_NOT_TAB], tab); 				
	}
	let start = parseInt(messageP[1]);	
	if(isNaN(start) || start<0 || start>255){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_TABVAL1_NOT_START], start);				
		
	}
	AsmDatas.tabVal2Ram( tabOrgP , startP);
	return true;
}
/**
 * Ecrit une valeur dans une mémoire de la RAM.
 * pramètre / tableau : [valeur 0 à 255, numOctet 0 à 255]
 */
WvEmbedEvent.ramSet=function(messageP, returnP){
	if(!Array.isArray(messageP) || messageP.length!=2){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_VAL_CASE], "ramPutValue", messageP); 		
	}
	let val = parseInt(messageP[0]);	
	let octetNum = parseInt(messageP[1]);	
	if(isNaN(val) || val<0 || val>255 || isNaN(octetNum) || octetNum<0 || octetNum>255){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_VAL_CASE_MAX], "ramPutValue", val, octetNum,255);
	}
	AsmDatas.ramPutValue( val , octetNum);
	return true;
}
/**
 * Ecrit une valeur dans un registre.
 * pramètre / tableau : [valeur, numRegistre 0à7]
 */
WvEmbedEvent.regSet=function(messageP, returnP){
	if(!Array.isArray(messageP) || messageP.length!=2){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_VAL_CASE], "regPutValue", messageP); 		
	}
	let val = parseInt(messageP[0]);	
	let octetNum = parseInt(messageP[1]);	
	if(isNaN(val) || val<0 || val>255 || isNaN(octetNum) || octetNum<0 || octetNum>7){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_VAL_CASE_MAX], "regPutValue", val, octetNum,7);
	}
	AsmDatas.regPutValue( val , octetNum);
	return true;
}
/**
 * Lit la valeur d'une mémoire de la RAM
 * Paramètre / String
 * - int octetNum : numéro d'octet à lire
 */
WvEmbedEvent.ramGetValue=function(messageP, returnP){
	let octetNum = parseInt(messageP);	
	if(isNaN(octetNum) || octetNum<0 || octetNum>255){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_CASE_MAX], "ramGetValue", octetNum,255);
	}
	return AsmDatas.ramGetValue(octetNum);
}
/**
 * Lit la valeur d(un registre
 * Paramètre / String
 * - int regNum : numéro d'octet à lire
 */
WvEmbedEvent.regGetValue=function(messageP, returnP){
	let octetNum = parseInt(messageP);	
	if(isNaN(octetNum) || octetNum<0 || octetNum>7){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_CASE_MAX], "regGetValue", octetNum,7);
	}
	return AsmDatas.regGetValue(octetNum);
}
/**
 * Lit le programme inscrit dans la zone script 
 * Aucun paramètre
 */
WvEmbedEvent.scriptRead=function(){
	return AsmEditor.scriptRead();
}
/**
 * Ecrit un programme dans la zone script 
 * Paramètre / string
 * - Texte à écrire dans la zone script
 */
WvEmbedEvent.scriptWrite=function(scriptP, returnP){
	if(typeof scriptP !== 'string'){
		WvEmbedEvent.error(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_SCRIPT_ERROR], "scriptWrite", scriptP);		
	}
	return AsmEditor.scriptWrite(scriptP);
}
/**
 * Compile le programme inscrit dans la zone script 
 * Paramètre / string
 * - Texte à écrire dans la zone script
 */
WvEmbedEvent.scriptCompiler=function(messageP, returnP){
	if(typeof scriptP === 'string'){
		return AsmEditor.scriptCompiler( scriptP );
	}
	return AsmEditor.scriptCompiler();
}
>>>>>>> dc1731d19647b380a6b1f43ea1a8004120d97022
//-------------------------------

/********************************************************************************************************************* 
 * §1 - AsmEditor : INTERFACE UTILISATEUR
 * A - Rôle
 *	- Reçoit les commandes de la page html
 *  - Redessine les pièces (composants)
 * Important : la mise à jour des composant s'effectue à chaque écriture de mémoire ou de registre
 * 		sauf si le drapeau "AsmEditor.flagDisplay" est à false.
 * 		Le cristalputer est rafraîchi losrque le drapeaau est remis à true
 *		-> voir : AsmEditor.setFlagDisplay(valueP)
 *
 * B - les pieces de l'éditeurs sont :
 * - la saisie de script ASM	w_asm_area
 *		- zone d'écriture		w_script_area
 *			- zone marge		w_input
 *				- piece input	w_text_input
 *					- saisie	value				AsmEditor.input	: valeur = AsmEditor.input.value;	
 *		- onglet				w_asm_onglet		onclic=function(){this.play()} ouvrir et refermer la fauilled e script
 * - cadre console 				w_console_area
 *		- objet saisie console	w_text_input		
 *			- saisie console	value 				AsmEditor.console	AsmEditor.consoleDisplayRam(numOctet) ram->console
 * - le cadre processeur		w_processor
 *		- registres				w_reg				AsmEditor.pieceProcessor
 * 			- saisie d'un REGISTRE	w_reg_input		AsmEditor.regInput
 *				- bouton de fermeture	w_bt_reg_input_close 
 *				- input					value		accès au texte : AsmEditor.regInputGetvalue() / ...SetValue(val)
 *			- zones actives			w_clics
 *				- chaque zone active	w_mem_clic0..6	AsmEditor.regDisplayValue(valP, octetNumP)
 *			- chaque registre		w_reg0..6
 *				- 3 pages							[w_deci, w_hexa, w_hex/w_h0] traité daans AsmEditor.displayType(numType);
 * - cadre RAM					w_ram_area			AsmEditor.ramArea
 * 		- saisie d'un octet  	w_ram_input			AsmEditor.ramInput
 *			- bouton de fermeture	w_bt_ram_input_close 
 *			- input					value			accès au texte : AsmEditor.ramInputGetValue()
 *			- zone de la saisie		textarea
 *		- numéro de l'octet surolé	w_ram_num		AsmEditor.ramNum
 *			- accès au texte						AsmEditor.ramNum._text
 *		- 0stops (breaks)			w_breaks		AsmEditor.breaks
			- chaque stop				w_break0..255	AsmEditor.breakPointDisplay(numMem) : positionner les breaks
 *		- pointeur de programme		w_mempp			AsmEditor.memPP
 *		- zones actives 			w_clics				
 *			- chaque zones actives 		w_clics0..255 	appelle : AsmEditor.memClic() et AsmEditor.ramOver() 
 *		- lmémoires					w_mems			AsmEditor.pieceRams	
 *			chaque octet				w_octet0..256	AsmEditor.ramDisplayValue(val, num_octet) : écrit dans l'octet num_octet
*				- 3 pages							[w_deci, w_hexa, w_hex/w_h0] traité daans AsmEditor.displayType(numType);
 *		- le titre					w_ram_title
 *		- la barre titre			w_ram_title_bar
 * - le script de l'octet en cours d'exécution w_scripttext
 * - affichage du numéro d'octet survolé
 * - w_<boutons>
 * - w_vitrine 
 *********************************************************************************************************************/
 /*ea_import WvEmbed*/
function AsmEditor(){}
AsmEditor.reponse1=function(message){console.log("reponse1:"+message);};
AsmEditor.reponse2=function(message){console.log("reponse2:"+message);};
AsmEditor.testEmbedContainer=function(){
	window.wvEmbedRequest.post("Hello word 1","onEmbed1",AsmEditor.reponse1);
	window.wvEmbedRequest.post("Hello word 2","onEmbed2",AsmEditor.reponse2);
};
AsmEditor.TYPE_DECI = 0;
AsmEditor.TYPE_HEXA = 1;
AsmEditor.TYPE_BIN  = 2;
AsmEditor.flagDisplay = true;								// Autorise ou nom les modifications à l'écran

/**
 * Initialisation 
 * @references
 *    HTML : div id='w_area_mems' action déclenchée automatiquement
 */
AsmEditor.init=function(){
	AsmEditor.ramInstr.w_txt_instr._text = "";
	AsmEditor.flagDisplay=false;							// Interdit l'affichage pendant l'initialisation
															//----------------------------------------
	let octet0= AsmEditor.pieceRams.w_octet0;				// Calcule des positions pour certains éléments mobiles
	AsmEditor.octetLg = AsmEditor.pieceRams.w_octet1._x  - octet0._x;
	AsmEditor.octetHt = AsmEditor.pieceRams.w_octet16._y - octet0._y;
	AsmEditor.ramPPx  = AsmEditor.memPP._x;
	AsmEditor.ramPPy  = AsmEditor.memPP._y;
	AsmEditor.breaksX = AsmEditor.breaks._x;
	AsmEditor.breaksY = AsmEditor.breaks._y;

	AsmDatas.init();										// Initialise les données - valeurs dans mémoires et registres
	AsmEditor.consoleInit();								// Initialisation de la concole (noire)
															//----------------------------------------
															// Installation des listeners
	AsmDatas.ramListener.push(AsmEditor.ramDisplayValue);	//   - affichage des octets RAM. @ref. AsmDatas.ramPutValue(...)
	AsmDatas.regListener.push(AsmEditor.regDisplayValue);	//   - affichaged es registres   @ref. AsmDatas.regPutValue(...)
	for(let i =0; i<256;i++) AsmEditor.ramDisplayValue(0,i);// Remplssage RAM à 0
	for(let i =0; i<7  ;i++) AsmEditor.regDisplayValue(0,i);// Remplissage registres à 0
	AsmEditor.flagDisplay=true;
}
/**
 * Place les données (valeurs de RAM et de registres) dans les 'div' de la page HTML
 * Met à jour les outils : curseurPP et numéro-de-ram
 * Les valeurs sont récupérées dans la "base-de-donnée", les tables :
 *		- AsmDatas.ramValues[]
 *		- AsmDatas.regValues[]
 */
AsmEditor.refreshDisplay=function(){							
	for(let i=0; i<255; i++){								// réaffiche la RAM 
			AsmEditor.ramDisplayValue(AsmDatas.ramValues[i],i); // Les valeurs sont récupérées dans ramValues[]
	}
	for(let i=0; i<7; i++){									// réaffiche les registres  
			AsmEditor.regDisplayValue(AsmDatas.regValues[i],i);	// Les valeurs sont récupérées dans regValues[]
	}
};
/**
 * Modifie le type des nombres affichés :
 *     0 - décimla, 1 - héxadécimal, 2 - binaire (interrupteurs)
 */
AsmEditor.displayType=function(numType){
	if(numType<0 || numType>2) return;
	let mems = AsmEditor.pieceRams;							// Affiche le type dans la RAM 
	for(var i=0; i<256; i++){
		mems["w_octet"+i].gotoAndStop(numType); 
	}
	mems = AsmEditor.pieceProcessor;						// Affiche le type dans les registres
	for(var i=0; i<7; i++){
		mems["w_reg"+i].gotoAndStop(numType); 
	}
};

//------------------------------------------------------------------------------------------------------------------------
//															Valeurs
//------------------------------------------------------------------------------------------------------------------------
/**
 * Affiche une nouvelle valeur dans une mémoire.
 * Techniquement : modifie la valeur d'une mémoire dans une div de la page HTML 
 */
AsmEditor.ramDisplayValue=function(valP, octetNumP){
	if(!AsmEditor.flagDisplay){return;}						// vérifie si l'affichage est accepté
															// Inscript la valeur dans la div 
	AsmEditor.displayValue(valP, AsmEditor.ramArea.w_mems["w_octet"+octetNumP].pages_);
	AsmEditor.consoleDisplayRam(octetNumP);					// Si mémoire-vidéo inscrit la caractère sur la console
	if(AsmDatas.regGetValue(WvInstr.REG_PP_NUM)==octetNumP){// Si la mémoire possède le jeton (pointée par PP)
		AsmEditor.displayInstr(WvInstr.instrToString());	// => affiche le script de l'instruction sur la vitrine
	}
	if(AsmEditor.ramInput.ramCurr == octetNumP){			// Si la saisie-1-octet est placé sur cet octet
		AsmEditor.ramInputSetValue( AsmDatas.ramGetValue(octetNumP) ); // => rafraichit la saisie-1-octet
	}	
};
/**
 * Affiche une nouvelle valeur dans un registre.
 * Techniquement : modifie la valeur d'un registre dans une div de la page HTML 
 */
AsmEditor.regDisplayValue=function(valP, octetNumP){
	if(!AsmEditor.flagDisplay){return;}						// vérifie si l'affichage est accepté

															// Inscript la valeur dans la div 
	AsmEditor.displayValue(valP, AsmEditor.processor["w_reg"+octetNumP].pages_);
	if(octetNumP==WvInstr.REG_PP_NUM){						// Si il s'agit du registre pointeur-de-programme
		AsmEditor.moveCursorPP(octetNumP);					// Positionne le curseur-de-programme
		AsmEditor.displayInstr(WvInstr.instrToString());	// => affiche le script de l'instruction sur la vitrine
	}
	if(AsmEditor.regInput.ramCurr == octetNumP){			// Si la saisie-1-octet est placé sur ce registre
		AsmEditor.regInputSetValue(AsmDatas.ramGetValue(octetNumP));// => rafraichit la saisie-1-octet
	}	

};
/**
 * Fonction commune à la ram et aux registre, elle écrit la valeur dans la mémoire
 * sous ses 3 formes : décimale, hexadécimale et binaire (dessin d'interrupteurs)
 */
AsmEditor.displayValue=function(valP, octet){
	octet.f__0.children.w_deci._text=valP; 					// Inscriptione décimal
	
	hexString = parseInt(valP).toString(16).toUpperCase();	// Inscription en héxadécimal
	octet.f__1.children.w_hexa._text=hexString; 
	
	let h0 = valP%16;										// Inscription en binaire
	let h1 = (valP-h0)/16;									// Octet composé de 2 images de 0 à 16 (binaire) chacune
	let divBits = octet.f__2.children;			
	divBits.w_h0._y = -h0*25-3;								// Position chaque image pour afficher la valeur correct
	divBits.w_hexa._y = -h1*25-3;							// Les nombres sont en colonne. Les images sont ajustées en 'y'
};
/**
 * Autorise ou interdit la modification visuelle de l'écran
 * Lors du réaffiochage : l'acran est raffraichit
 * Utilisé lors de l'exécution "normal" (sans temporisation entre chaque instruction)
 */
AsmEditor.setFlagDisplay=function(valueP){
	if(!valueP){AsmEditor.flagDisplay=false; return;}		// Interdit l'affichage
	AsmEditor.flagDisplay=true;								// Autorise l'affichage 
	AsmEditor.refreshDisplay();								// Réaffiche toutes les valeurs dans le Cristalputer	
};															// Note : se réaffichage replace tous les éléments automatiquement
//------------------------------------------------------------------------------------------------------------------------
//												Instruction sur tableau de bord
//------------------------------------------------------------------------------------------------------------------------
/**
 * Afiche un texte sur la vitrine. Généralement l'instruction pointée par PP
 */ 
AsmEditor.displayInstr=function(scriptP){
	if(!AsmEditor.flagDisplay){return;}						// vérifie si l'affichage est accepté
	let t = AsmEditor.scriptText;							// Récupère la div-html-texte
	t.w_t0._text = scriptP;									// Le texte est écrit 3 fois pour le relief et l'ombre
	t.w_t1._text = scriptP;
	t.w_t2._text = scriptP;
};
//------------------------------------------------------------------------------------------------------------------------
//														Curseur programme 
//------------------------------------------------------------------------------------------------------------------------
/**
 * Déplacement du curseur de pointeur de programme
 */
AsmEditor.moveCursorPP=function(){
	val = AsmDatas.regGetValue(WvInstr.REG_PP_NUM);			// Récupère le numéro de mémoire-en-cours du programme*
	let x = (val % 16)          *AsmEditor.octetLg + AsmEditor.ramPPx;
	let y = Math.floor(val / 16)*AsmEditor.octetHt + AsmEditor.ramPPy;
	AsmEditor.memPP._x	= x;
	AsmEditor.memPP._y	= y;
};
//****************************************************************************************************************************
//													SAISIE SUR OCTET
//****************************************************************************************************************************
/**
 * Récupère la valeur incrite dans la saisie-1-mémoire
 */
AsmEditor.ramInputGetValue=function()	  {return AsmEditor.ramInput.value.value;};
/**
 * Incrite une valeur dans la saisie-1-mémoire
 */
AsmEditor.ramInputSetValue=function(valueP){return AsmEditor.ramInput.value.value=valueP;};
/**
 * A la perte du focus de la saisie-1-mémoire, la valeur est placée dans laa basse-de-donnée
 */
AsmEditor.ramChange=function(textP){
	let value = textP.value;								// Récupère la valeur de la mémoire
	if(isNaN(value) || value <0 || value>255) {
		WvInstr.errorDisplay("Valeur saisr incorrecte : /"+value+"/ doit être un nombre entre 0 et 255"); 
		return;
	}
	let memNum=AsmEditor.ramInput.ramCurr;					// Récupère le numéro de mémoire de la saisie (mémorise lors de memClic)
	AsmDatas.ramPutValue(value, memNum);					// Inscrit la valeur dans la basse de donnée
	AsmEditor.ramInput._x = -2000;							// Cache l zone de saisie
};
/**
 * Evenement : clic sur une mémoire
 * => affiche la saisie-1-mémoire sur cette mémoire
 *    inscrit la valeur  de laa mémoire dans la saisie
 */
AsmEditor.memClic=function(memP){
	let memNum = memP.id.wvGetIndex();						// Récupère le numéro de mémoire
															// Positionne la saisie-1-mémoire
	AsmEditor.ramInput._x = (memNum % 16)          *AsmEditor.octetLg+ AsmEditor.ramPPx+5;
	AsmEditor.ramInput._y = Math.floor(memNum / 16)*AsmEditor.octetHt+ AsmEditor.ramPPy+4;									
	AsmEditor.ramInputSetValue(AsmDatas.ramGetValue(memNum));// Inscrit la valeur de la mémoire dans la saisie
	AsmEditor.ramInput.ramCurr=memNum;						 // Mémorise le numéro de mémoire
	AsmEditor.ramInstr.w_txt_instr._text = WvInstr.instrToString(memNum);
};
/**
 * Evenement : survole une mémoire
 * => inscrit le numéro de mémoire en haut à droite, dans la barre titre du cadre-RAM 
 */
AsmEditor.memOver=function(memP){
		let memNum = memP.id.wvGetIndex();					// Récupère le numéro de mémoire
		AsmEditor.ramNum._text = memNum;					// Inscrit le numéro
		AsmEditor.ramInstr.w_txt_instr._text = WvInstr.instrToString(memNum);
};
/**
 * Cache la saisie-1-mémoire. En fait, la déplace hor cadre. 
 */
 AsmEditor.ramInputClose=function(inputP){
	inputP._x=-2000;
};
//------------------------------
/**
 * Récupère la valeur incrite dans la saisie-1-registre
 */
AsmEditor.regInputGetValue=function()	  {return AsmEditor.regInput.value.value;};
/**
 * Incrit une valeur dans la saisie-1-registre
 */
AsmEditor.regInputSetValue=function(valueP){return AsmEditor.regInput.value.value=valueP;};
/**
 * A la perte du focus de la saisie-1-registre, la valeur est placée dans laa basse-de-donnée
 */
AsmEditor.regChange=function(textP){
	let value = textP.value;								// Récupère la valeur du registre
	if(isNaN(value) || value <0 || value>255) {
		WvInstr.errorDisplay("Valeur saisr incorrecte : /"+value+"/ doit être un nombre entre 0 et 255"); 
		return;
	}
	let memNum=AsmEditor.regInput.ramCurr;					// Récupère le numéro de registre de la saisie (mémorise lors de regClic)
	AsmDatas.regPutValue(value, memNum);					// Inscrit la valeur dans la basse de donnée
	AsmEditor.regInput._x = -2000;							// Cache l zone de saisie
};
/**
 * Evenement : clic sur un registre
 * => affiche la saisie-1-registre sur ce registre
 *    inscrit la valeur  du registre dans la saisie
 */
AsmEditor.regClic=function(memP){
	let memNum = memP.id.wvGetIndex();						// Récupère le numéro de registre
															// Positionne la saisie-1-registre
	AsmEditor.regInput._x = (memNum % 4)          *AsmEditor.octetLg+9;
	AsmEditor.regInput._y = Math.floor(memNum / 4)*AsmEditor.octetHt+56;
	AsmEditor.regInputSetValue( AsmDatas.regGetValue(memNum) );// Inscrit la valeur du registre dans la saisie
	AsmEditor.regInput.ramCurr=memNum;						// Mémorise le numéro de registre
};
/**
 * Evenement : survole un registre
 * => inscrit le numéro de registre en haut à droite, dans la barre titre du cadre-RAM 
 */
AsmEditor.regOver=function(memP){
	// au cas où...
};
/**
 * Cache la saisie-1-registre. En fait, le déplace hor cadre. 
 */
AsmEditor.regInputClose=function(inputP){
	inputP._x=-2000;
};
AsmEditor.scriptRead=function(){
	return AsmEditor.input.value;
}
AsmEditor.scriptWrite=function(textP){
	return AsmEditor.input.value = textP;
}
/**
 * Récupère le script assembleur
 * appelé par le bouton "Compiler" div:w_bt_command0
 */
AsmEditor.scriptCompiler=function(textP){
	if(!textP) textP = AsmEditor.input.value;
	WvAssembler.compilerScript(textP);
};
//****************************************************************************************************************************
//														C O N S O L E
//****************************************************************************************************************************
AsmEditor.RAM_CONSOLE_START = 224;							// Début de la mémoire vidéo
AsmEditor.RAM_CONSOLE_LG = 32;								// Longueur de la mémoire vidéo
															// Fin de la mémoire vidéo
AsmEditor.RAM_CONSOLE_END = AsmEditor.RAM_CONSOLE_START+AsmEditor.RAM_CONSOLE_LG;
/**
 * Initialisation de la console
 */
AsmEditor.consoleInit=function(){
										//---- bonjour dans console
	AsmEditor.consoleDisplayString ( "             BONJOUR            " );
};
/**
 * Affiche un texte dans la console
 */
AsmEditor.consoleDisplayString=function(textP){
	let lg = textP.length;									// Calcule la longueur du texte à afficher
	if(lg>32) lg = 32;										// Le texte est cadré à gauche
	let posCar = AsmEditor.RAM_CONSOLE_START;				// Inscrit chaque caractère
	for (let i=0; i< lg;i++) {AsmDatas.ramPutValue(textP.charCodeAt(i), posCar++);}
	//AsmEditor.console._text=textP; //children.value.value=textP;
};
/**
 * Inscrit un octet d e la mémoire vidéo dans la console
 */
AsmEditor.consoleDisplayRam=function(numRamP){				// Vérifie que l'octet est bien dans la mémoire vidéo
	if(numRamP<AsmEditor.RAM_CONSOLE_START || numRamP>=AsmEditor.RAM_CONSOLE_END) return;
	let posCar = numRamP-AsmEditor.RAM_CONSOLE_START;		// Position du caractère
	let car = String.fromCharCode (AsmDatas.ramGetValue(numRamP)); // Convertit le nombre en caractère
															// Remplace le caractère
	AsmEditor.console._text = (value=AsmEditor.console._text).substring(0,posCar)+car+value.substring(posCar+1); 
};

//****************************************************************************************************************************
//												EXECUTION LANGAGE MACHINE
//****************************************************************************************************************************
/**
 * délai en 2 instructions pour l'exécution pas-à-pas
 * Note en cliquant à nouveau sur le bouton, la vitesse s'accélère x2
 */
AsmEditor.tempo = 1024;
/**
 * Indique une excution "normale" (sans temporisation entre les instructions) en cours
 * N'est utilisé que dans 'AsmEditor.exe()'
 */
AsmEditor.flagExeUntilPause = false;
/**
 * Execute 1 seule instruction
 */
AsmEditor.exe1step=function(){
	AsmEditor.exeStepByStepStop();
	WvInstr.exePP();
};
/**
 * Identifiant de la boucle qui execute chaque instruction
 */
AsmEditor.exeStepByStepInterval;
/**
 * Execution automatique du programe en langage machine.
 * Chaque instruction est executée avec un certain délai : AsmEditor.tempo 
 */
AsmEditor.exeStepByStep=function(){
	if (AsmEditor.exeStepByStepInterval){					// Si le pas-à-pas est déjà en cours -> accélération x2
		AsmEditor.tempo=(AsmEditor.tempo > 16)? AsmEditor.tempo/2:AsmEditor.tempo=1024; 
		AsmEditor.exeStepByStepStop();						// Stoppe la boucle-en-cours pour redémarre plus vite 
	}
	WvInstr.exePP();										// Exécute la 1ère instruction
															// Démarre la boucle d'instruction
	AsmEditor.exeStepByStepInterval=setInterval(WvInstr.exePP, AsmEditor.tempo);
};
/**
 * Stoppe la boucle d'éxecution pas-à-pas
 */
AsmEditor.exeStepByStepStop=function(){
	if(!AsmEditor.exeStepByStepInterval) return;			// Inutile si la pas-à-pas n'est pas en cours
	clearInterval(AsmEditor.exeStepByStepInterval);			// Stoppe le "setInterval()"
	AsmEditor.exeStepByStepInterval=null;					// Met à null l'identifiant du "setInterval()"
}
															// => cet id sert à vérifier si la pas-à-pas est en cours ou non
/**
 * Exécution "naturelle" du programme en langage machine
 * Naturelle : sans interval de temps et sans afficher d'informations sur le Cristalputer
 */
AsmEditor.exe=function(){
	AsmEditor.exeStepByStepStop();							// Arrêt de l'exécution pas-à-pas, si nécessaire
	if(AsmEditor.flagExeUntilPause){						//----------------------------------------
		AsmEditor.refreshDisplay();							// Clic à nouveau sur le bouton
		AsmEditor.flagExeUntilPause = false;				// => arrêt du déroulement du programme
		return;
	} 
	AsmEditor.flagExeUntilPause = true;						// Indicateur d'exécution "naturelle" en cours : ON
	AsmEditor.setFlagDisplay(false);							// Interdit l'affichage sur le Cristalputer
															//----------------------------------------
	for(let i=0; i<10000; i++){								// Boucle d'exécution de chaque instruction
	    WvInstr.exePP();									// Note 10000 est une protection contree une boucle infinie
		if(AsmDatas.breakPointsMems[WvInstr.regGet(WvInstr.REG_PP_NUM)]) break;	
	}
	AsmEditor.setFlagDisplay(true);							// Autorise l'affichage sur le Cristalputer
	AsmEditor.flagExeUntilPause = false;					// Indicateur d'exécution "naturelle" en cours : OFF
};
/**
 * Efface tous les mini-triangles-rouges de point d'arrêt (break-point)
 */
AsmEditor.breakPointsClear=function(){
	let gr = AsmEditor.breaks;								// Récupère le groupe de point d'arrêt (breaks)
	for (let i=16; i<224;i++){								// pour chaque point d'arrêt (break);
		gr["w_break"+i]._x=0;								// On le déplace en 0 (hors cadre)
	}
};
/**
 * Affiche touts les point d'arrêt
 * Lit la table "break" de la base-de-donnée. 
 * Pour chque item positif, le triangle rouge correspondant est déplacé 
 */
AsmEditor.breakPointsDisplay=function(){
	for (let i=16; i<224;i++){								// Pour chaque mémoire
		if(AsmDatas.breakPointsMems[i]) 					// Si l'item 'i' de la table est à 1
			AsmEditor.breakPointDisplay(i);					//	=> déplace le point d'arrêt
	}
};
/**
 * Affiche 1 point d'arrêt
 */
AsmEditor.breakPointDisplay=function(numP){
	let br = AsmEditor.breaks["w_break"+numP];				// Récupère l'iamge du point d'arrêt
															// Position l'image du point d'arrêt sur la mémoire 
	br._x = (numP%16            *AsmEditor.octetLg)+AsmEditor.ramPPx-AsmEditor.breaksX;
	br._y = (Math.floor(numP/16)*AsmEditor.octetHt)+AsmEditor.ramPPy-AsmEditor.breaksY;
};

/*********************************************************************************************************************
 * §2 - AsmDatas : valeurs du cristalputer
 * Base de données - 4 tables
 *	- AsmDatas.ramValues : table des valeurs de la RAM
 *	- AsmDatas.regValues : table des valeurs des registres
 *  - WvInstrDesc.instrs	 : table de description des instructions
 * 	- AsmDatas.breakPointsMems : tables des points d'arrêts
 * Redessine les composants
 *********************************************************************************************************************/
function AsmDatas(){};

AsmDatas.ramValues = new Array(256);						// table des valeurs de la RAM
AsmDatas.ramValues.fill(0);
AsmDatas.regValues = new Array(7);							// table des valeurs des registres
AsmDatas.regValues.fill(0);							// table des valeurs des registres
AsmDatas.breakPointsMems = new Array(256);					// tables des points d'arrêts
AsmDatas.breakPointsMems.fill(false);

AsmDatas.ramListener = [];									// Surveillent les écritures dans la table-valeur-de-RAM
AsmDatas.regListener = [];									// Surveillent les écritures dans la table-valeur-de-registres 
AsmDatas.isInit = false;
AsmDatas.carryNew = 0;										// mémorise l'état de la retenue : utilie lors de l'éxécution
/**
 * Initialisation des tables
 */
AsmDatas.init=function(){
	WvInstrDesc.init();										// Initialise la table de description des instructions
	AsmDatas.breakPointsRefrech();							// Vide la table et eeffaces tous les points d'arrêts point

	AsmDatas.regListener.push(AsmDatas.regStatesSet);		// Place les listeners de la table de valeurs de mémoires RAM
	AsmDatas.ramListener.push(AsmDatas.ramStatesSet);		// Place les listeners de la table de valeurs de registres
	
	for(let i = 0; i<256; i++){								// Remplie les tables à 0
		AsmDatas.ramPutValue(0, i);
	}
	for(let i = 0; i<8; i++){								// Rempli la table de registres
		AsmDatas.regPutValue(0, i);
	}
};
/**
 * Copie une table dans la table de mémoires-RAM
 * Utilisé en fin de compilation Assembleur.
 */
AsmDatas.tabVal2Ram=function ( tabOrgP , startP){
	let end = tabOrgP.length;
	for(let i=startP, j=0; j<end; i++, j++){
		AsmDatas.ramPutValue(tabOrgP[j], i);				// Simple copy d'item à item
	}
};

/**
 * Lit une valeur dans la table RAM
 */
AsmDatas.ramGetValue=function(octetNumP){					// Vérifie la validité des paramètres
	octetNumP = parseInt(octetNumP);
	if(isNaN(octetNumP) ||octetNumP<0 || octetNumP>255)return 0;
	return parseInt(AsmDatas.ramValues[octetNumP]);			// Retourne la valeur de la table
};

/**
 * Inscrit la valeur dans une mémoire + listeners
 */
AsmDatas.ramPutValue=function(valP, octetNumP){				// Vérifie laa validité des paramètres
	valP = parseInt(valP);
	octetNumP = parseInt(octetNumP);
	if(isNaN(octetNumP) ||octetNumP<0 || octetNumP>255){return 0;}
	if(isNaN(valP) ||valP<0 || valP>255){AsmDatas.ramValues[octetNumP]=0; return 0;}  
	AsmDatas.ramValues[octetNumP]=parseInt(valP);			// Place la valeur dans la table
															// Exécute les listeners
	AsmDatas.ramListener.forEach((listenerP) => listenerP(valP,octetNumP))  
};	
/**
 * Récupère la valeur dans un registre + listeners
 * @references 
 * 	AsmDatas.setFlagsRE 
 */
AsmDatas.regGetValue=function(octetNumP){					// Vérifie laa validité des paramètres
	octetNumP = parseInt(octetNumP);
	if(isNaN(octetNumP) ||octetNumP<0 || octetNumP>7){return 0;}
	return parseInt(AsmDatas.regValues[octetNumP]);					// Retourne la valeur de la table
};
/**
 * Inscrit une valeur dans un registre + listeners
 * @references 
 *  AsmDatas.init()
 * 	AsmDatas.setFlagsRE()
 * 	WvInstr.regSet()
 *	AsmEditor.regPutValues() fonction de command - ne fait pas parti du traitement 'assembleur'"
 */
AsmDatas.regPutValue=function(valP, octetNumP){					// Vérifie laa validité des paramètres
	valP = parseInt(valP);
	octetNumP = parseInt(octetNumP);
	if(isNaN(octetNumP) ||octetNumP<0 || octetNumP>7){return 0;}
	if(isNaN(valP) ||valP<0 || valP>255){AsmDatas.regValues[octetNumP]=0; return 0;}
	AsmDatas.regValues[octetNumP]=parseInt(valP);			// Place la valeur dans la table  	
															// Exécute les listeners
	AsmDatas.regListener.forEach((listenerP) => listenerP(valP,octetNumP)) 
};
/**
 * Listener dans 'AsmDatas.regListener[]'
 * Calcule le registre d'état lors d'une écriture dans une REGISTRE
 * Note : ne sélectionne compte que les registres A B X Y
 */
AsmDatas.regStatesSet=function(valP, memP){					// Si registre A B X ou Y
	if(memP!=WvInstr.REG_RE_NUM && memP!=WvInstr.REG_PP_NUM && memP!=WvInstr.REG_PI_NUM) {
		AsmDatas.setFlagsRE(valP);							// Calcule du registre RE	
	}
};
/**
 * Listener dans 'AsmDatas.ramListener[]'
 * Calcule le registre d'état lors d'une écriture dans une MEMOIRE
 */
AsmDatas.ramStatesSet=function(valP, memP){
	AsmDatas.setFlagsRE(valP);							// Calcule du registre RE pour la valeur de cette mémoire	
};
/**
 * Calcule les flags du registre d'état - RE
 * @references :
 *	AsmDatas.ramStatesSet(valP,memP)
 *	AsmDatas.regStatesSet(valP,memP)
 */
AsmDatas.setFlagsRE=function(valP){
	let flags = 0;;
	if (valP==0) flags =  WvInstr.FLAGZEROou;			// Si ==0 		=> lève le bit "est-Zéro"
	if (valP>=0 && valP<128) flags |=  WvInstr.FLAGPLUSou;// Si 0 à 127 => lève le bit "positif"
	if (AsmDatas.carryNew) {							// Si une catenue est levée
		flags |= WvInstr.FLAGCARRYou;					//              => lève le bit retenu
		AsmDatas.carryNew=0;							// Remet la retenue à 0
	}
	AsmDatas.regPutValue(flags, WvInstr.REG_RE_NUM);	// Place la valeur-RE dans la table de registres
};
//****************************************************************************************************************************
//														B R E A K   P O I N T
//****************************************************************************************************************************
/**
 * Raffraichit la table de points d'arrêts
 * Note : seuls des octets 16 à 223 peuvent recevoir un script, ddonc un point d'arrêt
 */
AsmDatas.breakPointsRefrech=function(){
	for (let i=0; i<16; i++){
		AsmDatas.breakPointsMems[i] = true;
	}
	for (let i=16; i<224; i++){
		AsmDatas.breakPointsMems[i] = false;
	}
	for (let i=224; i<256; i++){
		AsmDatas.breakPointsMems[i] = true;	
	}
	AsmEditor.breakPointsClear();
};
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
function  WvInstr(){}
WvInstr.errors=[       
	"Error system : le pointeur de programme ne contient pas de numéro de mémoire [0 à 255]",
	"Error System : la mémoire pointée par le pointeur de programme ne comporte pas de numéro d'instructio [0 à 255]"
];
WvInstr.errorDisplay=function(messageNumP, posP){console.log("Erreur #"+posP+" : "+WvInstr.errors[messageNumP]);}


WvInstr.flagpas_pas;
WvInstr.flagspeed;
WvInstr.flagdebug;

WvInstr.REG_RE_NUM = 4;
WvInstr.REG_PP_NUM = 5;
WvInstr.REG_PI_NUM = 6;

WvInstr.FLAGZERO    = 0x7F;
WvInstr.FLAGZEROou  = 0x80;
WvInstr.FLAGPLUS    = 0xBF;
WvInstr.FLAGPLUSou  = 0x40;
WvInstr.FLAGCARRY   = 0xCF;
WvInstr.FLAGCARRYou = 0x20;

WvInstr.FLAG_PAS_A_PAS 		= 1;
WvInstr.FLAG_PAS_A_PAS_NOT 	= 2;
WvInstr.FLAG_RUN			= 3;
WvInstr.FLAG_STOP			= 4;
WvInstr.FLAG_ALT_SPEED		= 5;
WvInstr.FLAG_ASSEMBLEUR		= 6;
WvInstr.ramSet_InUsed		= false;
WvInstr.regSet_InUsed		= false;
WvInstr.regRetenueSet_InUsed= false;

WvInstr.ramGet=function(memP){
	memP=parseInt(memP);
	if(memP>255){
		WvInstr.regGet(memP-255);
		return;
	}
	return AsmDatas.ramGetValue(memP);	
};
/**
 * Ecriture d'une mémoire-de-la-RAM lors de l'exécution + 16 dans le pointeur-de-programme lors de la compilation 
 */

WvInstr.ramSet=function(valP, memP){
	memP=parseInt(memP);
	if(memP>255){
		WvInstr.regSet(valP, memP-256);
		return;
	}
	if(WvInstr.ramSet_InUsed) {alert("ramSet_InUsed"); return;}
	WvInstr.ramSet_InUsed = true;
	valP=WvInstr.isOverflow(valP);							// Traite la valeur si hors limites nagatif ou >255
	AsmDatas.ramPutValue(valP,memP);						// Inscript la valeur dans la table RAM de la base-de-donnée
	WvInstr.ramSet_InUsed = false;
}
/**
 * Ecriture d'un registre lors de l'exécution + 16 dans le pointeur-de-programme lors de la compilation 
 */
WvInstr.regSet=function(valP, memP){
	memP=parseInt(memP);
	if(WvInstr.regSet_InUsed){alert("regSet_InUsed"); return;}
	WvInstr.regSet_InUsed = true;							//------------------------------------
	valP=WvInstr.isOverflow(valP);							// Traite la valeur si hors limites nagatif ou >255
	AsmDatas.regPutValue(valP, memP);						// Inscrit la valeur dans la table REGISTRES de la base-de-donnée
	WvInstr.regSet_InUsed = false;
};
WvInstr.isOverflow=function(valP){							// Calcul la retenue (carry)) Traité ici car je ne veux pas
	valP=parseInt(valP);									//     diffuser un nombre hors octet (0 à 255) hors de WvInstr
	if(valP>=256){											// A - valeur > 255
		valP-=256;											// 1 - ici Placé dans 'carryNew'
		AsmDatas.carryNew = 1; 								// 2 - en fin d'instruction : transmise au registe RE 
	}else{													//     dans -> AsmDatas.setFlagsRE()
		if(valP<0){											// B - Valeur < 0.
			valP=256+valP;									// 1 - calcul du négatif		
			AsmDatas.carryNew=1; 							// 2 - active la retenue
		}else{AsmDatas.carryNew=0;}							// C - sinon la retenue vaut 0
	}														//------------------------------------
	return valP;
}
/**
 * Lecture d'un registre
 */
WvInstr.regGet=function(memP){
	return AsmDatas.regGetValue(memP);
};
/**
 * A - description
 * - Execute une instruction-langage-machine. 
 * - Evidemment cette opération est exécutée par une fonction javascript-de-simulation.
 * B - déroulement
 * 1 - lecture le numéro de mémoire inscrit dans le registre Pointeur-de-Programm
 * 2 - 
 * C - Deux process différents accèdent à ces fonctiosn de simulation 
 * 1 - Pour certaines instructions, les fonctions-de-simulations sont placées dans 
 * la table-de-description-d'instruction : WvInstrDesc.buildTable[][] 
 * Déclenchée par :WvInstrDesc.instrs[instrCode].exe()  
 * 2 - la simulation des rôles de PINs du processeur. Chaque pin déclenchant un circuit propre.
 * voir : WvInstr.exe=function(instrCode, param1, param2)
 */
WvInstr.exePP=function(){
															//---------------------------------------
	let ad = WvInstr.regGet(WvInstr.REG_PP_NUM);			// Position courante du programme. Lecture dans PP
	if(ad==Number.NaN || String(ad)=="undefined"){WvInstr.errorDisplay(0,"Program pointer"); return; }
	let instrCode = AsmDatas.ramGetValue(ad);				// Code de l'instruction lue dans la mémoire RAM, 
	let desc = WvInstrDesc.instrs[instrCode];				// Propriétés de l'instruction 			
	let nbParam = desc.nbParam;								// Nombre de paramètres de l'instruction
	let param1 = (nbParam>0)?((ad<255)? AsmDatas.ramGetValue(ad+1):0):null;	// 1er param dans la mémoire suivante
	let param2 = (nbParam>1)?((ad<255)? AsmDatas.ramGetValue(ad+2):0):null;	// 2ème paramètre 2 mémoir plus loin
															//----------------------------------------
	WvInstr.ReCurr = WvInstr.regGet(WvInstr.REG_RE_NUM);// Mémorise RE et Initialise la retenue 
	WvInstr.carryCurr = ((WvInstr.ReCurr & WvInstr.FLAGCARRYou) != 0)? 1 : 0;
															// Position suivant dans PP
	let instrNextPos = WvInstr.regGet(WvInstr.REG_PP_NUM)+nbParam + 1;
	if(instrNextPos>255) instrNextPos=0;					// Si PP>255 => boucler sur 0
	WvInstr.regSet(instrNextPos , WvInstr.REG_PP_NUM);		// Insrire la position suivante dans PP
	if(WvInstrDesc.instrs[instrCode].exe!=null){			//----------------------------------------
		WvInstr.regSet(0, WvInstr.REG_RE_NUM);
		WvInstrDesc.instrs[instrCode].exe(param1,param2);	// Déclenche le fonctions-de-simulation-javascript
		return;												// Inscrites dans la table : WvInstrDesc.buildTable[][] 
	}														//----------------------------------------	
	WvInstr.exe(instrCode, param1, param2);					// Executer l'instruction (méthode PIN, pour le fun)
															// Chacune des ces fonctions de simulation peut être 
															// placée dans la table'WvInstrDesc.buildTable[][]'
};
/**
 * (pour le fun)
 * 1 - Rôle 
 * Exécuter une instruction du programme machine
 * Note: le Pointeur-de-programme pointe déjà sur l'instructions suivante
 *
 * 2 - Accès aux fonctions javascript de simulation des instructions
 * a - Cette méthode utilise la logique PIN du processeur. C'est à dire, rechercher l'instruction 
 * les instructions en fonction des circuit électriques utilisés pour chaque instruction.
 * Exemple : tous les codes utilisant les bits 2, 4 activent les LOAD 
 *		     mixé avec le bit 64 reliant au registre A en 'immédiat'
 *			 => donc 0x86 / 01001010 déclenchera : LDA immédiat
 * b - Pour d'autres instructions, les fonctions-de-simulations sont placées dans 
 * la table-de-description-d'instruction : WvInstrDesc.buildTable[][] 
 * Déclenchée par :WvInstrDesc.instrs[instrCode].exe()  
 *
 * 3 - Paramètres :
 * - instrCode : code de l'instruction. voir 'function WvInstrDesc'
 * - param1 (optionnel) : 1er  paramètre de la fonction. Exemple : BRA 16 <- param1=16
 * - param2 (optionnel) : 2ème paramètre de la fonction. Exemple : MOV 16,A <- param2=A
 *
 */
WvInstr.exe=function(instrCode, param1, param2)
{
	let regNum;
	let adresse;
	let vu;
	let exeFamilyNum;
	let valeur=param1;

	if (instrCode==0){return false;}						// BRA
															//------------------------------------
															// initialise la retenue 
	let carryCurr = ((WvInstr.regGet(WvInstr.REG_RE_NUM) & WvInstr.FLAGCARRYou) != 0)? 1 : 0;
	AsmDatas.carryNew  = 0;
	//--------------------------------------------------------------------------------------------
	// Calcule le format de l'exécution en fonction de PINs du processeur
	//--------------------------------------------------------------------------------------------	
	let tabactXY = [ 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 1, 0, 6, 7 ];
	
	let no0 = exeFamilyNum = instrCode & 0x0F;
	let no16  = Math.floor ( instrCode / 16 );

	vu = 0;						
	if (instrCode >= 0xF0 && instrCode <= 0xF8){		// Indirection
		vu = 1;
		switch(instrCode){
			case 0xF0 :regNum=0; exeFamilyNum=6 /*LD*/; break;
			case 0xF1 :regNum=0; exeFamilyNum=7 /*ST*/; break;
			case 0xF2 :regNum=1; exeFamilyNum=6		 ; break;
			case 0xF3 :regNum=1; exeFamilyNum=7		 ; break;
			case 0xF4 :regNum=2; exeFamilyNum=6		 ; break;
			case 0xF5 :regNum=2; exeFamilyNum=7		 ; break;
			case 0xF6 :regNum=3; exeFamilyNum=6		 ; break;
			case 0xF7 :regNum=3; exeFamilyNum=7		 ; break;
		}
		adresse = AsmDatas.ramGetValue(param1);
		valeur = AsmDatas.ramGetValue(adresse);
	}else{
		if (instrCode>=0x20 && instrCode<0x40){	// Branchement / pile
			exeFamilyNum = instrCode;
			vu = 1;
		}else{		// Opération sur registre
					// Poids fort
					// 8x A-X immed  9x A-X direct  Ax A-X indexé(registre) Bx no
					// Cx B-Y immediat Dx B-Y direct Ex B-Y indexé(registre) 
					
					// 0 SUBab, 1 CMPab,2 SBCab,4 ANDab
					// 6 LDab , 7 STab,8 EORab,9 ADCab
					// A Orab   , B ADDab, C CMPxy, E LDxy, F STxy
			if (instrCode >= 0x80 && instrCode <= 0xEF){
				if (no16 == 0x0B) return true;
				regNum = 0;
				if(no0>=0x0C) 		regNum+=2;
				if(instrCode>=0xC0) regNum++;
				if(instrCode>= 0xC0)regNum=1; else regNum = 0; 
				if (exeFamilyNum >= 0x0C) {regNum += 2; exeFamilyNum = tabactXY[exeFamilyNum];}
	
				//************** calcule la valeur de paramètre ******************
				if (no16 == 0x08 || no16 == 0x0C){
					//****valeur = param1;	
				}
				if (no16 == 0x09 || no16 == 0x0D) {
					valeur  = AsmDatas.ramGetValue(param1);
					adresse = param1;
				}
				if (no16 == 0x0A || no16 == 0x0E) {
					valeur  = AsmDatas.ramGetValue(WvInstr.regGet(param1));
					adresse = WvInstr.regGet(param1);
				}
				vu = 1;
			}
			if (no16 == 2){ exeFamilyNum = instrCode; vu = 1;}
			if (instrCode < 0x80 && no16 != 2){
				vu = 1;
				adresse = 0;
				switch(no16) {
				case 0 : adresse = param1; valeur = AsmDatas.ramGetValue(adresse);break;
				case 6 : adresse = WvInstr.regGet(param1); valeur = AsmDatas.ramGetValue(adresse); break;
				case 4 : adresse = 0x100; valeur = WvInstr.regGet(0); break;
				case 5 : adresse = 0x101; valeur = WvInstr.regGet(1); break;
				default: vu =0;
				}
				if (exeFamilyNum < 7)
					{exeFamilyNum += 7; adresse += 2;valeur = WvInstr.regGet(adresse - 0x100);}
				exeFamilyNum += 16;
			}
		}
	}
	if (vu==0) return false;
	//--------------------------------------------------------------------------------------------
	// Exécution en fonction de PINs du processeur
	//--------------------------------------------------------------------------------------------	
	switch(exeFamilyNum){
		//{  "SUB", 0x82, 1},   soustrait reg � valeur 
	  case 0 :
		WvInstr.regSet(WvInstr.regGet(regNum)-valeur, regNum);
		break;
		// CMP - compare registre � valeur 
	  case 1 :
		let flags = 0;
		if (WvInstr.regGet(regNum) == valeur) flags = WvInstr.FLAGZEROou;
		if (WvInstr.regGet(regNum) >= valeur) flags |= WvInstr.FLAGPLUSou; 
		WvInstr.regSet(flags, WvInstr.REG_RE_NUM);
		break;
		/*{  "SUBC", 0x82, 1},   soustrait registre et valeur (avec retenue)*/
	  case 2 :
		WvInstr.regSet( WvInstr.regGet(regNum)-valeur - carryCurr,regNum);
		break;
	  case 4 :	/* AND et logique */
		WvInstr.regSet(WvInstr.regGet(regNum)&valeur, regNum);
		break;
	  case 6 :	/*{  "LD", 0x86, 1},   load A - valeur immediate */
 		WvInstr.regSet(valeur,regNum);
		break;
	  case 7 :  /* ST - store le registre dans une memoire */
 		WvInstr.ramSet(WvInstr.regGet(regNum),adresse);
		break;
	  case 8 :	/* EOR et logique */
		WvInstr.regSet( WvInstr.regGet(regNum) ^ valeur, regNum);
		break;
	  case 0x0B : carryCurr = 0;
	  case 9 :  /* ADDC - addition avec retenue */
		WvInstr.regSet(WvInstr.regGet(regNum)+valeur + carryCurr, regNum);
		break;
	  case 0x0A :	/* OU et logique */
		WvInstr.regSet(WvInstr.regGet(regNum) | valeur, regNum);
		break;
	  case 0x18 :  /* ASR - decalage à gauche (avec retenue) */
		WvInstr.ramShiftRight(adresse, 1);
		break;
	  case 0x17 :  /* ASL - décalage à gauche (sans retenue) */
		WvInstr.ramShiftLeft(adresse, 1);
		break;
	  case 0x1C : /* INC - incrementation */
		if (adresse > 0xFF) WvInstr.regSet(valeur+1, adresse-0x100);
		else                WvInstr.ramSet(valeur+1,adresse);
		break;
	  case 0x1A :  /* DEC - decrementation */
		if (adresse > 0xFF) WvInstr.regSet(valeur-1, adresse-0x100);
		else                WvInstr.ramSet(valeur-1,adresse);
		break;

	  //********************************************************************
	  case 0x30 :
		WvInstr.Empiler(WvInstr.regGet(0));
		break;
	  case 0x31 :
		WvInstr.regSet(WvInstr.Depiler(),0);
		break;
	  case 0x32 :
		WvInstr.Empiler(WvInstr.regGet(1));
		break;
	  case 0x33 :
		WvInstr.regSet( WvInstr.Depiler(),1);
		break;
	  case 0x34 :
		WvInstr.Empiler(WvInstr.regGet(2));
		break;
	  case 0x35 :
		WvInstr.regSet(WvInstr.Depiler(),2);
		break;
	  case 0x36 :
		WvInstr.Empiler(WvInstr.regGet(3));
		break;
	  case 0x37 :
		WvInstr.regSet(WvInstr.Depiler(),4);
		break;
	  case 0x2E :  /* SBR - saut à une sous-routine */
		WvInstr.Empiler(WvInstr.regGet(WvInstr.REG_PP_NUM));
		WvInstr.regSet(param1,WvInstr.REG_PP_NUM);
		break;
	  case 0x2F :  /* RET - retour de sous programme */
		WvInstr.regSet(WvInstr.Depiler(),WvInstr.REG_PP_NUM);
		break;
	  case 0x20 :  /* BRA - branchement inconditionnel */
		alert("BRA FALSE"); //WvInstr.regSet(param1,WvInstr.REG_PP_NUM);
		break;
	  case 0x27 :  /* BEQ - branchement si �gal (ou zero) */
		if ((WvInstr.regGet(WvInstr.REG_RE_NUM) & WvInstr.FLAGZEROou) != 0)
			WvInstr.regSet(param1,WvInstr.REG_PP_NUM);
		break;
	  case 0x26 :  /* BNE - branchement si non �gal (ou zero) */
		if ((WvInstr.regGet(WvInstr.REG_RE_NUM) & WvInstr.FLAGZEROou) == 0)
			WvInstr.regSet(param1,WvInstr.REG_PP_NUM);
		break;
	  case 0x2B :  /* BMI - branchement if minus (plus petit) */
		if ((WvInstr.regGet(WvInstr.REG_RE_NUM) & WvInstr.FLAGPLUSou) == 0)
			WvInstr.regSet(param1,WvInstr.REG_PP_NUM);
		break;
	  case 0x2C :  /* BGE - branchement si > ou �gal */
		if ((WvInstr.regGet(WvInstr.REG_RE_NUM) & WvInstr.FLAGPLUSou) != 0)
			 WvInstr.regSet(param1, WvInstr.REG_PP_NUM);
		break;
	  case 0x22 :  /* BHI - branchement si > */
		if (((WvInstr.regGet(WvInstr.REG_RE_NUM) & WvInstr.FLAGPLUSou) != 0) &&
			((WvInstr.regGet(WvInstr.REG_RE_NUM) & WvInstr.FLAGZEROou) == 0)   )
			  WvInstr.regSet(param1,WvInstr.REG_PP_NUM);
		break;
	  case 0x24 :  /* BCC - branchement si carry clear */
		//if ((WvInstr.regGet(WvInstr.REG_RE_NUM) & WvInstr.FLAGCARRYou) == 0)
		if (carryCurr == 0)
			 WvInstr.regSet(param1,WvInstr.REG_PP_NUM);
		break;
	  case 0x25 :  /* BCS - branchement si carry clear */
		if (carryCurr == 1)
			 WvInstr.regSet(param1,WvInstr.REG_PP_NUM);
		break;
	}
	return true;
};
/**
 * Convertir une instruction-langage-machine en instruction Assembleur
 * Par exemple : ce script sera inscrit sur la vitrine.
 */
WvInstr.instrToString=function(memNumP)
{
	let txt;
	let memNum;

	let instrText = "";
	memNum = (memNumP)?memNumP:WvInstr.regGet(WvInstr.REG_PP_NUM);// Position du programme-en-cours
	let instrCode = AsmDatas.ramGetValue(memNum);			// Code-instruction du langage-machine
	let instrDesc = WvInstrDesc.instrs[instrCode];					// Descripteur de la fonction
	if(!instrDesc.nom){
		return "?";
	}
	instrText += instrDesc.nom+"  ";							// Memorise le nom

	if (instrDesc.nbParam > 0) {									// Mémorise le 1er paramère (si présent)
		instrText += WvInstr.paramToString(instrDesc.paramType1, memNum+1);
	}
	if (instrDesc.nbParam > 1) {									// Mémorise le 2ème paramère (si présent)
		instrText += WvInstr.paramToString(instrDesc.paramType2, memNum+2);
	}
	return instrText;										// Retourne le texte construit
};													
WvInstr.TAB_REG = ["A","B","X","Y"];
/**
 * Convertit une parametre numérique en texte 
 * Utilisé dans la fonction précédante
 */
WvInstr.paramToString=function(typeParamP, memNum){
	switch (typeParamP) { 
	  case WvInstrDesc.m_maj_ascii :
		return AsmDatas.ramGetValue(memNum)+"/"+AsmDatas.ramGetValue(memNum).toString(16)+"  ";
	  case WvInstrDesc.diese_ascii :
		return "#"+AsmDatas.ramGetValue(memNum)+"/#"+AsmDatas.ramGetValue(memNum).toString(16)+"  ";
		//sprintf(txtpar, "#%d", ram[memNum]);
	  case WvInstrDesc.parenteseopen_ascii :
		return "("+AsmDatas.ramGetValue(memNum)+")/("+AsmDatas.ramGetValue(memNum).toString(16)+")  ";
	  case WvInstrDesc.r_maj_ascii :
		return AsmDatas.regGetValue(AsmDatas.ramGetValue(memNum))+"   ";
	}
	return "";
}

WvInstr.Empiler=function(val)
{
	let pos = WvInstr.regGet(WvInstr.REG_PI_NUM);
	WvInstr.ramSet(val, pos);
	WvInstr.regSet(pos+1,WvInstr.REG_PI_NUM);
};
WvInstr.Depiler=function()
{
	let pos = WvInstr.regGet(WvInstr.REG_PI_NUM)-1;
	if(pos<0) pos=255;
	WvInstr.regSet(pos, WvInstr.REG_PI_NUM);
	return AsmDatas.ramGetValue(pos);
};
WvInstr.ramShiftRight=function(adressP, flagCarryP){
  	let valeurP = parseInt(WvInstr.ramGet(adressP));
	if(valeurP%2){
		AsmDatas.carryNew = 1;
		valeurP--;
	}
	if(flagCarryP) flagCarryP = WvInstr.carryCurr;
	WvInstr.ramSet(valeurP/2+flagCarryP*128, adressP);
};
WvInstr.ramShiftLeft=function(adressP, flagCarryP){
  	let valeurP = parseInt(WvInstr.ramGet(adressP));
	if(flagCarryP) flagCarryP = WvInstr.carryCurr;
	WvInstr.ramSet(valeurP*2+flagCarryP, adressP);
};
WvInstr.regShiftRight=function(adressP, flagCarryP){
  	let valeurP = parseInt(WvInstr.regGet(adressP));
	if(valeurP%2){
		AsmDatas.carryNew = 1;
		valeurP--;
	}
	if(flagCarryP) flagCarryP = WvInstr.carryCurr;
	WvInstr.regSet(valeurP/2+flagCarryP*128, adressP);
};
WvInstr.regShiftLeft=function(adressP, flagCarryP){
  	let valeurP = parseInt(WvInstr.regGet(adressP));
	if(flagCarryP) flagCarryP = WvInstr.carryCurr;
	WvInstr.regSet(valeurP*2+flagCarryP, adressP);
};

//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
/**
 * Une occurence de description d'instruction
 */
function WvInstrDesc(i, paramsP){
	if(!paramsP[0]){this.id="null"; return;}				// Si le nom est null => quitter
	this.nom 		= paramsP[0].trim();					// Nom assembleur de la fonction
	this.paramType1	=(paramsP[1]!=null)? paramsP[1]:"";		// Type du paramètre 1 : immédiat, direct ou indirect
	this.paramType2	=(paramsP[2]!=null)? paramsP[2]:"";		// Type du paramètre 2 : immédiat, direct ou indirect
	this.code    	= paramsP[3];							// Code machine de l'instructio
	this.nbParam 	= paramsP[4];							// Nombre de paramètres de l'indtruction
	this.exe	 	= paramsP[5];							// Fonction simulation(optionnelle, car traitée par ailleurs)
	this.id = (this.nom!="")? this.nom+"@"+this.paramType1+"@"+this.paramType2:"UNUSED";
};
WvInstrDesc.FLAGZERO    =  0x7F;
WvInstrDesc.FLAGZEROou  =  0x80;
WvInstrDesc.FLAGPLUS    =  0xBF;
WvInstrDesc.FLAGPLUSou  =  0x40;
WvInstrDesc.FLAGCARRY   =  0xCF;
WvInstrDesc.FLAGCARRYou =  0x20;

WvInstrDesc.parenteseopen_ascii ="(".charCodeAt(0);
WvInstrDesc.bigger_ascii =">".charCodeAt(0);
WvInstrDesc.diese_ascii = "#".charCodeAt(0);
WvInstrDesc.m_maj_ascii = "M".charCodeAt(0);
WvInstrDesc.r_maj_ascii = "R".charCodeAt(0);
WvInstrDesc.zero_ascii  = "0".charCodeAt(0);

/**
 * Initialistaion de la table de description des instructions
 */
WvInstrDesc.init=function(){
	WvInstrDesc.buildTable();								// Construction de la table
	let instr = new Array(256);								// Table temporaire
	WvInstrDesc.id = new Array(256);						// Table des identifiants. Sert à rechercher une instruction 
	for (let i=0; i<256; i++){								// Pour chaque instruction
		instr[i] = new WvInstrDesc(i, WvInstrDesc.datas[i]);// 		création d'un objet-description
		WvInstrDesc.id[i] = instr[i].id;					// 		place d'identitiant dans la table identifiants
	}
	WvInstrDesc.instrs = instr;								// Installe la table-des-descripteurs-d'onstruction
};
WvInstrDesc.BRANCH_NAME = ['BHI' ,'BEQ','BNE','BMI','BGE'];
WvInstrDesc.BRANCH_SIGN = ['B>0' ,'B==0','B!=0','B<0' ,'B>=0'];
WvInstrDesc.toBranch=function(scriptP){
		if(scriptP.charCodeAt(0)!=WvAssembler.b_maj_ascii){return scriptP;}
		let car = scriptP.charCodeAt(1);
		if(car>=WvAssembler.a_maj_ascii && car<=WvAssembler.z_maj_ascii){return script;}
		if(scriptP.charCodeAt(2)==WvAssembler.zero_ascii || scriptP.charCodeAt(3)==WvAssembler.zero_ascii){
			let 
			return script;
		}
		let zeroPos = scriptP.indexOf('0');
		
		
};
WvInstrDesc.buildTable=function(){
	let mem 	= WvInstrDesc.m_maj_ascii;
	let reg 	= WvInstrDesc.r_maj_ascii;
	let immed 	= WvInstrDesc.diese_ascii;
	let indiram = WvInstrDesc.parenteseopen_ascii;			// mémoire-ram Indirect
	let indireg = WvInstrDesc.bigger_ascii;					// registre Indirect
	let _		= null;
	
	let REG_A 	= 0;
	let REG_B 	= 1;
	let REG_X 	= 2;
	let REG_Y 	= 3;
	let REG_PP 	= WvInstr.REG_PP_NUM;
	let REG_RE 	= WvInstr.REG_RE_NUM;
	let REG_PI 	= WvInstr.REG_PI_NUM;	

	let regGet  = WvInstr.regGet;
	let regSet  = WvInstr.regSet;
	let memGet  = WvInstr.ramGet;
	let memSet  = WvInstr.ramSet;
	
	/* TODO pour débugging en cas de commentaires sans ';' - rare
	WvInstrDesc.getNbParams=function(nameP){
		let limit = 3;
		for(let i=0,i<3;i++){
			let nameP = nameP.substring(0,limit--);
			let pos = WvInstrDesc.paramsNbNames[i].indexOf(nameP);
			if(pos<0) continue;
			return WvInstrDesc.paramsNb[i][pos];
		}
		return -1;
	};
	WvInstrDesc.paramsNbNames=[
		["AND","ASR","ASL","CMP","DEC","INC","MOV","NOP","RET","SBC","SBR","SUB"],
		["AD","AS","CM","DE","EO","IN","LD","OR","PU"",ST"],
		["B"]];
	WvInstrDesc.paramsNb=[[1,1,1,1,1,1,2,0,0,1,1,1],[1,0,1,0,1,0,1,1,0,1],[1]];
	*/
	WvInstrDesc.datas = [
        [   "NOP",      _,    	 _, 0x00, 0],  /* adressage direct */
        [   "MOV",    reg,     reg, 0x01, 2, (addr,val)=>regSet(regGet(val)		   ,addr)],
        [   "MOV",indireg,     reg, 0x02, 2, (addr,val)=>regSet(regGet(val)		   ,regGet(addr))],
        [   "MOV",    reg, indireg, 0x03, 2, (addr,val)=>regSet(memGet(regGet(val)),addr)],
        [   "MOV",indireg, indireg, 0x04, 2, (addr,val)=>memSet(memGet(regGet(val)),regGet(addr))],
        [       _,      _,    	 _, 0x05, 0],
        [   "LSR",    mem,       _, 0x07, 1,(addr,val)=>WvInstr.ramShiftRight( addr, 0)],
        [   "ASR",    mem,       _, 0x07, 1,(addr,val)=>WvInstr.ramShiftRight( addr, 1)],
        [   "ASL",    mem,       _, 0x08, 1,(addr,val)=>WvInstr.ramShiftLeft ( addr, 1)],
        [   "LSL",    mem,       _, 0x08, 1,(addr,val)=>WvInstr.ramShiftLeft ( addr, 0)],
        [   "DEC",    mem,       _, 0x0A, 1], // 10 0x0A
	    [       _,      _,       _, 0x0B, 0],
	    [   "INC",    mem,       _, 0x0C, 1],
        [       _,      _,    	 _, 0x0D, 0],
        [   "MOV",    mem,   immed, 0x0E, 2, (addr,val)=>memSet(val				   ,addr)],
        [   "MOV",    mem,     mem, 0x0F, 2, (addr,val)=>memSet(memGet(val)		   ,addr)],
        [   "MOV",    mem, indiram, 0x10, 2, (addr,val)=>memSet(memGet(memGet(val)),addr)],
        [   "MOV",indiram,   immed, 0x11, 2, (addr,val)=>memSet(val				   ,memGet(addr))],
        [   "MOV",indiram,     mem, 0x12, 2, (addr,val)=>memSet(memGet(val)		   ,memGet(addr))],
        [   "MOV",indiram, indiram, 0x13, 2, (addr,val)=>memSet(memGet(memGet(val)),memGet(addr))],
        [   "MOV",    mem,     reg, 0x14, 2, (addr,val)=>memSet(regGet(val)		   ,addr)],
        [   "MOV",indiram,     reg, 0x15, 2, (addr,val)=>memSet(regGet(val)		   ,memGet(addr))],
        [   "MOV",    reg,   immed, 0x16, 2, (addr,val)=>regSet(val				   ,addr)], // 20 0x14
        [   "MOV",    reg,     mem, 0x17, 2, (addr,val)=>regSet(memGet(val)		   ,addr)],
        [   "MOV",    reg, indiram, 0x18, 2, (addr,val)=>regSet(memGet(memGet(val)),addr)],
        [   "MOV",    mem, indireg, 0x19, 2, (addr,val)=>memSet(memGet(regGet(val)),addr)],
        [   "MOV",indiram, indireg, 0x1A, 2, (addr,val)=>memSet(memGet(regGet(val)),memGet(addr))],
        [   "MOV",indireg,   immed, 0x1B, 2, (addr,val)=>regSet(val				   ,regGet(addr))], // 20 0x14
        [   "MOV",indireg,     mem, 0x1C, 2, (addr,val)=>regSet(regGet(val)		   ,regGet(addr))],
        [   "MOV",indireg, indiram, 0x1D, 2, (addr,val)=>regSet(memGet(memGet(val)),regGet(addr))],
        [       _,      _,    	 _, 0x1E, 0], // 30 0x1E
        [   "BRA",    reg,    	 _, 0x1F, 1, p1=>regSet(regGet(p1),REG_PP)],
		[   "BRA",    mem,    	 _, 0x20, 1, p1=>regSet(p1,REG_PP)],
        [   "BRA",indiram,    	 _, 0x21, 1, p1=>regSet(memGet(p1),REG_PP)],
		[   "BHI",    mem,    	 _, 0x22, 1],
        [   "B>0",    mem,    	 _, 0x23, 1,(addr)=>{if(((regGet(REG_RE)&WvInstr.FLAGPLUSou)!=0)&&((regGet(REG_RE)&WvInstr.FLAGZEROou)==0))regSet(addr,REG_PP);}], 
		[   "BCC",    mem,    	 _, 0x24, 1], 
		[   "BCS",    mem,    	 _, 0x25, 1],
		[   "BNE",    mem,    	 _, 0x26, 1],
		[   "BEQ",    mem,    	 _, 0x27, 1],
        [  "B==0",    mem,    	 _, 0x28, 1,(addr)=>{if((regGet(REG_RE)&WvInstr.FLAGZEROou)!=0)regSet(addr,REG_PP);}],
        [  "B!=0",    mem,    	 _, 0x29, 1,(addr)=>{if((regGet(REG_RE)&WvInstr.FLAGZEROou)==0)regSet(addr,REG_PP);}],
        [   "B<0",    mem,    	 _, 0x2A, 1,(addr)=>{if((regGet(REG_RE)&WvInstr.FLAGPLUSou)==0)regSet(addr,REG_PP);}],
		[   "BMI",    mem,    	 _, 0x2B, 1],
		[   "BGE",    mem,    	 _, 0x2C, 1],
		[  "B>=0",    mem,    	 _, 0x2D, 1,(addr)=>{if((regGet(REG_RE)&WvInstr.FLAGPLUSou)!=0)regSet(addr,REG_PP);}],		
		[   "SBR",    mem,    	 _, 0x2E, 1],			
		[   "RET",      _,   	 _, 0x2F, 0],
		[ "PUSHA",      _,   	 _, 0x30, 0],
		[ "PULLA",      _,   	 _, 0x31, 0],
		[ "PUSHB",      _,   	 _, 0x32, 0],
		[ "PULLB",      _,   	 _, 0x33, 0],
		[ "PUSHX",      _,   	 _, 0x34, 0],
		[ "PULLX",      _,   	 _, 0x35, 0],
		[ "PUSHY",      _,   	 _, 0x36, 0],
		[ "PULLY",      _,   	 _, 0x37, 0],
        [       _,      _,    	 _, 0x38, 0],
        [       _,      _,    	 _, 0x39, 0],
        [       _,      _,    	 _, 0x3A, 0],
        [       _,      _,    	 _, 0x3B, 0],
        [       _,      _,    	 _, 0x3C, 0],
        [       _,      _,    	 _, 0x3D, 0],
        [       _,      _,    	 _, 0x3E, 0],
        [       _,      _,    	 _, 0x3F, 0],
		[  "ASRX",      _,    	 _, 0x40, 0,(addr,val)=>WvInstr.regShiftRight( REG_X, 1)],  /* A - adressage inhérent */
		[  "ASLX",      _,    	 _, 0x41, 0,(addr,val)=>WvInstr.regShiftLeft ( REG_X, 1)],
        [       _,      _,    	 _, 0x42, 0],
		[  "DECX",      _,    	 _, 0x43, 0],
        [       _,      _,    	 _, 0x44, 0],	
		[  "INCX",      _,    	 _, 0x45, 0],
        [       _,      _,    	 _, 0x46, 0],	
		[  "ASRA",      _,    	 _, 0x47, 0,(addr,val)=>WvInstr.regShiftRight( REG_A, 1)],
		[  "ASLA",      _,    	 _, 0x48, 0,(addr,val)=>WvInstr.regShiftLeft ( REG_A, 1)],
        [       _,      _,    	 _, 0x49, 0],	
		[  "DECA",      _,    	 _, 0x4A, 0],
		[       _,      _,    	 _, 0x4B, 0],	
		[  "INCA",      _,    	 _, 0x4C, 0],
        [       _,      _,    	 _, 0x4D, 0],	
        [       _,      _,    	 _, 0x4E, 0],	
        [       _,      _,    	 _, 0x4F, 0],	
		[  "ASRY",      _,    	 _, 0x50, 0,(addr,val)=>WvInstr.regShiftRight( REG_Y, 1)],  /* B - adressage inhérent */
		[  "ASLY",      _,    	 _, 0x51, 0,(addr,val)=>WvInstr.regShiftLeft ( REG_Y, 1)],
        [       _,      _,    	 _, 0x52, 0],	
		[  "DECY",      _,    	 _, 0x53, 0],
        [       _,      _,    	 _, 0x54, 0],	
		[  "INCY",      _,    	 _, 0x55, 0],
        [       _,      _,    	 _, 0x56, 0],	
		[  "ASRB",      _,    	 _, 0x57, 0,(addr,val)=>WvInstr.regShiftRight( REG_B, 1)],
		[  "ASLB",      _,    	 _, 0x58, 0,(addr,val)=>WvInstr.regShiftLeft ( REG_B, 1)],
        [       _,      _,    	 _, 0x59, 0],	
		[  "DECB",      _,    	 _, 0x5A, 0],
        [       _,      _,    	 _, 0x5B, 0],	
		[  "INCB",      _,    	 _, 0x5C, 0],
        [       _,      _,    	 _, 0x5D, 0],
        [       _,      _,    	 _, 0x5E, 0],
        [       _,      _,    	 _, 0x5F, 0],
        [       _,      _,    	 _, 0x60, 0],   
        [  "LSRA",      _,       _, 0x61, 0,(addr,val)=>WvInstr.regShiftRight( REG_A, 0)],
        [  "LSLA",      _,       _, 0x62, 0,(addr,val)=>WvInstr.regShiftLeft ( REG_A, 0)],
        [  "LSRB",      _,       _, 0x63, 0,(addr,val)=>WvInstr.regShiftRight( REG_B, 0)],
        [  "LSLB",      _,       _, 0x64, 0,(addr,val)=>WvInstr.regShiftLeft ( REG_B, 0)],
        [  "LSRX",      _,       _, 0x65, 0,(addr,val)=>WvInstr.regShiftRight( REG_X, 0)],
        [  "LSLX",      _,       _, 0x66, 0,(addr,val)=>WvInstr.regShiftLeft ( REG_X, 0)],
        [  "LSRY",      _,       _, 0x67, 0,(addr,val)=>WvInstr.regShiftRight( REG_Y, 0)],
        [  "LSLY",      _,       _, 0x68, 0,(addr,val)=>WvInstr.regShiftLeft ( REG_Y, 0)],
        [       _,      _,    	 _, 0x69, 0],
        [  	"DEC",    reg,       _, 0x6A, 1],
        [       _,      _,    	 _, 0x6B, 0],
        [  	"INC",    reg,       _, 0x6C, 1],
        [       _,      _,    	 _, 0x6D, 0],
        [       _,      _,    	 _, 0x6E, 0],
        [       _,      _,    	 _, 0x6F, 0],
        [       _,      _,    	 _, 0x70, 0],
        [       _,      _,    	 _, 0x71, 0],
        [       _,      _,    	 _, 0x72, 0],
        [       _,      _,    	 _, 0x73, 0],
        [       _,      _,    	 _, 0x74, 0],
        [       _,      _,    	 _, 0x75, 0],
        [       _,      _,    	 _, 0x76, 0],
        [       _,      _,    	 _, 0x77, 0],
        [       _,      _,    	 _, 0x78, 0],
        [       _,      _,    	 _, 0x79, 0],
        [       _,      _,    	 _, 0x7A, 0],
        [       _,      _,    	 _, 0x7B, 0],
        [       _,      _,    	 _, 0x7C, 0],
        [       _,      _,    	 _, 0x7D, 0],
        [       _,      _,    	 _, 0x7E, 0],
        [       _,      _,    	 _, 0x7F, 0],
        [  "SUBA",  immed,       _, 0x80, 1],   /* A adressage inhérent */
        [  "CMPA",  immed,       _, 0x81, 1],
        [  "SBCA",  immed,       _, 0x82, 1],
        [       _,      _,       _, 0x83, 0],
        [  "ANDA",  immed,       _, 0x84, 1],
        [       _,      _,       _, 0x85, 0],
        [   "LDA",  immed,       _, 0x86, 1],
        [   "STA",  immed,       _, 0x87, 1],
        [  "EORA",  immed,       _, 0x88, 1], 	
        [  "ADCA",  immed,       _, 0x89, 1],
        [   "ORA",  immed,       _, 0x8A, 1],
        [  "ADDA",  immed,       _, 0x8B, 1],
        [  "CMPX",  immed,       _, 0x8C, 1],
        [       _,      _,       _, 0x8D, 0],
        [   "LDX",  immed,       _, 0x8E, 1],
        [   "STX",  immed,       _, 0x8F, 1],
        [  "SUBA",    mem,       _, 0x90, 1],   /* A adressage direct */
        [  "CMPA",    mem,       _, 0x91, 1],
        [  "SBCA",    mem,       _, 0x92, 1],
        [       _,      _,       _, 0x93, 0],
        [  "ANDA",    mem,       _, 0x94, 1],
        [       _,      _,       _, 0x95, 0],
        [   "LDA",    mem,       _, 0x96, 1],
        [   "STA",    mem,       _, 0x97, 1],
        [  "EORA",    mem,       _, 0x98, 1],
        [  "ADCA",    mem,       _, 0x99, 1],
        [   "ORA",    mem,       _, 0x9A, 1],
        [  "ADDA",    mem,       _, 0x9B, 1],
        [  "CMPX",    mem,       _, 0x9C, 1],
        [       _,      _,       _, 0x9D, 0],
        [   "LDX",    mem,       _, 0x9E, 1],
        [   "STX",    mem,       _, 0x9F, 1],
        [  "SUBA",    reg,       _, 0xA0, 1],   /* A adressage indexé */
        [  "CMPA",    reg,       _, 0xA1, 1],
        [  "SBCA",    reg,       _, 0xA2, 1],
        [       _,      _,       _, 0xA3, 0],
        [  "ANDA",    reg,       _, 0xA4, 1],
        [       _,      _,       _, 0xA5, 0],
        [   "LDA",    reg,       _, 0xA6, 1],
        [   "STA",    reg,       _, 0xA7, 1],
        [  "EORA",    reg,       _, 0xA8, 1],
        [  "ADCA",    reg,       _, 0xA9, 1],
        [   "ORA",    reg,       _, 0xAA, 1],
        [  "ADDA",    reg,       _, 0xAB, 1],
        [  "CMPX",    reg,       _, 0xAC, 1],
        [       _,      _,       _, 0xAD, 0],
        [   "LDX",    reg,       _, 0xAE, 1],
        [   "STX",    reg,       _, 0xAF, 1],
        [	    _,      _,    	 _, 0xB0, 0],
        [	    _,      _,    	 _, 0xB1, 0],
        [	    _,      _,    	 _, 0xB2, 0],
        [	    _,      _,    	 _, 0xB3, 0],
        [	    _,      _,    	 _, 0xB4, 0],
        [	    _,      _,    	 _, 0xB5, 0],
        [	    _,      _,    	 _, 0xB6, 0],
        [	    _,      _,    	 _, 0xB7, 0],
        [	    _,      _,    	 _, 0xB8, 0],
        [	    _,      _,    	 _, 0xB9, 0],
        [	    _,      _,    	 _, 0xBA, 0],
        [	    _,      _,    	 _, 0xBB, 0],
        [	    _,      _,    	 _, 0xBC, 0],
        [	    _,      _,    	 _, 0xBD, 0],
        [	    _,      _,    	 _, 0xBE, 0],
        [	    _,      _,    	 _, 0xBF, 0],
        [  "SUBB",  immed,       _, 0xC0, 1],   /* B adressage inherent */
        [  "CMPB",  immed,       _, 0xC1, 1],
        [  "SBCB",  immed,       _, 0xC2, 1],
        [       _,      _,       _, 0xC3, 0],
        [  "ANDB",  immed,       _, 0xC4, 1],
        [       _,      _,       _, 0xC5, 0],
        [   "LDB",  immed,       _, 0xC6, 1],
        [   "STB",  immed,       _, 0xC7, 1],
        [  "EORB",  immed,       _, 0xC8, 1],
        [  "ADCB",  immed,       _, 0xC9, 1],
        [   "ORB",  immed,       _, 0xCA, 1],
        [  "ADDB",  immed,       _, 0xCB, 1],
        [  "CMPY",  immed,       _, 0xCC, 1],
        [       _,      _,       _, 0xCD, 0],
        [   "LDY",  immed,       _, 0xCE, 1],
        [   "STY",  immed,       _, 0xCF, 1],
        [  "SUBB",    mem,       _, 0xD0, 1],   /* B adressage direct */
        [  "CMPB",    mem,       _, 0xD1, 1],
        [  "SBCB",    mem,       _, 0xD2, 1],
        [       _,      _,       _, 0xD3, 0],
        [  "ANDB",    mem,       _, 0xD4, 1],
        [       _,      _,       _, 0xD5, 0],
        [   "LDB",    mem,       _, 0xD6, 1],
        [   "STB",    mem,       _, 0xD7, 1],
        [  "EORB",    mem,       _, 0xD8, 1],
        [  "ADCB",    mem,       _, 0xD9, 1],
        [   "ORB",    mem,       _, 0xDA, 1],
        [  "ADDB",    mem,       _, 0xDB, 1],
        [  "CMPY",    mem,       _, 0xDC, 1],
        [       _,      _,       _, 0xDD, 0],
        [   "LDY",    mem,       _, 0xDE, 1],
        [   "STY",    mem,       _, 0xDF, 1],
        [  "SUBB",    reg,       _, 0xE0, 1],   /* B adressage indexé */
        [  "CMPB",    reg,       _, 0xE1, 1],
        [  "SBCB",    reg,       _, 0xE2, 1],
        [       _,      _,       _, 0xE3, 0],
        [  "ANDB",    reg,       _, 0xE4, 1],
        [       _,      _,       _, 0xE5, 0],
        [   "LDB",    reg,       _, 0xE6, 1],
        [   "STB",    reg,       _, 0xE7, 1],
        [  "EORB",    reg,       _, 0xE8, 1],
        [  "ADCB",    reg,       _, 0xE9, 1],
        [   "ORB",    reg,       _, 0xEA, 1],
        [  "ADDB",    reg,       _, 0xEB, 1],
        [  "CMPY",    reg,       _, 0xEC, 1],
        [       _,      _,       _, 0xED, 0],
        [   "LDY",    reg,       _, 0xEE, 1],
        [   "STY",    reg,       _, 0xEF, 1],
        [ 	"LDA",indiram,		 _, 0xF0, 1],
        [ 	"STA",indiram,		 _, 0xF1, 1],
        [ 	"LDB",indiram,		 _, 0xF2, 1],
        [ 	"STB",indiram,		 _, 0xF3, 1],
        [ 	"LDX",indiram,		 _, 0xF4, 1],
        [ 	"STX",indiram,		 _, 0xF5, 1],
        [ 	"LDY",indiram,		 _, 0xF6, 1],
        [ 	"STY",indiram,		 _, 0xF7, 1],
        [       _,	    _,    	 _, 0xF8, 0],
        [       _,	    _,    	 _, 0xF9, 0],
        [       _,	    _,    	 _, 0xFA, 0],
        [       _,	    _,    	 _, 0xFB, 0],
        [       _,	    _,    	 _, 0xFC, 0],
        [       _,	    _,    	 _, 0xFD, 0],
        [       _,	    _,    	 _, 0xFE, 0],
        [       _,	    _,    	 _, 0xFF, 0]

	];
	
};
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************

//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************

//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
function WvAssembler(){}
	

//char WvAssembler.label[100][40];		
WvAssembler.label = new Array(1000);
WvAssembler.nblabel=0;						// Initialisé avant chaque compile
WvAssembler.poslabel = new Array(1000);
WvAssembler.ramass = 32;
WvAssembler.labelWaiting = new Array(1000);
WvAssembler.labelWaitingPos = new Array(1000);
WvAssembler.labelWaitingNb=0

WvAssembler.ligne;
WvAssembler.point_virgule_ascii = ";".charCodeAt(0);
WvAssembler.deux_points_ascii = ":".charCodeAt(0);
WvAssembler.guillemet_ascii = 34;
WvAssembler.back_slash_ascii = 92;
WvAssembler.diese_ascii = "#".charCodeAt(0);
WvAssembler.bigger_ascii = ">".charCodeAt(0);
WvAssembler.parenteseopen_ascii = "(".charCodeAt(0);
WvAssembler.parenteseclose_ascii = ")".charCodeAt(0);
WvAssembler.bracketopen_ascii = "[".charCodeAt(0);
WvAssembler.and_ascii = "&".charCodeAt(0);
WvAssembler.exclam_ascii = "!".charCodeAt(0);
WvAssembler.dollard_ascii = "$".charCodeAt(0);
WvAssembler.zero_ascii = "0".charCodeAt(0);
WvAssembler.neuf_ascii = "9".charCodeAt(0);

WvAssembler.a_min_ascii = "a".charCodeAt(0);
WvAssembler.b_min_ascii = "b".charCodeAt(0);
WvAssembler.x_min_ascii = "x".charCodeAt(0);
WvAssembler.y_min_ascii = "y".charCodeAt(0);
WvAssembler.z_min_ascii = "z".charCodeAt(0);

WvAssembler.a_maj_ascii = "A".charCodeAt(0);
WvAssembler.b_maj_ascii = "B".charCodeAt(0);
WvAssembler.f_maj_ascii = "F".charCodeAt(0);
WvAssembler.m_maj_ascii = "M".charCodeAt(0);
WvAssembler.r_maj_ascii = "R".charCodeAt(0);
WvAssembler.x_maj_ascii = "X".charCodeAt(0);
WvAssembler.y_maj_ascii = "Y".charCodeAt(0);
WvAssembler.z_maj_ascii = "Z".charCodeAt(0);
/**
 * Compile lescript
 * Cette couche de instrDesction sert à recupérer et afficher les erreurs
 */
WvAssembler.compilerScript=function(scriptP){
															//----------------------------------------
	//TODO system("EDIT PROGRAM.ASM");						// 				Initialisation
	WvAssembler.nblabel = 0;								// Nombre d'étiquettes
	WvAssembler.labelWaitingNb =0;
	WvAssembler.ramass = 16;								// Position de la mémoire à écrire
	AsmDatas.breakPointsRefrech();							// Reinitialise la table des points-d'arrêt
	WvAssembler.errorInit();
															//----------------------------------------
	WvAssembler.compilerLignes(scriptP.split(/\r?\n/));		// Découpe le scripte en lignes

	WvAssembler.errorDisplay();	
}
/**
 * Compile les lignes
 */
WvAssembler.compilerLignes=function(lignes)
{
	let nbLignes = lignes.length;							//---------------------------------------
	for(let i=0; i<nbLignes;i++){							// Pour chaque ligne non-vide
		let ligne = WvAssembler.ligne = lignes[i].trim(); 
		if(ligne.length<1|| ligne.charCodeAt(0)==WvAssembler.point_virgule_ascii) continue;
															//****************************************
		WvAssembler.compilerInstr(ligne);					// Compiler la ligne : c'est une instruction
	}														//****************************************
	AsmDatas.ramPutValue(0x20,WvAssembler.ramass++);			// En fin de script, ajout d'un branchement vers 0
	AsmDatas.ramPutValue(  0 ,WvAssembler.ramass++);
	WvAssembler.searchAllLabelPos();						// Recherche la postion des étiquettes en attente 
															// Transfère la table-RAM du compilateur 
															//     vers la table-RAM du Cristalputer
	WvInstr.regSet ( 0x10, WvInstr.REG_PP_NUM );			// Positione le programme sur la mémoire 16
	AsmEditor.breakPointsDisplay();							// Affiche les points d'arrêt
}
WvAssembler.REFEXP_DECOUPE_SPACE_COMA=new RegExp("\\s+|\\,");// Découpe la ligne par espaces et virgules

/**
 * Compiler une Instruction
 * La ligne est convertie en langage machine. Les codes sont inscrits dans la RAM
 */	
WvAssembler.compilerInstr=function(ligneP)
{
	ligneP = ligneP.trim();
	let lgLigne = ligneP.length;
	let car;
	let carHtml;
	let pos;
	//--------------------------------------------------------------------------------
	//	Texte dans le script	
	//--------------------------------------------------------------------------------
	if(ligneP.charCodeAt(0)==WvAssembler.guillemet_ascii){	// Si le texte est entre guillemet
		for(let i=WvAssembler.HTML_QUOTE_LG; i<lgLigne;i++){// Pour chaque caractère
		    car = ligneP.charCodeAt(i);						//----------------------------------------
			if(car==WvAssembler.guillemet_ascii){return;}	// Rencontre le guillemet de fin -> Quitter
															//----------------------------------------
			if(car==WvAssembler.back_slash_ascii){			// Vérifie les caratères d'échappement '\'
				if(++i >= lgLigne){break;}					// Si fin de ligne atteinte -> Quitter					
				car = ligneP.charCodeAt(i);					// R2cupérer le caaractère suivant
			}												//----------------------------------------
			if(ligneP.charCodeAt(i)==WvAssembler.and_ascii){// Codage-html : &...; 
				pos = ligneP.indexOf(";", i);				// possitiondd e fin de code
				carHtml = WvAssembler.getHtmlCode(ligneP.substring(i, pos+1));
				if(carHtml!=0){								// Si le code et reconnu
					i = pos;								// => Saut en fin de codage-html
					car = carHtml;							// => recupère le caractère			
				}
			}
			AsmDatas.ramPutValue(car,WvAssembler.ramass++);		// Place le caractère dans la RAM
		}
		return;
	}
	//--------------------------------------------------------------------------------
	//	BREAK POINT SEUL DANS UNE LIGNE DU SCRIPT	
	//--------------------------------------------------------------------------------
	if(ligneP.length== 1 && ligneP.charCodeAt(0)==WvAssembler.exclam_ascii){
		AsmDatas.breakPointsMems[WvAssembler.ramass]=true;	// active l'arrêt dans la table des points-d'arrêt  
		return;
	}
	//--------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------
	ligneP = ligneP.split(";")[0];							// Supprime les commentaire placés derrière ';'
	if (!ligneP || ligneP.trim().length<1) return;			
															// Dédoupe la ligne
	let mots = ligneP.split(WvAssembler.REFEXP_DECOUPE_SPACE_COMA);
	let nbMots = mots.length;

	let mot0 = mots[0];										// 1er mot
	let lgMot=mot0.length;
	//--------------------------------------------------------------------------------
	//	BREAK POINT '!' DEBUT DE LIGNE DU SCRIPT	
	//--------------------------------------------------------------------------------
	if(mot0.charCodeAt(0)==WvAssembler.exclam_ascii){
		AsmDatas.breakPointsMems[WvAssembler.ramass] = true;// Mémorise le point d'arrêt
		if(lgMot>1){										// si '!' colle à l'instruction
			mot0 = mot0.substring(1,lgMot);				// => simplement suppression du '!'
		}else{
			mots.shift();
			nbMots--;										// Sinon=> décalage de tous les items de la ligne
			mot0 = mots[0];
		}
		lgMot=mot0.length;
	}

	//--------------------------------------------------------------------------------
	//	LABEL ':' DANS SCRIPT	
	//--------------------------------------------------------------------------------
	if (mot0.charCodeAt(lgMot-1) == WvAssembler.deux_points_ascii) {
															// Supprime ':' puis mémorise le nom de l'étiquette dans un tabeau
		WvAssembler.label[WvAssembler.nblabel] = mot0.substring(0,lgMot-1);
															// Mémorise la position l'étiquette dans un secon tableau
		WvAssembler.poslabel[WvAssembler.nblabel++] = WvAssembler.ramass;  // Important : à la même position que le nom
		return;												// La ligne est traitée, quitter
	}
	//--------------------------------------------------------------------------------
	//	LIGNE DE DONNEES	
	//--------------------------------------------------------------------------------
	car = mot0.charCodeAt(0);
	if (car >= WvAssembler.zero_ascii && car <= WvAssembler.neuf_ascii){
		AsmDatas.ramPutValue(mot0,WvAssembler.ramass++);
		return;
	}
	//--------------------------------------------------------------------------------
	//	INSTRUCTION DANS SCRIPT	
	//--------------------------------------------------------------------------------
															// Récupération des types des paramètres
															// Les signes-de-type - '#([' sont supprimés
	let type1 = (nbMots > 1)? WvAssembler.paramBuild(mots,1):"";
	let type2 = (nbMots > 2)? WvAssembler.paramBuild(mots,2):"";
															// Récupération des proriétés de l'instructions
	let instrCode = WvInstrDesc.id.indexOf(mot0+"@"+type1+"@"+type2);
	if(instrCode>=0){
		let instrDesc =	WvInstrDesc.instrs[instrCode];		// instrDesc / description des propriétés de l'instruction
		AsmDatas.ramPutValue(instrDesc.code,WvAssembler.ramass++);// Inscription du code de l'instruction dans la RAM 
		if (instrDesc.nbParam > 0) {
			AsmDatas.ramPutValue(mots[1],WvAssembler.ramass++);// Inscription du 1er paramètre dans la RAM 
		}
		if (instrDesc.nbParam > 1) {
			AsmDatas.ramPutValue(mots[2],WvAssembler.ramass++);// Inscription du second paramètre dans la RAM
		}
	}else{
		WvAssembler.errorAdd(WvAssembler.ramass," ' "+ligneP+"' - instruction inconnue");
	}
}
WvAssembler.HTML_QUOTE = "\"";
WvAssembler.HTML_QUOTE_LG = WvAssembler.HTML_QUOTE.length;
WvAssembler.HTML_CODES	= ["&quot;","&amp;"];
WvAssembler.HTML_ASCIIS = ["\"".charCodeAt(0),"&".charCodeAt(0)];
/**
 * Recherche un caractère codé-HTML pour le traduire en ascii
 */
WvAssembler.getHtmlCode=function(codeP){
	let codePos = WvAssembler.HTML_CODES.indexOf(codeP);
	return (codePos >= 0)? WvAssembler.HTML_ASCIIS[codePos]:0;
};
WvAssembler.PARAM_REG_NAME  = [ 'A' , 'B' , 'X' , 'Y' , 'RE' ,'PP' , 'PI' ];
/**
 * Construit le paramètre : #-immédiat, (-[-indirect ou direct
 * Et supprime les signes - # ( [ - dans la paramère
 * Puis, pour les étiquettes,  recherche la position
 * Note : si le paramètre est absent, retourne "" - pour construire l'indentifiant de l'instruction
 */
WvAssembler.paramBuild=function(wordP, numP){				
		let word=wordP[numP]; 								// Récupère le paramètre,
		if(!word || word.length<1){return "";}				// Si il est null - retourne ""
		let regNum;											// Numéro de registre 
		switch (word.charCodeAt(0)){						//----------------------------------------
		  case WvAssembler.diese_ascii :					// Valeur immediate
			wordP[numP] = WvAssembler.toInt(word.substring(1).trim()); // Supprime le '#' et 							
			return WvAssembler.diese_ascii;
															//----------------------------------------
		  case WvAssembler.bracketopen_ascii :				// Adressage indirect
		  case WvAssembler.parenteseopen_ascii :
			word = word.substring(1, word.length-1).trim();			
			if((regNum=WvAssembler.PARAM_REG_NAME.indexOf(word))>=0){
				wordP[numP]=regNum;
				return WvAssembler.bigger_ascii;
			}
			wordP[numP] = WvAssembler.toInt(word);
			return WvAssembler.parenteseopen_ascii;			
															//----------------------------------------
		  default:											// Adressage direct
			if((regNum=WvAssembler.PARAM_REG_NAME.indexOf(word))>=0){
				wordP[numP]=regNum;
				return WvAssembler.r_maj_ascii;		
			}
			wordP[numP] = WvAssembler.toInt(word);
			return WvAssembler.m_maj_ascii;
		}
		
}	
/**
 * Convertit la valeur en entier décimal.
 * - décimale : retourne lui-même
 * - hexadécimal : calcule sa valeur décimale. ex: $10 retournera 16
 * - Une étiqutette retournera retourner l'adresse de déclaration de l'étiquettes
 *   Note : si l'étiquette n'est pas encore déclarée, elle est mémoristée dans "WvAssembler.labelWaiting"
 */
WvAssembler.toInt=function(txt){
	let car0 = txt.charCodeAt(0);							// Prélève le 1er caractère 
															//----------------------------------------
															// C'est un nombre décimal
	if (car0 >= WvAssembler.zero_ascii && car0 <= WvAssembler.neuf_ascii) return Number(txt);
	
	if (car0 == WvAssembler.dollard_ascii) {				//----------------------------------------
		return parseInt(txt.substring(1),16);				// C'est un nombre héxadécimal
	}
															//----------------------------------------
															// C'est un Label
	if (   (car0 >= WvAssembler.a_maj_ascii && car0 <= WvAssembler.z_maj_ascii)
		|| (car0 >= WvAssembler.a_min_ascii && car0 <= WvAssembler.z_min_ascii)){
		for (let j=0; j < WvAssembler.nblabel; j++) {		// Recherche un label déjà inscrit 
			if (WvAssembler.label[j]== txt) {
				return WvAssembler.poslabel[j];				// Si oui => retourne la position du label
			}
	   }													// Si non (le laable est déclaré dans l suite du script)
	   WvAssembler.labelWaiting[WvAssembler.labelWaitingNb]=txt; // => mémorise le label "en attente" 
	   WvAssembler.labelWaitingPos[WvAssembler.labelWaitingNb++]=WvAssembler.ramass;
	   return 0;
	}
	WvAssembler.errorAdd ( "'"+WvAssembler.ligne+"'  '"+text+"'- valeur inconnue" );
	//printf("\n'%s' - valeur inconnue", WvAssembler.ligne);
	//getch();
	return 0;
}
/**
 * Cherche les balises qui n'ont pas été déclarés avant leur appel.
 */
WvAssembler.searchAllLabelPos=function()
{
	let fl;
	let j;													
	for (let i=0; i < WvAssembler.labelWaitingNb; i++){// Pour toutes les étiquttes en attente
		fl = WvAssembler.labelWaiting[i];					// Récupère le nom de l'étiquette
		j = WvAssembler.label.indexOf(fl);					// Cherche ce nom dans la table des étiquettes du script
		if(j>=0)											// => si trouvé, place cette position dans la ram
			AsmDatas.ramPutValue(WvAssembler.poslabel[j],WvAssembler.labelWaitingPos[i]);
		else												// => sino , erreur !
			WvAssembler.errorAdd("", "'"+fl+"' - WvAssembler.label inconnu" );			
	}
}
WvAssembler.errorInit=function(){WvAssembler.errors=[];}
WvAssembler.errorAdd=function(messageP, posP){
	WvAssembler.errors.push("ERREUR : "+posP+" "+messageP);
}
WvAssembler.errorDisplay=function(){
	WvAssembler.errors.forEach((messageP)=>console.log(messageP));
}
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
<<<<<<< HEAD
//**											COMMANDES EXTERNES
=======
//										T O O L : AJOUTE-TYPE  COMMANDES				
>>>>>>> dc1731d19647b380a6b1f43ea1a8004120d97022
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
//****************************************************************************************************************************
<<<<<<< HEAD
/*
- regSet("val, numRegistre")
- ramSet("val, numOctet")
- regGet(numRegistre)
- ramGet(numOctet)
- ramAreaSet ("val1,val2,val3,...; pos_start")
- scriptGet()
- scriptSet("script")
- scriptCompil()
- exe1step()
- exeStepByStep()
- exeStepByStepStop
- exe()
- displayType(numType) 
	0=decimal, 1=hexadécimal, 2=interrupteurs(binaire)
- refreshDisplay()
*/
//_________________________
WvEmbedEvent.ERROR_TYPE_DISPLAY		= 0;
WvEmbedEvent.ERROR_TABVAL_NOT_TAB	= 1;
WvEmbedEvent.ERROR_TABVAL_NOT_3		= 2;
WvEmbedEvent.ERROR_TABVAL0_NOT_TAB	= 3;
WvEmbedEvent.ERROR_TABVAL1_NOT_START= 4;
WvEmbedEvent.ERROR_VAL_CASE			= 5;
WvEmbedEvent.ERROR_VAL_CASE_MAX		= 6;
WvEmbedEvent.ERROR_CASE_MAX			= 7;
WvEmbedEvent.ERROR_SCRIPT_ERROR		= 8;

WvEmbedEvent.MESSAGES=[
	"displayType(message) * Type d'affichage des valeurs erroné. message=/%1/\n   attendu 0=décimal,1=héxa et 2=interrupteurs",
	"tabVal2Ram(message) * message doit être un tableau : %1\n format : [[val0,val1,val2...], début, fin]",
	"tabVal2Ram(message) * le tableau-message daoit compoter 2 cases : %1\n format : [[val0,val1,val2...], début]",
	"tabVal2Ram(message) * la case #0 de message doit être un tableau : %1\n format : [[val0,val1,val2...], début]",
	"tabVal2Ram(message) * la case #1 indique le début de la zone à poser : %1\n format : [[val0,val1,val2...], début]",
	"%1(message) * message doit être un tableau à 2 case : %2\n format : [valeur, numCase]",
	"%1(message) * 'val' et 'octetNum' sont des entiers compris dans [0,%4]: val=%2, octetNum=%3\n format : [valeur, numCase]",
	"%1(message) * 'numOctet' doit être un nombre compris dans [0,%3] : %2\n format : numCase",
	"%1(message) * 'script' inscrit dans la zone de saisie script, devrait etre un texte :\n /%2/",
];
WvEmbedEvent.DISPLAY_TYPE = {n:0,d:0,e:0,h:1,i:2,b:2};

/**
 * Ecrit une valeur dans une mémoire de la RAM.
 * paramètre / tableau : [valeur 0 à 255, numOctet 0 à 255]
 */
WvEmbedEvent.ramSet=function(messageP){
	let params = WvEmbedEvent.paramInt2(messageP, 0,255, 0,255,"ramSet", "valeur", "num-mémoire");
	AsmDatas.ramPutValue( params[0] , params[1]);
	return true;
}
/**
 * Lit la valeur d'une mémoire de la RAM
 * Paramètre / String
 * - int octetNum : numéro d'octet à lire
 */
WvEmbedEvent.ramGet=function(messageP, returnP){
	return AsmDatas.ramGetValue(WvEmbedEvent.paramInt( messageP,"ramGet()", "numero de mémoire", 0,255));
}
/**
 * Lit la valeur d(un registre
 * Paramètre / String
 * - int regNum : numéro d'octet à lire
 */
WvEmbedEvent.regGet=function(messageP, returnP){
	return AsmDatas.regGetValue(WvEmbedEvent.paramInt( messageP,"ramGet()", "numero de mémoire", 0,7));
}
/**
 * Ecrit une valeur dans un registre.
 * pramètre / tableau : [valeur, numRegistre 0à7]
 */
WvEmbedEvent.regSet=function(messageP){
	let params = WvEmbedEvent.paramInt2(messageP, 0,255, 0,7,"regSet", "valeur", "num-mémoire");
	AsmDatas.regPutValue( params[0] , params[1]);
	return true;
}
/**
 * Remplit une zone de la RAM
 * Paramètres :
 * - messageP / tableau = [[mems], start]
 *				ou "v0,v1,v2...;start"
 *		- mems : suite de nombres à placer dans la mémoire
 * 		- position de départ de la pause 
 */
WvEmbedEvent.ramAreaSet=function(messageP, returnP, numType){
	messageP=WvEmbedEvent.paramTab(messageP, "ramAreaSet", "valeurs, start", ';');
	let tab = WvEmbedEvent.paramTabInt(messageP[0], "ramAreaSet", "valeurs", ',', 0, 255);
	let start = WvEmbedEvent.paramInt(messageP[1], "ramAreaSet", "start", 0, 255);
	AsmDatas.tabVal2Ram( tab , start);
	return true;
}
/**
 * Lit le programme inscrit dans la zone script 
 * Aucun paramètre
 */
WvEmbedEvent.scriptGet=function(){
	return AsmEditor.scriptRead();
}
/**
 * Ecrit un programme dans la zone script 
 * Paramètre / string
 * - Texte à écrire dans la zone script
 */
WvEmbedEvent.scriptSet=function(scriptP){
	return AsmEditor.scriptWrite(WvEmbedEvent.paramString( scriptP,"scriptSet()", "script"));
}
/**
 * Compile le programme inscrit dans la zone script 
 * Paramètre / string
 * - Texte à écrire dans la zone script
 */
WvEmbedEvent.scriptCompiler=function(messageP, returnP){
	return AsmEditor.scriptCompiler();
}
/**
 * Avance l'exécution du programme d'une instruction
 * Aucun paramètre
 */
WvEmbedEvent.exe1step=function(){AsmEditor.exe1step();return true;};
WvEmbedEvent.exeStepByStep=function(messageP, returnP){
	AsmEditor.exeStepByStep();	
}
/**
 * Exécute le programme pas-à-pas
 * Aucun paramètre
 */
WvEmbedEvent.exeStepByStepStop(messageP, returnP){AsmEditor.exeStepByStepStop();return true;};
/**
 * Exécute le programme jusqu'au point d'arrêt
 * Aucun paramètre
 */
WvEmbedEvent.exe=function(messageP, returnP){AsmEditor.exe();return true;};
/**
 * Rafraichit les mémoires. 
 * Aucun parammètre
 */
WvEmbedEvent.refreshDisplay=function(){AsmEditor.refreshDisplay();return true;};
/**
 * Modife le type d'affichage : 
 * Paramètre / String : 
 * - message/type : 0=décimal,1=héxa et 2=interrupteurs
 */
WvEmbedEvent.displayType=function(messageP, returnP){
	if(messageP===null || messageP===undefined) {
		WvEmbedEvent.wEmbedError(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_TYPE_DISPLAY], "<inconnu>");		
	}
	let n = parseInt(messageP);
	if(!isNaN(n)){
		if (n<0 || n>2){n=-1;}
	}else{
		n=-1;
		if(messageP.length && messageP.length>0){ 
			n = WvEmbedEvent.DISPLAY_TYPE[messageP.substring(0,1).toLowerCase()];
			if(n==null || n==undefined) n=-1;
		}
	}
	if(n<0){
		WvEmbedEvent.wEmbedError(WvEmbedEvent.MESSAGES[WvEmbedEvent.ERROR_TYPE_DISPLAY], messageP);
	}
	AsmEditor.displayType(n);
	return true;
};

=======

//****************************************************************************************************************************
// Pour la converstion de fichers AS -> JSON
// 1 - Après avoir indiqué le type JS aux dééclarations de variables 
//      Exemple : <AS> static toto:Machina => <JS> Machina.toto
// 2 - "AsmDatas.toType()"  recherche toutes les occurence de cette variable pour lui attribute sont TYPE
//		Exemple : <AS> fc(toto) => <JS> fc(Machina.toto)  
// Le résultat est dans la console.
//****************************************************************************************************************************
AsmEditor.a_maj_ascii = "A".charCodeAt(0);
AsmEditor.z_maj_ascii = "Z".charCodeAt(0);
AsmEditor.a_min_ascii = "a".charCodeAt(0);
AsmEditor.z_min_ascii = "z".charCodeAt(0);
AsmEditor._0_ascii = "0".charCodeAt(0);
AsmEditor._9_ascii = "9".charCodeAt(0);
AsmEditor.___ascii = "_".charCodeAt(0);
AsmEditor.pt_ascii = ".".charCodeAt(0);
AsmEditor.ptv_ascii = ";".charCodeAt(0);


AsmEditor.toType=function(s){
	if (!confirm("Conversion de script AS -> JS.\nAvez-vous déjà typé les déclarations de variable?\n")) {
		return;
	}
	let label = "assembleur.";
	let labelLg = label.length;
	let pos=0, posPt, posEgal, nom, posFin;
	let sOut = s;
	let nomsVus = [];
	while(true){
		pos = s.indexOf(label,pos); if(pos<0) break;
		pos+=labelLg;
		posPt = s.indexOf(";",pos); if(posPt<0) {alert("j'attends un ';' "+s.substring(pos,pas+100)); return;}
		posEgal = s.indexOf("=",pos+1);
		if(posEgal==-1 || posEgal>posPt) posFin=posPt;
		else							 posFin=posEgal;
		nom = s.substring(pos,posFin).trim();
		if(nomsVus.indexOf(nom)>=0) continue;
		sOut = AsmEditor.toTypeNom(nom,label,sOut);
		pos=posFin;
		nomsVus.push(nom);
	}
	console.log(sOut);
};
AsmEditor.toTypeNom=function(nom,label,s){
	let nomLg = nom.length;
	let labelLg = label.length;
	let posNext= nomLg+labelLg;
	let pos=0;
	while(true){
		pos=s.indexOf(nom, pos); if(pos<0) break;
		let car = s.charCodeAt(pos-1);
		if(car==AsmEditor.pt_ascii){pos+=nomLg;continue;}
		if(  (car>=AsmEditor.a_maj_ascii && car<=AsmEditor.z_maj_ascii)
		   ||(car>=AsmEditor.a_min_ascii && car<=AsmEditor.z_min_ascii)
 	       ||(car>=AsmEditor._0_ascii && car<=AsmEditor._9_ascii)
		   || car == AsmEditor.___ascii){pos+=nomLg;continue;}
		car = s.charCodeAt(pos+nomLg); 
		if(  (car>=AsmEditor.a_maj_ascii && car<=AsmEditor.z_maj_ascii)
		   ||(car>=AsmEditor.a_min_ascii && car<=AsmEditor.z_min_ascii)
 	       ||(car>=AsmEditor._0_ascii && car<=AsmEditor._9_ascii)
		   || car == AsmEditor.___ascii) {pos+=nomLg;continue;}

		s=s.substring(0,pos)+label+s.substring(pos);
		pos+=posNext;
	} 
	return s;
};
AsmEditor.commands=function(commandP){
		if(commandP==null) commandP=AsmEditor.input.value;;
		if((commandP=commandP.trim()).length<1){
			alert("script de commandes\nnom_instr1,param1,param2...;nom_instr2,param1,param2...;...\nExemple : ramPutValues(12, 123,654,78; exe;");
			return;
		}
		let command = commandP.substring(0,2); if(command=="2t" || command=="2T") {AsmEditor.toType(commandP); return;}
		
		let comms = commandP.split(";");
		let nb = comms.length;
		for(let i=0; i<nb; i++){
			let comm = comms[i].trim();
			if(comm.length<1) continue;
			AsmEditor.command(comm);
		}
};
AsmEditor.command=function(commandP){

		if(commandP.trim().length<1){
			return;
		}
		let fc = commandP.split(",");
		let nom = fc[0].trim();
		//console.log(nom.substring(0,2));
		if(nom.length>=2 && nom.substring(0,2)=="//") return;
		if(AsmEditor[nom]==null){
			alert("script de command - commande '"+nom+"' inconnue\n Voir inspect/debug");
			console.log("Les commandes :\n"+
			"    ramPutValues ou ST,num-ram,val1,val2...\n"+
			"    regPutValues ou LD,num-ram,val1,val2...\n"+
			"    exe ou EXE ; execute 1 instruction\n"+
			"    asmCompiler ou ASM,instr1,instr2... ; Compile une script assembleur\n"+
			"    2t,script : ajoute le type devant les variables\n"+
			"");
			return;
		}
		AsmEditor[nom](fc); 
};
AsmEditor.ST=function(paramsP){AsmEditor.ramPutValues(paramsP);};
AsmEditor.ramPutValues=function(paramsP){
		let start = parseInt(paramsP[1]);
		if(start<0 || start>=256){
			alert("start (1er paramètre) doit être compris entre 0 et 255");
			return;
		}
		let nb = paramsP.length;
		for(let i=2; i<nb; i++){AsmDatas.ramPutValue(parseInt(paramsP[i]), start++);}
		
};
AsmEditor.LD=function(paramsP){AsmEditor.regPutValues(paramsP);};

AsmEditor.regPutValues=function(paramsP){
		let start = parseInt(paramsP[1]);
		if(start<0 || start>=7){
			alert("start (1er paramètre) doit être compris entre 0 et 255");
			return;
		}
		let nb = paramsP.length;
		for(let i=2; i<nb; i++){AsmDatas.regPutValue(parseInt(paramsP[i]), start++);}
		
};
AsmEditor.EXE1=function(paramsP){WvInstr.exePP();};
AsmEditor.exe1=function(paramsP){WvInstr.exePP();};
AsmEditor.ASM=function(paramsP){AsmEditor.asmCompiler(paramsP);};
AsmEditor.asmCompiler=function(paramsP){
	paramsP[0]=";"+paramsP[0];
	WvAssembler.compilerLignes(paramsP);
};

AsmEditor.scriptCompiler_=function(paramsP){
	paramsP[0]=";"+paramsP[0];
	WvAssembler.compilerScript(paramsP);
};



>>>>>>> dc1731d19647b380a6b1f43ea1a8004120d97022
