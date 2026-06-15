import 'server-only'

const builderApiKey = process.env.BUILDER_API_KEY;

export const env = {
  builderApiKey: builderApiKey!,
};