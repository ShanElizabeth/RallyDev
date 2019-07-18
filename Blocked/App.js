Ext.define('CustomApp', {
  extend: 'Rally.app.App',
  componentCls: 'app',
  items:[{
    xtype:'container',
    itemId:'exportBtn'
  }],

  launch: function() {
   this.display();
   this.pulldownContainer = Ext.create('Ext.container.Container', {    // this container lets us control the layout of the pulldowns; they'll be added below
   id: 'pulldown-container-id',
   layout: {
           type: 'hbox',           // 'horizontal' layout
           align: 'stretch'
       }
 });

 this.add(this.pulldownContainer);
 this.loadIterations();
  },
  display: function () {
    
    console.log("display");
    //tag with item in launch function 
    this.down('#exportBtn').add({
        xtype:'rallybutton',
        text:'EXPORT TO CSV',
        handler:this.onlick,
        scope:this
    });

  },
   //what to do when button is clicked
   onlick:function(){
    console.log("working");
  },
  loadIterations: function() {
    this.iterComboBox = Ext.create('Rally.ui.combobox.IterationComboBox', {
      fieldLabel: 'Iteration',
      labelAlign: 'right',
      width: 300,
      listeners: {
        ready: function(){
          this.getBlockedStories();
        },
       select: function() {   // on select: after the app has fully loaded, when the user 'select's an iteration, lets just relaod the data
             this.getBlockedStories();
       },
       scope: this
     }
    });

    this.pulldownContainer.add(this.iterComboBox);   // add the iteration list to the pulldown container so it lays out horiz, not the app!
 },

  getBlockedStories: function() {
  var selectedIterRef=this.iterComboBox.getRecord().get('_ref');
  
  var myFilters=[
    {
      property:'Iteration',
      operator:'=',
      value:selectedIterRef
    },
    {
      property: 'Blocked',
      operator: '=',
      value: true
    }, {
      property: 'DirectChildrenCount',
      operator: '=',
      value: 0
    }
  ];
  //i store exists just load ew dta
if(!this.storyStore){
  this.storyStore = Ext.create('Rally.data.WsapiDataStore', {
    autoLoad: true,
    model: 'HierarchicalRequirement',
    fetch: ['Name', 'RevisionHistory', 'FormattedID', 'ObjectID', 'BlockedReason', 'DirectChildrenCount','Owner','Project'],
    filters:myFilters,
    scope: this,
    listeners: {
      load: function(storyStore) {
        if(!this.myGrid){
          this.createGrid(storyStore); 
        }   
       },
    }
  });
}

else{
  this.storyStore.setFilter(myFilters); //sets it doesnt load 
  this.storyStore.load();//loads store 
   } 
  },

  createGrid :function(storyStore){
   this.myGrid= Ext.create('Rally.ui.grid.Grid',{
        store:storyStore,
        layout:'fit',
        enableEditing: true,
        context: this.getContext(),
        //layout of columns
        columnCfgs:['FormattedID','Name','Owner','Project','BlockedReason']
    
    });
    this.add(this.myGrid); //add to page
    },

});

