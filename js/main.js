function generaFilm() {
  // dati input
  var ricercaFilm = $(".ricerca").val().toLowerCase();
  // per ultima cosa pulisco sempre l'input
  $(".ricerca").val("");



  $.ajax({

    url:"https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data : {
      include_adult: false,
      page: 1,
      language: "it-IT",
      api_key: "92ccba3cd153d6a3bed8705dca4dcebb",
      query: ricercaFilm,
    },
    success: function(data){
      var filmGene = data.results;
      console.log(filmGene);



      // handlebars
      var source   = $("#entry-template").html();
      var template = Handlebars.compile(source);

      // ciclo l'array di oggetti
      for (var i = 0; i < filmGene.length; i++) {


        //compilo con handlbars
        var context = filmGene[i];
        var html = template(context);
        console.log(html);
        //farò un append per metterlo in pagina con jquery
        $(".contenitore-film").append(html);


      };

    },
    error: function(error){
      alert("errore");
    },

  });

};

$(document).ready(function() {

  $(".cerca").click(function(){
      // ripuliscol'html
    $(".contenitore-film").html("");
    generaFilm();
  });

  // cerco il film con il tasto invio
  $(".ricerca").keyup(function(k){
    if (k.keyCode == "13") {
      // ripuliscol'html
      $(".contenitore-film").html("");
      generaFilm();
    }
  });

});
