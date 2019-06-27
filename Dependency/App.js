Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        //Write app code here
        	console.log("Running app");
        	this.loadData();

    },

    loadData: function (){
    	 var myStore = Ext.create('Rally.data.wsapi.Store', {
        	//configuration object 
        	//pull user story out of rally

	   		 model: 'Defect',
	   		 sorters:[{
	   		 		property:'FormattedID',
	   		 		direction:'DESC',
	   		 }],
	   		 autoLoad: true,
	  	 	 listeners: {
	      		  load: function(store, data, success) {
	    	        //process data

	    	        
	    	        this.loadGrid(myStore);
	    	     }, 
	    	    scope:this
	   		 },
	   	 fetch: ['FormattedID','Name', 'ScheduleState','Owner','ScheduleState','Severity']
	   	 // to fetch data out of rally, pulling this from wsapi docs pulling this info from rally 

		});
    },

    loadGrid: function(myStore){
    	 Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
		     models: ['userstory'],
		     autoLoad: true,
		     enableHierarchy: true
		  }).then({
		      success: function(store) {
		         Ext.create('Ext.Container', {
		             items: [{
		                 xtype: 'rallytreegrid',
		                 columnCfgs: [
		                     'Name',
		                     'Owner'
		                 ],
		                 store: store
		             }],
		             renderTo: Ext.getBody()
		         });
		     }
		 });
		    	
       },


    
});
