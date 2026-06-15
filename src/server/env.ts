'use server '

const builderApiKey = process.env.BUILDER_API_KEY;

export const env = {
  builderApiKey: builderApiKey!,
};