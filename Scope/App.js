Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:[{
        xtype:'container',
        itemId:'exportBtn'
    }],
    launch: function() {
        console.log("Launch");
       this.displayBtn();
    },
    displayBtn:function(){
        console.log("display");
        this.down('#exportBtn').add({
            xtype:'rallybutton',
            text:'EXPORT TO CSV',
            handler:this.onlick,
            scope:this
        });
    },
    onlick:function(){
        console.log("working")
    }
});

