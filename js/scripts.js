

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
//helpers always returns a string
//argument is always a property from your data
Handlebars.registerHelper("capitalizeWords", function(property1) {
//capitalize all words.	
	property1 = property1.replace(/\b\w/g, l => l.toUpperCase())
	return new Handlebars.SafeString("<strong>" + property1 + "</strong>" );
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

Handlebars.registerHelper('equals', function(first, second, options) {
if (first == second) {
return options.fn(this);
}
});

Handlebars.registerPartial("resumeApplicantPartial", $("#resume-applicant-partial").html());

Handlebars.registerPartial("resumeExperiencePartial", $("#resume-experience-partial").html());

Handlebars.registerPartial("resumeEducationPartial", $("#resume-education-partial").html());

Handlebars.registerPartial("resumeReferencesPartial", $("#resume-references-partial").html());


$(document).ready(function() {
	var resumeTemplate = $("#resume-template").html();

	var compiledResumeTemplate = Handlebars.compile(resumeTemplate);
	

	$.ajax("./data/resume.json").done(function(resume) {
		
			console.log("test");
			$(".resume-container").html(compiledResumeTemplate(resume));		
	});
});

