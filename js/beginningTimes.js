async function getBeginningTimes(){
    url = "https://api.aladhan.com/v1/timings/"
    var timestamp = Math.floor(Date.now() / 1000);
    fetch (`${url}${timestamp}?latitude=${Cookies.get('latitude')}&longitude=${Cookies.get('longitude')}&method=2&tune=0,1,0,5,33,3,0,0`).then((response)=>{
        return response.json();
    }).then((data)=>{
        writeBeginningTimes(data.data.timings)
    })
}

function writeBeginningTimes(timings){
    document.getElementById("fajrbegin").innerHTML = timings.Fajr;
    document.getElementById("zuhrbegin").innerHTML = timings.Dhuhr;
    document.getElementById("asrbegin").innerHTML = timings.Asr;
    document.getElementById("maghribbegin").innerHTML = timings.Maghrib;
    document.getElementById("ishabegin").innerHTML = timings.Isha;
}

getBeginningTimes()