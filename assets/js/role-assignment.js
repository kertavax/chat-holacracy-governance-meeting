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
	}]
};

var channel = "holgov_test1",
		participants = [],
		User = function() {
			this.identity = PUBNUB.uuid();
			this.checkin_content = "";
			this.checkin_done = false;
			this.adminconcerns_done = false;
			this.agendaitem_content = "";
			this.agendaitem_done = false;
			this.IDM_isProposer = false;
			this.IDM_proposal_content = "";
			this.IDM_proposal_done = false;
			this.IDM_clarifyingQuestions_content = "";
			this.IDM_clarifyingQuestions_done = false;
			this.IDM_reactions_content = "";
			this.IDM_reactions_done = false;
			this.IDM_hasObjections = false;
			this.IDM_objections_content = "";
			this.IDM_objections_valid = true;
			this.IDM_integration_content = "";
			this.IDM_integration_done = false;
		};

var pubnub = PUBNUB.init({
	publish_key: 'pub-c-965c2c1a-af86-4cdd-bfd9-7d390b4d85d3',
	subscribe_key: 'sub-c-6037cec6-54ff-11e6-bd9c-0619f8945a4f',
	uuid: new User().identity,
	ssl: true,
	error: function(error) {
		console.log("Error of doom!", error);
	}
});