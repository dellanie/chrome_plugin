import React from 'react'
import { useState } from 'react';
import './addcalendar.css'

function AddCalendarEvent() {

  const [clientName, setClientName] = useState('');

  const [address, setAddress] = useState('');

  const [startDateTime, setStartDateTime] = useState('');

  const [endDateTime, setEndDateTime] = useState('');

  //upload to github
  
  var gapi = window.gapi
  var CLIENT_ID = "409714221874-nr54f2m49ogenhoc1kk4tgk3j03vv76b.apps.googleusercontent.com"
  var API_KEY = "AIzaSyDG3peQu0tPTAENyg4JZmZAacOczfSKtlI"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = (e) =>{
    e.preventDefault()
    gapi.load('client:auth2',() =>{
      console.log('loaded client')
      gapi.client.init({
        apiKey:API_KEY,
        clientId:CLIENT_ID,
        discoveryDocs:DISCOVERY_DOCS,
        scope:SCOPES
    })
    
    gapi.client.load('calendar','v3')
    
    
    // timezone
    let timeZone = "Canada/Central";
    //let duration = '00:59:00';

    //event start time 
      //let startDate = new Date().toTimeString();
      //let msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60  + Number(duration.split(':')[2])) * 1000;
      //let endDate = new Date(startDate.getTime() + msDuration);
      //let isoStartDate = new Date(startDate.getTime()-new Date().getTimezoneOffset()*60*1000).toISOString().split(".")[0];
      //let isoEndDate = new Date(endDate.getTime()-(new Date().getTimezoneOffset())*60*1000).toISOString().split(".")[0];

    ///sign in with pop up window
    gapi.auth2.getAuthInstance().signIn()
    .then(()=>  { 
      let event = {
          'summary':clientName,
          'location':address,
          'start':{
              'dateTime':startDateTime,
              'timeZone':timeZone
              
          },
          'end':{
              'dateTime': endDateTime,
              'timeZone':timeZone
              
          },
          'recurrence':[
              'RRULE:FREQ=DAILY;COUNT=1'
          ],
          'reminders':{
              'useDefault':false,
              'overrides':[
                  {'method':'popup','minutes':20}
              ]
          }
          
      }

      let request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource':event
      })

      request.execute(event => {
            window.open(event.htmllink)
      })
    })
    
    })
  }
  return (
    <div className="Addcal">
      <form >
        <input type='text' placeholder='Description' value={clientName} onChange={e => setClientName(e.target.value)}/>
        <br/>
        <input type='text' placeholder='Location' value={address} onChange={e => setAddress(e.target.value)}/>
        <br/>
        <input type='datetime-local' value={startDateTime} onChange={e => setStartDateTime(`${e.target.value}:00`)}/>
        <br/>
        <input type='datetime-local' value={endDateTime} onChange={e => setEndDateTime(`${e.target.value}:00`)}/>
        <br/>
        
        <button onClick={handleClick}>Add Event</button>
      </form>

      
    </div>
  );
}

export default AddCalendarEvent