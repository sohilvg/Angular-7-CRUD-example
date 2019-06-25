const express = require("express");
const router = express.Router();
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "sk@96877",
        database: "Demo"
    }
});
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    //intercepts OPTIONS method
    if ("OPTIONS" === req.method) {
        //respond with 200
        res.sendStatus(200);
    } else {
        //move on
        next();
    }
});
router.post('/api/v1/business', async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        const result = await knex("public.users").insert({
            person_name: req.body.person_name,
            business_name: req.body.business_name,
            business_gst_number: req.body.business_gst_number

        });
        res.send(result);
    } catch (error) {
        res.sendStatus(500);
    }
});
/* get members from database*/
router.get("/api/v1/business", async function (req, res) {
    const result = await knex.select("*").from("public.users");
    res.send(result);
});

/* update members from database */
router.put("/api/v1/business", async function (req, res) {
    console.log(`id ${req.params.id}`);
    await knex("public.users")
        .where("id", "=", req.params.id)
        .update("person_name", req.body.person_name, "business_name", req.body.business_name, "business_gst_number", req.body.business_gst_number);
    res.send();
});
module.exports = router;