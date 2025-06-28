'use strict';

/**
 * dapp-chain service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dapp-chain.dapp-chain');
