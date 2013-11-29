$(document).ready(function(e) {
    onInit();
	selecionaTodos();
});

var localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            updateStatus("Erro: Seu navegador não permite banco de dados.");
        }
        else {
            initDB();
            createTables();
            queryAndUpdateOverview();
        }
    } 
    catch (e) {
        if (e == 2) {
            updateStatus("Erro: Versão de banco de dados inválida.");
        }
        else {
            updateStatus("Erro: Erro desconhecido: " + e + ".");
        }
        return;
    }
}

function initDB(){
    var shortName = 'stuffDB';
    var version = '1.0';
    var displayName = 'MyStuffDB';
    var maxSize = 65536;
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS aplicativo(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, altura VARCHAR NOT NULL, largura VARCHAR NOT NULL, comprimento VARCHAR NOT NULL, area VARCHAR NOT NULL, volume VARCHAR NOT NULL, oper VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'aplicativo' status: OK.");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base 'aplicativo' não criada " + e + ".");
        return;
    }
}
function dropTables(){
    var query = 'DROP TABLE IF EXISTS aplicativo;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'aplicativo' status: deletada.");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base 'aplicativo' não deletada " + e + ".");
        return;
    }
}


function onDelete(){
    var id = document.calcform.id.value;
    

    var query = 'DROP TABLE IF EXISTS aplicativo;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'aplicativo' status: deletada.");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base 'aplicativo' não deletada " + e + ".");
        return;
    }
}


function onCreate(){
    var altura = document.calcform.altura.value;
    var largura = document.calcform.largura.value;
	var comprimento = document.calcform.comprimento.value;
    var oper = document.calcform.oper.value;
    var area = document.calcform.area.value;
    var volume = document.calcform.volume.value;
	
    if (altura == "" || largura == "" || comprimento == "" || oper == "" || area == "" || volume == "") {
        updateStatus("Erro: 'altura' e 'largura' e 'oper' são campos obrigatórios!");
    }
    else {
        var query = "insert into aplicativo (altura, largura, comprimento, oper, area, volume) VALUES (?, ?, ?, ?, ?, ?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [altura, largura, comprimento, oper, area, volume], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Inserção não realizada");
                    }
                    else {
                        updateForm("", "", "", "", "", "", "");
                        updateStatus("Inserção realizada, linha id: " + results.insertId);
                        queryAndUpdateOverview();
						
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Erro: INSERT não realizado " + e + ".");
        }
    }
}

function onSelect(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM aplicativo where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['id'], row['altura'], row['largura'], row['comprimento'], row['oper'], row['area'], row['volume']);
                
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
   
}

function queryAndUpdateOverview(){

    var dataRows = document.getElementById("itemData").getElementsByClassName("data");
	var oper = document.calcform.oper.value
	
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    	};
	}
	/*
    var query = "SELECT * FROM aplicativo;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this)");
                    
                    var liText = document.createTextNode(row['altura'] + " " + row['oper'] + " e " + row['largura'] + " " + row['oper'] + " e " + row['comprimento'] + " " + row['oper'] + " = " + row['area'] + " quadrados e " + row['volume'] + " cubicos");
                    li.appendChild(liText);
                    
                    document.getElementById("itemData").appendChild(li);
                }
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
}*/



/* Seleciona todos os registros do Banco de Dados*/
	function selecionaTodos(){
		//Realiza a leitura no banco
		var query = "SELECT * FROM aplicativo;";
		try {
			localDB.transaction(function(transaction){			
				transaction.executeSql(query, [], function(transaction, results){
					objLista = "";
					for (var i = 0; i < results.rows.length; i++) {
						var row = results.rows.item(i);
						objLista += "<tr><td>" + row['altura'] +" "+ row['oper'] + "</td> <td>" + row['largura'] + " " + row['oper'] + "</td><td>" + row['comprimento'] + " " + row['oper'] + "</td><td> " +row['area'] + "  " + row['oper'] + " Quadrado "+"</td><td>" + row['volume']+ "Cubicos " + "</tr>";
																
					}
//    objLista += "</tbody>";
             
             $("#divLista").html(objLista);
				}, function(transaction, error){
					updateStatus("Erro: " + error.code + "\n Mensagem: " + error.message);
				});
			});
		} 
		catch (e) {
			updateStatus("Error: SELECT não realizado " + e + ".");
			}
		}
	



errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}



function updateForm(id, altura, largura, comprimento, oper, area, volume){
    document.calcform.id.value = id;
    document.calcform.altura.value = altura;
    document.calcform.largura.value = largura;
    document.calcform.comprimento.value = comprimento;
	document.calcform.oper.value = oper;
    document.calcform.area.value = area;
    document.calcform.volume.value = volume;
}

function updateStatus(status){
    document.getElementById('status').innerHTML = status;
}
