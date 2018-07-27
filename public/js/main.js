
//user number
//user color
//user language

/* preparation to transcend*/

//get number of speakers from user input from form
function getSelectionFormResponse(divId) {
    return $("#" + divId +" option:selected").val();
}

//unhide hidden forms
function toggler(divId) {
    $("#" + divId).toggle();
}

//create selection from from array of given languages
function createLangForm(divId, selectId){
	var languages = ['Arabic', 'Chinese Simplified', 'Chinese Traditional', 
				'Dutch', 'English', 'French', 'German', 'Italian', 'Japanese', 
				'Korean', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Turkish'];

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
//get languages chosen by user(s)
var l1, l2, l3;
function getLanguagesFromForm(numSpeakers) {
    l1 = document.getElementById("select1").value;
    l2 = document.getElementById("select2").value;
    l3 = document.getElementById("select3").value;
 	var url = "/views/transcend.jade?numSpeakers="
 	+ encodeURIComponent(numSpeakers) + "&l1=" + encodeURIComponent(l1) 
 	+ "&l2=" + encodeURIComponent(l2) + "&l3=" + encodeURIComponent(l3);
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

function createTranscendPage(data){
	var numSpeakers = data[0];
	var languages = { l1:data[1], l2:data[2], l3:data[3] };

	var regVoiceColumns = { b1:"", b2:"", b3:""};
	var rvbRow = document.getElementById("reg-voice-btns-row"); 

	var taColumns = { col1:"", col2:"", col3:"" };
	var taRow = document.getElementById("text-area-row");

	for(var i=0; i<numSpeakers; i++){
		if(languages[i]!==""){
			var rvbCol = document.createElement("div");
			//col.className = "column";
			rvbCol.style.width = (100/numSpeakers) + "%";

			var taCol = document.createElement("div");
			//col.className = "column";
			taCol.style.width = (100/numSpeakers) + "%";

			var regButton = document.createElement("button");
			regButton.className = "btn";
			//regButton.className = "btn-light";
			regButton.type = "button";
			regButton.id = "rvb-btn-"+(i+1);
			regButton.innerHTML = "Register Voice "+(i+1);
			regVoiceColumns[i] = rvbCol;
			regVoiceColumns[i].appendChild(regButton);
			rvbRow.appendChild(regVoiceColumns[i]);

			var textArea = document.createElement("textarea");
			textArea.id = "textarea"+(i+1);
			taColumns[i] = taCol;
			taColumns[i].appendChild(textArea);
			taRow.appendChild(taColumns[i]);
		}
	}
}