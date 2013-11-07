			function calcular(oper) {    
				var metros = document.calcform.metros.value;    
				
				if (oper == "polegadas") {       
					var res = parseFloat(metros)*"254";    
				} else {       
					if (oper == "centimetros") {          
						var res = metros*"100";       
					} else {                    
							var res = metros*"3.2808";               
					}    
				}    
				document.calcform.res.value = res.toFixed(2); 
			}


			
			function checkConnection() {
				var networkState = navigator.connection.type;
				var states = {};
					states[Connection.UNKNOWN] = 'Conexão desconhecida';
					states[Connection.ETHERNET] = 'Ethernet';
					states[Connection.WIFI] = 'WiFi';
					states[Connection.CELL_2G] = 'Celular 2G';
					states[Connection.CELL_3G] = 'Celular 3G';
					states[Connection.CELL_4G] = 'Celular 4G';
					states[Connection.CELL] = 'Conexão celular genérica';
					states[Connection.NONE] = 'Sem conexão rede';

					states[networkState] = res1; 

			}	