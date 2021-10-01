const btnGO = document.getElementById('go');
const btnStop = document.getElementById('stop');
const deadline = document.getElementById('deadline');
const information = document.getElementById('information');
const music = document.getElementById("music");

const s = 1000,
      m = s * 60,
      h = m * 60,
      d = h * 24,
      y = d * 365;

const formchoose = document.getElementById('choose');
formchoose.addEventListener("submit", addtime);

function addtime(event){
    const date = document.getElementById('date').value,
        time = document.getElementById('time').value,
        inputyear = document.getElementById('year'),
        inputday = document.getElementById('day'),
        inputhour = document.getElementById('hour'),
        inputminute = document.getElementById('minute'),
        inputsecond = document.getElementById('second');

    if(date && time){
        information.style.display = "block";
        var choosendate = new Date(`${date} ${time}`);
        deadline.innerText = choosendate.toString();

        btnGO.addEventListener("click", function(){
            information.style.display = "block";
        });

        var countdown = setInterval(function(){
            var end = new Date(`${date} ${time}`).getTime();
            var now = new Date().getTime();
            var last = end - now;

            var years = Math.floor(last / y);
            if(years < 1)
                inputyear.parentElement.style.display = "none";

            var days = Math.floor((last % y) / d);
            if(days < 1)
                inputday.parentElement.style.display = "none";

            var hours = Math.floor((last % d) / h);
            var minutes = Math.floor((last % h) / m);
            var seconds = Math.floor((last % m) / s);

            inputyear.innerHTML = years;
            inputday.innerHTML = days;
            inputhour.innerHTML = hours;
            inputminute.innerHTML = minutes;
            inputsecond.innerHTML = seconds;

            if(last <= 0){
                clearInterval(countdown);
                inputhour.innerHTML = "00";
                inputminute.innerHTML = "00";
                inputsecond.innerHTML = "00";
                music.play();
            }
                
            
        }, 1000);

        btnGO.addEventListener("click", function(){
            if(countdown)
                clearInterval(countdown);
        });

        btnStop.addEventListener("click", function(){
            clearInterval(countdown);
            
            inputyear.innerHTML = "00";
            inputday.innerHTML = "00";
            inputhour.innerHTML = "00";
            inputminute.innerHTML = "00";
            inputsecond.innerHTML = "00";

            inputyear.parentElement.style.display = "flex";
            inputday.parentElement.style.display = "flex";
            information.style.display = "none";

            deadline.innerText = "";            
            music.currentTime = 0;
            music.pause();
        });
        formchoose.reset();     /*重置表單 */
    }
    event.preventDefault();     /*避免事件的默認動作(取消DOM的預設功能，讓事件徹底停下，阻止事件冒泡) */
}