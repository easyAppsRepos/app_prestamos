app.controller('ConfirmarContratoCtrl', function($scope, $state,Solicitudes) {
            var initView= function() { 
            Solicitudes.listConfirmar().
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
});
