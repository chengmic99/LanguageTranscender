
//user number
//user color
//user language

/* preparation to transcend*/

function getInputFrom(divId) {
	return document.getElementById(divId).value;
}

//unhide hidden forms
function toggler(divId) {
    $("#" + divId).toggle();
}

//create selection from from array of given languages
function createLangForm(divId, selectId){
	var languages = ['Arabic', 'Chinese', 
				'English', 'French', 'Japanese', 
				'Korean', 'Portuguese','Spanish'];

	var myDiv = document.getElementById(divId);

	//Create and append select list
	var selectList = document.getElementById(selectId);
	//selectList.id = "mySelect";
	myDiv.appendChild(selectList);

	//Create and append the options
	for (var i = 0; i < languages.length; i++) {
	    var option = document.createElement("option");
	    option.value = languages[i];
	    option.text = languages[i];
	    selectList.appendChild(option);
	}
}

function sendPrep() {
	var roomName = getInputFrom("room-name-text-area");
	var lang = getInputFrom("select-lang");

 	var url = "/views/transcend.jade?roomName="
 	+ encodeURIComponent(roomName) + "&language=" + encodeURIComponent(lang);
 	document.getElementById("transcend-link").href = url;
}


/*time to transcend*/
//get vars from url
function getVars(){
	var url = document.location.href;
    var params = url.split('?')[1].split('&');
    var data = {};
    var tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[i] = tmp[1];
    }
 	return data;

}

