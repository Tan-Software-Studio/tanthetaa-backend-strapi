module.exports = {
    async beforeCreate(event) {
        const { data } = event.params;

        // 1. Check for empty or whitespace-only tag
        if (!data.tags || typeof data.tags !== 'string' || data.tags.trim().length === 0) {
            throw new Error("Tag name is required and cannot be empty or just spaces.");
        }

        // Normalize input (optional: lowercase)
        const tagValue = data.tags.trim().toLowerCase();

        // 2. Check for uniqueness (case-insensitive)
        const existingTag = await strapi.entityService.findMany('api::dapp-tag.dapp-tag', {
            filters: {
                tags: {
                    $eqi: tagValue, // case-insensitive match
                }
            },
            limit: 1,
        });

        if (existingTag.length > 0) {
            throw new Error("This tag already exists. Please enter a unique tag.");
        }

        // Clean and set the trimmed tag back
        data.tags = tagValue;
    },

    async beforeUpdate(event) {
        const { data, where } = event.params;

        if (data.tags !== undefined) {
            if (typeof data.tags !== 'string' || data.tags.trim().length === 0) {
                throw new Error("Tag name cannot be empty or just spaces.");
            }

            const tagValue = data.tags.trim().toLowerCase();

            // Check if some other tag already has this value
            const existingTag = await strapi.entityService.findMany('api::dapp-tag.dapp-tag', {
                filters: {
                    tags: {
                        $eqi: tagValue
                    },
                    id: {
                        $ne: where.id // exclude current one
                    }
                },
                limit: 1,
            });

            if (existingTag.length > 0) {
                throw new Error("This tag already exists. Please enter a unique tag.");
            }

            // Clean and update
            data.tags = tagValue;
        }
    }
};
