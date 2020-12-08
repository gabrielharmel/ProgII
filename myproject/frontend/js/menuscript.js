$(function() {

    function exibir_montadoras() {
        $.ajax({
            url: 'http://localhost:5000/listar/Montadora',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });    
        function listar (resposta) {
            $('#corpoTabelaMontadoras').empty();
            mostrar_conteudo('ListarMontadoras');
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].pais_origem + '</td>' +  
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_montadora"><img src="imagens/delete.png" '+
                  'alt="Excluir montadora" title="Excluir montadora"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaMontadoras').append(lin);
            }
        }
    }
    
    $(document).on("click", "#linkListarMontadoras", function() {
        exibir_montadoras();
    });
    
    function exibir_carros() {
        $.ajax({
            url: 'http://localhost:5000/listar/Carro',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (resposta) {
            $('#corpoTabelaCarros').empty();
            mostrar_conteudo('ListarCarros');
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].cor + '</td>' + 
                '<td>' + resposta[i].ano + '</td>' + 
                '<td>' + resposta[i].montadora.nome + '</td>' + 
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_carro"><img src="imagens/delete.png" '+
                  'alt="Excluir carro" title="Excluir carro"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaCarros').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#ListarCarros").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#ListarClientes").addClass('d-none');
        $("#ListarMontadoras").addClass('d-none')
        $("#"+identificador).removeClass('d-none');      
    }

    $(document).on("click", "#linkListarCarros", function() {
        exibir_carros();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btnIncluirCarro", function validarform() {
        if ((document.getElementById("campoNome").value.length < 1) || (document.getElementById("campoCor").value.length < 1) || 
        (document.getElementById("campoAno").value.length < 1)) 
        {
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
        if (! $("#ListarCarros").hasClass('d-none')) {
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

    function exibir_clientes() {
        $.ajax({
            url: 'http://localhost:5000/listar/Cliente',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });    
        function listar (resposta) {
            $('#corpoTabelaClientes').empty();
            mostrar_conteudo('ListarClientes');
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].estado_civil + '</td>' + 
                '<td>' + resposta[i].idade + '</td>' + 
                '<td>' + resposta[i].carro.nome + '</td>' + 
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_cliente"><img src="imagens/delete.png" '+
                  'alt="Excluir cliente" title="Excluir cliente"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaClientes').append(lin);
            }
        }
    }
    
    $(document).on("click", "#linkListarClientes", function() {
        exibir_clientes();
    });

});
