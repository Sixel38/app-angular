(function(angular){
  'use strict';

  angular.module('checkinModule',[])
    .controller('checkinController', function($http, $scope){
      console.log('checkinController');

      var getCheckInList = function(){
        $http({
          method: 'GET',
          url: 'http://checkin-api.dev.cap-liberte.com/checkin'
        }).then(function successCallback(response){
          $scope.checkins = response.data;
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
      };

      $scope.$on('checkInAdded', function(e){
        console.log("Evenement checkInAdded reçu");
        console.log(e);
        getCheckInList();
      });


      $http({
        method: 'GET',
        url: 'http://checkin-api.dev.cap-liberte.com/checkin'
      }).then(function successCallback(response){
        console.log(response.data);
        $scope.checkins = response.data;
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    })

    // Details des checkin
    .controller('checkinDetailsController', function($http, $scope, $routeParams){
      console.log('CheckIn Details');
      console.log($routeParams);

      $http({
        method: 'GET',
        url: 'http://checkin-api.dev.cap-liberte.com/checkin/' + $routeParams.checkinId
      }).then(function successCallback(response){
        console.log(response.data);
        $scope.checkinDetails = response.data;
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    })


    .controller('checkinFormController', function($scope, $http){
      console.log("Controller Add");


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              $scope.$apply(function(){
                $scope.lat = position.coords.latitude;
                $scope.lng = position.coords.longitude;
              });
          });
        } else {
            alert("La géolocalisation n'est pas supporté par votre navigateur !!");
        }

      var getChekinList = function() {
        if(localStorageService.isSupported) {
          alert("Tout va bien ! L'appli fonctionnera bien");
        } else {
          alert("Votre navigateur ne supporte pas la sauvearde local, certaines fonctionnalitée isque de ne pas fonctionner.");
        }
      };

      $scope.submit = function(){
        var checkins = localStorageService.get('checkins');
        if(checkins === null) {
          checkins = [];
        }
        checkins.push({lat : $scope.lat, lng : $scope.lng});
        localStorageService.set("checkins", checkins);
        $rootScope.$broadcast("NBChekin");


          console.log($scope.lat + ' ' + $scope.lng);
          $http({
            method: 'POST',
            url: 'http://checkin-api.dev.cap-liberte.com/checkin',
            data: {
              lat: $scope.lat,
              lng: $scope.lng
            },
            headers: {
              'Content-Type': undefined
            }
          }).then(function successCallback(response) {
            $rootScope.$broadcast('checkInAdded');
            $scope.pop = function(){
              toaster.pop('success', "Ajout réussi", "Le chekin à  bien été ajouté");
            };
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            console.log(response);
            $scope.pop = function(){
              toaster.pop('error', "Echec de l'ajout", "Une erreur est survenu ! Réessayer ulterieurement");
            };
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

      };
    })



    /*.controller('ctrl.checkin.LocalStorage', function($scope, $rootScope, $http, localStorageService, toaster) {

      $scope.$on("NBChekin", function() {
          var checkin = localStorageService.get('checkins')
          $scope.NBcheckin = checkin.length;
      });

      $scope.sync = function() {

      var checkin = localStorageService.get('checkins')
        angular.forEach(checkin, function(value, key) {
          $http({
            method: 'POST',
            url: 'http://checkin-api.dev.cap-liberte.com/checkin',
            data : value,
            headers: {
            'Content-Type': undefined
          }
          }).then(function successCallback(response) {

             //localStorageService.clearAll();
            //delete checkins[key];
            localStorageService.clearAll();
            toaster.pop('success', "Ajout réussi", "Le checkin à  bien été ajouté");
            console.log(key);
            $rootScope.$broadcast("ChekinAdded");
            $rootScope.$broadcast("NBChekin");

          }, function errorCallback(response) {
            toaster.pop('error', "Echec de l'ajout", "Une erreur est survenu ! Réessayer ulterieurement");
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
            });
          };
        })*/



    /*.controller('checkinAdress', function($http){
      console.log('CheckIn Details');
      console.log($routeParams);

      var i = 'rien';

      console.log('1');

      console.log(i);

      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat ',' + lng + '&key=AIzaSyA2dhc9fs7Ec7Qf2noxFqHW3eYfaH9G7g8' + $routeParams.checkinId
        data: {
          lat: $scope.lat,
          lng: $scope.lng
        },
      }).then(function successCallback(response){
        console.log(response.data);

      }, function errorCallback(response) {


      });
      console.log(i);
      console.log('4');

    })*/





})(window.angular);
