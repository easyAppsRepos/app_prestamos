// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app =angular.module('prestamos', ['ionic', 'prestamos.controllers', 'prestamos.services','ngMap','ngCordova','ui.tinymce'])
.constant('ApiEndpoint', {
  url: 'http://172.17.0.1/prestamos/index.php',
  urlPymeteca:'http://prestamos.pymeteca.com.mx/index.php',
  urlLocal:'http://192.168.0.108/prestamos/index.php',
  imageUrl: 'http://prestamos.pymeteca.com.mx',
  imageUrlPymeteca:'http://prestamos.pymeteca.com.mx',
  imageUrlLocal:'http://192.168.0.108/prestamos'
})
.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    $rootScope.id_cotizacion=0;
    $rootScope.id_contrato=0;
    $rootScope.id_cliente=0;
    $rootScope.name_cliente=0;
    $rootScope.id_address=0;
    $rootScope.idFileCliente=0;
    $rootScope.idFileEvidencia=0;  
    $rootScope.monto=0;
    $rootScope.meses=0;
    $rootScope.interes_mensual=0;
    $rootScope.id_tipo_plan=0;

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
