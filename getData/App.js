Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        //Write app code here
        //1) NEED DATA
		//2)NEED A GRID TO DISPLAY
		//3)NEED TO DISPLAY THEM CORRECTLY
		//4)ADD IN SORT BYS AND FILTERS ETC
		//5)ADD IN USER OPTIONS AND CHNAGED OPTIONS
        //API Docs: https://help.rallydev.com/apps/2.1/doc/
        console.log("Starting app");
        this.getData();
    },

    getData:function(){
    	console.log("getting data")
    	var myStore= Ext.create('Rally.data.wsapi.Store',{
    		//pu;; user story/data form rally
    		model:'User Story',

    		autoLoad:true,
    		listeners:{
    			load: function(store,data,success){
    				//process data
    				console.log('get data',store,data,success);
    				//do stuf to data here

    				this.display(myStore)
    			},
    			scope:this
    		},
    		fetch:['FormattedID','Name','ScheduleState','Owner','StartDate']
    	});


    },

    display: function(myStoryStore){
    	console.log("display function");

    	var myGrid=Ext.create('Rally.ui.grid.Grid',{
    		store: myStoryStore,
    		columnCfgs:[

	    		'FormattedID','Name','ScheduleState','Owner','StartDate']
    	});
    	//app wont display without this add function
    	this.add(myGrid);
    },


});
