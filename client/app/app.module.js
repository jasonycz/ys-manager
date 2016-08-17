(function () {
    'use strict';

    angular.module('app', [
        // Core modules
         'app.core'

        // Custom Feature modules
        ,'app.ui'
        ,'app.ui.form'
        ,'app.ui.form.validation'
        ,'app.page'
        ,'app.table'

        // 3rd party feature modules
        ,'mgo-angular-wizard'
        ,'ui.tree'
        ,'textAngular'
    ]);

})();
