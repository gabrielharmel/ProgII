$(function() { 
    
    function exibir_carros() {
        $.ajax({
            url: 'http://localhost:5000/listar_carros',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (resposta) {
            $('#corpoTabelaCarros').empty();
            mostrar_conteudo('TabelaCarros');
            for (var i in resposta) {
                lin = '<tr>' +
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].cor + '</td>' + 
                '<td>' + resposta[i].ano + '</td>' + 
                '</tr>';
                $('#corpoTabelaCarros').append(lin);
            }
        }
    }

function mostrar_conteudo(identificador) {
    $("#TabelaCarros").addClass('invisible');
    $("#conteudoInicial").addClass('invisible');
    $("#"+identificador).removeClass('invisible');      
}

$(document).on("click", "#linkListarCarros", function() {
    exibir_carros();
});

$(document).on("click", "#linkInicio", function() {
    mostrar_conteudo("conteudoInicial");
});

$(document).on("click", "#btnIncluirCarro", function validarform() {
    if ((document.getElementById("campoNome").value.length < 1) || (document.getElementById("campoCor").value.length < 1) || 
    (document.getElementById("campoAno").value.length < 1)) {
        alert('Por favor, preencha todos os campos');
    } 
    else {
        nome = $("#campoNome").val();
        cor = $("#campoCor").val();
        ano = $("#campoAno").val();
        var dados = JSON.stringify({ nome: nome, cor: cor, ano: ano});
        $.ajax({
            url: 'http://localhost:5000/incluir_carro',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: carroIncluido,
            error: erroAoIncluir
        });
    }
    function carroIncluido (retorno) {
        if (retorno.resultado == "ok") {
            alert("Carro incluído com sucesso!");
            $("#campoNome").val("");
            $("#campoCor").val("");
            $("#campoAno").val("");
        } 
        else {
            alert(retorno.resultado + ":" + retorno.detalhes);
        }            
    }
    function erroAoIncluir (retorno) {
        alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
    }
});

$('#modalIncluirCarro').on('hide.bs.modal', function (e) {
    if (! $("#TabelaCarros").hasClass('invisible')) {
        exibir_carros();
    }
});

mostrar_conteudo("conteudoInicial");
});




