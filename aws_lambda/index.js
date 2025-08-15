const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: "us-east-1" }); // Change to your SES region

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        const { name, email, message } = body;

        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "All fields are required." }),
            };
        }

        const params = {
            Destination: {
                ToAddresses: ["your-email@example.com"], // Your receiving email
            },
            Message: {
                Body: {
                    Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}` },
                },
                Subject: { Data: "New Portfolio Contact Form Submission" },
            },
            Source: "your-email@example.com", // Must be verified in SES
        };

        await ses.sendEmail(params).promise();

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ success: "Message sent successfully!" }),
        };

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Failed to send message." }),
        };
    }
};
