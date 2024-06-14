'use strict';

/**
 * testing-diken service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::testing-diken.testing-diken');
