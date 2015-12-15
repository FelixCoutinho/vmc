var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');

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
	var subFinalJson = [];
	for (var j = 0; j < pages[i].length; j++) {
		var stringfied = JSON.stringify(pages[i][j]);
		subFinalJson.push(JSON.parse(stringfied
			.replace('data', 'data' + (j + 1))
			.replace('nome', 'nome' + (j + 1))
			.replace('ajudante', 'ajudante' + (j + 1))
			.replace('caracteristica', 'caracteristica' + (j + 1))
			.replace('designacao', 'designacao' + (j + 1))
			.replace('proferido', 'proferido' + (j + 1))));
	};
	finalJson.push(subFinalJson);
};

for (var key in finalJson) {
	for(var key2 in finalJson[key]){
		console.log(finalJson[key][key2]);
	}
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