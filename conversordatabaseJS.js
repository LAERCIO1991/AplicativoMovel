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
    var query = 'CREATE TABLE IF NOT EXISTS laercio(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, metros VARCHAR NOT NULL, res VARCHAR NOT NULL, oper VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'laercio' status: OK.");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base 'laercio' não criada " + e + ".");
        return;
    }
}
function dropTables(){
    var query = 'DROP TABLE IF EXISTS laercio;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'laercio' status: deletada.");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base 'laercio' não deletada " + e + ".");
        return;
    }
}


function onDelete(){
    var id = document.calcform.id.value;
    

    var query = 'DROP TABLE IF EXISTS laercio;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'laercio' status: deletada.");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base 'laercio' não deletada " + e + ".");
        return;
    }
}


function onCreate(){
    var metros = document.calcform.metros.value;
    var res = document.calcform.res.value;
    var oper = document.calcform.oper.value;	
    if (metros == "" || res == "" || oper == "") {
        updateStatus("Erro: 'metros' e 'res' e 'oper' são campos obrigatórios!");
    }
    else {
        var query = "insert into laercio (metros, res, oper) VALUES (?, ?, ?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [metros, res, oper], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Inserção não realizada");
                    }
                    else {
                        updateForm("", "", "", "");
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
	
	query = "SELECT * FROM laercio where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['id'], row['metros'], row['res'], row['oper']);
                
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

	
    var query = "SELECT * FROM laercio;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this)");
                    
                    var liText = document.createTextNode(row['metros'] + " metros = "+ row['res'] + " " + row['oper']);
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
}


errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}



function updateForm(id, metros, res, oper){
    document.calcform.id.value = id;
    document.calcform.metros.value = metros;
    document.calcform.res.value = res;
	document.calcform.oper.value = oper;
}

function updateStatus(status){
    document.getElementById('status').innerHTML = status;
}