
// Organization JSON

var organization_data = {
	"organization": "Better Training Videos",
	"roles": [{
			"name": "Social Media Butterfly",
			"purpose": "Pollinate the web with information regarding our training videos",
			"accountabilities": ["Creating or sourcing quick-to-consume content of interest to Better Training Videos’s market and posting to social media channels", "Responding to misinformation about Better Training Videos on social media channels", "Monitoring social media channels and routing or responding to relevant follow-up comments on posted content"],
			"domains": ["Better Training Videos’s social media accounts"],
			"tension": "People online have been stating that the training videos don’t accurately represent our offers made in our marketing materials"
		},{
			"name": "Marketing Maven",
			"purpose": "Help the world to know and love Better Training Videos and our products and services",
			"accountabilities": ["Defining and implementing coordinated strategies and initiatives to spread awareness of the products/services we offer to help people with Better Training Videos"],
			"domains": [],
			"tension": "There is a need of copywriting for various outlets"
		}
	]
};


// User Class

var User = function(org) {
	this.assignRole = function() {
		// random role from org_object
		var random_role_index = Math.round((Math.random())*(org.length-1));
		var assigned_role = org[random_role_index];
		return assigned_role;
	}
}

var member_list = [];

var getRole = function(org) {

	var random_role_index, assigned_role, q;

	// check number of roles
	var roles_total = org.length;

	if (roles_total == 1) {
		random_role_index = 0;
	} else {
		random_role_index = Math.round(Math.random());	
	}
	
	// random role from organization_data based on number of roles
	assigned_role = org[random_role_index];
	console.log("You got the role:", assigned_role);

	// remove the randomly selected role from organization_data
	q = organization_data.roles.indexOf(assigned_role);
	organization_data.roles.splice(q, 1);

	console.log("The role:", assigned_role.name, "should be removed from:", organization_data.roles);
	
	return member_list.push(assigned_role);
}


















