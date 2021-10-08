const https = require('https');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('cicd success!')
    const temperature = (req.query.name || (req.body && req.body[0].temperature));
    const humidity = (req.query.name || (req.body && req.body[0].humidity));
    const pressure = (req.query.name || (req.body && req.body[0].pressure));

    context.log("Temperature : ",temperature);
    context.log("humidity : ",humidity);
    context.log("pressure : ",pressure);


    const data = JSON.stringify({
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        "themeColor": "0076D7",
        "summary": "Temperature WARING MESSAGE",
        "sections": [
            {
                "activityTitle": "The current temperature is 5 degrees higher than the reference temperature.",
                "activitySubtitle": "Maxim-device",
                "activityImage": "https://cdn.icon-icons.com/icons2/2699/PNG/512/microsoft_azure_logo_icon_170956.png",
                "facts": [
                    {
                        "name": "temperature:",
                        "value": temperature
                    },
                    {
                        "name": "humidity:",
                        "value": humidity
                    },
                    {
                        "name": "pressure:",
                        "value": pressure
                    }
                ],
                "markdown": true
            }
        ]
    })

    const options = {
        hostname: 'cloocus.webhook.office.com',
        port: 443,
        path: '/webhookb2/b486dc56-baa1-4e34-bd8d-5758bb9d0563@355deae4-a1d6-4d5e-be34-0ad0c20aaa0f/IncomingWebhook/af007c0a25844a8cbc71b99432c5779e/1bd9511a-ab2f-4ef1-aaa3-121c9c32fc34',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const requ = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    requ.on('error', error => {
        console.error(error)
    })

    requ.write(data)
    requ.end()

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}