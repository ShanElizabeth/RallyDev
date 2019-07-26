Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        
      this.getBlocked();
    },

    getBlocked: function(){
        this.blockedStore=Ext.create('Rally.data.wsapi.Store',{
                autoLoad:true,
                model:'HierarchicalRequirement',
                fetch:['Name','RevisionHistory','FormattedID','ObjectID','BlockedReason','Project','Owner'],
               // listeners:{
                  //  load: function(BlockedStore){
                  //      this.createGrid(BlockedStore);
                  //  }
               // },
                scope:this

        });
        this.createGrid(blockedStore);
    },//end of get blocked stories store
    createGrid:function(blockedStore){
        this.myGrid= Ext.create('Rally.ui.grid.Grid',{
            store:blockedStore,
            layout:'fit',
            enableEditing: true,
            context: this.getContext(),
            //layout of columns
            columnCfgs:['FormattedID','Name','Owner','Project','BlockedReason','Date']
        
        });
        this.add(this.myGrid); //add to page
    }
});
