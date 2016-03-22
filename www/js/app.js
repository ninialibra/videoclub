// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'videoclub', nombre de la app establecido en la etiqueta body
// el resto de parametros son requires
angular.module('videoclub', ['ionic', 'videoclub.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  //configuración general para el botón de atrás
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text('Atrás').icon('ion-ios-arrow-left');

  //Documentación: https://github.com/angular-ui/ui-router

  $stateProvider

  //tabs template
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  //Resto de URL con sus vistas y controladores
  .state('tab.cartelera', {
      url: '/cartelera',
      views: {
        'tab-cartelera': {
          templateUrl: 'templates/tab-cartelera.html',
          controller: 'CarteleraCtrl'
        }
      }
    })
    .state('tab.ficha', {
      url: '/ficha/:idPeli',
      views: {
        'tab-cartelera': {
          templateUrl: 'templates/ficha-peli.html',
          controller: 'FichaPeliCtrl'
        }
      }
    })

  .state('tab.buspelis', {
      url: '/buspelis',
      views: {
        'tab-buspelis': {
          templateUrl: 'templates/tab-buspelis.html',
          controller: 'BusPelisCtrl'
        }
      }
    })
    .state('tab.fichapeli', {
        url: '/fichapeli/:idPeli',
        views: {
          'tab-buspelis': {
            templateUrl: 'templates/ficha-peli.html',
            controller: 'FichaPeliCtrl'
          }
        }
      })

  .state('tab.series', {
    url: '/series',
    views: {
      'tab-series': {
        templateUrl: 'templates/tab-series.html',
        controller: 'SeriesCtrl'
      }
    }
  })
  .state('tab.fichaserie', {
    url: '/fichaserie/:idSerie',
    views: {
      'tab-series': {
        templateUrl: 'templates/ficha-serie.html',
        controller: 'SerieCtrl'
      }
    }
  }).state('tab.episodios', {
    url: '/episodios/:idSerie/:temp',
    views: {
      'tab-series': {
        templateUrl: 'templates/episodios-serie.html',
        controller: 'EpisodiosCtrl'
      }
    }
  })
  .state('tab.actores', {
      url: '/actores',
      views: {
        'tab-actores': {
          templateUrl: 'templates/tab-actores.html',
          controller: 'ActoresCtrl'
        }
      }
    })
    .state('tab.fichaactor', {
        url: '/fichaactor/:idActor',
        views: {
          'tab-actores': {
            templateUrl: 'templates/ficha-actor.html',
            controller: 'FichaActorCtrl'
          }
        }
      });

  //vista por defecto
  $urlRouterProvider.otherwise('/tab/cartelera');

});
