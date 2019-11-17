

window.onload = init;

function init() {
	var button = document.getElementById('mehr');
	button.onclick = ToDoHinzufügen;
	var clearButton = document.getElementById('loeschen');
	clearButton.onclick = allesLöschen;
	var eintraegeArray = HolEinträge();
	for (var i = 0; i < eintraegeArray.length; i++) {
		var aufgabeNr = eintraegeArray[i];
		var value = JSON.parse(localStorage[aufgabeNr]);
		insDOMschreiben(aufgabeNr, value);
	}
}

function HolEinträge() {
	var eintraegeArray = localStorage.getItem('eintraegeArray');
	if (!eintraegeArray) {
		eintraegeArray = [];
		localStorage.setItem('eintraegeArray', JSON.stringify(eintraegeArray));
	} else {
		eintraegeArray = JSON.parse(eintraegeArray);
	}
	return eintraegeArray;
}

function ToDoHinzufügen() {
	var eintraegeArray = HolEinträge();
	var value = document.getElementById('eingabe')
		.value;
	if (value != '') {
		var currentDate = new Date();
		var aufgabeNr = 'aufgabe_' + currentDate.getTime()
		var aufgabeText = {
			'value': value
		};
		localStorage.setItem(aufgabeNr, JSON.stringify(aufgabeText));
		eintraegeArray.push(aufgabeNr);
		localStorage.setItem('eintraegeArray', JSON.stringify(eintraegeArray));
		insDOMschreiben(aufgabeNr, aufgabeText);
		document.getElementById('eingabe')
			.value = ' ';
	} else {
		alert('Bitte geben Sie etwas ein!');
	}
}



function insDOMschreiben(aufgabeNr, ItemObj) {
	var eintraege = document.getElementById('eintraege');
	var eintrag = document.createElement('li');
	eintrag.setAttribute('id', aufgabeNr);
	eintrag.innerHTML = ItemObj.value;
	eintraege.appendChild(eintrag);
	eintrag.onclick = toDoLöschen;
}

function ausDOMentfernen(aufgabeNr) {
	var eintrag = document.getElementById(aufgabeNr);
	eintrag.parentNode.removeChild(eintrag);
}

function allesLöschen() {
	localStorage.clear();
	var ItemList = document.getElementById('eintraege');
	var eintraege = ItemList.childNodes;
	for (var i = eintraege.length - 1; i >= 0; i--) {
		ItemList.removeChild(eintraege[i]);
	}
	var eintraegeArray = HolEinträge();
}
