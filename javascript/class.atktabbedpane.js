if (!ATK) {
  var ATK = {};
}

ATK.TabbedPane = {
  /**
   * Show tab.
   */
  showTab: function(paneName, tabName) {
    var pane = $(paneName);
  	var attrs = pane.getElementsBySelector('.tabbedPaneAttr');
  	var tabs = pane.getElementsBySelector('.tabbedPaneTab');
  	
  	// show attribute of the current tab
  	attrs.each(function(attr) {
  	  if (attr.id != null && attr.id.substring(0, 3) == 'ar_') return;

  		if (attr.hasClassName(tabName)) {
        attr.show();
  		}	else {
  		  attr.hide();
  		}
  	});
  
  	// make tabs active or passive
  	tabs.each(function(tab) {
  	  if (tab.hasClassName(tabName)) {
  	    tab.addClassName('activetab');
  	    tab.removeClassName('passivetab');
  	  } else {
  	    tab.addClassName('passivetab');
  	    tab.removeClassName('activetab');
  	  }
  	});    
  }
};