(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController)
        .factory("testService", testService);

    DashboardController.$inject = ['$q', 'dataservice', 'logger', 'testService'];
    testService.$inject = ['$soap'];

    /* @ngInject */
    function DashboardController($q, dataservice, logger, testService) {
        var vm = this;
        vm.news = {
            title: 'helloWorld',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');

                testService.testFunction().then(function(data) {
                    console.log(data);
                });
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function(data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function(data) {
                vm.people = data;
                return vm.people;
            });
        }
    }

    function testService($soap) {
        var baseUrl = 'http://6901210d.compilers.sphere-engine.com/api/1/service.wsdl',
            username = 'fa464fdf566a8d7b2a55650f9897b267',
            password = '4226464acc3d2e8c1e59126deda71369';

        return {
            testFunction: function() {
                return $soap.post(baseUrl, "testFunction", { user: username, pass: password });
            }
        }
    }
})();