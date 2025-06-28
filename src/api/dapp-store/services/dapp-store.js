'use strict';

/**
 * dapp-store service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dapp-store.dapp-store');
