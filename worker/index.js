// The site is a static Astro build served from Workers static assets (see
// [assets] in wrangler.toml). Requests are answered from dist/ before this
// script runs, so `fetch` here only passes anything that reaches it on to the
// assets.
//
// `scheduled` runs on the cron in wrangler.toml ([triggers]). It calls the
// Workers Builds deploy hook, which rebuilds and redeploys the site from main.
// The daily rebuild is what makes newly published Codyssey content (fetched at
// build time in src/components/Writing.astro) show up without a push.
//
// DEPLOY_HOOK_URL is a Worker secret. Anyone with that URL can start a build,
// so it is not stored in the repository.

export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },

  async scheduled(controller, env, ctx) {
    if (!env.DEPLOY_HOOK_URL) {
      console.error('DEPLOY_HOOK_URL secret is not set; skipping the daily rebuild.');
      return;
    }

    const response = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
    if (!response.ok) {
      throw new Error(`Deploy hook returned ${response.status}: ${await response.text()}`);
    }
    console.log('Daily rebuild started.');
  },
};
