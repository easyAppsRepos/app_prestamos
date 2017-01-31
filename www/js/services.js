angular.module('prestamos.services', [])
.factory('Solicitudes', ['$http','ApiEndpoint',function($http,ApiEndpoint) {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var urlBase=ApiEndpoint.url+"/clientes/listSolicitudes";
  var Solicitudes = {};
  Solicitudes.listSolicitudes = function (data) {
     
       return $http.get(urlBase);
      };
  return Solicitudes;
}])
.factory('Login', ['$http','ApiEndpoint',function($http,ApiEndpoint) {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var urlBase=ApiEndpoint.url+"/login/userlogin";
  var Login = {};
  Login.loginPost = function (data) {
     
       return $http.post(urlBase, data);
      };
  return Login;
}])
.factory('Estates',['$http','ApiEndpoint',function($http,ApiEndpoint) {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var urlBaseEstados=ApiEndpoint.url+"/domicilio/estados";

  var Estates={};
   Estates.getStates = function () {
   	return $http.get(urlBaseEstados);
}

  return Estates;
}])
.factory('Users',['$http','ApiEndpoint',function ($http,ApiEndpoint) {
	// body...
	  
  // Some fake testing data
  var urlBase=ApiEndpoint.url+"/login/init";
  var Users = {};
  Users.get = function (data) {
     
       return $http.get(urlBase);
      };
  return Users;
}]).factory('Solicitar',['$http','ApiEndpoint',function ($http,ApiEndpoint) {
    // body...

  // Some fake testing data
    var urlBaseAddress=ApiEndpoint.url+"/domicilio/insert";
    var urlBaseCliente=ApiEndpoint.url+"/clientes/insert";
    var urlBaseContrato=ApiEndpoint.url+"/contrato/insert";
    var urlBaseEvidencias=ApiEndpoint.url+"/evidencias/do_upload";
    var urlBaseContratoForID=ApiEndpoint.url+"/clientes/clienteDataComplet";
    var urlBaseUpdateAddress=ApiEndpoint.url+"/domicilio/update_domicilio_id";
    var urlBaseUpdateCliente=ApiEndpoint.url+"/clientes/update_cliente_id";
    var urlBaseUpdateContrato=ApiEndpoint.url+"/contrato/update_contrato_id";
    var urlBaseUpdateEvidencias=ApiEndpoint.url+"/evidencias/do_update";

    var Solicitar = {};
    Solicitar.insertAddress = function (data) {
       return $http.post(urlBaseAddress, data);
      };
    Solicitar.insertCliente = function (data) {
     
       return $http.post(urlBaseCliente, data);
      };
    Solicitar.insertContrato = function (data) {
     
       return $http.post(urlBaseContrato, data);
      };     
    Solicitar.updateAddress = function (data) {
       return $http.post(urlBaseUpdateAddress, data);
      };
    Solicitar.updateCliente = function (data) {
     
       return $http.post(urlBaseUpdateCliente, data);
      };
    Solicitar.updateContrato = function (data) {
     
       return $http.post(urlBaseUpdateContrato, data);
      }; 
    Solicitar.getDataContratoForId = function (data) {
     
       return $http.post(urlBaseContratoForID, data);
      }; 



  return Solicitar;
}]).factory('Cotizacion',['$http','ApiEndpoint',function ($http,ApiEndpoint) {
    // body...
        //console.log('urlsConstPlanPagos', ApiEndpoint);

  // Some fake testing data
    var urlBaseCotizacion=ApiEndpoint.url+"/cotizacion/insert";
    var urlBaseUpdateCotizacion=ApiEndpoint.url+"/cotizacion/update_cotizacion_id";

    var Cotizacion = {};
    Cotizacion.insertCotizacion = function (data) {
       return $http.post(urlBaseCotizacion, data);
      };
    Cotizacion.updateCotizacion = function (data) {
       return $http.post(urlBaseUpdateCotizacion, data);
      };


  return Cotizacion;
}]).factory('PlanPagos',['$http','ApiEndpoint',function ($http,ApiEndpoint) {
    // body...
       

  // Some fake testing data
    var urlBase=ApiEndpoint.url+"/cotizacion/listCotizacion";
    var urlBaseInsert=ApiEndpoint.url+"/planPagos/insert";
    var urlBaseUpdateFecha=ApiEndpoint.url+"/contrato/update_contrato_fecha";
    var urlBaseUpdate=ApiEndpoint.url+"/planPagos/update_plan_id";
    var urlBaseDelete=ApiEndpoint.url+"/planPagos/delete_plan_id";
    var urlUpdateCotizacionTipoPlan=ApiEndpoint.url+"/cotizacion/update_cotizacion_plan_id";

    var PlanPagos = {};
    PlanPagos.getDataInit = function (data) {
       return $http.post(urlBase, data);
      };
      PlanPagos.insertPlanPagos = function (data) {
       return $http.post(urlBaseInsert, data);
      };
    PlanPagos.updateFechaContrato = function (data) {
       return $http.post(urlBaseUpdateFecha, data);
      };
 PlanPagos.updatePlanPagos = function (data) {
       return $http.post(urlBaseUpdate, data);
      };
PlanPagos.deletePlanPagos = function (data) {
       return $http.post(urlBaseDelete, data);
      };
 PlanPagos.updateCotizacionTipoPlan = function (data) {
       return $http.post(urlUpdateCotizacionTipoPlan, data);
      };
  return PlanPagos;
}]).factory('Contrato',['$http','ApiEndpoint',function ($http,ApiEndpoint) {
    // body...
       

  // Some fake testing data
    var urlInitContrato=ApiEndpoint.url+"/contrato/listData";
    var urlBase=ApiEndpoint.url+"/contratoLayout/list";
    var urlUpdateUsers=ApiEndpoint.url+"/Contrato/updateUserId";

    var Contrato = {};
    Contrato.getDataInit = function (data) {
       return $http.get(urlBase, data);
      };
    
    Contrato.getDataContrato = function (data) {
       return $http.post(urlInitContrato, data);
      };
    Contrato.updateIdUsers = function (data) {
       return $http.post(urlUpdateUsers, data);
      };
  return Contrato;
}]).factory('capturaImgFactory',['$http','ApiEndpoint',function ($http,ApiEndpoint) {
    // body...

    var clientes =
    [
      {id:0, nombre:'Gustavo Lopez Perez',
      prenda:'Honda Civic 2004', 
      acredor:'Edgar Sanchez Perez', 
      monto:'$3,000.00', 
      fechaContrato:'22/11/2016', 
      tipoPrenda:0,
      numeroTelefono:'50672519283' },

      {id:1, nombre:'Jorge Madrigal Segura',
      prenda:'Nissan Centra 1991', 
      acredor:'Juan Perez Perez', 
      monto:'$2,200.00', 
      fechaContrato:'12/03/2016', 
      tipoPrenda:0,
      numeroTelefono:'50672519283' },


      {id:2, nombre:'Maria Rodriguez Segura',
      prenda:'Casa de habitacion', 
      acredor:'Juan Perez Perez', 
      monto:'$20,000.00', 
      fechaContrato:'15/07/2016', 
      tipoPrenda:1,
      numeroTelefono:'50672519283' }
      

    ];
    
    return {


        getClienteData:function(idCliente){  

      for (var i = 0; i < clientes.length; i++) {
        if (clientes[i].id === parseInt(idCliente)) {
          return clientes[i];
        }
      }
      return null; }

/*      return  $http.post('...url',{idUsuario:idCliente})
      .then(function(response) { 

                    }, function(response) {
                        // error
                  
                        return 'error';
                    });*/
       

  }



}]);
