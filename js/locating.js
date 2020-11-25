function getLocation() {
    loadShow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition, showError);
    } else { 
        makeAlert("Geolocation is not supported by this browser Please enter manually.");
    }
}

function savePosition(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
        
    makeAlert(`${latitude}, ${longitude}`);
    loadHide();
}

function showError(error) {
    loadHide();
    switch(error.code) {
        case error.PERMISSION_DENIED:
            makeAlert("Permission was denied.");
            break;
        case error.POSITION_UNAVAILABLE:
            makeAlert("Your position is unavailable");
            break;
        case error.TIMEOUT:
            makeAlert("The request to get the location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            makeAlert("An unknown error occurred.");
            break;
    }
}