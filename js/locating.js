function getLocation() {
    loadShow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition, showError);
    } else { 
        makeAlert("Geolocation is not supported by this browser Please enter your postcode.", true);
    }
}

function savePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    Cookies.set("longitude",longitude,{expires: 9999, samesite: 'lax'});
    Cookies.set("latitude",latitude,{expires: 9999, samesite: 'lax'});

    document.querySelector('section').style.display="block";
    document.querySelector('.main').style.display="none";
    document.querySelector('main').style.height="auto";

    getBeginningTimes();        
    getCity(latitude, longitude);
    loadHide();
}

function showError(error) {
    loadHide();
    switch(error.code) {
        case error.PERMISSION_DENIED:
            makeAlert("Permission was denied.", true);
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
            break;
        case error.POSITION_UNAVAILABLE:
            makeAlert("Your position is unavailable", true);
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
            break;
        case error.TIMEOUT:
            makeAlert("The request to get the location timed out.", true);
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
            break;
        case error.UNKNOWN_ERROR:
            makeAlert("An unknown error occurred.", true);
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
            break;
    }
}

function getCity(lat, lng) {
    var url = `https://api.postcodes.io/postcodes?lon=${lng}&lat=${lat}`;
    
    var addressResponse = new XMLHttpRequest;
    
    addressResponse.open("GET", url);
    addressResponse.onload = () => {
        var responseJSON = JSON.parse(addressResponse.responseText);
        
        if (responseJSON.status === 200) {
            document.querySelector('.location p').innerHTML = responseJSON.result[0].admin_district;
            Cookies.set("city", responseJSON.result[0].admin_district, {expires: 9999, samesite: 'lax'});
            loadJamatTimes(responseJSON.result[0].admin_district);
        } else if (responseJSON.status === 404) {
            makeAlert("Please enter a valid postcode.", true);
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
        } 
        else {
            makeAlert("There was an error. Please re-enter your postcode.", true);
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
        }
    }
    
    addressResponse.send();
    
}

//Validates postcode. Idk how this works.
function postCodeCheck (toCheck) {

    // Permitted letters depend upon their position in the postcode.
    var alpha1 = "[abcdefghijklmnoprstuwyz]";                       // Character 1
    var alpha2 = "[abcdefghklmnopqrstuvwxy]";                       // Character 2
    var alpha3 = "[abcdefghjkpmnrstuvwxy]";                         // Character 3
    var alpha4 = "[abehmnprvwxy]";                                  // Character 4
    var alpha5 = "[abdefghjlnpqrstuwxyz]";                          // Character 5
    var BFPOa5 = "[abdefghjlnpqrst]";                               // BFPO alpha5
    var BFPOa6 = "[abdefghjlnpqrstuwzyz]";                          // BFPO alpha6
    
    // Array holds the regular expressions for the valid postcodes
    var pcexp = new Array ();
    
    // BFPO postcodes
    pcexp.push (new RegExp ("^(bf1)(\\s*)([0-6]{1}" + BFPOa5 + "{1}" + BFPOa6 + "{1})$","i"));
  
    // Expression for postcodes: AN NAA, ANN NAA, AAN NAA, and AANN NAA
    pcexp.push (new RegExp ("^(" + alpha1 + "{1}" + alpha2 + "?[0-9]{1,2})(\\s*)([0-9]{1}" + alpha5 + "{2})$","i"));
    
    // Expression for postcodes: ANA NAA
    pcexp.push (new RegExp ("^(" + alpha1 + "{1}[0-9]{1}" + alpha3 + "{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$","i"));
  
    // Expression for postcodes: AANA  NAA
    pcexp.push (new RegExp ("^(" + alpha1 + "{1}" + alpha2 + "{1}" + "?[0-9]{1}" + alpha4 +"{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$","i"));
    
    // Exception for the special postcode GIR 0AA
    pcexp.push (/^(GIR)(\s*)(0AA)$/i);
    
    // Standard BFPO numbers
    pcexp.push (/^(bfpo)(\s*)([0-9]{1,4})$/i);
    
    // c/o BFPO numbers
    pcexp.push (/^(bfpo)(\s*)(c\/o\s*[0-9]{1,3})$/i);
    
    // Overseas Territories
    pcexp.push (/^([A-Z]{4})(\s*)(1ZZ)$/i);  
    
    // Anguilla
    pcexp.push (/^(ai-2640)$/i);
  
    // Load up the string to check
    var postCode = toCheck;
  
    // Assume we're not going to find a valid postcode
    var valid = false;
    
    // Check the string against the types of post codes
    for ( var i=0; i<pcexp.length; i++) {
    
      if (pcexp[i].test(postCode)) {
      
        // The post code is valid - split the post code into component parts
        pcexp[i].exec(postCode);
        
        // Copy it back into the original string, converting it to uppercase and inserting a space 
        // between the inward and outward codes
        postCode = RegExp.$1.toUpperCase() + " " + RegExp.$3.toUpperCase();
        
        // If it is a BFPO c/o type postcode, tidy up the "c/o" part
        postCode = postCode.replace (/C\/O\s*/,"c/o ");
        
        // If it is the Anguilla overseas territory postcode, we need to treat it specially
        if (toCheck.toUpperCase() == 'AI-2640') {postCode = 'AI-2640'};
        
        // Load new postcode back into the form element
        valid = true;
        
        // Remember that we have found that the code is valid and break from loop
        break;
      }
    }
    
    // Return with either the reformatted valid postcode or the original invalid postcode
    if (valid) {return postCode} else return false;
}

function postCodeLocate(postcode) {
    loadShow();
    postcode = postcode.split(" ").join("");
    
    var url = `https://api.postcodes.io/postcodes/${postcode}`;
    
    var postCodeData = new XMLHttpRequest;
    postCodeData.open("GET", url);
    postCodeData.onload = () => {
        var PCResponse = JSON.parse(postCodeData.responseText);
        console.log(PCResponse);
        
        if (PCResponse.status == 200){
            Cookies.set("city", PCResponse.result.admin_district, {expires: 9999, samesite: 'lax'});
            console.log(PCResponse.result);
            loadHide();
            document.querySelector('section').style.display="block";
            document.querySelector('.main').style.display="none";
            Cookies.set("longitude",PCResponse.result.latitude,{expires: 9999, samesite: 'lax'});
            Cookies.set("latitude",PCResponse.result.longitude,{expires: 9999, samesite: 'lax'});
            loadJamatTimes(Cookies.get("city"));
            document.querySelector('main').style.height="auto";
            document.querySelector('.location p').innerHTML = PCResponse.result.admin_district;
        } else if (PCResponse.status === 404) {
            loadHide();
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
            makeAlert("Please enter a valid postcode.", true);

        } else {
            makeAlert("There was an error getting the postcode location. Please try again later.", false);
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
        }
    }
    postCodeData.send();
}

if (document.cookie) {
    loadShow();

    console.log(Cookies.get("latitude"), Cookies.get("longitude"));

    document.querySelector('section').style.display="block";
    document.querySelector('.location').scrollIntoView();
    document.querySelector('.main').style.display="none";
    document.querySelector('main').style.height="auto";

    getCity(Cookies.get("latitude"), Cookies.get("longitude"));

    getBeginningTimes(); 
    loadJamatTimes(Cookies.get("city"));

    loadHide();
    
} else {
    document.querySelector('section').style.display="none";
    document.querySelector('.main').style.display="block";
}
