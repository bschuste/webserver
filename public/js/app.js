
// There is only a finite list of workshops with a given image and title
// This data is populated below
const WORKSHOPS = [
  {id: 'a', image: 'neck_and_shoulders.jpg', title: 'Neck and Shoulders'},
  {id: 'b', image: 'Hands-and-Apple.jpg', title: 'Hands and Apple'},
  {id: 'c', image: 'jaw.jpg', description: 'Jaw Dropping in the Evening'},
  {id: 'd', image: 'on_saddle.jpg', description: 'Ride as you Bike'},
  {id: 'e', image: 'babies.jpg', description: 'Babies are Great'},
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
      window.workshopList = workshops;
      let i=0;
      Object.keys(workshops).forEach(key => {
        console.log(key);          // the name of the current key.
        console.log(workshops[key]);   // the value of the current key.
        if (workshops[key].status === "closed") {
          oldWorkshops[i] = workshops[key];
        } else {
          newWorkshops[i] = workshops[key];
        }
        i++;
//        workshops[key].image =
      });
      const html = compiledTemplate({workshops: oldWorkshops});
      $('#oldlist-container').html(html);
      html = compiledTemplate({workshops: newWorkshops});
      $('#newlist-container').html(html);
    })
  console.log("refreshWorkshopList Exit");
}

function toggleParticipant() {
  console.log("toggleParticipant: workshop registration form");
}
