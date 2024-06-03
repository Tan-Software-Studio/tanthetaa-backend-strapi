module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        blog: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 10,
    },
  },
  upload: {
    config: {
      provider: 'local', // Specify the provider
      providerOptions: {
        sizeLimit: 268435456, // 256 MB
        localServer: {
          maxage: 300000 // 5 minutes caching for example
        },
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
