//  'use strict';

//  /**
//  * contact controller
//   */

// const { createCoreController } = require('@strapi/strapi').factories;

//  module.exports = createCoreController('api::contact.contact');

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
    const { sendNda, email, name, projectDescription, budgetRange, budgetRangeInfo, contactInfo, socialInfo } = ctx.request.body.data;
    console.log(sendNda, email, name, projectDescription, budgetRange, budgetRangeInfo, contactInfo, socialInfo);
    console.log(ctx.request.body.data)

    // Check if the NDA checkbox is selected
    if (sendNda) {
      try {
        // Define the path to your NDA file
        const filePath = path.resolve(__dirname, '../../../files/nda.pdf');

        // Read the NDA file
        const fileContent = fs.readFileSync(filePath);

        // Create nodemailer transporter (example with Ethereal)
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: process.env.EMAIL_USER, // Your Ethereal email address
            pass: process.env.EMAIL_PASS, // Your Ethereal email password
          },
        });

        // Send the email with the NDA file attached to yourself
        await transporter.sendMail({
          from: `"Tantheta Software Studio" <${process.env.EMAIL_USER}>`,
          to: process.env.RECIPIENT_EMAIL,
          subject: 'NDA Document and User Details',
          html: `
            <p>Hello,</p>
            <p>You have received a new NDA request along with user details. Please find the details below:</p>
            <h3>User Details:</h3>
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Name:</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Email:</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Project Description:</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">${projectDescription}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Budget Range Info:</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">${JSON.stringify(budgetRangeInfo.budgetRangeTag)}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Contact Info:</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">${JSON.stringify(contactInfo.contactNumber)}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Social Info:</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">${JSON.stringify(socialInfo.socialUsername)}</td>
              </tr>
            </table>
            <p>Attached is the NDA document requested by the user.</p>
            <p>Best regards,<br>Tantheta Software Studio</p>
          `,
          attachments: [
            {
              filename: 'nda.pdf',
              content: fileContent
            }
          ]
        });

        strapi.log.info(`NDA and user details sent to ${process.env.RECIPIENT_EMAIL}`);
      } catch (error) {
        strapi.log.error('Failed to send NDA:', error);
        ctx.throw(500, 'Failed to send NDA');
      }
    }

    return response;
  }
}));



// //----------------------------------------------------------------------------------------------------------------------------------------------------------


// 'use strict';

// /**
//  * contact controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::contact.contact');


// 'use strict';

// /**
//  * contact controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;
// const nodemailer = require('nodemailer');
// const path = require('path');
// const fs = require('fs');

// module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
//   async create(ctx) {
//     // Call the default core action
//     const response = await super.create(ctx);

//     // Extract relevant data from the request
//     const { sendNda, email, name, projectDescription, budgetRange } = ctx.request.body.data;
//     console.log(sendNda, email, name, projectDescription, budgetRange);

//     // Check if the NDA checkbox is selected
//     if (sendNda) {
//       try {
//         // Define the path to your NDA file
//         const filePath = path.resolve(__dirname, '../../../files/nda.pdf');

//         // Read the NDA file
//         const fileContent = fs.readFileSync(filePath);

//         // const transporter = nodemailer.createTransport({
//         //   host: 'smtp.gmail.com',
//         //   port: 587,
//         //   auth: {
//         //     user: process.env.EMAIL_USER, // Your Gmail address
//         //     pass: process.env.EMAIL_PASS, // Your Gmail password
//         //   },
//         // });

//         const transporter = nodemailer.createTransport({
//           host: 'smtp.ethereal.email',
//           port: 587,
//           auth: {
//             user: process.env.EMAIL_USER, // Your Gmail address
//             pass: process.env.EMAIL_PASS, // Your Gmail password
//           },
//         });

//         // Send the email with the NDA file attached to yourself
//         await transporter.sendMail({
//           from: `"Tantheta Software Studio" <${process.env.EMAIL_USER}>`,
//           to: process.env.RECIPIENT_EMAIL,
//           subject: 'NDA Document and User Details',
//           html: `
//             <p>Hello,</p>
//             <p>You have received a new NDA request along with user details. Please find the details below:</p>
//             <h3>User Details:</h3>
//             <table style="border-collapse: collapse; width: 100%;">
//               <tr>
//                 <td style="border: 1px solid #ddd; padding: 8px;"><strong>Name:</strong></td>
//                 <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #ddd; padding: 8px;"><strong>Email:</strong></td>
//                 <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #ddd; padding: 8px;"><strong>Project Description:</strong></td>
//                 <td style="border: 1px solid #ddd; padding: 8px;">${projectDescription}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #ddd; padding: 8px;"><strong>Budget Range:</strong></td>
//                 <td style="border: 1px solid #ddd; padding: 8px;">${budgetRange}</td>
//               </tr>
//             </table>
//             <p>Attached is the NDA document requested by the user.</p>
//             <p>Best regards,<br>Tantheta Software Studio</p>
//           `,
//           attachments: [
//             {
//               filename: 'nda.pdf',
//               content: fileContent
//             }
//           ]
//         });

//         strapi.log.info(`NDA and user details sent to ${process.env.RECIPIENT_EMAIL}`);
//       } catch (error) {
//         strapi.log.error('Failed to send NDA:', error);
//         ctx.throw(500, 'Failed to send NDA');
//       }
//     }

//     return response;
//   }
// }));


//----------------------------------------------------------------------------------------------------------------------------------------------------------
