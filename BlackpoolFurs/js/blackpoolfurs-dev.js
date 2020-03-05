var events = data;
var eventsContainer = document.getElementById("upcomingEvents");
var navbarCount = document.getElementById("nbnmCount");
var eventID;

for(var item = 0; item < 100; item++) {
  document.getElementById("eventCount").innerHTML = (item).toString();
  if(!events[0].MeetEvents[item]) {
    if(item == 0) {
      eventsContainer.innerHTML = eventsContainer.innerHTML = '<h1>There are no current events!</h1>'
      document.getElementById("joinUs").innerHTML = "any of our meet dates";
      document.getElementById("map").style.visibility = "hidden";
    }
    break;
  }

  document.getElementById("map").style.visibility = "visible";

  date = new Date(events[0].MeetEvents[item].MeetDate);
  monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  year = date.getFullYear();
  month = monthArray[date.getMonth()];
  dt = date.getDate();

  if(item == 0) {
    navbarCount.innerHTML = date.toLocaleDateString('en-GB')
  }

  if(String(dt).endsWith("0")) {
    dt = dt + "th";
  }
  if(String(dt).endsWith("1")) {
    dt = dt + "st";
  }
  if(String(dt).endsWith("2")) {
    if(String(dt) == "12") {
      dt = dt + "th";
    } else {
      dt = dt + "nd";
    }
  }
  if(String(dt).endsWith("3")) {
    dt = dt + "rd";
  }
  if(dt >= 4 & dt < 20) {
    dt = dt + "th";
  }
  if(item == 0) {
    var active = "active";
  } else {
    var active = "bg-dark";
  }
  document.getElementById("joinUs").innerHTML = "the <strong>" + dt + " of " + month + " at " + events[0].MeetEvents[0].MeetVenue + "</strong> ";
  if(item < 3) {
    if(events[0].MeetEvents[item].Confirmed == false) {
      eventsContainer.innerHTML = eventsContainer.innerHTML + `
      <div id="eventEntry`+item+`" class="list-group-item text-white list-group-item-action `+active+`" onclick="refreshMap(`+item+`, events[0].MeetEvents[`+item+`].VenueMapsAPI)">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">`+events[0].MeetEvents[item].EventName+` | `+dt+" "+month+" "+year+` <span class="badge badge-pill badge-warning">Unconfirmed</span></h5>
        </div>
        <p class="mb-1">`+events[0].MeetEvents[item].MeetDescription+`</p>
        <small>`+date.toLocaleString('en-GB')+` | `+events[0].MeetEvents[item].PreMeetInfo+` | Tap to view location</small>
      </div>
      `;
    } else {
      if(events[0].MeetEvents[item].SpecialMeet == true) {
        eventsContainer.innerHTML = eventsContainer.innerHTML + `
        <div id="eventEntry`+item+`" class="list-group-item text-white list-group-item-action `+active+`" onclick="refreshMap(`+item+`, events[0].MeetEvents[`+item+`].VenueMapsAPI)">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">`+events[0].MeetEvents[item].EventName+` | `+dt+" "+month+" "+year+` <span class="badge badge-pill badge-success">Confirmed - Special!</span></h5>
          </div>
          <p class="mb-1">`+events[0].MeetEvents[item].MeetDescription+`</p>
          <small>`+date.toLocaleString('en-GB')+` | `+events[0].MeetEvents[item].PreMeetInfo+` | Tap to view location</small>
        </div>
        `;
      } else {
        eventsContainer.innerHTML = eventsContainer.innerHTML + `
        <div id="eventEntry`+item+`" class="list-group-item text-white list-group-item-action `+active+`" onclick="refreshMap(`+item+`, events[0].MeetEvents[`+item+`].VenueMapsAPI)">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">`+events[0].MeetEvents[item].EventName+` | `+dt+" "+month+" "+year+` <span class="badge badge-pill badge-success">Confirmed!</span></h5>
          </div>
          <p class="mb-1">`+events[0].MeetEvents[item].MeetDescription+`</p>
          <small>`+date.toLocaleString('en-GB')+` | `+events[0].MeetEvents[item].PreMeetInfo+` | Tap to view location</small>
        </div>
        `;
      }
    }
  }
  document.getElementById("gmap_canvas").style.height = document.getElementById("upcomingEvents").offsetHeight;
}

function refreshMap(item, mapAPI) {
  document.getElementById("map").style.opacity = "0.25";
  document.getElementById("gmap_canvas").onload = function () { document.getElementById("map").style.opacity = "1"; };
  document.getElementById("gmap_canvas").src = mapAPI;
  for(var i = 0; i < 3; i++) {
    if(i == item) {
      document.getElementById("eventEntry"+i).className = "list-group-item text-white list-group-item-action active";
    } else {
      document.getElementById("eventEntry"+i).className = "list-group-item text-white bg-dark list-group-item-action";
    }
  }
}
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
