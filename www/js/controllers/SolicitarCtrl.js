app.controller('Solicitar', 
  function($scope, $rootScope, $ionicLoading,NgMap,ApiEndpoint, $timeout,$cordovaFileTransfer,$cordovaCamera, $cordovaFile,Estates,Users, $ionicModal,Solicitar,$ionicPopup,$state,$stateParams) {
  

                $scope.cliente={};
              var vm = this;   
              var id_cliente = null;
              var name_cliente=null; 
                        $scope.states={};

              function findJSONKeyEstado(key) {
              		console.log(key);
                    for (var i = 0; i < $scope.states.data.length; i++){
					  // look for the entry with a matching `code` value
					  if ($scope.states.data[i].abbreviation == key){
					       $scope.states.selected=    {
		                      "id": $scope.states.data[i].id,
		                      "name": $scope.states.data[i].name,
		                      "abbreviation": $scope.states.data[i].abbreviation
                  			}; 

					     }
					   }
              };             

                
              function findJSONIdUsers(key) {
                  console.log(key);
                    for (var i = 0; i < $scope.users.users.length; i++){
            // look for the entry with a matching `code` value
            if ($scope.users.users[i].id == key){
                 $scope.users.selected=    {
                          "id": $scope.users.users[i].id,
                          "username": $scope.users.users[i].username
                        }; 

               }
             }
              };
          vm.placeChanged = function() {
            vm.place = this.getPlace();
            console.log('location', vm.place);
            for (var i = vm.place.address_components.length - 1; i >= 0; i--) {
              
              if (vm.place.address_components[i].types[0]=="administrative_area_level_1") {

                     findJSONKeyEstado(vm.place.address_components[i].short_name);

              }
              if (vm.place.address_components[i].types[0]=="locality") {
                      $scope.cliente.ciudad= vm.place.address_components[i].short_name;  
              }


           if (vm.place.address_components[i].types[0]=="postal_code") {
                      $scope.cliente.zip= parseInt(vm.place.address_components[i].short_name)  ;  

                                
              }if (vm.place.address_components[i].types[0]=="route" || vm.place.address_components[i].types[0]=="street_number") {
                  if (vm.place.address_components[i].types[0]=="route" )
                      $scope.cliente.calle_numero= vm.place.address_components[i].long_name  ;  
                  if (vm.place.address_components[i].types[0]=="street_number" )
                      $scope.cliente.calle_numero=$scope.cliente.calle_numero+", "+ vm.place.address_components[i].long_name  ;  
       
              }
            }
            
            vm.map.setCenter(vm.place.geometry.location);
          }


          $scope.tipoPrenda = false;
          $scope.toggleChange = function() {
          if ($scope.tipoPrenda == false) {
                    $scope.tipoPrenda = true;
                } else
                    $scope.tipoPrenda = false;
          };

          vm.disableTap = function(event) {

              var input = event.target;

              // Get the predictions element
              var container = document.getElementsByClassName('pac-container');
              container = angular.element(container);

              // Apply css to ensure the container overlays the other elements, and
              // events occur on the element not behind it
              container.css('z-index', '5000');
              container.css('pointer-events', 'auto');

              // Disable ionic data tap
              container.attr('data-tap-disabled', 'true');

              // Leave the input field if a prediction is chosen
              container.on('click', function(){
                  input.blur();
              });
          };
          var initView= function() {
         Estates.getStates().success(function (data, status, headers, config){
              $scope.states.data=data.estados;
                })
                .error(function(data, status, headers, config) {
                  /* Act on the event */
                });;

                $scope.states.selected=    {
                    "id":"16",
                      "name": "Idaho",
                      "abbreviation": "ID"
                  };
                    NgMap.getMap().then(function(map) {
                    vm.map = map;
                  });
               $scope.users={};
            

                var selectUsers=Users.get().
                success(function (data, status, headers, config){
                $scope.users=
                {
                  users:data.users,
                  selected:{
                      id:window.localStorage.getItem("id"),
                      username:window.localStorage.getItem("username")
                    }
                };
                  console.log($scope.users);
                })
                .error(function(data, status, headers, config) {
                  /* Act on the event */
                });


                

              
                       //IF CLIENTE ID 
            //
            //
            //
          if ($stateParams.id_cliente!=" " || $stateParams.id_cliente!=0) {

            Solicitar.getDataContratoForId({id:$stateParams.id_cliente}).
            success(function (data, status, headers, config){
            console.log(data);
            

            //SET ROOT
            if (data.status) {
            $rootScope.id_cotizacion=data.cliente[0].cotizacion_id;
            $rootScope.id_contrato=data.cliente[0].contrato_id;
            $rootScope.id_cliente=$stateParams.id_cliente;
            $rootScope.id_address=data.cliente[0].domicilio_id;

            $rootScope.name_cliente=data.cliente[0].name_cliente;;
            console.log($rootScope);
            $rootScope.monto=parseInt(data.cliente[0].monto);
            $rootScope.meses=parseInt(data.cliente[0].meses);
            $rootScope.interes_mensual=parseInt(data.cliente[0].interes_mensual);
            $rootScope.id_tipo_plan=data.cliente[0].id_tipo_plan;

            //SET LOCAL
            //
            //
            $scope.cliente.name=data.cliente[0].name_cliente;
            $scope.cliente.telefono=parseInt(data.cliente[0].telefono);
            $scope.cliente.apellido=data.cliente[0].apellido;
            vm.address=data.cliente[0].domicilio_name;
            $scope.cliente.calle_numero=data.cliente[0].calle_numero;
            $scope.cliente.ciudad=data.cliente[0].ciudad;
                          function findJSONIdEstado(key) {
                  console.log(key);
                    for (var i = 0; i < $scope.states.data.length; i++){
            // look for the entry with a matching `code` value
            if ($scope.states.data[i].id == key){
                 $scope.states.selected=    {
                          "id": $scope.states.data[i].id,
                          "name": $scope.states.data[i].name,
                          "abbreviation": $scope.states.data[i].abbreviation
                        }; 

               }
             }
              };  
               $timeout(function() {
                            findJSONIdEstado(data.cliente[0].id_estado);
           findJSONIdUsers(data.cliente[0].id_users);

    }, 2000);

            $scope.cliente.zip=parseInt(data.cliente[0].zip);
            if (data.cliente[0].id_tipo_prenda=="0") {
              $scope.tipoPrenda=false;
                $scope.cliente.marca_modelo=data.cliente[0].prenda;
            $scope.cliente.vin=parseInt(data.cliente[0].clave_prenda);

            }else{
              $scope.tipoPrenda=true;
                $scope.cliente.prenda=data.cliente[0].prenda;
            $scope.cliente.identificador=parseInt(data.cliente[0].clave_prenda);

            }
          var imgURIClientServer="";
          var imgURIMovilServer="";
           for (var i = data.evidencias.length - 1; i > 0; i--) {
               if (data.evidencias[i].id_tipo_imagen==="1") {
                   imgURIClientServer=data.evidencias[i].ruta_imagen;
                   $rootScope.idFileCliente=data.evidencias[i].id;

               }else if (data.evidencias[i].id_tipo_imagen==="2") {
                   imgURIMovilServer=data.evidencias[i].ruta_imagen;
                   $rootScope.idFileEvidencia=data.evidencias[i].id;


               }
           }
           console.log($rootScope);
           var arrayUriCliente=imgURIClientServer.split("prestamos");
           var arrayUriMovil=imgURIMovilServer.split("prestamos");
           imgURIClientServer=arrayUriCliente[1];
           imgURIMovilServer=arrayUriMovil[1];


            $scope.imgURIClient=ApiEndpoint.imageUrl+imgURIClientServer;
            $scope.imgURIMovil=ApiEndpoint.imageUrl+imgURIMovilServer;
            console.log($rootScope);
          }else if (!data.status){

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
              console.log($rootScope);
            }
          
          
            }).
            error(function() {
              /* Act on the event */
            });

            }
            //ELSE TODO NORMAL
            //
            //
            //

          }
          $scope.$on('$ionicView.loaded', function() {
              initView();
                  /* Act on the event */
          });
                 // Triggered in the login modal to close it


  // Open the login modal
  $scope.cotizar = function () {
console.log($rootScope);
    if($rootScope.id_cliente===0){
      var dataClient={
            name:$scope.cliente.name,
            telefono:$scope.cliente.telefono,
            apellido:$scope.cliente.apellido
        };
        name_cliente=$scope.cliente.name;
        Solicitar.insertCliente(dataClient).
        success(function (data, status, headers, config){
          console.log(data);
        var dataAddress={
        name:vm.address,
        calle_numero:$scope.cliente.calle_numero,
        ciudad:$scope.cliente.ciudad,
        estado:$scope.states.selected.id, 
        zip:$scope.cliente.zip,
        id_cliente:data.cliente
    };
    Solicitar.insertAddress(dataAddress)
      .success(function (data, status, headers, config){

      })
      .error(function(res) {
        alert("Error al insertar en tabla Address");
      });
          var prenda;
          var clave_prenda;
          var id_tipo_prenda;
          if ($scope.tipoPrenda) {
            prenda=$scope.cliente.prenda;
            clave_prenda=$scope.cliente.identificador;
            id_tipo_prenda=1;
          }else{
            prenda=$scope.cliente.marca_modelo;
            clave_prenda=$scope.cliente.vin;
            id_tipo_prenda=0;
          }
          id_cliente=data.cliente;
          var dataContrato={
            prenda:prenda,
            clave_prenda:clave_prenda,
            id_plan_pago:null,
            id_users:$scope.users.selected.id,
            id_estatus_contrato:0,
            id_cliente:data.cliente,
            id_tipo_prenda:id_tipo_prenda
            };
          Solicitar.insertContrato(dataContrato).
          success(function (data, status, headers, config) {
            // body...
            console.log(data.contrato);
            if (data.contrato) {

            var win = function (r) {
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
            }

            var fail = function (error) {
                alert("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            }
            if ($scope.imgURIClient !== undefined) {

                        var optionsClient = new FileUploadOptions();
                        optionsClient.fileKey = "evidencias";
                        optionsClient.fileName = $scope.imgURIClient.substr($scope.imgURIClient.lastIndexOf('/') + 1);
                        optionsClient.mimeType = "text/plain";

                        var params = {};
                        params.id_contrato =data.contrato;
                        params.id_tipo_imagen= 1;
                        optionsClient.params = params;

                        var ft = new FileTransfer();
                        ft.upload($scope.imgURIClient, encodeURI(ApiEndpoint.url+"/evidencias/do_upload"), win, fail, optionsClient);
             
            }
            if ($scope.imgURIMovil !== undefined) {
                        var options = new FileUploadOptions();
                        options.fileKey = "evidencias";
                        options.fileName = $scope.imgURIClient.substr($scope.imgURIClient.lastIndexOf('/') + 1);
                        options.mimeType = "text/plain";

                        var params = {};
                        params.id_contrato = data.contrato;
                        params.id_tipo_imagen= 2;
                        options.params = params;

                        var ft = new FileTransfer();
                        ft.upload($scope.imgURIClient, encodeURI(ApiEndpoint.url+"/evidencias/do_upload"), win, fail, options);


            }

            var confirmPopup = $ionicPopup.confirm({
               title: 'Felicidades',
               template: 'Solicitud Guardada'
             });

             confirmPopup.then(function(res) {
                $state.go('app.solicitar.cotizar',
                  {'id_contrato':data.contrato,
                    'id_cliente':id_cliente,
                    'name_cliente':name_cliente
                });
             });

          }


          }).error(function(res) {
          /* Act on the event */
          console.log(res);
        });


        }).error(function(res) {
          /* Act on the event */
          console.log(res);
        });

      //FINAL INSERT
      //
      //
      //
      //
      //
      //
      //FINAL INSERT
      }else{
        //INICIO UPDATE
        //
        //
        //
        //INICIO UPDATE
        var dataClient={
            id:$stateParams.id_cliente,
            name:$scope.cliente.name,
            telefono:$scope.cliente.telefono,
            apellido:$scope.cliente.apellido
        };
        name_cliente=$scope.cliente.name;
        Solicitar.updateCliente(dataClient).
        success(function (data, status, headers, config){
          console.log(data);
        var dataAddress={
        id:$rootScope.id_address,
        name:vm.address,
        calle_numero:$scope.cliente.calle_numero,
        ciudad:$scope.cliente.ciudad,
        id_estado:$scope.states.selected.id, 
        zip:$scope.cliente.zip,
        id_cliente:$rootScope.id_cliente
    };
    Solicitar.updateAddress(dataAddress)
      .success(function (data, status, headers, config){

      })
      .error(function(res) {
        alert("Error al insertar en tabla Address");
      });
          var prenda;
          var clave_prenda;
          var id_tipo_prenda;
          if ($scope.tipoPrenda) {
            prenda=$scope.cliente.prenda;
            clave_prenda=$scope.cliente.identificador;
            id_tipo_prenda=1;
          }else{
            prenda=$scope.cliente.marca_modelo;
            clave_prenda=$scope.cliente.vin;
            id_tipo_prenda=0;
          }
          id_cliente=$rootScope.id_cliente;
          var dataContrato={
            id:$rootScope.id_contrato,
            prenda:prenda,
            clave_prenda:clave_prenda,
            id_users:$scope.users.selected.id,
            id_tipo_prenda:id_tipo_prenda
            };
          Solicitar.updateContrato(dataContrato).
          success(function (data, status, headers, config) {
            // body...
            console.log(data);

            var win = function (r) {
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
            }

            var fail = function (error) {
                alert("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            }
            if ($scope.imgURIClient !== undefined && $rootScope.idFileCliente!==0) {

                        var optionsClient = new FileUploadOptions();
                        optionsClient.fileKey = "evidencias";
                        optionsClient.fileName = $scope.imgURIClient.substr($scope.imgURIClient.lastIndexOf('/') + 1);
                        optionsClient.mimeType = "text/plain";

                        var params = {};
                        params.id=$rootScope.idFileCliente;

                        optionsClient.params = params;

                        var ft = new FileTransfer();
                        ft.upload($scope.imgURIClient, encodeURI(ApiEndpoint.url+"/evidencias/do_update"), win, fail, optionsClient);
             
            }
            if ($scope.imgURIMovil !== undefined  && $rootScope.idFileEvidencia!==0) {
                        var options = new FileUploadOptions();
                        options.fileKey = "evidencias";
                        options.fileName = $scope.imgURIMovil.substr($scope.imgURIMovil.lastIndexOf('/') + 1);
                        options.mimeType = "text/plain";

                        var params = {};
                        params.id=$rootScope.idFileEvidencia;

                        options.params = params;

                        var ft = new FileTransfer();
                        ft.upload($scope.imgURIMovil, encodeURI(ApiEndpoint.url+"/evidencias/do_update"), win, fail, options);


            }

            var confirmPopup = $ionicPopup.confirm({
               title: 'Felicidades',
               template: 'Solicitud Actualizada'
             });

             confirmPopup.then(function(res) {
                $state.go('app.solicitar.cotizar',
                  {'id_contrato':data.contrato,
                    'id_cliente':id_cliente,
                    'name_cliente':name_cliente
                });
             });

          


          }).error(function(res) {
          /* Act on the event */
          console.log(res);
        });


        }).error(function(res) {
          /* Act on the event */
          console.log(res);
        });

        }

  

  }

  $scope.getPictureIdentificacionClient=function () {
                       var optionsImages = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 400,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
            
   
                    $cordovaCamera.getPicture(optionsImages).then(function (imageData) {
                        $scope.imgURIClient = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
              
                
  };
  $scope.getPictureIdentificacionMovil=function () {
                
                   var optionsImages = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 400,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(optionsImages).then(function (imageData) {
                        $scope.imgURIMovil = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
              
                
  };


});