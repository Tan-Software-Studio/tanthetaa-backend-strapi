
// // //----------------------------------------------------------------------------------------------------------------------------------------------------------
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
//     const { sendNda, email, name, projectDescription, budgetRange, budgetRangeInfo, contactInfo, socialInfo, mediaFiles } = ctx.request.body.data;
//     console.log(sendNda, email, name, projectDescription, budgetRange, budgetRangeInfo, contactInfo, socialInfo, mediaFiles);
//     console.log(ctx.request.body.data);

//     // Check if the NDA checkbox is selected
//     if (sendNda) {
//       try {
//         // Define the path to your NDA file
//         const ndaFilePath = path.resolve(__dirname, '../../../files/nda.pdf');
//         console.log(`NDA file path: ${ndaFilePath}`);

//         // Read the NDA file
//         const ndaFileContent = fs.readFileSync(ndaFilePath);

        // Create nodemailer transporter (example with Ethereal)
        // const transporter = nodemailer.createTransport({
        //   host: 'smtp.ethereal.email',
        //   port: 587,
        //   auth: {
        //     user: process.env.EMAIL_USER, // Your Ethereal email address
        //     pass: process.env.EMAIL_PASS, // Your Ethereal email password
        //   },
        // });
//         const transporter = nodemailer.createTransport({
//           host: 'smtp.ethereal.email',
//           port: 587,
//           auth: {
//               user: 'marshall98@ethereal.email',
//               pass: 'UGABStpxKPN7Nfg2s1'
//           }
//       });

//         // Fetch media files from Strapi and construct attachments array
//         const attachments = [];

//         if (mediaFiles && mediaFiles.length > 0) {
//           for (const fileId of mediaFiles) {
//             const file = await strapi.entityService.findOne('plugin::upload.file', fileId);

//             if (file) {
//               // Construct the file path correctly
//               const mediaFilePath = path.join(__dirname, '../../../../public', file.url);
//               console.log(`Media file path: ${mediaFilePath}`);

//               // Check if the file exists
//               if (fs.existsSync(mediaFilePath)) {
//                 // Read the file content
//                 const mediaFileContent = fs.readFileSync(mediaFilePath);

//                 // Add file to attachments
//                 attachments.push({
//                   filename: file.name,
//                   content: mediaFileContent,
//                 });
//               } else {
//                 strapi.log.error(`Media file not found: ${mediaFilePath}`);
//               }
//             }
//           }
//         }

//         // Add NDA file to attachments
//         attachments.push({
//           filename: 'nda.pdf',
//           content: ndaFileContent,
//         });

//         // Send the email with the NDA file and media files attached to yourself
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
//                 <td style="border: 1px solid #ddd; padding: 8px;"><strong>Budget Range Info:</strong></td>
//                 <td style="border: 1px solid #ddd; padding: 8px;">${JSON.stringify(budgetRangeInfo.budgetRangeTag)}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #ddd; padding: 8px;"><strong>Contact Info:</strong></td>
//                 <td style="border: 1px solid #ddd; padding: 8px;">${JSON.stringify(contactInfo.contactNumber)}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #ddd; padding: 8px;"><strong>Social Info:</strong></td>
//                 <td style="border: 1px solid #ddd; padding: 8px;">${JSON.stringify(socialInfo.socialName)}</td>
//                 <td style="border: 1px solid #ddd; padding: 8px;">${JSON.stringify(socialInfo.socialUsername)}</td>
//               </tr>
//             </table>
//             <p>Attached is the NDA document requested by the user along with the provided media files.</p>
//             <p>Best regards,<br>Tantheta Software Studio</p>
//           `,
//           attachments: attachments,
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
    const { email, name, projectDescription, budgetRange, budgetRangeInfo, contactInfo, socialInfo, mediaFiles } = ctx.request.body.data;
    console.log(email, name, projectDescription, budgetRange, budgetRangeInfo, contactInfo, socialInfo, mediaFiles);
    console.log("==>",ctx.request.body.data);

    function capitalizeFirstChar(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    try {
      // Create nodemailer transporter (example with Gmail)
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        // host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail email address
          pass: process.env.EMAIL_PASS, // Your Gmail email password
        },
      });

      // Fetch media files from Strapi and construct attachments array
      const attachments = [];

      if (mediaFiles && mediaFiles.length > 0) {
        for (const fileId of mediaFiles) {
          const file = await strapi.entityService.findOne('plugin::upload.file', fileId);

          if (file) {
            // Construct the file path correctly
            const mediaFilePath = path.join(__dirname, '../../../../public', file.url);
            console.log(`Media file path: ${mediaFilePath}`);

            // Check if the file exists
            if (fs.existsSync(mediaFilePath)) {
              // Read the file content
              const mediaFileContent = fs.readFileSync(mediaFilePath);

              // Add file to attachments
              attachments.push({
                filename: file.name,
                content: mediaFileContent,
              });
            } else {
              strapi.log.error(`Media file not found: ${mediaFilePath}`);
            }
          }
        }
      }

      // Send the email with the media files attached to yourself
      await transporter.sendMail({
        from: `"Tantheta Software Studio" <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'User Details and Media Files',
        html: `
          <p>Hello,</p>
          <p>You have received new user details along with media files. Please find the details below:</p>
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
              <td style="border: 1px solid #ddd; padding: 8px;">${budgetRangeInfo.budgetRange}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Contact Info:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">${contactInfo.contactNumber}</td>
            </tr>
              <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Country Name:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">${contactInfo.countryName}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>${capitalizeFirstChar(socialInfo.socialName)}:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;" colspan="2">${socialInfo.socialUsername}</td>
            </tr>
          </table>
          <p>Attached are the media files provided by the user.</p>
          <p>Best regards,<br>Tantheta Software Studio</p>
        `,
        attachments: attachments,
      });

      strapi.log.info(`User details and media files sent to ${process.env.RECIPIENT_EMAIL}`);
    } catch (error) {
      strapi.log.error('Failed to send email:', error);
      ctx.throw(500, 'Failed to send email');
    }

    return response;
  }
}));


