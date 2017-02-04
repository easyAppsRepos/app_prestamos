app.
config(function($stateProvider, $urlRouterProvider,$httpProvider) {
            
      $httpProvider.defaults.useXDomain = true;
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'

      }
    }
  })
  .state('app.solicitudes', {
    url: '/solicitudes',      cache: false,

    views: {
      'menuContent': {
        templateUrl: 'templates/solicitudes.html',
        controller: 'SolicitudesCtrl'

      }
    }
  })

      .state('app.capturaDeImagenes', {
    url: '/capturaDeImagenes/:id_cliente',      cache: false,

    views: {
      'menuContent': {
        templateUrl: 'templates/capturaDeImagenes.html',
        controller: 'capturaDeImagenesCtrl'

      }
    }
  })

      
  .state('app.home', {
      url: '/home',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    }) .state('app.home.confirmarContrato', {
      url: '/confirmar/contrato',
      cache: false,
      views: {
        'confirmar-tab': {
          templateUrl: 'templates/confirmar-contrato.html',
          controller: 'ConfirmarContratoCtrl'

        }
      }
    })
  .state('app.solicitar', {
      url: '/solicitar', 
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/solicitar.html'
        }
      }
    })
  .state('app.solicitar.solicitar', {
      url: '/solicitar/:id_cliente',
            cache: false,

      views: {
        'solicitar-tab': {
          templateUrl: 'templates/formSolicitar.html',
        controller: 'Solicitar as vm'
        }
      }
    })
  .state('app.solicitar.contrato', {
      url: '/contrato/:id_cotizacion',
            cache: false,
     
      views: {
        'contrato-tab': {
          templateUrl: 'templates/formContrato.html',
        controller: 'ContratoCtrl'
        }
      }
    })
    .state('app.solicitar.cotizar', {
      url: '/cotizar/:id_contrato/:id_cliente/:name_cliente',  
            cache: false,

      views: {
        'cotizar-tab': {
          templateUrl: 'templates/formCotizar.html',
        controller: 'CotizarCtrl'
        }
      }
    })
    .state('app.solicitar.planPagos', {
      url: '/planPagos/:id_cotizacion',
            cache: false,

       views: {
        'plan-pagos-tab': {
          templateUrl: 'templates/formPlanPagos.html',
        controller: 'PlanPagosCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  }).state('login', {
    url: '/',
   abstract: false,
        
          templateUrl: 'templates/loginInit.html',
          controller: 'AppCtrl'
       
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});