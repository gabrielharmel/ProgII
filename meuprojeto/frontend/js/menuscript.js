$(function() { 
    
    $.ajax({
        url: 'http://localhost:5000/listar_carros',
        method: 'GET',
        dataType: 'json', 
        success: listar, 
        error: function() {
            alert("Erro ao ler dados, verifique o backend");
        }
    });

    function listar (carros) {
        // percorrer a lista de carros retornados; 
        for (var i in carros) { 
            lin = '<tr>' + 
              '<td>' + carros[i].nome + '</td>' + 
              '<td>' + carros[i].cor + '</td>' + 
              '<td>' + carros[i].ano + '</td>' + 
              '</tr>';
            // adiciona a linha no corpo da tabela
            $('#TabelaCarros').append(lin);
        }
    }

});