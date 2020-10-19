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
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_carro"><img src="imagens/delete.png" '+
                  'alt="Excluir carro" title="Excluir carro"></a>' + 
                '</td>' + 
                '</tr>';
                
                ;
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

$(document).on("click", ".excluir_carro", function() { 
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_"; 
        var id_carro = componente_clicado.substring(nome_icone.length); 
        $.ajax({ 
            url: 'http://localhost:5000/excluir_carro/'+id_carro, 
            type: 'delete',
            dataType: 'json', 
            success: carroExcluido,
            error: erroAoExcluir 
        });
        function carroExcluido(retorno) {
            if (retorno.resultado == "ok") {
                $("#linha_" + id_carro).fadeOut(1000, function() {
                    alert("Carro removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoExcluir(retorno) {
            alert("Erro ao excluir dados, verifique o backend: ");
        }
    });
});




