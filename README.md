## Steps to start the project:

#### Server

Go to /server folder and run:

- `npm install`
- `npm start`

#### FrontEnd

After having the server up an running, go to /client folder and run:

- `npm install`
- `npm run dev`

Once both projects are up and running you should be able to see it running in your browser.

## Screenshots:

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzlqOHBkMzdpcHFuYmMyMjQ0OWpzejVrMWYyMHJsdm9vdjUzeHN5dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/D9AoEpS4HhRFisTFMU/giphy.gif)

## Questions

- What aspect of this exercise did you find most interesting?

  `Connecting frontend and backend in realtime by using raW web sockets.`

- What did you find most cumbersome to do?

  `Find the reason why the event was not firing for all clients after disconnecting a sensor.`

- How can we further improve the user experience?

  `Maybe limiting the server/frontend to avoid update on every single websocket event becuase server is firing so many events after connecting a sensor.`
