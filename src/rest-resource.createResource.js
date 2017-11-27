/**
 * Defines ng-kit.rest-resource.createResource
 */
(function(angular) {
    'use strict';
    angular.module('ng-kit.rest-resource')
    .factory('createResource', function($http, $q) {
        var DEFAULT_RESOURCE = {
            /**
             * Implements HTTP GET
             */
            get: function(params) {
                var self = this;
                this.canceler = $q.defer();
                return $http({
                    method: 'GET',
                    url: self.resourceUrl,
                    params: params,
                    timeout: self.canceler.promise,
                });
            },
            /**
             * Implements HTTP UPDATE
             */
            update: function(data) {
                var self = this;
                this.canceler = $q.defer();
                return $http({
                    method: 'PUT',
                    url: self.resourceUrl,
                    data: data ,
                    timeout: self.canceler.promise,
                });
            },
            /**
             * Implements HTTP DELETE
             */
            remove: function(data) {
                var self = this;
                this.canceler = $q.defer();
                return $http({
                    method: 'DELETE',
                    url: self.resourceUrl,
                    params: {
                        id: data.id,
                    },
                    timeout: self.canceler.promise,
                });
            },
            /**
             * Implements HTTP POST
             */
            create: function(data) {
                var self = this;
                this.canceler = $q.defer();
                return $http({
                    method: 'POST',
                    url: self.resourceUrl,
                    data: data,
                    timeout: self.canceler.promise,
                });
            }
        };

        /**
         * Defines default constructor
         */
        var Resource = function(resourceUrl) {
            this.canceler = null;
            this.resourceUrl = resourceUrl;
        };
        /**
         * Cancels current request to REST resource
         */
        Resource.prototype.cancelCurrentRequest = function() {
            if (this.canceler && this.canceler.resolve) {
                this.canceler.resolve();
            }
        };

        return function(resourceUrl, methods) {
            var canceler = null;
            methods.forEach(function(method) {
                Resource.prototype[method] = DEFAULT_RESOURCE[method];
            });

            return new Resource(resourceUrl);
        };
    });
})(angular);
