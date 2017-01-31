angular.module('prestamos.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,Login,$ionicPopup,ApiEndpoint) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    $state.go('app.home');

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

.controller('capturaDeImagenesCtrl', function($scope, $state,Solicitudes, $ionicPopup, $ionicLoading, capturaImgFactory) {

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
$scope.imagenes=[];

           // var img= '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';
           //$scope.imagenes=[{imagenTipo:0, imagenData:img1, ImagenNombre:'test1'},{imagenTipo:0, imagenData:img, ImagenNombre:'test2'}];

$scope.clienteInfo={};

            $scope.buscar = function(id){

             $scope.clienteInfo = capturaImgFactory.getClienteData(id);
             console.log($scope.clienteInfo);

            }

             $scope.cambiarTipo = function(tipo,index){

              $scope.imagenes[index].imagenTipo=tipo;

              console.log($scope.imagenes);
            }



$scope.quitarFoto = function(indexFoto){
    $scope.imagenes.splice(indexFoto, 1);
    $scope.$apply();

}


            $scope.subirFoto = function(id){

              getImage();

              function getImage() {
                 $ionicLoading.show();
              navigator.camera.getPicture(visualizarFoto, function(message) {
                 $ionicLoading.hide();
              alert('Error al cargar la fotografia');
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
                   $ionicLoading.hide();
                $scope.imagenes.push(nuevaImagen);
               // $scope.picData = "data:image/jpeg;base64," +imageData;

                $scope.$apply();

              }
            }

          $scope.alerta=function(){
            var mensaje='Transaccion realizada con exito correctamente';
            var customTemplate =
            '<div style="text-align:center"><img style="margin-top:10px" src="img/confirma.png"> <p style="margin-top:25px">'+mensaje+'</p> </div>';

            $ionicPopup.show({
            template: customTemplate,
            title: '',
            subTitle: '',
            buttons: [{
            text: 'Cerrar',
            type: 'button-balanced',
            onTap: function(e) {

            }
            }]
            });
          }



        $scope.sendSMS = function() {
$ionicLoading.show();


            setTimeout(function () {

          var sendto = '2711040709';
          var textmsg = 'Gracias por su prestamo, esperamos le sea de ayuda';

        //  alert(sendto);

          if(sendto.indexOf(";") >=0) {
            sendto = sendto.split(";");
            for(i in sendto) {
              sendto[i] = sendto[i].trim();
            }
          }


        //  alert(sendto);

          if(SMS) SMS.sendSMS(sendto, textmsg, function(){}, function(str){alert(str);});
$scope.imagenes=[];
    
              $ionicLoading.hide();
              $scope.alerta();
    
    }, 2000);




        }
            

});

