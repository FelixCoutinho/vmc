var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');
var merge = require('merge'),
	original, cloned;

var data = JSON.parse(fs.readFileSync('designacoes_201501.json', 'utf8'));

var amount = data.length;
var per_page = 4;
var pages_total = Math.ceil(amount / per_page);

var pages = [];

for (var i = 0; i < amount; i = i + per_page) {
	pages.push(data.slice(i, (i + per_page)));
};

var finalJson = [];
for (var i = 0; i < pages.length; i++) {
	var subFinalJson = {};
	for (var j = 0; j < pages[i].length; j++) {
		var objectDesire = pages[i][j];
		if (objectDesire.designacao === 'Presidente') {
			objectDesire.outra = true;
			objectDesire.outraTexto = objectDesire.designacao;
			objectDesire.designacao = undefined;
		} else if (objectDesire.designacao === 'Leitura') {
			objectDesire.leitura = true;
			objectDesire.designacao = undefined;
		} else if (objectDesire.designacao === 'Primeira visita') {
			objectDesire.primeiraVisita = true;
			objectDesire.designacao = undefined;
		} else if (objectDesire.designacao === 'Revisita') {
			objectDesire.revisita = true;
			objectDesire.designacao = undefined;
		} else if (objectDesire.designacao === 'Estudo bíblico') {
			objectDesire.estudo = true;
			objectDesire.designacao = undefined;
		}
		if (objectDesire.proferido === 'A') {
			objectDesire.salaoPrincipal = true;
			objectDesire.proferido = undefined;
		} else if (objectDesire.proferido === 'B') {
			objectDesire.salaB = true;
			objectDesire.proferido = undefined;
		} else if (objectDesire.proferido === 'C') {
			objectDesire.salaC = true;
			objectDesire.proferido = undefined;
		}
		var stringfied = JSON.stringify(objectDesire);
		var array_string = JSON.parse(stringfied
			.replace('data', 'data' + (j + 1))
			.replace('nome', 'nome' + (j + 1))
			.replace('ajudante', 'ajudante' + (j + 1))
			.replace('caracteristica', 'caracteristica' + (j + 1))
			.replace('outra', 'outra' + (j + 1))
			.replace('outraTexto', 'outraTexto' + (j + 1))
			.replace('leitura', 'leitura' + (j + 1))
			.replace('primeiraVisita', 'primeiraVisita' + (j + 1))
			.replace('revisita', 'revisita' + (j + 1))
			.replace('estudo', 'estudo' + (j + 1))
			.replace('salaoPrincipal', 'salaoPrincipal' + (j + 1))
			.replace('salaB', 'salaB' + (j + 1))
			.replace('salaC', 'salaC' + (j + 1)));
		subFinalJson = merge(subFinalJson, array_string);
	};
	finalJson.push(subFinalJson);
};

// for (var key in finalJson) {
// 	var page_data = finalJson[key];
// 	for(var key in page_data){
// 		if(key === 'designacao' && page_data[key] === 'Presidente'){
// 			console.log(key);
// 		}
// 	}
// }

//console.log(finalJson);

for (var key in finalJson) {
	var page_data = finalJson[key];
	var pdf = pdfFillForm.writeSync('S-89-T-4up-edited.pdf', page_data, {
		"save": "pdf"
	});
	fs.writeFileSync("designacao-" + key + ".pdf", pdf);
}

// console.log(finalJson);

// function allNames(names) {
// 	var allNames = [];
// 	for (var i = 0; i < names.length; i++) {
// 		for (var j = 0; j < json[0]['DATA'][names[i]].length; j++) {
// 			allNames.push(json[0]['DATA'][names[i]][j]['NAME']);
// 		}
// 	}
// 	return allNames.sort();
// }

// for (var i = 0; i < finalJson.length; i++) {
// 	pdfFillForm.write('S-89-T-4up-edited.pdf', finalJson[i][0], {
// 			"save": "pdf"
// 		})
// 		.then(function(result) {
// 			fs.writeFile("designacao-" + i + ".pdf", result, function(err) {
// 				if (err) {
// 					return console.log(err);
// 				}
// 				console.log("The file was saved!");
// 			});
// 		}, function(err) {
// 			console.log(err);
// 		});
// };