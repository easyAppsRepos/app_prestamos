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
  $scope.doLogin = function() {
        

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
$state.go('app.home.confirmarContrato');
   
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


.controller('capturaDeImagenesCtrl', function($scope, $state,Solicitudes, $ionicActionSheet, $stateParams, $ionicPopup, $ionicLoading, capturaImgFactory, $cordovaImagePicker, $cordovaFileTransfer, $cordovaCamera, $cordovaFile) {

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

$scope.clienteInfo={};
$scope.mensajeImagenes = '<b>Aun se debe cargar al menos:</b> <br> 1 imagen de titulo del vehiculo <br>1 imagen del vehiculo <br> 4 imagenes del contrato firmado';
$scope.mostrarFooter = true;
$scope.clienteInfo = capturaImgFactory.getClienteData($stateParams.id_cliente);

$scope.imagenes=[];

         



            $scope.buscar = function(id){

             $scope.clienteInfo = capturaImgFactory.getClienteData(id);
             console.log($scope.clienteInfo);

            }

            $scope.actualizarMensaje = function(imagenes){

              var titulo = 0;
              var vehiculo =0;
              var contrato = 0;
              var mensaje='<b>Aun se debe cargar al menos:</b> <br>';

                for(var i = 0; imagenes.length>i;i++){
                  console.log(imagenes[i]);
                  if(imagenes[i].imagenTipo==1){ vehiculo += 1}
                  if(imagenes[i].imagenTipo==2){ titulo += 1}
                  if(imagenes[i].imagenTipo==3){ contrato += 1}
                }

              if(contrato>=4 && vehiculo >= 1 && titulo >= 1){
                $scope.mostrarFooter = false;
              }  
              else {$scope.mostrarFooter = true;}

              if(titulo<=0){mensaje=mensaje+'1 imagen de titulo del vehiculo <br>'}
              if(vehiculo<=0){mensaje=mensaje+'1 imagen del vehiculo <br>'}
              if(contrato<4)
                    {
                      mensaje=mensaje+(4-contrato)+' imagenes del contrato firmado';
                    }

                

              $scope.mensajeImagenes = mensaje;

            }

             $scope.cambiarTipo = function(tipo,index){

              $scope.imagenes[index].imagenTipo=tipo;

             // console.log($scope.imagenes);

              $scope.actualizarMensaje($scope.imagenes);

            }



$scope.quitarFoto = function(indexFoto){
    $scope.imagenes.splice(indexFoto, 1);
    $scope.actualizarMensaje($scope.imagenes);
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
            var mensaje='Transaccion realizada con exito';
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


        //photo2
          getPicture=function (ancla) {
                
                   var optionsImages = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(optionsImages).then(function (imageData) {


                        var d = new Date();
                var nombre = d.getTime().toString();

                var nuevaImagen = {imagenTipo:0, imagenData:imageData, ImagenNombre:nombre};
             
                $scope.imagenes.push(nuevaImagen);


                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
              
                
  };


   getImageSaveContact = function(ancla) {       
        // Image picker will load images according to these settings
    var options = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example

        quality: 80            // Higher is better
    };
 
    $cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
        for (var i = 0; i < results.length; i++) {
  
          //  $scope.imgURIClient = results[i];
                var d = new Date();
                var nombre = d.getTime().toString();

                var nuevaImagen = {imagenTipo:0, imagenData:results[i], ImagenNombre:nombre};
             
                $scope.imagenes.push(nuevaImagen);

        }


    }, function(error) {
        console.log('Error: ' + JSON.stringify(error));    // In case of error
    });
};

        //photo2ends

        $scope.showActionSheetImage = function(ancla) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Capturar Imagen' },
       { text: 'Galeria de Imagenes' }
     ],
     destructiveText: 'Cerrar',
     titleText: 'Obtener Imagen',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
          return true;
        },   
        destructiveButtonClicked: function() {
          return true;
         },
     buttonClicked: function(index) {
      if (index===0) {
        
          getPicture();
       

      }else if (index===1) {
       
          getImageSaveContact();
    
     }
   }});

   // For example's sake, hide the sheet after two seconds
  // $timeout(function() {
    // hideSheet();
 //  }, 2000);

 }

            

});

