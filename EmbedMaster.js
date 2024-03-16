function EmbedMaster(){}
EmbedMaster.test=function(){testA(); alert("Hello OK");}
EmbedMaster.exec=async function(messageP, fonctionP){
	let txt = messageP.trim();
	if(txt.charAt(0)=='['){
		try{
			messageP = JSON.parse(messageP);
		}catch(e){alert("JSON ERROR"); return;}
	}
	if(txt.charAt(0)=='&'){
		messageP = parseInt(messageP.substring(1));
	}
	try{													// Gestion des erreurs classique
		let result = await window.wvEmbedRequest.postWait(messageP, fonctionP, 1000000);
		alert("A fin "+result.answer);						// La réponse est placée dans le "retour"
	}catch(e){
		alert("ERROR \n"+e);								// Traitement des erreurs.
	}														// - e : est un tableau 
	//alert(messageP+" "+fonctionP);
}
/*********************************************************************************************************************
 *										 *Exemple* de script de messagerie asynchrone
 ********************************************************************************************************************/
 // Exempled e script asynchrone
 // Point d'entrée de la requète : window.wvEmbedRequest.postWait 
 // Paramètres
 // - Message
 // - nom de la fonction exécutée dans l'embed
 // - délai (optionnel) : délai maximum d'attente
 //                       si omis la valeur par défaut est de 3 secondes 
async function testA(){										// Fonction asynchrone
	try{													// Gestion des erreurs classique
		let embed_ = window.wvEmbedRequest;			// Appel dans une variable : pour lisibilité
															//________________________________________
															// 1ère requète
															// La fonstion appelée dans l'embed pause 2 secondes
															//   message  fonction ici	 délai max							
		//let result = await embed_.postWait("new Error", "onEmbed1", 1000000); // Error générée
		let result = await embed_.postWait(0, "scriptWrite", 1000000);
		alert("A fin "+result.answer);						// La réponse est placée dans le "retour"
															// 		Note : ce "retour" est composé de 
															//      result.answer et result.question
															//________________________________________
															// 2ème requète
		result = await embed_.postWait("Il fait beau2", "onEmbed2", 1000000,);
		alert("A fin2 "+result.answer);						// Traitement de la réponse
	}catch(e){
		alert("FIN "+e); 									// Traitement des erreurs.
	}														// - e : est un tableau 
};															//   - e.result.answer
															//   - e.result.question
															//   - e.result.errors
															//		- e.result.errors[0][0] 1er  message d'erreur
															//		- e.result.errors[1][0] 2ème message d'erreur