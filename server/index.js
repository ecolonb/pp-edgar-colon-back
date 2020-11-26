require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 2786;

app.listen(PORT, () => console.log(`Listening port: ${PORT}`));
