(function (root) {
  var user = {
    id: 'test-owner',
    email: 'owner@volarix.test',
    user_metadata: { name: 'Owner' }
  };

  function hasSession() {
    try {
      return sessionStorage.getItem('volarix_test_auth') === '1' || !!root.__VOLARIX_TEST_USER;
    } catch (e) {
      return !!root.__VOLARIX_TEST_USER;
    }
  }

  root.supabase = {
    createClient: function () {
      return {
        auth: {
          getUser: async function () {
            if (!hasSession()) return { data: { user: null }, error: { message: 'Auth session missing' } };
            return { data: { user: root.__VOLARIX_TEST_USER || user }, error: null };
          },
          signInWithPassword: async function () {
            try { sessionStorage.setItem('volarix_test_auth', '1'); } catch (e) {}
            return { data: { user: user, session: {} }, error: null };
          },
          signOut: async function () {
            try { sessionStorage.removeItem('volarix_test_auth'); } catch (e) {}
            root.__VOLARIX_TEST_USER = null;
            return { error: null };
          }
        }
      };
    }
  };
})(window);
