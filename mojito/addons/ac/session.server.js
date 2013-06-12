YUI.add('mojito-session-addon', function(Y, NAME) {
    /**
     * For the simplicity sake we are using a simple Y.Cache limited to 1000 users.
     * Ideally we should move this to a different layer such as Memcached
     * @param {Object} command
     * @param {Object} adapter
     * @param {Object} ac
     */
    function MojitoSession(command, adapter, ac) {

        var sessionCookie = ac.cookie.get("sid");
        if (!sessionCookie) {
            ac.cookie.set("sid", "" + Math.random() + ":" + Math.random());
            sessionCookie = ac.cookie.get("sid");
        }

        if (!Y.sessionStore) {
            Y.sessionStore = new Y.Cache({
                max : 1000
            });

            Y.sessionStore.add(sessionCookie, {});
        } else {
            if (!Y.sessionStore.retrieve(sessionCookie)) {
                Y.sessionStore.add(sessionCookie, {});
            }
        }
        this.sessionCookie = sessionCookie;

    }


    MojitoSession.prototype = {

        namespace : 'session',
        set : function(name, value) {

            var userSession = Y.sessionStore.retrieve(this.sessionCookie).response;

            userSession[name] = value;
            Y.sessionStore.add(this.sessionCookie, userSession);

        },
        get : function(name) {
            return (Y.sessionStore.retrieve(this.sessionCookie) && Y.sessionStore.retrieve(this.sessionCookie).response[name]) || null;
        },
        destroy : function() {
            Y.sessionStore.add(this.sessionCookie,{});
        }
    };

    Y.mojito.addons.ac.session = MojitoSession;

}, '0.0.1', {
    requires : ['mojito', 'mojito-cookie-addon','cache']
});
