			function calcular(oper) { 
			
				var largura = document.calcform.largura.value;
				var comprimento = document.calcform.comprimento.value;
				var altura = document.calcform.altura.value;
				
				if (largura == 0) {
					var area = parseFloat(comprimento)*parseFloat(altura);
				} else {
					if (altura == 0) {
						var area = parseFloat(comprimento)*parseFloat(largura);
					} else {
						if (comprimento == 0) {
							var area = parseFloat(altura)*parseFloat(largura);
						} else {
							var volume = parseFloat(altura)*parseFloat(largura)*parseFloat(comprimento); 
								document.calcform.volume.value = volume.toFixed(2); 
						}
					}    
				}    
				document.calcform.area.value = area.toFixed(2); 
			}