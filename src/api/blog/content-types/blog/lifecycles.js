module.exports = {
    async beforeCreate(event) {
      const { data } = event.params;
      if (!data.slug) {
        data.slug = await strapi.service('api::blog.blog').generateSlug(data.title);
      }
    },
    async beforeUpdate(event) {
      const { where, data } = event.params;
      const blog = await strapi.query('api::blog.blog').findOne({ where });
      if (blog && blog.slug && !data.slug) {
        // Preserve the existing slug if it's not explicitly provided in the update
        data.slug = blog.slug;
      }
    },
  };
  