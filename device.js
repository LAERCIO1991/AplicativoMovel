// JavaScript Document


    
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    
    //
    function onDeviceReady() {
        var element = document.getElementById('deviceProperties');
        element.innerHTML = 'Device Model: '    + device.model    + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />';
    }
	
function checkConnection() {
   var networkState = navigator.connection.type;

   var states = {};
   states[Connection.UNKNOWN]  = 'Conexão desconhecida';
   states[Connection.ETHERNET] = 'Ethernet';
   states[Connection.WIFI]     = 'WiFi';
   states[Connection.CELL_2G]  = 'Celular 2G';
   states[Connection.CELL_3G]  = 'Celular 3G';
   states[Connection.CELL_4G]  = 'Celular 4G';
   states[Connection.CELL]     = 'Conexão celular genérica';
   states[Connection.NONE]     = 'Sem conexão rede';

   alert('Tipo de conexão: ' + states[networkState]);
}