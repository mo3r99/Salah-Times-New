async function loadJamatTimes(cityP) {
    const response = await fetch("data/mosqueData.json");
    const times = await response.json();
    fillDropdown(times, cityP)
}

function fillDropdown(times, cityP) {
    var dropdown = document.getElementById('mosque-dropdown');
    dropdown.innerHTML = Object.values(times).map(function(mosque) {
        if(mosque.city === Cookies.get("city") || mosque.city === cityP) {
            return `<option value="${mosque.value}">${mosque.dropdownid}</option>`;
        }
    }).join("");
    getTimesForMosque();
    fillJamatTimesDesktop(times);
}

async function getTimesForMosque() {
    var value = document.querySelector('select').value;

    if (value != "Select Mosque") {
        const response2 = await fetch("data/mosqueData.json");
        const times2 = await response2.json();

        let timings = times2[value];
        fillJamatTimes(timings);
    }
}

function fillJamatTimes(times) {
    let fajr = document.querySelector('.j-fajr');
    let zuhr = document.querySelector('.j-zuhr');
    let asr = document.querySelector('.j-asr');
    let maghrib = document.querySelector('.j-maghrib');
    let isha = document.querySelector('.j-isha');

    fajr.innerHTML = times.fajr;
    zuhr.innerHTML = times.zuhr;
    asr.innerHTML = times.asr;
    maghrib.innerHTML = times.maghrib;
    isha.innerHTML = times.esha;
}

function fillJamatTimesDesktop(times) {
    let m1title = document.querySelector('#mosque-1-title');
    let m2title = document.querySelector('#mosque-2-title');
    let m3title = document.querySelector('#mosque-3-title');
    let m4title = document.querySelector('#mosque-4-title');

    let m1 = document.querySelector('.mosque-1');
    let m1fajr = document.querySelector('.mosque-1 .j-fajr');
    let m1zuhr = document.querySelector('.mosque-1 .j-zuhr');
    let m1asr = document.querySelector('.mosque-1 .j-asr');
    let m1maghrib = document.querySelector('.mosque-1 .j-maghrib');
    let m1isha = document.querySelector('.mosque-1 .j-isha');

    let m2 = document.querySelector('.mosque-2');
    let m2fajr = document.querySelector('.mosque-2 .fajr');
    let m2zuhr = document.querySelector('.mosque-2 .zuhr');
    let m2asr = document.querySelector('.mosque-2 .asr');
    let m2maghrib = document.querySelector('.mosque-2 .maghrib');
    let m2isha = document.querySelector('.mosque-2 .isha');

    let m3 = document.querySelector('.mosque-3');
    let m3fajr = document.querySelector('.mosque-3 .fajr');
    let m3zuhr = document.querySelector('.mosque-3 .zuhr');
    let m3asr = document.querySelector('.mosque-3 .asr');
    let m3maghrib = document.querySelector('.mosque-3 .maghrib');
    let m3isha = document.querySelector('.mosque-3 .isha');

    let m4 = document.querySelector('.mosque-4');
    let m4fajr = document.querySelector('.mosque-4 .fajr');
    let m4zuhr = document.querySelector('.mosque-4 .zuhr');
    let m4asr = document.querySelector('.mosque-4 .asr');
    let m4maghrib = document.querySelector('.mosque-4 .maghrib');
    let m4isha = document.querySelector('.mosque-4 .isha');

    let mosqueNames = [];

    Object.values(times).map(mosque => {
        for (const value in mosque) {
            if (mosque.city === Cookies.get("city")) {
                console.log(mosque.dropdownid);
                mosqueNames.push(mosque.dropdownid, mosque.fajr, mosque.zuhr, mosque.asr, mosque.maghrib, mosque.esha);
            }
        }
    }).join("");

    console.log(mosqueNames);

    switch(mosqueNames.length) {
        case 66:
            m1title.innerHTML = mosqueNames[0];
            m2title.style.display = "none";
            m3title.style.display="none";
            m4title.style.display="none";

            m2.style.display = "none";
            m3.style.display = "none";
            m4.style.display = "none";

            m1fajr.innerHTML = mosqueNames[1];
            m1zuhr.innerHTML = mosqueNames[2];
            m1asr.innerHTML = mosqueNames[3];
            m1maghrib.innerHTML = mosqueNames[4];
            m1isha.innerHTML = mosqueNames[5];
            
        case 132:
            m1title.innerHTML = mosqueNames[0];
            m2title.innerHTML = mosqueNames[66];
            m3title.style.display="none";
            m4title.style.display="none";

            m3.style.display = "none";
            m4.style.display = "none";

            m1fajr.innerHTML = mosqueNames[1];
            m1zuhr.innerHTML = mosqueNames[2];
            m1asr.innerHTML = mosqueNames[3];
            m1maghrib.innerHTML = mosqueNames[4];
            m1isha.innerHTML = mosqueNames[5];

            m2fajr.innerHTML = mosqueNames[67];
            m2zuhr.innerHTML = mosqueNames[68];
            m2asr.innerHTML = mosqueNames[69];
            m2maghrib.innerHTML = mosqueNames[70];
            m2isha.innerHTML = mosqueNames[71];
        
        case 198:
            m1title.innerHTML = mosqueNames[0];
            m2title.innerHTML = mosqueNames[66];
            m3title.innerHTML = mosqueNames[132];
            m4title.style.display="none";

            m4.style.display = "none";

            m1fajr.innerHTML = mosqueNames[1];
            m1zuhr.innerHTML = mosqueNames[2];
            m1asr.innerHTML = mosqueNames[3];
            m1maghrib.innerHTML = mosqueNames[4];
            m1isha.innerHTML = mosqueNames[5];

            m2fajr.innerHTML = mosqueNames[67];
            m2zuhr.innerHTML = mosqueNames[68];
            m2asr.innerHTML = mosqueNames[69];
            m2maghrib.innerHTML = mosqueNames[70];
            m2isha.innerHTML = mosqueNames[71];

            m3fajr.innerHTML = mosqueNames[133];
            m3zuhr.innerHTML = mosqueNames[134];
            m3asr.innerHTML = mosqueNames[135];
            m3maghrib.innerHTML = mosqueNames[136];
            m3isha.innerHTML = mosqueNames[137];

        case 264:
            m1title.innerHTML = mosqueNames[0];
            m2title.innerHTML = mosqueNames[66];
            m3title.innerHTML = mosqueNames[132];
            m4title.innerHTML = mosqueNames[198];

            m1fajr.innerHTML = mosqueNames[1];
            m1zuhr.innerHTML = mosqueNames[2];
            m1asr.innerHTML = mosqueNames[3];
            m1maghrib.innerHTML = mosqueNames[4];
            m1isha.innerHTML = mosqueNames[5];

            m2fajr.innerHTML = mosqueNames[67];
            m2zuhr.innerHTML = mosqueNames[68];
            m2asr.innerHTML = mosqueNames[69];
            m2maghrib.innerHTML = mosqueNames[70];
            m2isha.innerHTML = mosqueNames[71];

            m3fajr.innerHTML = mosqueNames[133];
            m3zuhr.innerHTML = mosqueNames[134];
            m3asr.innerHTML = mosqueNames[135];
            m3maghrib.innerHTML = mosqueNames[136];
            m3isha.innerHTML = mosqueNames[137];

            m4fajr.innerHTML = mosqueNames[199];
            m4zuhr.innerHTML = mosqueNames[200];
            m4asr.innerHTML = mosqueNames[201];
            m4maghrib.innerHTML = mosqueNames[202];
            m4isha.innerHTML = mosqueNames[203];
    }

}