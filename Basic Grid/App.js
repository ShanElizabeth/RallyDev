Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
    	console.log('Testing App');
    	this.loadData(); //goes out to app and calls higher up 
    },

    //get data from rally
    loadData: function (){
    	 var myStore = Ext.create('Rally.data.wsapi.Store', {
        	//configuration object 
        	//pull user story out of rally

	   		 model: 'User Story',
	   		 autoLoad: true,
	  	 	 listeners: {
	      		  load: function(store, data, success) {
	    	        //process data
	    	        console.log('get data',store,data,success);
	    	        this.loadGrid(myStore);
	    	     }, 
	    	    scope:this
	   		 },
	   	 fetch: ['FormattedID','Name', 'ScheduleState']
	   	 // to fetch data out of rally, pulling this from wsapi docs pulling this info from rally 

		});
    },
    //creaate grid and show given stories
    loadGrid:function loadGrid(myStoryStore) {
    	// body...
    	 var myGrid= Ext.create('Rally.ui.grid.Grid',{
	    	        	store: myStoryStore,
	    	        	columnCfgs:[//columns in main app id name and schedule state all interactive 

	    	        	'FormattedID','Name',
	    	        	'ScheduleState'
	    	        	]
	    	        });
	    	       this.add(myGrid); //add it to the app
	    	       console.log("What is this", this);
	    	    
    }
    });