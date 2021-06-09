const url = "http://localhost:3000/flights"
const imageElement = document.querySelector("img#poster")
const airlineElement = document.querySelector("div#airline.airline")
const durationElement = document.querySelector("#duration")
const destinationElement = document.querySelector("#destination")
const departureTimeElement = document.querySelector("#departureTime")
const availableTicketsElement = document.querySelector("#ticket-num") // (capacity - ticketsSold)

/*
FIRST DELIVERABLE:
- See the first flight's details, including its **image, airline, duration, departure time,
and available tickets** (the number of tickets left will need to be derived from the flight's
capacity and the number of tickets sold)

- Use fetch to make a GET request for the first flight's details
  - http://localhost:3000/flights/1 **We don't need iteration on this one (only one flight is being requested)
- Start adding information about the flight to the page
  - image
  - airline
  - duration
  - destination
  - departure time
  - available tickets (capacity - ticketsSold)
*/

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/flights/1")  // Use fetch to make a GET request for the first flight's details
    .then(response => response.json()) // JSONify the response
    .then(data => { // We don't need iteration on this one (only one flight is being requested)
      imageElement.src = data.image
      airlineElement.innerText = data.airline
      durationElement.innerHTML = `${data.duration} minutes`
      destinationElement.innerText = data.destination
      departureTimeElement.innerHTML = data.departureTime
      availableTicketsElement.innerHTML = data.capacity - data.ticketsSold
    })
})