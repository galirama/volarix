(function (root) {
  var DEFAULT_CONFIG = {
    supabaseUrl: 'https://ifixqeuxvfsxzkxlytqm.supabase.co',
    supabaseKey: 'sb_publishable_BjcFWrlYoIv2DKqXk1A8iA_uaJB487L'
  };

  function getClient() {
    var cfg = root.VOLARIX_CONFIG || DEFAULT_CONFIG;
    if (!cfg || !cfg.supabaseUrl || !cfg.supabaseKey || !root.supabase || !root.supabase.createClient) {
      console.error('Supabase config or library missing.');
      return null;
    }
    if (!root.__volarixAuthClient) {
      root.__volarixAuthClient = root.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey);
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
      if (!client) return { error: { message: 'Authentication client not initialized' }, data: { user: null, session: null } };
      return client.auth.signInWithPassword({ email: email, password: password });
    },
    signOut: async function () {
      var client = getClient();
      if (client) await client.auth.signOut();
      root.VOLARIX_AUTH_USER = null;
    }
  };
})(window);