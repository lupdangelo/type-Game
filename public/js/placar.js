$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);
// Função que adiciona o jogador no placar

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
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
      linha.remove()
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


// Envia seu score para o rankingdo servidor

function sincronizaPlacar(){
  var placar = [];
  var linhas = $("tbody>tr");

  linhas.each(function(){
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();

    var score = {
      usuario : usuario,
      pontos: palavras
    };
    placar.push(score);
  });
  var dados = {
    placar : placar
  };
  $.post("http://localhost:3000/placar", dados , function() {
      console.log("Placar sincronizado com sucesso");
      $(".tooltip").tooltipster("open");
  }).fail(function(){
      $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
  }).always(function(){
      setTimeout(function() {
      $(".tooltip").tooltipster("close");
  }, 1200);
  });
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar",function(data){
    $(data).each(function(){
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);

      $("tbody").append(linha);
    });
  });
}
