
# Webproject - Register for a workshop.

**Outline**

1. Display a list of workshops
2. Teacher to create or modify a workshop
3. Prospect to register to a workshop


## 1. Display a list of workshops

By order of date:
Display upcoming workshops open for registration
Display upcoming workshops closed for registration
Display past workshops

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
 

## 2. File Structure
 +-- index.js
 +-- public
     +-- index.html
     +-- css
     +-- img
     +-- js
 +-- src
     +-- server.js
     +-- config/index.js
     +-- models/person.model.js
     +-- models/workshop.model.js
     +-- routes/index.js

## 3. Helper binaries

In html, see available javascript libraries at
https://cdnjs.com/libraries
          <!-- {{!-- dateFormat date "dddd, MMMM Do YYYY, h:mm:ss a --"}} -->



The server is using handlebar templates in the html pages
http://handlebarsjs.com/

mongodb noSQL database
