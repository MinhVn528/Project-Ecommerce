const app = require("./src/app");

const PORT = 3055

const server = app.listen(PORT, () => {
    console.log(`start: ${PORT}`);
})

// process.on('SIGINT', () => {
//     server.close(() => console.log('server closed'))
//     //notify.send(ping...)
// })