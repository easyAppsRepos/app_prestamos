angular.module('prestamos.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,Login,$ionicPopup,ApiEndpoint) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    if (window.localStorage.getItem("recordarme")) {
        $state.go('app.home');

    }

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later


$scope.offLogin= function(){

  window.localStorage.removeItem("id");
      window.localStorage.removeItem("recordarme");

   window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
  $state.go('login');


};

  // Perform the login action when the user submits the login form

  
  $scope.doLogin = function() {$state.go('app.home');} //cambiar

  $scope.doLogin2 = function() {
        

    console.log('SCOPE', $scope.loginData);
//    $state.go('app.search');

    var fabrica=Login.loginPost($scope.loginData).
    success(function (data, status, headers, config){
     
    if (data.status) {
     window.localStorage.setItem("id", data.user[0].id);

   window.localStorage.setItem("username", $scope.loginData.username);
    window.localStorage.setItem("password", $scope.loginData.password);
    if ($scope.loginData.recordarme) {
      window.localStorage.setItem("recordarme", $scope.loginData.recordarme);

    }
$state.go('app.home');
   
} else{
    $ionicPopup.confirm({
     title: 'Data incorrecta',
     template: 'verifique sus datos'
   });
} 
 }).
    error(function(res) {
    
        $ionicPopup.confirm({
     title: 'Error!!',
     template: 'verifique su Conexion'
   });
        console.log("ERRORLOGIN"+res);
        return res;
  /* Act on the event */
    });
        //console.log('fabrica', fabrica);
 //alert(fabrica);
    //$state.go("app.browse");

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //$timeout(function() {
      //$scope.closeLogin();
    //}, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('SearchCtrl', function($scope, $stateParams) {
alert(window.localStorage.getItem("username"));
var translator = new T2W("EN_US");
// one thousand two hundred thirty-four
alert(translator.toWords(1234));

})
.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('SolicitudesCtrl', function($scope, $state,Solicitudes) {
            var initView= function() { 
            Solicitudes.listSolicitudes().
            success(function (data, status, headers, config) {
              $scope.solicitudes=data.clientes;
              console.log(data);
            }).error(function(res) {
                    console.log(res);

              /* Act on the event */
            });


            }



            $scope.$on('$ionicView.loaded', function() {
              initView();
                  /* Act on the event */
            });
})

.controller('capturaDeImagenesCtrl', function($scope, $state,Solicitudes, capturaImgFactory) {

/*            var initView= function() { 
            Solicitudes.listSolicitudes().
            success(function (data, status, headers, config) {
              $scope.solicitudes=data.clientes;
              console.log(data);
            }).error(function(res) {
                    console.log(res);

              
            });


            }



            $scope.$on('$ionicView.loaded', function() {
              initView();
                  
            });*/
         //   $scope.imagenes=[{imagenTipo:0, imagenData:img1, ImagenNombre:'test1'},{imagenTipo:0, imagenData:img, ImagenNombre:'test2'}];
$scope.imagenes=[];
$scope.clienteInfo={};

            $scope.buscar = function(id){

             $scope.clienteInfo = capturaImgFactory.getClienteData(id);
             console.log($scope.clienteInfo);

            }

             $scope.cambiarTipo = function(tipo,index){

              $scope.imagenes[index].imagenTipo=tipo;

              console.log($scope.imagenes);
            }



            $scope.subirFoto = function(id){

              getImage();

              function getImage() {
              navigator.camera.getPicture(visualizarFoto, function(message) {
              alert('get picture failed');
              }, {
              quality: 100,
             // destinationType: navigator.camera.DestinationType.FILE_URI,
             destinationType: navigator.camera.DestinationType.DATA_URL,
              sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
              });
              }

              function visualizarFoto(imageData){

                var d = new Date();
                var nombre = d.getTime().toString();

                var nuevaImagen = {imagenTipo:0, imagenData:imageData, ImagenNombre:nombre};
                $scope.imagenes.push(nuevaImagen);
               // $scope.picData = "data:image/jpeg;base64," +imageData;
                $scope.$apply();

              }
            }

        $scope.sendSMS = function() {
          var sendto = '50672519283';
          var textmsg = 'Gracias por su prestamoe de $0000. Esperamos le sea de ayuda';
          if(sendto.indexOf(";") >=0) {
            sendto = sendto.split(";");
            for(i in sendto) {
              sendto[i] = sendto[i].trim();
            }
          }
          if(SMS) SMS.sendSMS(sendto, textmsg, function(){}, function(str){alert(str);});
        }
            

});

