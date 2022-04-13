import setup from "./setup.js";
import app from "./app.js";

app.listen(setup.port, () => {
    console.log(`App listening on PORT ${setup.port}`)
});