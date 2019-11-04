exports.config = {

//framework: 'jasmine',



specs: ['test.js'],

onPrepare: function(){

// Getting CLI report
      browser.ignoreSynchronization=true  ;
      browser.waitForAngularEnabled(false);
      browser.driver.manage().window().maximize();

},

  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
    defaultTimeoutInterval: 10000000,

},


SELENIUM_PROMISE_MANAGER: false,
}
