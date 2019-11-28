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
      var filmGeneApi = data.results;
      console.log(filmGeneApi);
      // per ultima cosa pulisco sempre l'input
      $(".ricerca").val("");

      // richiamo la funzione handlbars
      handlebarsCopy("movie", filmGeneApi);

    },
    error: function(error){
      alert("errore");
    },

  });

};

function handlebarsCopy(type, movieGene) {

  // handlebars
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);

  // ciclo l'array di oggetti
  for (var i = 0; i < movieGene.length; i++) {

    var movieGenerati = movieGene[i];
    console.log(movieGenerati);

    // faccio una condizione per riconoscere i film dalle serie tv
    // mi salvo le variabili che poi vado a sovrascrivere in caso in cui sia un film o serie
    var title,original_title,info;
    if (type == "movie") {
      title = movieGenerati.title;
      original_title = movieGenerati.original_title;
      info = "Film";
    } else {
        title = movieGenerati.name;
        original_title = movieGenerati.original_name;
        info = "Serie TV";
      };

      // se non ci sono img di copertina aggiungo io un img
      var poster;
      if (movieGenerati.poster_path == null) {
        poster = "https://files.slack.com/files-pri/T91QPE3BP-FR4RVAGEA/image.png"
      } else {
        poster = "https://image.tmdb.org/t/p/w342" + movieGenerati.poster_path;
      }

    //compilo con handlbars
    var context = {
      info: info,
      title: title,
      original_title: original_title,
      original_language: movieGenerati.original_language,
      vote_average: generaStar(movieGenerati),
      flag: flagLanguage(movieGenerati.original_language),
      poster: poster
    } ;
    var html = template(context);
    console.log(html);
    //farò un append per metterlo in pagina con jquery
    // faccio la condizione per stampare i film in un div e le  serie in un altro

    if (type == "movie") {
      $(".contenitore-movie").append(html);
    } else {
      $(".contenitore-serie").append(html);
    }

  };
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
      var serieGeneApi = data.results;
      console.log(serieGeneApi);
      // per ultima cosa pulisco sempre l'input
      $(".ricerca").val("");

      // richiamo la funzione handlbars
      handlebarsCopy("tv",serieGeneApi);
    },
    error: function(error){
      alert("errore");
    },

  });

};

function flagLanguage(language) {
  // var flag;
  // if (language.original_language == "it") {
  //   flag = '<img src="img/italia.gif" alt="">';
  // } else if (language.original_language == "en") {
  //   flag = '<img src="img/inglese.jpg" alt="">';
  // } else if (language.original_language == "de") {
  //   flag = '<img src="img/germania.png" alt="">';
  // } else if (language.original_language == "fr") {
  //   flag = '<img src="img/francia.png" alt="">';
  // } else if (language.original_language == "ja") {
  //   flag = '<img src="img/giappone.png" alt="">';
  // } else if (language.original_language == "es") {
  //   flag = '<img src="img/spagna.png" alt="">';
  // } else {
  //   flag = language.original_language;
  // }
  // return flag;

  // versione alternativa vista in classe
  var arrayFlag = ["de","it","en","fr","ja","es"];

  if (arrayFlag.includes(language)) {
    return '<img src="img/' + language + '.png" alt="">'
  }
  return "";
}

$(document).ready(function() {

  $(".cerca").click(function(){
      // ripuliscol'html
    $(".contenitore-movie").html("");
    $(".contenitore-serie").html("");
    generaFilm();
    generaSerie();
  });

  // cerco il film con il tasto invio
  $(".ricerca").keyup(function(k){
    if (k.keyCode == "13") {
      // ripuliscol'html
      $(".contenitore-movie").html("");
      $(".contenitore-serie").html("");
      generaFilm();
      generaSerie();
    }
  });

});
