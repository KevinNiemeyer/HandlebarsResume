//function to extract the id out of the URL
function getParameterByName( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


//helpers are best for formatting data
//expression helpers
Handlebars.registerHelper("formatName", function(property1) {
	//helpers always retur a string
	//argument is always a property from your data
	return new Handlebars.SafeString("<strong>Name: </strong>" + property1);
});

//expression helper
Handlebars.registerHelper("formatPhoneNumber", function(property) {
	var phone = property.toString();
	return "(" + phone.substr(0, 3) + ")" + phone.substr(3, 3) + "-" + phone.substr(6, 4);
});

//block helpers: (always start with # in HTML)
Handlebars.registerHelper("makeBold", function(options) {
	//options.fn equals whatever appears between the starting and ending block 
	return new Handlebars.SafeString("<strong>" + options.fn(this) + "</strong>");
});

//block helper
Handlebars.registerHelper("toLower", function(options) {
	return options.fn(this).toLowerCase();
});

$(document).ready(function() {
	console.log(window.location.href);
	var resumeTemplate = $("#resume-template").html();

	var compiledResumeTemplate = Handlebars.compile(resumeTemplate);
	
	var jobId = getParameterByName("id");
	
	$.ajax("./job-duties-partial.html").done(function(jobDutiesPartial) {
		console.log(jobDutiesPartial)
		//can't get jobDutiesPartial to not be undefined

		$("body").append(jobDutiesPartial);
		//have to register the partial before you append it to the body:
		Handlebars.registerPartial("jobDutiesPartial", $("#job-duties-partial").html());
		
		console.log("after partial");
	});

	$.ajax("./data/resume.json").done(function(resume) {
		if($("body").hasClass("page-job-duties")) {
			
			$(".resume-container").html(compiledResumeTemplate(resume.experience[jobId]));
		} else {
			$(".resume-container").html(compiledResumeTemplate(resume));
		}

		
	});

	$(".resume-container").on("click", ".view-details", function(e) {
		//e.preventDefault(); //anchor, so don't want to jump
	});
	// **you're trying to add an event listener to the view-details button before it's on the page; you could put it inside of the ajax call to quick fix that; this compiles the template first, THEN adds the event listener, but that clutters up the ajax. a better way is to use an even delegate that says if the document is clicked, don't do anything unless it is the button that was clicked. instead of using document, you can use something that is closer to the button, but before the template, like the ul resume-container tag.

});

