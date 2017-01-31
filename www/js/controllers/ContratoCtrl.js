app.controller('ContratoCtrl', 
  function($scope, $state,Contrato,$stateParams,Users,$cordovaPrinter,$rootScope) {
                   var layoutOne="";
                   var layoutTwo="";
                   var id_contrato="";
           $scope.contrato={};
           $scope.users={};

             $scope.getContent = function() {
                  console.log( $scope.tinymceModel);
            };

         $scope.print = function() {
                if($cordovaPrinter.isAvailable()) {
                    $cordovaPrinter.print($scope.tinymceModel);
                } else {
                    alert("Printing is not available on device");
                }
            }
          var initView= function() { 
              if ($rootScope.id_cotizacion===0) {
        $scope.contrato.id_cotizacion=$stateParams.id_cotizacion;

      }else{
        $scope.contrato.id_cotizacion=$rootScope.id_cotizacion;

      }
              Contrato.getDataInit().success(function (data, status, headers, config){
              layoutOne=data.contrato[0].layout+data.contrato[1].layout;
              layoutTwo=data.contrato[2].layout+data.contrato[3].layout;
              Contrato.getDataContrato({'id_cotizacion':$scope.contrato.id_cotizacion}).
              success(function (data, status, headers, config){
                console.log(data);
                  //SET DATA TABLA
                  var tablaData="";
                    for (var i = 0; i <data.cotizacion.length; i++) {
                      var numbre=i+1;
                      var fecha = new Date(data.cotizacion[i].fecha);
                      var fila="<tr>\n" +
                "\t\t\t<td width=\"86\" height=\"20\" style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\" data-mce-style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\">\n" +
                "\t\t\t\t<p align=\"center\">\n"+ numbre +"\n</p>\n" +
                "\t\t\t</td>\n" +
                "\t\t\t<td width=\"89\" style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\" data-mce-style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\">\n" +
                "\t\t\t\t<p align=\"center\">\n"+data.cotizacion[i].fecha +"\n</p>\n" +
                "\t\t\t</td>\n" +
                "\t\t\t<td width=\"88\" valign=\"top\" style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\" data-mce-style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\">\n" +
                "\t\t\t\t<p align=\"right\"></p>\n" +
                "\t\t\t</td>\n" +
                "\t\t\t<td width=\"88\" style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\" data-mce-style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\">\n" +
                "\t\t\t\t<p align=\"center\">"+parseFloat(data.cotizacion[i].interes_mensual).toFixed(2)+"$</p>\n" +
                "\t\t\t</td>\n" +
                "\t\t\t<td width=\"88\" valign=\"top\" style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\" data-mce-style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\">\n" +
                "\t\t\t\t<p align=\"right\"></p>\n" +
                "\t\t\t</td>\n" +
                "\t\t\t<td width=\"87\" valign=\"top\" style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\" data-mce-style=\"border: 1px solid #00000a; padding: 0cm 0.2cm 0cm 0.21cm;\">\n" +
                "\t\t\t\t<p align=\"right\">"+parseFloat(data.cotizacion[i].balance_final).toFixed(2)+"$</p>\n" +
                "\t\t\t</td>\n" +
                "\t\t</tr>";
                tablaData=tablaData+fila;
                    }
                    //set tabla
                  $scope.tinymceModel=layoutOne+tablaData+layoutTwo;

                  //set data con formulas 
                  var varFormula1="";
                  if (data.cotizacion[0].id_tipo_plan==1) {
                    varFormula1=parseFloat(data.cotizacion[0].monto_capital)+parseFloat(data.cotizacion[0].monto_intereses);
                  }else{
                    varFormula1=parseFloat(data.cotizacion[0].monto_intereses);
                  }
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=plan_pagos.monto_capital + plan_pagos.monto_interes ó plan_pagos.monto_interes#",varFormula1.toFixed(2)+"$","gi");    

                  $scope.contrato.nameCliente=data.cliente[0].name+" "+data.cliente[0].apellido;
                  var translator = new T2W("EN_US");
                    // one thousand two hundred thirty-four
                  //alert(translator.toWords(1234));

                  $scope.tinymceModel=$scope.tinymceModel.replace("convertirALetra(#=cotizacion.monto#)",translator.toWords(parseInt(data.cotizacion[0].monto)),"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=convertirALetra(cotizacion.monto)#",translator.toWords(parseInt(data.cotizacion[0].monto)),"gi");    

                  //set fecha contrato
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.fecha#",new Date(data.contrato[0].fecha),"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.fecha#",new Date(data.contrato[0].fecha),"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.fecha#",new Date(data.contrato[0].fecha),"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.monto#",data.cotizacion[0].monto+",00$","gi");    

                  $scope.tinymceModel=$scope.tinymceModel.replace("#=FechaContrato#",new Date(data.contrato[0].fecha),"gi");    
                  //set name cliente
                  id_contrato=data.contrato[0].contrato_id;
                  var nombreCompleto = data.cliente[0].name+" "+data.cliente[0].apellido;

                  $scope.tinymceModel=$scope.tinymceModel.replace("#=Clientes.name + Clientes.apellidos#",nombreCompleto,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=Clientes.name + Clientes.apellidos#",nombreCompleto,"gi");    
            $scope.tinymceModel=$scope.tinymceModel.replace("#=Clientes.name + Clientes.apellidos#",nombreCompleto,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=Clientes.name + Clientes.apellidos#",nombreCompleto,"gi");    
            $scope.tinymceModel=$scope.tinymceModel.replace("#=Clientes.name + Clientes.apellidos#",nombreCompleto,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=Clientes.name + Clientes.apellidos#",nombreCompleto,"gi");    
                  // set Direccion cliente
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=domiciliocompleto#",data.address[0].domicilio_name,"gi");    
            // set data users
            $scope.tinymceModel=$scope.tinymceModel.replace("#=users.nombre#",data.contrato[0].username,"gi");    
            $scope.tinymceModel=$scope.tinymceModel.replace("#=users.nombre#",data.contrato[0].username,"gi");    
            $scope.tinymceModel=$scope.tinymceModel.replace("#=users.nombre#",data.contrato[0].username,"gi");    
            $scope.tinymceModel=$scope.tinymceModel.replace("#=users.nombre#",data.contrato[0].username,"gi");    

            $scope.tinymceModel=$scope.tinymceModel.replace("#=users.name#",data.contrato[0].username,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=users.domicilio#",data.contrato[0].users_domicilio,"gi");
            $scope.tinymceModel=$scope.tinymceModel.replace("#=users.nombre#",data.contrato[0].username,"gi");    
            $scope.tinymceModel=$scope.tinymceModel.replace("#=users.nombre#",data.contrato[0].username,"gi");    

                  //set cotizacion  
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.meses#",data.cotizacion[0].meses,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#= cotizacion.meses#",data.cotizacion[0].meses,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.meses#",data.cotizacion[0].meses,"gi");    
                  var dias = data.cotizacion[0].meses * 30;
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=ConvertirDias(cotizacion.meses)#",dias,"gi");
                      var rate = data.cotizacion[0].interes_mensual*data.cotizacion[0].meses;
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.interes_mensual*cotizacion.meses#",rate,"gi");

                  $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.meses#",data.cotizacion[0].meses,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=MIN(plan_pagos.fecha)#",data.cotizacion[0].fecha,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.monto#",data.cotizacion[0].monto+",00$","gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.monto#",data.cotizacion[0].monto+",00$","gi");    
             $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.monto#",data.cotizacion[0].monto+",00$","gi");    
             $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.monto#",data.cotizacion[0].monto+",00$","gi");    
             $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.monto#",data.cotizacion[0].monto+",00$","gi");    
             $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.monto#",data.cotizacion[0].monto+",00$","gi");    
             $scope.tinymceModel=$scope.tinymceModel.replace("#=cotizacion.interes_mensual#",data.cotizacion[0].interes_mensual,"gi");    

          //set plan pagos
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=plan_pagos.monto_interes#",data.cotizacion[0].monto_intereses,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=MAX(plan_pagos.fecha)#",data.cotizacion[data.cotizacion.length-1].fecha,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=plan_pagos.monto_interes#",data.cotizacion[0].monto_intereses,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=MAX(plan_pagos.fecha)#",data.cotizacion[data.cotizacion.length-1].fecha,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=MAX(plan_pagos.fecha)#",data.cotizacion[data.cotizacion.length-1].fecha,"gi");    
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=MIN(plan_pagos.fecha)#",data.cotizacion[0].fecha,"gi");    
                  var diaPlanPagos = new Date(data.cotizacion[0].fecha);
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=dia(plan_pagos.fecha)#",diaPlanPagos.getDay(),"gi");    

                  $scope.tinymceModel=$scope.tinymceModel.replace("#=domiciliocompleto#",data.address[0].domicilio_name,"gi");    
                  //set typo prenda 
                   $scope.tinymceModel=$scope.tinymceModel.replace("#=tipo_prenda.name#",data.contrato[0].tipo_prenda_name,"gi");    

                  $scope.tinymceModel=$scope.tinymceModel.replace("#=tipo_prenda.name#",data.contrato[0].tipo_prenda_name,"gi");    
              //set data auto o prenda 
                  $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.prenda#",data.contrato[0].prenda,"gi");    
                $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.clave_prenda# ",data.contrato[0].clave_prenda,"gi");    
                $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.clave_prenda# ",data.contrato[0].clave_prenda,"gi");    
                $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.clave_prenda# ",data.contrato[0].clave_prenda,"gi");    
                      $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.prenda#",data.contrato[0].prenda,"gi");    
                $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.clave_prenda# ",data.contrato[0].clave_prenda,"gi");    
                $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.clave_prenda#.",data.contrato[0].clave_prenda,"gi");    
                 $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.prenda#",data.contrato[0].prenda,"gi");    
                $scope.tinymceModel=$scope.tinymceModel.replace("#=contrato.clave_prenda# ",data.contrato[0].clave_prenda,"gi");    
            
                //configuracion MORATORIOS
                 $scope.tinymceModel=$scope.tinymceModel.replace("#=convertirALetra(configuracion_moratorios.dias_gracia)#",translator.toWords(parseInt(data.moratorios[0].dias_gracia)),"gi");    
 
                $scope.tinymceModel=$scope.tinymceModel.replace("#=configuracion_moratorios.porcentaje#",data.moratorios[0].porcentaje,"gi");    
                             $scope.tinymceModel=$scope.tinymceModel.replace("#=configuracion_moratorios.dias_gracia#",data.moratorios[0].dias_gracia,"gi");    

                       $scope.users.selected={

                      id:data.contrato[0].id_users,
                      username:data.contrato[0].username,
                      domicilio:data.contrato[0].users_domicilio
              }
              }).
              error(function() {
                /* Act on the event */
              });
            }).
            error(function() {
                /* Act on the event */
            });
              
              var selectUsers=Users.get().
                success(function (data, status, headers, config){
                $scope.users.users=data.users;
                  
                
                  //console.log($scope.users);
                })
                .error(function(data, status, headers, config) {
                  /* Act on the event */
                });
      

            }

   
           $scope.tinymceOptions = {
                resize: true,
                  // I *think* its a number and not '400' string
                height: 300,
                plugins: 'print textcolor',
                toolbar: "undo redo styleselect bold italic print forecolor backcolor"

            };
            $scope.$on('$ionicView.loaded', function() {
              initView();
            });







      function findJSONIdUsers(key) {
                  console.log(key);
                    for (var i = 0; i < $scope.users.users.length; i++){
            // look for the entry with a matching `code` value
            if ($scope.users.users[i].id == key){
                 $scope.users.selected=    {
                          "id": $scope.users.users[i].id,
                          "username": $scope.users.users[i].username,
                          "domicilio": $scope.users.users[i].domicilio
                        }; 

               }
             }
              }




            $scope.changueUser=function(){
              findJSONIdUsers($scope.users.selected.id);
              console.log(id_contrato);
            }; 
            $scope.saveUser=function(){
              
              Contrato.updateIdUsers({'id_contrato':id_contrato,'id_users':$scope.users.selected.id})
              .success(function (data, status, headers, config){
                if (data.status) {
                  console.log(data);
$state.reload();
                }
              })
              .error(function() {
                /* Act on the event */
              });


            };
});