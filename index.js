"use strict";

var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');
var merge = require('merge'),
    original, cloned;
var uuid = require('uuid');

var JSON_DATA_FILE = 'designacoes_201501.json';
var ASSIGNMENT_BASE_FILE = 'S-89-T-4up-edited.pdf';
var ENCONDING_JSON_DATA_FILE = 'utf8';
var JSON_DATA = JSON.parse(fs.readFileSync(JSON_DATA_FILE, ENCONDING_JSON_DATA_FILE));
var AMOUNT_OF_ASSIGNMENT = JSON_DATA.length;
var AMOUNT_OF_ASSIGNMENT_PER_PAGE = 4;

function sliceDataIntoPages(jsonData, amountAssignments, assignmentsPerPage) {
    var pages = [];
    for (var i = 0; i < amountAssignments; i = i + assignmentsPerPage) {
        pages.push(jsonData.slice(i, (i + assignmentsPerPage)));
    };
    return pages;
}

function processAssignmentLabel(assignment) {
    var assignmentPresident = 'Presidente';
    var assignmentReading = 'Leitura';
    var assignmentFirstVisit = 'Primeira visita';
    var assignmentRevisit = 'Revisita';
    var assignmentBibleStudy = 'Estudo bíblico';
    if (assignment.designacao === assignmentPresident) {
        assignment.outra = true;
        assignment.outraTexto = assignment.designacao;
        assignment.designacao = undefined;
    } else if (assignment.designacao === assignmentReading) {
        assignment.leitura = true;
        assignment.designacao = undefined;
    } else if (assignment.designacao === assignmentFirstVisit) {
        assignment.primeiraVisita = true;
        assignment.designacao = undefined;
    } else if (assignment.designacao === assignmentRevisit) {
        assignment.revisita = true;
        assignment.designacao = undefined;
    } else if (assignment.designacao === assignmentBibleStudy) {
        assignment.estudo = true;
        assignment.designacao = undefined;
    }
    return assignment;
}

function processAssignmentGiveIn(assignment) {
    var givenInMain = 'A';
    var givenInAux1 = 'B';
    var givenInAux2 = 'C';
    if (assignment.proferido === givenInMain) {
        assignment.salaoPrincipal = true;
        assignment.proferido = undefined;
    } else if (assignment.proferido === givenInAux1) {
        assignment.salaB = true;
        assignment.proferido = undefined;
    } else if (assignment.proferido === givenInAux2) {
        assignment.salaC = true;
        assignment.proferido = undefined;
    }
    return assignment;
}

function replaceLabelsToIncrementalLabels(assignment, counter) {
    var assignmentAsString = JSON.stringify(assignment);
    var assignmentAsJSON = JSON.parse(assignmentAsString
        .replace('data', 'data' + (counter + 1))
        .replace('nome', 'nome' + (counter + 1))
        .replace('ajudante', 'ajudante' + (counter + 1))
        .replace('caracteristica', 'caracteristica' + (counter + 1))
        .replace('outra', 'outra' + (counter + 1))
        .replace('outraTexto', 'outraTexto' + (counter + 1))
        .replace('leitura', 'leitura' + (counter + 1))
        .replace('primeiraVisita', 'primeiraVisita' + (counter + 1))
        .replace('revisita', 'revisita' + (counter + 1))
        .replace('estudo', 'estudo' + (counter + 1))
        .replace('salaoPrincipal', 'salaoPrincipal' + (counter + 1))
        .replace('salaB', 'salaB' + (counter + 1))
        .replace('salaC', 'salaC' + (counter + 1)));
    return assignmentAsJSON;
}

function processData() {
    var pages = sliceDataIntoPages(JSON_DATA, AMOUNT_OF_ASSIGNMENT, AMOUNT_OF_ASSIGNMENT_PER_PAGE);
    var firstLevelData = [];
    for (var pageKey in pages) {
        var secondLevelData = {};
        for (var j = 0; j < pages[pageKey].length; j++) {
            var assignment = pages[pageKey][j];
            assignment = replaceLabelsToIncrementalLabels(processAssignmentLabel(processAssignmentGiveIn(assignment)), j);
            secondLevelData = merge(secondLevelData, assignment);
        };
        firstLevelData.push(secondLevelData);
    }
    return firstLevelData;
}

function generateAssignments(processedData) {
    for (var pageKey in processedData) {
        var page_data = processedData[pageKey];
        var pdf = pdfFillForm.writeAsync(ASSIGNMENT_BASE_FILE, page_data, {
            "save": "pdf"
        }, function(err, pdf) {
            fs.writeFile("vmc-designacao_" + uuid.v4() + ".pdf", pdf, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("A file was saved!");
            });
        });
    }
}

generateAssignments(processData());