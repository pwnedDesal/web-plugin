github_source_code=[
{'source_uri':'https://gist.githubusercontent.com/deadstar1/77ab3e3b5f152fb77058/raw/91b9ef54efefc986c09cb3f02a44465a3b329942/test.html','cont_ID':'a'},
{'source_uri':'https://gist.githubusercontent.com/deadstar1/b42a81522cbd69b5952c/raw/30a20e48d968e1d94020816b37de1d5cf5d29d1a/curl.html','cont_ID':'b'},
{'source_uri':'https://gist.githubusercontent.com/deadstar1/3cb788d3ad7354bfb9de/raw/0598570486a6aa721f46449cb871f1644dc59cf2/test1.html','cont_ID':'c'}
]

i=0
while(github_source_code[i]){
	console.log(github_source_code[i].source_uri);
	console.log(github_source_code[i].cont_ID);
	init_class(github_source_code[i].source_uri,github_source_code[i].cont_ID);
	i=i+1;
}	

function createCORSRequest(method,url){
		var xhr = new XMLHttpRequest();
		//xhr for chorme/firefox/opera/safari.
		if ("withCredentials" in xhr){
			xhr.open(method,url,true);
		}
		else if (typeof XDomainRequest !="undefined"){
			//xdomainrequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method,url);

		}
		else {
			//cors not supported
			xhr= null;
		}
		return xhr;
	}


function mimic_git(text_response,randomstring,username,filename){
	var regex_code_line=/((.{0,})(\s)?)/g;
	text=text_response;
	var tableofcontent=document.getElementById('tableofcontent-' + randomstring);
	var codex=text.match(regex_code_line); ///////here
	console.log('fucking codex ' + codex.length);
	console.log(codex);
	
	var FinalHTMLcode='';
	console.log('alert block of code is comming!');
	highligted_syntax='';
	for (var i = 0; i < codex.length; i++) {
		//alert(codex[i]);
		raw_htmlcode=codex[i].replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\'/g,"&apos;").replace(/\"/g,"&quot;").replace(/\n/g,"&NewLine;").replace(/\s/g,"&nbsp;").replace(/\=/g,"&equals;").replace(/\:/,'&colon;').replace(/\#/,'&num;');

		syntax_highlighter=[
		{"replacement":"<span style='color:#ff7b7b'>$1</span>","regex":"([0-9])+"},
		{"replacement":"<span style='color:#a6e22e'>$1</span>","regex":"(&quot;.{1,10}&quot;)"},
		{"replacement":"<span style='color:#66D9EF'>$1</span>","regex":"(include|package|this)"},
		{"replacement":"<span style='color:#66D9EF'>$1</span>","regex":"(echo)"},
		{"replacement":"<span style='color:#a6e22e'>$1</span>","regex":"(new)"},
		{"replacement":"<span style='color:#F3933B'>$1</span>","regex":"(isset|long|short|var|if|for|while|do while|&equals;)"},
		{"replacement":"<span style='color:#a6e22e'>$1</span>","regex":"(&apos;.{1,10}&apos;)"},
		{"replacement":"<span style='color:#F3933B'>$1<span style='color:#FFD700'>$2<span style='color:white'>$3</span></span></span>","regex":"(function)(.+)(\((.{0,})\)\{)"},
		{"replacement":"<span style='color:#00FFAC'>$1</span>","regex":"(&lt;|&gt;)"}
		//{"replacement":"<span style='color:#00FFAC'>$1</span>","regex":"&lt;(.)+&gt;"}

		];
		x=0;
		while(syntax_highlighter[x]){//checking happens here!
        	var re= new RegExp(syntax_highlighter[x].regex,'g');
			raw_htmlcode=raw_htmlcode.replace(re,syntax_highlighter[x].replacement);
			x=x+1;
			console.log("loop of syntax_highlighter" + x);
      

		}




		HTMLcode="<tr id='line-of-code'><td class='line-number' code-line='"+ i +"'></td><td class='code-content'><code>"+ raw_htmlcode +"</code></td></tr>";
		//some check here 
		//////
		console.log("line of " + i +  " " + HTMLcode);
		FinalHTMLcode=FinalHTMLcode + HTMLcode; // update the finalhtmlcode variable
		console.log(FinalHTMLcode);
	};
	
		
		//conso("debug:" + FinalHTMLcode);









		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		//var FinalHTMLcode=syntax_highlighter(FinalHTMLcode);
		tableofcontent.innerHTML=FinalHTMLcode;
		//metadata
		metadata=filename + " <span class='by'>by</span><a class='link-mimic' href=https://github.com/"+ username +">"+ username + "</a> &#32;&#32;|&#32;&#32;Mimic_Git";
		var div_metadata=document.getElementById('user-info-'+ randomstring);
		div_metadata.innerHTML=metadata;
			

}

//init here
	//get the <script> tag which contain this script by using getelement and checking the source attribute
	//create a new div tag with id mimic 
	//and make it as a sibling of <script> tag.
	//use random math to generate unique ID for the table.
	//encode some special char
function init_class(github_uri,class_cont){
	console.log("githuburi:"+github_uri)
	var url=github_uri;
	//regex_randomstring=/\w+\/(\w+)\/raw/;
	//randomstring=url.match(regex_randomstring)[0];

	var regex_url=/^(https:\/\/(gist|raw).githubusercontent.com)\/(\w+)\/(\w+)/;
	var final_url=url.match(regex_url)[0] + '/raw';
	console.log('final_uri:' + final_url);
	var regex_raw=/https:\/\/raw/;
	if(regex_raw.test(url)){
		final_url=url;
	}


	//var targetobj=document.getElementById('mimic-'+ randomstring);
	console.log('class_cont:' + class_cont );
	

	//inserting the code to your table.
	
	//CORS request
	
	var xhr=createCORSRequest('GET',final_url);
	if(!xhr){
		alert('cors not supported');
		}
		//response handlers.
		xhr.onload=function(){
			regex_randomstring=/\w+\/(\w+)\/raw/;
			//randomstring=final_url.match(regex_randomstring)[0];
			randomstring=Math.random();
			var targetobj=document.getElementById(class_cont);
			var text = xhr.responseText;
			//init here
			//get the table unique table id 
			var htmlobj="<div class='flexy'><div class='body'><span class='footcommand'><span>Toggle:</span><span class='hiddenT'><a class='link-mimic' href="+url+">&lt;/viewraw&gt;</a>|<a href='javascript:document.execCommand(&apos;copy&apos;);' class='link-mimic'>copy me</a></span></span><table class='tableofcontent' id='tableofcontent-"+ randomstring +"'></table></div><div class='footer'><span class='club'>&clubs;&#32;&#32; &#32; </span><span class='user-info' id='user-info-"+ randomstring +"'></span></div></div>";

			targetobj.innerHTML=htmlobj;
			var regex_filename=/(\/\w+(\.\w+)?)$/;
			var regex_username=/(\/.{5,20}\/)/;
			var filename=url.match(regex_filename)[0];

			var username=url.match(regex_username)[0];
			console.log('CORS BELOW');
			
			//alert(text);
			mimic=mimic_git(text,randomstring,username,filename);


		};
		xhr.onerror=function(){
			alert('some error, you are on offline test  mode');
			

		}
		xhr.onprogress=function(){
			//alert('progess');
			target_id=class_cont;
			document.getElementById(target_id).innerHTML="&#x1F300;";

		}
		xhr.onloadstart=function(){
			//alert('progess');
			target_id=class_cont;
			document.getElementById(target_id).innerHTML="&#x1F300;";


		}
		xhr.send();

}
	
function clip_board(text){


}
