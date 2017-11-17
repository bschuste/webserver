
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
          newWorkshops[i].title = "empty";
          newWorkshops[i].description = "empty";          
          newWorkshops[i].date = "XXX";          
        }
        i++;
        workshops[key].image = "img/neck_and_shoulders.jpg";
      });
      let html = compiledTemplate({workshops: oldWorkshops});
      $('#oldlist-container').html(html);
      html = compiledTemplate({workshops: newWorkshops});
      $('#newlist-container').html(html);
    })
  console.log("refreshWorkshopList Exit");
}

function toggleEdition() {
  console.log("toggleEdition: workshop registration form");
  $('#form-container').toggleClass('hidden');
}

function cancelEdition() {
  console.log("cancelEdition: workshop registration form");
  $('#form-container').addClass('hidden');
}

// PUT: modify an existing record
function submitWorkshopDescription() {
  console.log("You clicked 'submit'. Congratulations.");

  const workshopData = {
    title: $('#workshop-title').val(),
    date: $('#workshop-date').val(),
    location: $('#workshop-location').val(),
    duration: $('#workshop-duration').val(),
    description: $('#workshop-description').val(),
    maxparticipants: $('#workshop-max').val(),
    what: $('#workshop-what').val(),
    status: $('#workshop-status').val(),
    _id: $('#workshop-id').val(),
  };
  $.ajax({
  type: 'PUT',
  url: '/api/workshop/' + workshopData._id,
  data: JSON.stringify(workshopData),
  dataType: 'json',
  contentType : 'application/json',
})
  .done(function(response) {
    console.log("We have posted the data");
    refreshWorkshopList();
    toggleAddFileForm();
  })
  .fail(function(error) {
    console.log("Failures at posting, we are", error);
  })

  console.log("Your workshop data", workshopData);
}

