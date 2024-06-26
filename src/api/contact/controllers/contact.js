// 'use strict';

// /**
//  * contact controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::contact.contact');


'use strict';

/**
 * contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  async create(ctx) {
    // Call the default core action
    const response = await super.create(ctx);

    // Extract relevant data from the request
    const { sendNda, email } = ctx.request.body.data;
    console.log(sendNda , email);

    // Check if the NDA checkbox is selected
    if (sendNda) {
      try {
        // Define the path to your NDA file
        const filePath = path.resolve(__dirname, '../../../files/nda.pdf');

        // Read the NDA file
        const fileContent = fs.readFileSync(filePath);

        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     auth: {
        //         user: 'eloisa5@ethereal.email',
        //         pass: 'GJs5TuehzR9YwBTtAv'
        //     }
        // });

        const transporter = nodemailer.createTransport({
            // host: 'smtp.gmail.com', ===>use this when you use real id and password
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: process.env.EMAIL_USER, // Your Gmail address
              pass: process.env.EMAIL_PASS, // Your Gmail password
            },
          });
          

        // Send the email with the NDA file attached
        await transporter.sendMail({
          from: `"Tantheta Software Studio" <${process.env.EMAIL_USER}>`,
          to: email, // Using the email from the request body
          subject: 'NDA Document',
          text: 'Please find attached the NDA document you requested from submitted form.',
          attachments: [
            {
              filename: 'nda.pdf',
              content: fileContent
            }
          ]
        });

        strapi.log.info(`NDA sent to ${email}`);
      } catch (error) {
        strapi.log.error('Failed to send NDA:', error);
        ctx.throw(500, 'Failed to send NDA');
      }
    }

    return response;
  }
}));
