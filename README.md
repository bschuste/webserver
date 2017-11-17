
# Webproject - Register for a workshop.

**Outline**

1. Display a list of workshops
2. Prospect to register to a workshop
3. Project file structure

## 1. Display a list of workshops

- Display upcoming workshops open for registration
- Display upcoming workshops closed for registration
- Upcoming workshops cannot be deleted but can be updated by clicking on the picture and filling out the form.
- Display past workshops
- These workshops can be deleted and show a delete button but they cannot be modified. Delete button has an immediate effect.
- Workshops can be created from scratch with empty fields by using the add workshop button and click submit
- Workshops can be copied:
    - click on an existing workshop picture
    - click cancel
    - click add workshop button the fields are populated with the other workshop information
    - click submit

- By default, the picture is Rocks but if the title is either: Necks, Babies, Jaw, Hands, Saddle the appropriate picture will be loaded.
- Modifying the date of an existing and giving a date already passed will put the workshop in the old list and thus can be deleted.

Workshop:
  picture (as a second step) would be a url
  title
  date
  start time
  duration
  location
  description
  maximum number of participants
  what to bring
  status (partial, open for registration, full, closed) to be dynamically calculated

  CRUD:
    Create:  By the teacher, add the fields listed above. Set status to open

    Read: By the teacher, a prospect or a registered participant
        All: display the list of workshops with the related information + fullness.
        Teacher: display the list of participants with the payment method.
        Prospect: nothing additional
        Registered: display customized message.

    Update: By the teacher, a prospect or a registered participant
        Teacher: update any of the fields in the information
        Step 3: authentication and autorisation levels for each role

    Delete: By the teacher or a registered participant.

## 2. Register as a participant

  This is to do.
  Basically, a prospect can register to any of the workshops as long as there is enough space.
  Each workshop holds a list of participant ids.
  These ids are matching the participant id from the database document.

  Participant: Firstname Name 
               Date of Birth 
               Contact info (phone, email)
               Payment status

  CRUD:
    Create: By the teacher or a prospect.
        Enter participant info
        Goto payment page

    Read: By the teacher or a participant
        Teacher: list of participants
        Participant: personal information

    Update: By the participant
        Update personal information

    Delete: By the teacher or a participant.
        What should it trigger?
 

## 3. Project file structure
. +-- index.js
. +-- public
.     +-- index.html
.     +-- css
.     +-- img
.     +-- js
. +-- src
.     +-- server.js
.     +-- config/index.js
.     +-- models/person.model.js
.     +-- models/workshop.model.js
.     +-- routes/index.js
