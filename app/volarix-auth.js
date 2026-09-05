(function (root) {
  function getClient() {
    var cfg = root.VOLARIX_SUPABASE_CONFIG;
    if (!cfg || !cfg.url || !cfg.publishableKey || !root.supabase || !root.supabase.createClient) return null;
    if (!root.__volarixAuthClient) {
      root.__volarixAuthClient = root.supabase.createClient(cfg.url, cfg.publishableKey);
    }
    return root.__volarixAuthClient;
  }

  root.volarixAuth = {
    getClient: getClient,
    requireUser: async function () {
      var client = getClient();
      if (!client) return null;
      var result = await client.auth.getUser();
      if (result.error || !result.data || !result.data.user) return null;
      root.VOLARIX_AUTH_USER = result.data.user;
      return result.data.user;
    },
    signInWithPassword: async function (email, password) {
      var client = getClient();
      if (!client) return { error: { message: 'not configured' }, data: { user: null, session: null } };
      return client.auth.signInWithPassword({ email: email, password: password });
    },
    signOut: async function () {
      var client = getClient();
      if (client) await client.auth.signOut();
      root.VOLARIX_AUTH_USER = null;
    }
  };
})(window);
