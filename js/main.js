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
          original_language: filmGenerati.original_language,
          vote_average:generaStar(filmGenerati),
          flag: flagLanguage(filmGenerati.original_language),
          poster: "https://image.tmdb.org/t/p/w185" + filmGenerati.poster_path
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
        var generaSerie = serieGene[i];

        //compilo con handlbars
        var context = {
          name:generaSerie.name,
          original_name:generaSerie.original_name,
          original_language:generaSerie.original_language,
          vote_average:generaStar(generaSerie),
          flag:flagLanguage(generaSerie.original_language),
          poster:"https://image.tmdb.org/t/p/w185" + generaSerie.poster_path
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
