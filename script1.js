var love = setInterval(function () {
  var r_num = Math.floor(Math.random() * 40) + 1;
  var r_size = Math.floor(Math.random() * 65) + 10;
  var r_left = Math.floor(Math.random() * 100) + 1;
  var r_bg = Math.floor(Math.random() * 25) + 100;
  var r_time = Math.floor(Math.random() * 5) + 5;

  $('.bg_heart').append(
    "<div class='heart' style='width:" +
      r_size +
      "px;height:" +
      r_size +
      "px;left:" +
      r_left +
      "%;background:rgba(255," +
      (r_bg - 25) +
      "," +
      r_bg +
      ",1);animation:love " +
      r_time +
      "s ease'></div>"
  );

  $('.bg_heart').append(
    "<div class='heart' style='width:" +
      (r_size - 10) +
      "px;height:" +
      (r_size - 10) +
      "px;left:" +
      (r_left + r_num) +
      "%;background:rgba(255," +
      (r_bg - 25) +
      "," +
      (r_bg + 25) +
      ",1);animation:love " +
      (r_time + 5) +
      "s ease'></div>"
  );
}, 500);



/* ------------------ AARU SPECIAL MESSAGE ------------------- */

var i = 0;

var txt1 = `
Hi Sweetheart Aaru... 💗  
So please read this carefully...

I know you’re on your periods baby…  
and I just want to say something special to you today.  

You’re a strong girl, Aaru… but still,  
if you feel tired, uncomfortable, or in pain…  
I’m always here for you, every second.  

Your comfort matters to me more than anything.  
So take rest, drink warm water,  
and don’t stress at all 💞  

I wish I could hold you right now  
and make your cramps go away…  
but until then, just know this—  

I love you, Aaru…  
more than these words, more than anything else.  

Take care of yourself, sweetheart ♡  
I’m right here, always…  ₍^. .^₎⟆💖
`;

var speed = 50;

typeWriter();

/* ------------------ TYPEWRITER FUNCTION ------------------- */

function typeWriter() {
  if (i < txt1.length) {
    if (txt1.charAt(i) == '<') {
      document.getElementById("text1").innerHTML += "<br>";
    } else if (txt1.charAt(i) == '>') {
      document.getElementById("text1").innerHTML = "";
    } else if (txt1.charAt(i) == '|') {
      $(".bg_heart").css(
        "background-image",
        "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDxAPDRAPDw4NDw8PDw0NDQ8PDQ0OFREWFhURFRUYHiggGBolGxUVIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dHyUtLS8tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0rLS0rLS0tLS0tLS0tLf/AABEIAJABXQMBEQACEQEDEQH/... (full base64 stays same) ...')"
      );
    } else {
      document.getElementById("text1").innerHTML += txt1.charAt(i);
    }

    i++;
    setTimeout(typeWriter, speed);
  }
}
