$("#botao-placar").click(mostraPlacar);

// Função que adiciona o jogador no placar

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Lup"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);

    $(".placar").slideDown(500);
    scrollPlacar();
}


//Função que adiciona um jogador no placar no HTML,junto com o delete

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}


// Função que remove a linha

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeOut(function(){
      linha.remove();
    },1000);
}

// Faz mostrar o placar e graças ao stop não permite que a animação entre num looping infinito caso o usuario clique varias vezes

function mostraPlacar() {
  $(".placar").stop().slideToggle(600);
}

function scrollPlacar() {
  var posicaoPlacar = $(".placar").offset().top;

  $("body").animate(
    {
    scrollTop: posicaoPlacar+"px"
    },1000);
}
