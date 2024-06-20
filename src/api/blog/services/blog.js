'use strict';

/**
 * blog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blog.blog');


const slugify = require('slugify');

module.exports = {
  generateSlug(title) {
    return slugify(title, { lower: true });
  },
};
