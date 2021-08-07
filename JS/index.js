
var level = 1;
var sequence = "";
var tile = {1:'g',2:'r',3:'y',4:'b'};
var index = -1;
var flag = true;

function makeSoundAndAnimate(color)
{
  switch(color)
  {
    case 'g':
      var audio = new Audio("SOUNDS/green.mp3");
      audio.play();
      break;
    case 'r':
      var audio = new Audio("SOUNDS/red.mp3");
      audio.play();
      break;
    case 'y':
      var audio = new Audio("SOUNDS/yellow.mp3");
      audio.play();
      break;
    case 'b':
      var audio = new Audio("SOUNDS/blue.mp3");
      audio.play();
      break;
    case 'w':
      var audio = new Audio("SOUNDS/wrong.mp3");
      audio.play();
      $("body").css("background-color","red");
      setTimeout(function(){$("body").css("background-color","#011F3F");},100);
      break;
  }
}

function incrementLevel()
{
  $("h1").text("LEVEL "+level);
  level += 1;
  index = 0;

  var r = Math.floor(Math.random()*4)+1;
  var t = tile[r];
  sequence += t;
  $("#"+t).fadeOut(100).fadeIn(100);
  makeSoundAndAnimate(t);
  flag = false;
}


$(document).keydown(function(){
  if(flag)
  {
    incrementLevel();
  }
});

$("h1").click(function(){
  if(flag)
  {
    incrementLevel();
  }
});

$(".tile").click(function(){
  if(index === -1)
  {
    makeSoundAndAnimate('w');
    var til = this;
    $(til).addClass("game_over");
    setTimeout(function(){ $(til).removeClass("game_over" );},100);
    $("h1").text("GAME OVER, PRESS ANY KEY TO RESTART");
    return;
  }

  if($(this).attr("id") === sequence[index])
  {
    makeSoundAndAnimate($(this).attr("id"));
    var til = this;
    $(til).addClass("pressed");
    setTimeout(function(){ $(til).removeClass("pressed" );},100);
    index += 1;
  }
  else
  {
    $("h1").text("GAME OVER, PRESS ANY KEY TO RESTART");
    makeSoundAndAnimate('w');
    var til = this;
    $(til).addClass("game_over");
    setTimeout(function(){ $(til).removeClass("game_over" );},100);
    index = -1;
    flag = true;
    level = 1;
    sequence = "";
  }

  if(index === sequence.length)
  {
    setTimeout(function(){ incrementLevel(); },700);
  }
});
