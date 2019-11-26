function generaFilm() {
  // dati input
  var ricercaMovie = $(".ricerca").val().toLowerCase();




  $.ajax({

    url:"https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data : {
      include_adult: false,
      page: 1,
      language: "it-IT",
      api_key: "92ccba3cd153d6a3bed8705dca4dcebb",
      query: ricercaMovie,
    },
    success: function(data){
      var filmGene = data.results;
      console.log(filmGene);
      // per ultima cosa pulisco sempre l'input
      $(".ricerca").val("");


      // handlebars
      var source   = $("#entry-template").html();
      var template = Handlebars.compile(source);

      // ciclo l'array di oggetti
      for (var i = 0; i < filmGene.length; i++) {

        var filmGenerati = filmGene[i];
        console.log(filmGenerati);

        //compilo con handlbars
        var context = {
          title:filmGenerati.title,
          original_title:filmGenerati.original_title,
          original_language:filmGenerati.original_language,
          vote_average:generaStar(filmGenerati)
        } ;
        var html = template(context);
        console.log(html);
        //farò un append per metterlo in pagina con jquery
        $(".contenitore-movie").append(html);

      };
    },
    error: function(error){
      alert("errore");
    },

  });

};

function generaStar(movie) {
  // trasformo i voti da decimali a quinti
  var numero = movie.vote_average / 2;
  console.log(numero);
  // arrotondo per eccesso
  var numeroStelle = Math.ceil(numero);
  // console.log(numeroStelle);

  //Generare html delle stelle
  var htmlStars = "";
  for(var j = 1; j <= 5; j++) {
    if(j <= numeroStelle) { //Se il contatore è minore del numero di stelle che devono essere piene..
      //Genero una stella piena
      htmlStars += '<i class="fas fa-star"></i>';
    } else {
      //Genero una stella vuota
      htmlStars += '<i class="far fa-star"></i>';
    }
  }
  return htmlStars;
}

// funzione per le seirie tv
function generaSerie() {
  // dati input
  var ricercaMovie = $(".ricerca").val().toLowerCase();




  $.ajax({

    url:"https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data : {
      include_adult: false,
      page: 1,
      language: "it-IT",
      api_key: "92ccba3cd153d6a3bed8705dca4dcebb",
      query: ricercaMovie,
    },
    success: function(data){
      var serieGene = data.results;
      console.log(serieGene);
      // per ultima cosa pulisco sempre l'input
      $(".ricerca").val("");


      // handlebars
      var source   = $("#entry-templateDue").html();
      var template = Handlebars.compile(source);

      // ciclo l'array di oggetti
      for (var i = 0; i < serieGene.length; i++) {


        //compilo con handlbars
        var context = {
          name:serieGene[i].name,
          original_name:serieGene[i].original_name,
          original_language:serieGene[i].original_language,
          vote_average:generaStar(serieGene[i])
        };
        var html = template(context);
        console.log(html);
        //farò un append per metterlo in pagina con jquery
        $(".contenitore-movie").append(html);


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
    $(".contenitore-movie").html("");
    generaFilm();
    generaSerie();
  });

  // cerco il film con il tasto invio
  $(".ricerca").keyup(function(k){
    if (k.keyCode == "13") {
      // ripuliscol'html
      $(".contenitore-movie").html("");
      generaFilm();
      generaSerie();
    }
  });

});
