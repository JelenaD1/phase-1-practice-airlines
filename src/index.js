const url = "http://localhost:3000/flights"
const imageElement = document.querySelector("img#poster")
const airlineElement = document.querySelector("div#airline.airline")
const durationElement = document.querySelector("#duration")
const destinationElement = document.querySelector("#destination")
const departureTimeElement = document.querySelector("#departureTime")
const availableTicketsElement = document.querySelector("#ticket-num") // (capacity - ticketsSold)

/*
FIRST DELIVERABLE:
See the first flight's details, including its **image, airline, duration, departure time,
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

SECOND DELIVERABLE:
Buy a ticket for a flight. The number of tickets sold for that flight
should be persisted, and I should be able to see the number of available
tickets decreasing on the frontend.

- THE GOAL: Get the amount of tickets to decrease with every click
- Add an event listener (need a const button) onClick
- Track the amount sold (ticketsSold) by making a PATCH request using fetch
  - need a configuration object
  - need destination URL "http://localhost:3000/flights/1"
  - ticketsSold will go up by 1 (need old tickets sold to be able to find new tickets sold)
- Re-calculate remaining tickets (decrease by 1)
*/

document.addEventListener("DOMContentLoaded", () => {
  // FIRST DELIVERABLE
  fetch("http://localhost:3000/flights/1")  // Use fetch to make a GET request for the first flight's details
    .then(response => response.json()) // JSONify the response
    .then(data => { // We don't need iteration on this one (only one flight is being requested)
      imageElement.src = data.image
      airlineElement.innerText = data.airline
      durationElement.innerHTML = `${data.duration} minutes`
      destinationElement.innerText = data.destination
      departureTimeElement.innerHTML = data.departureTime
      availableTicketsElement.innerHTML = data.capacity - data.ticketsSold
      availableTicketsElement.dataset.capacity = data.capacity // <span data-capacity="5"> (actual number subject to change based on variable)
      availableTicketsElement.dataset.ticketsSold = data.ticketsSold // <span data-tickets-sold="3"> (actual number subject to change based on variable)
    })

  // SECOND DELIVERABLE
    const buttonElement = document.querySelector("div.ui.orange.button") // or document.querySelector(".button")
    buttonElement.addEventListener("click", (event) => {
      event.preventDefault()
      if (availableTicketsElement.dataset.ticketsSold !== availableTicketsElement.dataset.capacity) {
        const newTicketsSold = parseInt(availableTicketsElement.dataset.ticketsSold) + 1 // increment the amount of ticketsSold
        const configurationObject = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            ticketsSold: newTicketsSold
          })
        }

        fetch("http://localhost:3000/flights/1", configurationObject)
          .then(response => response.json())
          .then(data => {
            // Update our note (availableTicketsElement.dataset.ticketsSold) to be the new/accurate amount of tickets sold
            availableTicketsElement.dataset.ticketsSold = data.ticketsSold
            availableTicketsElement.innerHTML = data.capacity - data.ticketsSold // re-calculate amount of available tickets based on new ticketsSold
          })
      } else {
        alert("Tickets are sold out!")
      }
    })
})
