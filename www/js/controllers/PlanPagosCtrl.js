app.controller('PlanPagosCtrl', 
function($scope,$rootScope, $stateParams,PlanPagos,$ionicPopup,$state,$timeout) 
{
    console.log($stateParams);
      $scope.planPagos={};
   var periodo;

    var initView= function() { 
    	if ($rootScope.id_cotizacion===0) {
    		$scope.planPagos.id_cotizacion=$stateParams.id_cotizacion;

    	}else{
    		$scope.planPagos.id_cotizacion=$rootScope.id_cotizacion;

    	}

		   
      var fecha;
      var fechaInicio;
		var serviceInit = PlanPagos.getDataInit({id_cotizacion:$scope.planPagos.id_cotizacion})
		.success(function (data, status, headers, config) {
		  	console.log(data);      // 01/01/2017

		  	
		  		$scope.planPagos.planes=data.planes;
		  	$scope.planPagos.tipoPlan=data.cotizacion[0].id_tipo_plan;

		    $scope.planPagos.nameCliente=data.cotizacion[0].name;
		    $scope.planPagos.periodo=data.cotizacion[0].meses;
		    periodo=data.cotizacion[0].meses;
		    $scope.planPagos.inicioPagos=0;
		    
		     fecha =new Date(data.cotizacion[0].fecha);
		    $scope.planPagos.firmaContrato=fecha;
		     fechaInicio=new Date(data.cotizacion[0].fecha);
		    fechaInicio.setDate(fechaInicio.getDate() + 30);
		    $scope.planPagos.inicioPagos=fechaInicio;
	        $scope.planPagos.cantidadPrestar=data.cotizacion[0].monto;
			$scope.planPagos.interesMensual=data.cotizacion[0].interes_mensual;
	    	var maxis=new Date(fechaInicio);
	    	maxis.setDate(fechaInicio.getDate() + 1);
			$scope.planPagos.maximunDateInicio = format(maxis);
	    	var pagoMensual=calcularCuota(
		      $scope.planPagos.cantidadPrestar,
		      $scope.planPagos.periodo,
		      data.cotizacion[0].interes_mensual
	    	)
	    	$scope.planPagos.pagoMensual=pagoMensual;
		     var porcentaje =data.cotizacion[0].interes_mensual/100;
		    $scope.planPagos.interesTotalNO=($scope.planPagos.cantidadPrestar*data.cotizacion[0].interes_mensual)/100;
		    $scope.planPagos.pagoTotal=$scope.planPagos.pagoMensual*$scope.planPagos.periodo;
		   
		    $scope.planPagos.interesTotal=$scope.planPagos.pagoTotal-$scope.planPagos.cantidadPrestar;

		    if ($scope.planPagos.tipoPlan==1) {
		    $scope.planPagos.dataTable=[
		    {'fechaPago':$scope.planPagos.inicioPagos,
		    'numeroMes':1,
		    'balanceInicial':$scope.planPagos.cantidadPrestar,
		    'pagoMensual':pagoMensual,
		    'interesMensual':$scope.planPagos.cantidadPrestar*porcentaje,
		    'principalMes':$scope.planPagos.pagoMensual-($scope.planPagos.cantidadPrestar*porcentaje),
		    'balanceFinal':$scope.planPagos.cantidadPrestar-(pagoMensual-($scope.planPagos.cantidadPrestar*porcentaje))

			}];
		for (var i = 1; i < parseInt($scope.planPagos.periodo); i++) {
			console.log("en bucle");
			var fechaAsetear=new Date($scope.planPagos.dataTable[i-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
			var balanceInicial=$scope.planPagos.dataTable[i-1].balanceFinal;
			var pagoMensual= $scope.planPagos.dataTable[i-1].pagoMensual;
		$scope.planPagos.dataTable.push({
			'fechaPago':fechaAsetear,
			'numeroMes':i+1,
			'balanceInicial':balanceInicial,
			'pagoMensual':pagoMensual,
			'interesMensual':balanceInicial*porcentaje,
			'principalMes':pagoMensual-(balanceInicial*porcentaje),
			'balanceFinal':balanceInicial-(pagoMensual-(balanceInicial*porcentaje))

		});		
		

		}
		}else if ($scope.planPagos.tipoPlan==2) {
		    $scope.planPagos.dataTable=[
		    {'fechaPago':$scope.planPagos.inicioPagos,
		    'numeroMes':1,
		    'balanceInicial':$scope.planPagos.cantidadPrestar,
		    'pagoMensual':$scope.planPagos.cantidadPrestar*porcentaje,
		    'interesMensual':$scope.planPagos.cantidadPrestar*porcentaje.toFixed(2),
		    'principalMes':0,
		    'balanceFinal':$scope.planPagos.cantidadPrestar

			}];
		for (var i = 1; i < parseInt($scope.planPagos.periodo); i++) {
			console.log("en bucle");
			var fechaAsetear=new Date($scope.planPagos.dataTable[i-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
			var balanceInicial=parseFloat($scope.planPagos.dataTable[i-1].balanceFinal);
			var pagoMensual= parseFloat($scope.planPagos.dataTable[i-1].pagoMensual);
			if (i==parseInt($scope.planPagos.periodo)-1) {
				pagoMensual=parseFloat($scope.planPagos.dataTable[i-1].pagoMensual)+balanceInicial;
			}
		$scope.planPagos.dataTable.push({
			'fechaPago':fechaAsetear,
			'numeroMes':i+1,
			'balanceInicial':balanceInicial.toFixed(2),
			'pagoMensual':pagoMensual,
			'interesMensual':balanceInicial.toFixed(2)*porcentaje.toFixed(2),
			'principalMes':pagoMensual-(balanceInicial.toFixed(2)*porcentaje.toFixed(2)),
			'balanceFinal':balanceInicial.toFixed(2)-(pagoMensual-(balanceInicial.toFixed(2)*porcentaje.toFixed(2)).toFixed(2))

		});		
		

		}

		}
		console.log($scope.planPagos.dataTable);





		}).error(function(res) {
	        console.log(res);
		});

	



    }
           var calcularCuota= function (cantidad,periodo,interes) {
            var a; var p; var i; var n; var b; var c; var r;
            var d;
               p=cantidad;
               n=periodo;
               i=interes;
              if (p!=undefined && n!=undefined && i!=undefined) {
                var porcentaje =i/100;
              a=new Number(Math.pow((1+porcentaje),n));
              b = porcentaje*a;
              c = a-1;
              d = b/c;
              console.log(c);
              console.log(d);
              r = p * d;
              return r;
              }
            }
            function format(date) {
			  date = new Date(date);

			  var day = ('0' + date.getDate()).slice(-2);
			  var month = ('0' + (date.getMonth() + 1)).slice(-2);
			  var year = date.getFullYear();

			  return year + '-' + month + '-' + day;
			}
            $scope.planPagos.updateTableData=function(event) {

            var porcentaje =$scope.planPagos.interesMensual/100;
 			var pagoMensual=calcularCuota(
		      $scope.planPagos.cantidadPrestar,
		      $scope.planPagos.periodo,
		      $scope.planPagos.interesMensual
	    	);
	    	var fechaContrato =new Date($scope.planPagos.firmaContrato);
			var fechaInicio = new Date($scope.planPagos.inicioPagos);
			fechaContrato.setDate(fechaContrato.getDate()+30);
	
 			console.log(event);
 			if (event==5) {
 					var maxis=new Date(fechaInicio);
			    	maxis.setDate(fechaContrato.getDate() + 2);
					$scope.planPagos.maximunDateInicio = format(maxis);
 			}
	    	
 		if (fechaContrato.getTime()!=fechaInicio.getTime()) {
 				var restaFechas= (fechaContrato.getDate()-fechaInicio.getDate())/30*100;
 				
		 if ($scope.planPagos.tipoPlan==1) {
		 	 				var restaPagoMensual=restaFechas*pagoMensual/100;

		    		    $scope.planPagos.dataTable[0]=
		    {'fechaPago':$scope.planPagos.inicioPagos,
		    'numeroMes':1,
		    'balanceInicial':$scope.planPagos.cantidadPrestar,
		    'pagoMensual':pagoMensual-restaPagoMensual,
		    'interesMensual':$scope.planPagos.cantidadPrestar*porcentaje,
		    'principalMes':(pagoMensual-restaPagoMensual)-($scope.planPagos.cantidadPrestar*porcentaje),
		    'balanceFinal':$scope.planPagos.cantidadPrestar-((pagoMensual-restaPagoMensual)-($scope.planPagos.cantidadPrestar*porcentaje))

			};

		    
		    for (var i = 1; i < parseInt($scope.planPagos.periodo); i++) {
			var fechaAsetear=new Date($scope.planPagos.dataTable[i-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
			var balanceInicial=$scope.planPagos.dataTable[i-1].balanceFinal;
			var pagoMensual= pagoMensual;
			$scope.planPagos.dataTable[i]={
				'fechaPago':fechaAsetear,
				'numeroMes':i+1,
				'balanceInicial':balanceInicial,
				'pagoMensual':pagoMensual,
				'interesMensual':balanceInicial*porcentaje,
				'principalMes':(pagoMensual)-(balanceInicial*porcentaje),
				'balanceFinal':balanceInicial-(pagoMensual-(balanceInicial*porcentaje))

			};	}			
			if ($scope.planPagos.dataTable.length<parseInt(periodo+1) && $scope.planPagos.dataTable[parseInt(periodo)]==null) {
								console.log($scope.planPagos.dataTable);

				var balanceInicial=$scope.planPagos.dataTable[periodo-1].balanceFinal;
			var fechaAsetear=new Date($scope.planPagos.dataTable[periodo-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
					$scope.planPagos.dataTable.push({
									'fechaPago':fechaAsetear,
									'numeroMes':parseInt(periodo)+1,
									'balanceInicial':balanceInicial,
									'pagoMensual':(balanceInicial*porcentaje)+balanceInicial,
									'interesMensual':balanceInicial*porcentaje,
									'principalMes':balanceInicial,
									'balanceFinal':balanceInicial-balanceInicial
					
								});
			}else  {
				console.log($scope.planPagos.dataTable);
						var balanceInicial=$scope.planPagos.dataTable[periodo-1].balanceFinal;
			var fechaAsetear=new Date($scope.planPagos.dataTable[periodo-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
						$scope.planPagos.dataTable[$scope.planPagos.dataTable.length-1]={
									'fechaPago':fechaAsetear,
									'numeroMes':parseInt(periodo)+1,
									'balanceInicial':balanceInicial,
									'pagoMensual':(balanceInicial*porcentaje)+balanceInicial,
									'interesMensual':balanceInicial*porcentaje,
									'principalMes':balanceInicial,
									'balanceFinal':balanceInicial-balanceInicial
					
								};
			}
		}else if ($scope.planPagos.tipoPlan==2) {


		 	 var restaPagoMensual=restaFechas*($scope.planPagos.cantidadPrestar*porcentaje)/100;

		    $scope.planPagos.dataTable[0]=
		    {'fechaPago':$scope.planPagos.inicioPagos,
		    'numeroMes':1,
		    'balanceInicial':$scope.planPagos.cantidadPrestar,
		    'pagoMensual':($scope.planPagos.cantidadPrestar*porcentaje)-(restaPagoMensual),
		    'interesMensual':($scope.planPagos.cantidadPrestar*porcentaje)-(restaPagoMensual),
		    'principalMes':0,
		    'balanceFinal':$scope.planPagos.cantidadPrestar

			};
		for (var i = 1; i < parseInt($scope.planPagos.periodo); i++) {
			console.log("en bucle");
			var fechaAsetear=new Date($scope.planPagos.dataTable[i-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
			var balanceInicial=parseFloat($scope.planPagos.dataTable[i-1].balanceFinal);
			var pagoMensual= parseFloat($scope.planPagos.dataTable[i-1].pagoMensual);
			if (i==parseInt($scope.planPagos.periodo)-1) {
				pagoMensual=parseFloat($scope.planPagos.dataTable[i-1].pagoMensual)+balanceInicial;
			}
		$scope.planPagos.dataTable[i]={
			'fechaPago':fechaAsetear,
			'numeroMes':i+1,
			'balanceInicial':balanceInicial.toFixed(2),
			'pagoMensual':$scope.planPagos.cantidadPrestar*porcentaje,
			'interesMensual':$scope.planPagos.cantidadPrestar*porcentaje,
			'principalMes':0,
			'balanceFinal':$scope.planPagos.cantidadPrestar

		};		
		

		}

if ($scope.planPagos.dataTable.length<parseInt(periodo+1) && $scope.planPagos.dataTable[parseInt(periodo)]==null){

				var balanceInicial=$scope.planPagos.dataTable[periodo-1].balanceFinal;
			var fechaAsetear=new Date($scope.planPagos.dataTable[periodo-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
					$scope.planPagos.dataTable.push({
									'fechaPago':fechaAsetear,
									'numeroMes':$scope.planPagos.dataTable.length+1,
									'balanceInicial':balanceInicial,
									'pagoMensual':parseFloat($scope.planPagos.cantidadPrestar)+	parseFloat(restaPagoMensual),
									'interesMensual':restaPagoMensual,
									'principalMes':balanceInicial,
									'balanceFinal':balanceInicial-balanceInicial
					
								});
			}else{
			var balanceInicial=$scope.planPagos.dataTable[periodo-1].balanceFinal;
			var fechaAsetear=new Date($scope.planPagos.dataTable[periodo-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
						$scope.planPagos.dataTable[periodo]={
										'fechaPago':fechaAsetear,
									'numeroMes':parseInt(periodo)+1,
									'balanceInicial':balanceInicial,
									'pagoMensual':parseFloat($scope.planPagos.cantidadPrestar)+	parseFloat(restaPagoMensual),
									'interesMensual':restaPagoMensual,
									'principalMes':balanceInicial,
									'balanceFinal':balanceInicial-balanceInicial
					
								};
			}


		}
			

 			}else{


if ($scope.planPagos.dataTable[periodo]==undefined) {}
	else{
					$scope.planPagos.dataTable[periodo]='undefined';
	}




		    if ($scope.planPagos.tipoPlan==1) {
		    $scope.planPagos.dataTable[0]=
		    {'fechaPago':$scope.planPagos.inicioPagos,
		    'numeroMes':1,
		    'balanceInicial':$scope.planPagos.cantidadPrestar,
		    'pagoMensual':pagoMensual,
		    'interesMensual':$scope.planPagos.cantidadPrestar*porcentaje,
		    'principalMes':$scope.planPagos.pagoMensual-($scope.planPagos.cantidadPrestar*porcentaje),
		    'balanceFinal':$scope.planPagos.cantidadPrestar-(pagoMensual-($scope.planPagos.cantidadPrestar*porcentaje))

			};
		for (var i = 1; i < parseInt($scope.planPagos.periodo); i++) {
			console.log("en bucle");
			var fechaAsetear=new Date($scope.planPagos.dataTable[i-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
			var balanceInicial=$scope.planPagos.dataTable[i-1].balanceFinal;
			var pagoMensual= $scope.planPagos.dataTable[i-1].pagoMensual;
		$scope.planPagos.dataTable[i]={
			'fechaPago':fechaAsetear,
			'numeroMes':i+1,
			'balanceInicial':balanceInicial,
			'pagoMensual':pagoMensual,
			'interesMensual':balanceInicial*porcentaje,
			'principalMes':pagoMensual-(balanceInicial*porcentaje),
			'balanceFinal':balanceInicial-(pagoMensual-(balanceInicial*porcentaje))

		};		
		

		}
		}else if ($scope.planPagos.tipoPlan==2) {
		    $scope.planPagos.dataTable[0]=
		    {'fechaPago':$scope.planPagos.inicioPagos,
		    'numeroMes':1,
		    'balanceInicial':$scope.planPagos.cantidadPrestar,
		    'pagoMensual':$scope.planPagos.cantidadPrestar*porcentaje,
		    'interesMensual':$scope.planPagos.cantidadPrestar*porcentaje.toFixed(2),
		    'principalMes':0,
		    'balanceFinal':$scope.planPagos.cantidadPrestar

			};
		for (var i = 1; i < parseInt($scope.planPagos.periodo); i++) {
			console.log("en bucle");
			var fechaAsetear=new Date($scope.planPagos.dataTable[i-1].fechaPago);
			fechaAsetear.setDate(fechaAsetear.getDate()+30);
			var balanceInicial=parseFloat($scope.planPagos.dataTable[i-1].balanceFinal);
			var pagoMensual= parseFloat($scope.planPagos.dataTable[i-1].pagoMensual);
			if (i==parseInt($scope.planPagos.periodo)-1) {
				pagoMensual=parseFloat($scope.planPagos.dataTable[i-1].pagoMensual)+balanceInicial;
			}
		$scope.planPagos.dataTable[i]={
			'fechaPago':fechaAsetear,
			'numeroMes':i+1,
			'balanceInicial':balanceInicial.toFixed(2),
			'pagoMensual':pagoMensual,
			'interesMensual':balanceInicial.toFixed(2)*porcentaje.toFixed(2),
			'principalMes':pagoMensual-(balanceInicial.toFixed(2)*porcentaje.toFixed(2)),
			'balanceFinal':balanceInicial.toFixed(2)-(pagoMensual-(balanceInicial.toFixed(2)*porcentaje.toFixed(2)).toFixed(2))

		};		
		

		}

		}}
            }


    $scope.$on('$ionicView.loaded', function() {
      initView();
                  /* Act on the event */
    });

  $scope.planPagos.insertPlanPagos = function() {
  	 var dataUpdateCotizacion={
            id:$rootScope.id_cotizacion,
            id_tipo_plan:$scope.planPagos.tipoPlan
            };
    PlanPagos.updateCotizacionTipoPlan(dataUpdateCotizacion).
    success(function (data, status, headers, config){
    	console.log("cotizacion actualizada");
    }).
    error(function() {
    	/* Act on the event */
    });

  	if ($scope.planPagos.planes.length>0) {
  		

        	$scope.planPagos.timerInsert=0;
//    $state.go('app.search');
	   var alertPopup = $ionicPopup.alert({
     title: 'Actualizando !',
     template: 'Por Favor Espere un Segundo',
    scope: $scope
   });

   var dataUpdateContrato={
            id:$rootScope.id_cotizacion,
            fecha:$scope.planPagos.inicioPagos

            };
	PlanPagos.updateFechaContrato(dataUpdateContrato).
	success(function (data, status, headers, config){
		console.log("CONTRATO ACTUALIZADO");
	}).
	error(function() {
		/* Act on the event */		
		console.log("CONTRATO ACTUALIZADO ERROR");

	});


	for (var i = 0; i < $scope.planPagos.dataTable.length; i++) {
		
		if ($scope.planPagos.planes[i]!==undefined ) {
			  var dataPlanPagos={
            id:$scope.planPagos.planes[i].id,
            fecha:$scope.planPagos.dataTable[i].fechaPago,
            monto_capital:$scope.planPagos.dataTable[i].principalMes,
            monto_intereses:$scope.planPagos.dataTable[i].interesMensual,
          
            balance_final:$scope.planPagos.dataTable[i].balanceFinal
            };

			   PlanPagos.updatePlanPagos(dataPlanPagos).
			   success(function (data, status, headers, config){
		     $scope.planPagos.timerInsert++;
		     if ($scope.planPagos.timerInsert==$scope.planPagos.dataTable.length) {
		     	alertPopup.close(); 
				   var alertListo = $ionicPopup.alert({
			     title: 'Listo !',
			     template: 'Su Data Fue Actualizada',
			    scope: $scope
			   });
				   $timeout(function() {
				   	alertListo.close();
        				$state.go('app.solicitar.contrato',{'id_cotizacion':$rootScope.id_cotizacion});
    				}, 2000);
			   alertListo.then(function(res) {


			   });


		     	 }

		 	}).
			error(function(res) {
		    
		   
		    });
		}else if ($scope.planPagos.planes[i]===undefined) {
				    var dataPlanPagos={
            id_cotizacion:$scope.planPagos.id_cotizacion,
            fecha:$scope.planPagos.dataTable[i].fechaPago,
            monto_capital:$scope.planPagos.dataTable[i].principalMes,
            monto_intereses:$scope.planPagos.dataTable[i].interesMensual,
            monto_moratorio:null,
            id_estatus_pago:0,
            balance_final:$scope.planPagos.dataTable[i].balanceFinal
            };

			   PlanPagos.insertPlanPagos(dataPlanPagos).
			   success(function (data, status, headers, config){
		     $scope.planPagos.timerInsert++;
		     if ($scope.planPagos.timerInsert==$scope.planPagos.dataTable.length) {
		     	alertPopup.close(); 
				   var alertListo = $ionicPopup.alert({
			     title: 'Listo !',
			     template: 'Su Data Fue actualizada e insertada',
			    scope: $scope
			   });
				   $timeout(function() {
				   	alertListo
        			$state.go('app.solicitar.contrato',{'id_cotizacion':$stateParams.id_cotizacion});
    				}, 2000);
			 

		     	 }

		 	}).
			error(function(res) {
		    
		   
		    });
		}

	}
	if ($scope.planPagos.planes.length > $scope.planPagos.dataTable.length) {
			for (var i = $scope.planPagos.dataTable.length; i < $scope.planPagos.planes.length; i++) {
			var dataPlanPagos={
            id:$scope.planPagos.planes[i].id
            };
 			PlanPagos.deletePlanPagos(dataPlanPagos).
			   success(function (data, status, headers, config){
			console.log("data eliminada");	    

		 	}).
			error(function(res) {
		    
		   
		    });
			}
		}
		//AQUI DEBO HACER EL ELIMINAD
		  
     
  	}else{
        	$scope.planPagos.timerInsert=0;
//    $state.go('app.search');
	   var alertPopup = $ionicPopup.alert({
     title: 'Insertando !',
     template: 'Por Favor Espere un Segundo',
    scope: $scope
   });

   var dataUpdateContrato={
            id:$stateParams.id_cotizacion,
            fecha:$scope.planPagos.inicioPagos
            };
	PlanPagos.updateFechaContrato(dataUpdateContrato).
	success(function (data, status, headers, config){
		console.log("CONTRATO ACTUALIZADO");
	}).
	error(function() {
		/* Act on the event */		
		console.log("CONTRATO ACTUALIZADO ERROR");

	});


	for (var i = 0; i < $scope.planPagos.dataTable.length; i++) {
		

		    var dataPlanPagos={
            id_cotizacion:$scope.planPagos.id_cotizacion,
            fecha:$scope.planPagos.dataTable[i].fechaPago,
            monto_capital:$scope.planPagos.dataTable[i].principalMes,
            monto_intereses:$scope.planPagos.dataTable[i].interesMensual,
            monto_moratorio:null,
            id_estatus_pago:0,
            balance_final:$scope.planPagos.dataTable[i].balanceFinal
            };

			   PlanPagos.insertPlanPagos(dataPlanPagos).
			   success(function (data, status, headers, config){
		     $scope.planPagos.timerInsert++;
		     if ($scope.planPagos.timerInsert==$scope.planPagos.dataTable.length) {
		     	alertPopup.close(); 
				   var alertListo = $ionicPopup.alert({
			     title: 'Listo !',
			     template: 'Su Data Fue insertada',
			    scope: $scope
			   });
				   $timeout(function() {
				   	alertListo.close();
        			$state.go('app.solicitar.contrato',{'id_cotizacion':$stateParams.id_cotizacion});
    				}, 2000);
			   


		     	 }

		 	}).
			error(function(res) {
		    
		   
		    });
	}
     


  }};


});