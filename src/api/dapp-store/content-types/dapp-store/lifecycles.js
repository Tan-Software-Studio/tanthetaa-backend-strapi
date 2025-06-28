module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // ======= TITLE =======
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      throw new Error("Title is required and cannot be empty or just spaces.");
    }
    const titleValue = data.title.trim().toLowerCase();

    const existingTitle = await strapi.entityService.findMany('api::dapp-store.dapp-store', {
      filters: {
        title: {
          $eqi: titleValue
        }
      },
      limit: 1
    });
    if (existingTitle.length > 0) {
      throw new Error("This title already exists. Please enter a unique title.");
    }

    // ======= URL =======
    if (!data.url || typeof data.url !== 'string' || data.url.trim().length === 0) {
      throw new Error("URL is required and cannot be empty or just spaces.");
    }
    const urlValue = data.url.trim().toLowerCase();

    const existingUrl = await strapi.entityService.findMany('api::dapp-store.dapp-store', {
      filters: {
        url: {
          $eqi: urlValue
        }
      },
      limit: 1
    });
    if (existingUrl.length > 0) {
      throw new Error("This URL already exists. Please enter a unique URL.");
    }

    // ======= IMAGE =======
    if (!data.image || (Array.isArray(data.image) && data.image.length === 0)) {
      throw new Error("Image is required. Please upload an image.");
    }

    // ======= DESCRIPTION =======
    if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 3) {
      throw new Error("Description is required and must be at least 3 characters.");
    }

    // Normalize
    data.title = titleValue;
    data.url = urlValue;
    data.description = data.description.trim();
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    // ======= TITLE =======
    if (data.title !== undefined) {
      if (typeof data.title !== 'string' || data.title.trim().length === 0) {
        throw new Error("Title cannot be empty or just spaces.");
      }
      const titleValue = data.title.trim().toLowerCase();

      const existingTitle = await strapi.entityService.findMany('api::dapp-store.dapp-store', {
        filters: {
          title: {
            $eqi: titleValue
          },
          id: {
            $ne: where.id
          }
        },
        limit: 1
      });
      if (existingTitle.length > 0) {
        throw new Error("This title already exists. Please enter a unique title.");
      }

      data.title = titleValue;
    }

    // ======= URL =======
    if (data.url !== undefined) {
      if (typeof data.url !== 'string' || data.url.trim().length === 0) {
        throw new Error("URL cannot be empty or just spaces.");
      }
      const urlValue = data.url.trim().toLowerCase();

      const existingUrl = await strapi.entityService.findMany('api::dapp-store.dapp-store', {
        filters: {
          url: {
            $eqi: urlValue
          },
          id: {
            $ne: where.id
          }
        },
        limit: 1
      });
      if (existingUrl.length > 0) {
        throw new Error("This URL already exists. Please enter a unique URL.");
      }

      data.url = urlValue;
    }

    // ======= IMAGE =======
    if (data.image !== undefined && (!data.image || (Array.isArray(data.image) && data.image.length === 0))) {
      throw new Error("Image cannot be empty. Please upload an image.");
    }

    // ======= DESCRIPTION =======
    if (data.description !== undefined) {
      if (typeof data.description !== 'string' || data.description.trim().length < 3) {
        throw new Error("Description must be at least 3 characters and cannot be empty.");
      }
      data.description = data.description.trim();
    }
  }
};
