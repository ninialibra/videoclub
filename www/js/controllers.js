angular.module('videoclub.controllers', [])

.controller('CarteleraCtrl', function($scope, $http) {


  $http.get(getURL()+'movie/now_playing?language=es&api_key='+getAPIKey())
    .success(function(data, status, headers,config){
      console.log('Datos de películas obtenidos');
      console.log(data);
    })
    .error(function(data, status, headers,config){
      console.log('ERROR: no se han podido obtener los datos.');
    })
    .then(function(result){
      $scope.pelis = result.data.results; //el results es lo q nos interesa del json
    });

  $scope.limpiaFiltro = function(){
    console.log("limpiar input...");
  };

})

.controller('FichaPeliCtrl', function($scope, $stateParams, $http) {

  //datos de la peli
  $http.get(getURL()+'movie/'+$stateParams.idPeli+'?language=es&api_key='+getAPIKey())
    .success(function(data, status, headers,config){
      console.log('Datos de la película '+$stateParams.idPeli+' obtenidos');
      console.log(data);
    })
    .error(function(data, status, headers,config){
      console.log('ERROR: no se han podido obtener los datos de la peli: '+$stateParams.idPeli);
    })
    .then(function(result){
      $scope.pelicula = result.data;

      //cadena con los diferentes géneros de la peli
      var generos="";
      var aGeneros = result.data.genres;

      for(var i=0;i<aGeneros.length;i++){
        generos = generos+" "+aGeneros[i].name+",";
      }

      //para quitar la , final
      $scope.generos = generos.substr(0,(generos.length - 1));
    });

  //actores de la peli
  $http.get(getURL()+'movie/'+$stateParams.idPeli+'/credits?language=es&api_key='+getAPIKey())
    .success(function(data, status, headers,config){
      console.log('Elenco de la película '+$stateParams.idPeli+' obtenido');
      console.log(data);
    })
    .error(function(data, status, headers,config){
      console.log('ERROR: no se han podido obtener los datos del elenco de la peli: '+$stateParams.idPeli);
    })
    .then(function(result){
      $scope.actores = result.data.cast;
    });
})

.controller('BusPelisCtrl', function($scope, $http) {

  $scope.buscarPeli = function(buscar){

    $http.get(getURL()+'search/movie?api_key='+getAPIKey()+'&query='+buscar+'&language=es')
      .success(function(data, status, headers,config){
        console.log('Datos de la busqueda con '+buscar+' obtenidos');
        console.log(data);
      })
      .error(function(data, status, headers,config){
        console.log('ERROR: no se han podido obtener los datos de la busqueda: '+buscar);
      })
      .then(function(result){
        $scope.pelis = result.data.results; //array del json donde estan los datos
      });
  };

})

.controller('ActoresCtrl', function($scope, $http) {

  $scope.buscarActor = function(buscar){

    $http.get(getURL()+'search/person?api_key='+getAPIKey()+'&query='+buscar+'&language=es')
      .success(function(data, status, headers, config){
        console.log('Datos de la busqueda con '+buscar+' obtenidos');
        console.log(data);
      })
      .error(function(data, status, headers,config){
        console.log('ERROR: no se han podido obtener los datos de la busqueda: '+buscar);
      })
      .then(function(result){
        $scope.actores = result.data.results; //array del json donde estan los datos
      });
  };
})

.controller('FichaActorCtrl', function($scope, $stateParams, $http) {

  //biografia del actor
  $http.get(getURL()+'person/'+$stateParams.idActor+'?language=es&api_key='+getAPIKey())
    .success(function(data, status, headers,config){
      console.log('Datos del actor '+$stateParams.idActor+' obtenidos');
      console.log(data);
    })
    .error(function(data, status, headers,config){
      console.log('ERROR: no se han podido obtener los datos del actor: '+$stateParams.idActor);
    })
    .then(function(result){
      $scope.actor = result.data;
    });

  //filmografia del actor
  $http.get(getURL()+'person/'+$stateParams.idActor+'/credits?language=es&api_key='+getAPIKey())
    .success(function(data, status, headers,config){
      console.log('Películas del actor '+$stateParams.idActor+' obtenidas');
      console.log(data);
    })
    .error(function(data, status, headers,config){
      console.log('ERROR: no se han podido obtener los datos de las pelis del actor: '+$stateParams.idActor);
    })
    .then(function(result){
      $scope.peliculas = result.data.cast;
    });
})

.controller('SeriesCtrl', function($scope, $http) {

  $scope.buscarSerie = function(buscar){

    $http.get(getURL()+'search/tv?api_key='+getAPIKey()+'&query='+buscar+'&language=es')
      .success(function(data, status, headers,config){
        console.log('Datos de la busqueda con '+buscar+' obtenidos');
        console.log(data);
      })
      .error(function(data, status, headers,config){
        console.log('ERROR: no se han podido obtener los datos de la busqueda: '+buscar);
      })
      .then(function(result){
        $scope.series = result.data.results; //array del json donde estan los datos
      });
  };

})
.controller('SerieCtrl', function($scope, $stateParams, $http) {

  $http.get(getURL()+'tv/'+$stateParams.idSerie+'?language=es&api_key='+getAPIKey())
    .success(function(data, status, headers,config){
      console.log('Datos de la serie '+$stateParams.idSerie+' obtenidos');
      console.log(data);
    })
    .error(function(data, status, headers,config){
      console.log('ERROR: no se han podido obtener los datos de la serie: '+$stateParams.idSerie);
    })
    .then(function(result){
      $scope.serie = result.data;

      //cadena con los diferentes géneros de la serie
      var generos="";
      var aGeneros = result.data.genres;

      for(var i=0;i<aGeneros.length;i++){
        generos = generos+" "+aGeneros[i].name+",";
      }

      //para quitar la , final
      $scope.generos = generos.substr(0,(generos.length - 1));

      var aTemporadas=[];
      for(var t=1;t<=result.data.number_of_seasons;t++){
        aTemporadas.push(t);
      }

      $scope.temporadas = aTemporadas;

    });
})
.controller('EpisodiosCtrl', function($scope, $stateParams, $http) {

  var idSerie = $stateParams.idSerie
  var num_temporada = $stateParams.temp;

  $http.get(getURL()+'tv/'+$stateParams.idSerie+'?language=es&api_key='+getAPIKey())
    .success(function(data, status, headers,config){
      console.log('Datos de la serie '+$stateParams.idSerie+' obtenidos');
      console.log(data);
    })
    .error(function(data, status, headers,config){
      console.log('ERROR: no se han podido obtener los datos de la serie: '+$stateParams.idSerie);
    })
    .then(function(result){
      $scope.titulo = result.data.name+" T"+num_temporada;
    });

  $http.get(getURL()+'tv/'+idSerie+'/season/'+num_temporada+'?api_key='+getAPIKey())
    .success(function(data, status, headers,config){
      console.log('Episodios de la temporada '+num_temporada+' de la serie '+idSerie+' obtenidos');
      console.log(data);
    })
    .error(function(data, status, headers,config){
      console.log('ERROR: no se han podido obtener los datos de la serie: '+$stateParams.idSerie);
    })
    .then(function(result){
      $scope.episodios = result.data.episodes;
    });
});
