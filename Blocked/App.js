Ext.define('CustomApp', {
  extend: 'Rally.app.App',
  componentCls: 'app',
  items:[{
    xtype:'container',
    itemId:'exportBtn'
  }],

  launch: function() {
   this.display();
   this.getBlockedStories();
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
  getBlockedStories: function() {
  //var selectedIterRef=this.iterComboBox.getRecord().get('_ref');
  
  var myFilters=[
    {
     // property:'Iteration',
     // operator:'=',
    //  value:selectedIterRef
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

  this.storyStore = Ext.create('Rally.data.WsapiDataStore', {
    autoLoad: true,
    model: 'HierarchicalRequirement',
    fetch: ['Name', 'RevisionHistory', 'FormattedID', 'ObjectID', 'BlockedReason', 'DirectChildrenCount','Owner','Project'],
    filters:myFilters,
    listeners: {
      load: function(storyStore) {
          this.createGrid(storyStore); 

      },
      scope: this
       
    },
    
    
  });
},



//  
createGrid: function(storyStore){
    this.myGrid= Ext.create('Rally.ui.grid.Grid',{
         store:storyStore,
         layout:'fit',
         enableEditing: true,
         context: this.getContext(),
         //layout of columns
         columnCfgs:['FormattedID','Name','Owner','Project','BlockedReason','Date']
     
     });
     this.add(this.myGrid); //add to page
  },//end of create grid

});