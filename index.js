var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');

pdfFillForm.write('S-89-T-4up.pdf', { "Text1": "texto 1 texto 1" }, { "save": "pdf" } )
.then(function(result) {
    fs.writeFile("designacao.pdf", result, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}, function(err) {
    console.log(err);
});
