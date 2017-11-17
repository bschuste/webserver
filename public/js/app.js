
// There is only a finite list of workshops with a given image and title
// This data is populated below
const WORKSHOPS = [
  {id: 'a', image: 'neck_and_shoulders.jpg', title: 'Neck and Shoulders'},
  {id: 'b', image: 'hands_and_apple.jpg', title: 'Hands and Apple'},
  {id: 'c', image: 'jaw.jpg', title: 'Jaw Dropping in the Evening'},
  {id: 'd', image: 'on_saddle.jpg', title: 'Ride as you Bike'},
  {id: 'e', image: 'babies.jpg', title: 'Babies are Great'},
  {id: 'f', image: 'rocks.jpg', title: 'Rock a Billy'},
];


function getWorkshops() {
  return $.ajax('/api/workshop')
    .then(res => {
      console.log("Results from getWorkshops()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getWorkshops()", err);
      throw err;
    });
}

function refreshWorkshopList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);
  console.log("refreshWorkshopList Enter");
  getWorkshops()
    .then(workshops => {
      const oldWorkshops = {};
      const newWorkshops = {};
      //define global for the browser to hold the list
      window.workshopList = workshops;
      let i=0;
      Object.keys(workshops).forEach(key => {
        console.log(key);          // the name of the current key.
        console.log(workshops[key]);   // the value of the current key.
        if (workshops[key].status === "closed") {
          oldWorkshops[i] = workshops[key];
        } else {
          newWorkshops[i] = workshops[key];
          // newWorkshops[i].title = "empty";
          // newWorkshops[i].description = "empty";          
          // newWorkshops[i].date = "XXX";          
        }
        i++;
        if (workshops[key].title == "Babies") {
          workshops[key].image = "img/babies.jpg";
        } else if (workshops[key].title == "Hands") {
          workshops[key].image = "img/hands_and_apple.jpg";
        } else if (workshops[key].title == "Saddle") {
          workshops[key].image = "img/on_saddle.jpg";
        } else if (workshops[key].title == "Jaw") {
          workshops[key].image = "img/jaw.jpg";
        } else if (workshops[key].title == "Neck") {
          workshops[key].image = "img/neck_and_shoulders.jpg";
        } else {
          workshops[key].image = "img/rocks.jpg";
        }
      });
      let html = compiledTemplate({workshops: oldWorkshops});
      $('#oldlist-container').html(html);
      $('.list-button-del').removeClass('hidden');
      html = compiledTemplate({workshops: newWorkshops});
      $('#newlist-container').html(html);
    });
  console.log("refreshWorkshopList Exit");
}

function toggleEdition(_id) {
  if (_id) {
    console.log("toggleEdition: workshop registration form id = " + _id);
    const workshop = window.workshopList.find(workshop => workshop._id === _id);
    console.log("toggleEdition: workshop " + workshop);
    if (workshop) {
      $('#workshop-title').val(workshop.title);
      $('#workshop-date').val(workshop.date);
      $('#workshop-location').val(workshop.location);
      $('#workshop-description').val(workshop.description);
      $('#workshop-duration').val(workshop.duration);
      $('#workshop-maxparticipants').val(workshop.maxparticipants);
      $('#workshop-what').val(workshop.what);
      $('#workshop-status').val(workshop.status);
    }
    $('#workshop-id').val(_id);
  }
  $('#form-container').toggleClass('hidden');
}

function cancelEdition() {
  console.log("cancelEdition: workshop registration form");
  $('#form-container').addClass('hidden');
}

// PUT: modify an existing record called when id is defined
// POST: create a record called when id is undefined
function submitWorkshopData() {
  console.log("submitWorkshopData Enter");

  const workshopData = {
    title: $('#workshop-title').val(),
    date: $('#workshop-date').val(),
  //  location: $('#workshop-location').val(),
    duration: $('#workshop-duration').val(),
    description: $('#workshop-description').val(),
    maxparticipants: $('#workshop-maxparticipants').val(),
    what: $('#workshop-what').val(),
    status: $('#workshop-status').val(),
    _id: $('#workshop-id').val(),
  };
  workshopData.location = "Clifton Center";
  if (!workshopData.status) {
    workshopData.status = "open";
  }
  if (workshopData._id) {
    $.ajax({
      type: 'PUT',
      url: '/api/workshop/' + workshopData._id,
      data: JSON.stringify(workshopData),
      dataType: 'json',
      contentType : 'application/json',
    })
    .done(function(response) {
      console.log("We have put the data");
      refreshWorkshopList();
      toggleEdition();
    })
    .fail(function(error) {
      console.log("Failures at putting, we are", error);
    })
  } else {
    $.ajax({
      type: 'POST',
      url: '/api/workshop/',
      data: JSON.stringify(workshopData),
      dataType: 'json',
      contentType : 'application/json',
    })
    .done(function(response) {
      console.log("We have posted the data");
      refreshWorkshopList();
      toggleEdition();
    })
    .fail(function(error) {
      console.log("Failures at posting, we are", error);
    })
  }
  console.log("Your workshop data", workshopData);
}

function enableEntryForm() {
  console.log("enableEntryForm");
  toggleEdition();
}

function deleteWorkshopClick(_id) {
  console.log("deleteWorkshopClick: workshop id = " + _id);

  //if (confirm("Are you sure?")) 
  {
    $.ajax({
      type: 'DELETE',
      url: '/api/workshop/' + _id,
      dataType: 'json',
      contentType : 'application/json',
    })
      .done(function(response) {
        console.log("Workshop", _id, "has been deleted");
        refreshWorkshopList();
      })
      .fail(function(error) {
        console.log("I'm not gone yet!", error);
      })
  }


}