app
.controller('CotizarCtrl', function($scope,$rootScope,$state, $stateParams,Cotizacion,$ionicPopup) {
            console.log($stateParams);
              $scope.cotizar={};
            var initView= function() { 
            if ($stateParams.name_cliente!="") {
            $scope.cotizar.nameCliente=$stateParams.name_cliente;

            }else{
            $scope.cotizar.nameCliente=$rootScope.name_cliente;
            if ($rootScope.id_cotizacion!=0) {
              $scope.cotizar.cantidadprestar=$rootScope.monto;
               $scope.cotizar.periodo=$rootScope.meses;
               $scope.cotizar.interesMensual=$rootScope.interes_mensual;
               $scope.cotizar.tipoPlan=$rootScope.id_tipo_plan;
               $scope.calcularCuota();
            }
            }
            }
            $scope.$on('$ionicView.loaded', function() {
              initView();
                  /* Act on the event */
            });

           $scope.calcularCuota= function () {
            var a; var p; var i; var n; var b; var c; var r;
            var d;
               p=$scope.cotizar.cantidadprestar;
               n=$scope.cotizar.periodo;
               i=$scope.cotizar.interesMensual;
              if (p!=undefined && n!=undefined && i!=undefined) {
                var porcentaje =i/100;
              a=Math.pow((1+porcentaje),n);
              b = porcentaje*a;
              c = a-1;
              d = b/c;
              r = p * d;
              if ($scope.cotizar.tipoPlan=="2") {
                $scope.cotizar.pagomensual=p*porcentaje;
              }else{
                $scope.cotizar.pagomensual=r;

              }
              }
            }
            $scope.cotizar.insertCotizacion = function () {
             console.log($scope.cotizar);
if ($rootScope.id_cotizacion==0 || $rootScope.id_cotizacion==undefined) {
            var dataCotizacion={
            monto:$scope.cotizar.cantidadprestar,
            meses:$scope.cotizar.periodo,
            interes_mensual:$scope.cotizar.interesMensual,
            id_contrato:$stateParams.id_contrato,
            id_tipo_plan:$scope.cotizar.tipoPlan,
            };
             
             console.log(dataCotizacion);

            Cotizacion.insertCotizacion(dataCotizacion).
            success(function (data, status, headers, config) {
              if (data.status) {

            var confirmPopup = $ionicPopup.confirm({
               title: 'Felicidades',
               template: 'Cotizacion Guardada'
             });

             confirmPopup.then(function(res) {
              console.log(data);
                $state.go('app.solicitar.planPagos',
                  {'id_cotizacion':data.cotizacion
                });
             });

              }
            }).error(function(res) {
                    console.log(res);

              /* Act on the event */
            });



            }else{
                var dataCotizacion={
            id:$rootScope.id_cotizacion,
            monto:$scope.cotizar.cantidadprestar,
            meses:$scope.cotizar.periodo,
            interes_mensual:$scope.cotizar.interesMensual,
            id_tipo_plan:$scope.cotizar.tipoPlan
            };
             
             console.log(dataCotizacion);

            Cotizacion.updateCotizacion(dataCotizacion).
            success(function (data, status, headers, config) {
             

            var confirmPopup = $ionicPopup.confirm({
               title: 'Felicidades',
               template: 'Cotizacion Actualizada'
             });

             confirmPopup.then(function(res) {
              console.log(data);
                $state.go('app.solicitar.planPagos',
                  {'id_cotizacion':$rootScope.id_cotizacion
                });
             });

              
            }).error(function(res) {
                    console.log(res);

              /* Act on the event */
            });


            }
            }




});