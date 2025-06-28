// module.exports = {
//     async beforeCreate(event) {
//         const { data } = event.params;

//         // 1. Check for empty or whitespace-only input
//         if (!data.chain || typeof data.chain !== 'string' || data.chain.trim().length === 0) {
//             throw new Error("Chain name is required and cannot be empty or just spaces.");
//         }

//         const chainValue = data.chain.trim().toLowerCase();

//         // 2. Check for uniqueness (case-insensitive)
//         const existingChain = await strapi.entityService.findMany('api::dapp-chain.dapp-chain', {
//             filters: {
//                 chain: {
//                     $eqi: chainValue
//                 }
//             },
//             limit: 1,
//         });

//         if (existingChain.length > 0) {
//             throw new Error("This chain already exists. Please enter a unique chain name.");
//         }

//         // Normalize
//         data.chain = chainValue;
//     },

//     async beforeUpdate(event) {
//         const { data, where } = event.params;

//         if (data.chain !== undefined) {
//             if (typeof data.chain !== 'string' || data.chain.trim().length === 0) {
//                 throw new Error("Chain name cannot be empty or just spaces.");
//             }

//             const chainValue = data.chain.trim().toLowerCase();

//             // Check uniqueness excluding current entry
//             const existingChain = await strapi.entityService.findMany('api::dapp-chain.dapp-chain', {
//                 filters: {
//                     chain: {
//                         $eqi: chainValue
//                     },
//                     id: {
//                         $ne: where.id
//                     }
//                 },
//                 limit: 1,
//             });

//             if (existingChain.length > 0) {
//                 throw new Error("This chain already exists. Please enter a unique chain name.");
//             }

//             // Normalize
//             data.chain = chainValue;
//         }
//     }
// };
