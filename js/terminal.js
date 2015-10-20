
var logEntries = new Array();

function checkCommand(command) {

	switch(command) {
		case "":
			newLine();
			return true;

		case "clear":
			initTerminal();
			return true;

		case "help":
			printHelp();
			newLine();
			return true;

		case "log":
			printHistory();
			newLine();
			return true;

		default:
			return actionCommand(command);
	}

	function actionCommand(command) {
		return false;
	}
}

function checkKeyPress() {
	var key = window.event.keyCode;
	
	if (key == 13) { // Enter
		parseCommand();
		document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight
		return false;
	} else if (key == 8 || key == 37) { //Backspace or left
		document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight
		return validateBackwards();
	} else if (key == 38 || key == 40) {
		document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight
		return false;
	} else {
		document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight
		return true;
	}

}

function cleanString(str) {
	// Deleting whitespaces
	var result = str.trim();
	return result;
}

function commandNotRecognized(command) {
	document.getElementById("terminal").value = document.getElementById("terminal").value + "\n" + command + ": command not found";
	newLine();
}

function initTerminal() {
	var terminal = document.getElementById("terminal");
	terminal.value = "Type help for a list of commands.\n";
	newLine();
}

function logEntry(command) {
	var currentDate = new Date();
	var year = currentDate.getYear() + 1900;
	var month = currentDate.getMonth() + 1;
	var date = currentDate.getDate();
	var hours = currentDate.getHours();
	var minutes = currentDate.getMinutes();
	var seconds = currentDate.getSeconds();

	var entry = {command: command, date: currentDate};
	logEntries.push(entry);
}

function moveCaretToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function newLine() {
	document.getElementById("terminal").value = document.getElementById("terminal").value + "\nWebTerm:~ axelniklasson$ ";
}

function parseCommand() {
	// foo: command not found
	var value = document.getElementById("terminal").value;
	var command = "";

	// Parsing the command
	for (i = (value.length - 1); i > 0; i--	) {
		if (value.charAt(i) == "$") {
			command = value.substring(i+2, value.length);
			break;
		}
	}

	command = cleanString(command);

	if (!checkCommand(command)) {
		commandNotRecognized(command);
		return false;
	} else {
		if (!(command === "")) {
			logEntry(command);
		}
	}
}

function printHelp() {
	document.getElementById("terminal").value = document.getElementById("terminal").value + "\n\nCommands: \nclear\nhelp\nlog\n[more commands will be added]\n";
}

function printHistory() {
	var print = "\n\nCommand log\n";

	for (i = 0; i < logEntries.length; i++) {
		var command = logEntries[i].command;
		var entryDate = logEntries[i].date;

		var year = entryDate.getYear() + 1900;
		var month = entryDate.getMonth() + 1;
		var date = entryDate.getDate();
		var hours = entryDate.getHours();
		var minutes = entryDate.getMinutes();
		var seconds = entryDate.getSeconds();

		if (month < 10) {
			month = "0" + month;
		}

		if (date < 10) {
			date = "0" + date;
		}

		if (hours < 10) {
			hours = "0" + hours;
		}

		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		var timestamp = year + "-" + month + "-" + date + ", " + hours + ":" + minutes + ":" + seconds;
		print += timestamp + ": " + command + "\n";
	}

	document.getElementById("terminal").value += print;
}

function setFocus() {
	var inputField = document.getElementById("terminal").focus();
}

function validateBackwards() {
	var terminal = document.getElementById("terminal");
	value = terminal.value;

	if (value.charAt(value.length-1) == " " && value.charAt(value.length-2) == "$") {
		return false;
	} else {
		return true;
	}
}

