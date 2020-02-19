var myNinjaApp = angular.module('myNinjaApp', ['ngRoute','ngAnimate']);

myNinjaApp.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: "NinjaController"
        }).when('/form', {
            templateUrl: 'views/form.html',
            controller: "FormController"
        }).when('/contact-sucess', {
            templateUrl: 'views/contact-success.html',
            controller: "FormController"
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'NinjaController'
        }).otherwise({ redirectTo: '/home' });

}]);

myNinjaApp.directive('randomNinja', [function () {
    //'E = element A atribute EA =booth of two.
    return {
        restrict: 'EA',
        scope: {
            ninjas: '=',
            title:'='
        },
        templateUrl:'views/random.html',
        transclude:true,
        replace:true,
        controller:function($scope){
            $scope.random= Math.floor(Math.random()*4)
        }
    };
}]);


myNinjaApp.controller('NinjaController', ['$scope', '$http', function ($scope, $http) {

    $scope.removeNinja = function (ninja) {
        var removeNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removeNinja, 1);

    }

    $scope.addNinja = function () {
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            avaliable: true
        });
        $scope.newninja.name = "";
        $scope.newninja.belt = "";
    };

    $http({
        method: 'GET',
        url: 'data/ninjas.json'
    }).then(function successCallback(response) {
        $scope.ninjas = response.data;
    }, function errorCallback(response) {
        console.log('erro');
    });

    
    $scope.removeAll =function(){
        $scope.ninjas=[];
    };

}]);


myNinjaApp.controller('FormController',['$scope','$location',function($scope,$location){

    $scope.sendMessage=function(){
        $location.path('contact-sucess');
    }
}])