({
  dispatch: function (cmp, action) {
    const evDispatch = cmp.getEvent("evDispatch");
    evDispatch.setParams({
      action: JSON.stringify(action)
    });
    evDispatch.fire();
  },

  getCredentials: function (cmp) {
    return new Promise((resolve, reject) => {
      console.log("fired getCredentials");
      const action = cmp.get("c.getCredentials");

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") reject(state);

        const credentials = res.getReturnValue();
        if (!credentials.length || credentials.length > 1)
          reject("No credentials");

        resolve(credentials);
      });

      $A.enqueueAction(action);
    });
  },

  getConversations: function (cmp, credential) {
    return new Promise((resolve, reject) => {
      console.log("fired getConversations");
      const action = cmp.get("c.getConversations");

      action.setParams({
        apiKey: credential.API_Key__c,
        apiSecret: credential.Secret__c,
        phoneNumber: cmp.get("v.record.MobilePhone").replace("+", "%2B")
      });

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

        const result = JSON.parse(res.getReturnValue());
        if (result.code) return reject(result);

        resolve(result.conversations);
      });

      $A.enqueueAction(action);
    });
  },

  getMessages: function (cmp, credential, conversationSid) {
    return new Promise((resolve, reject) => {
      console.log("fired getMessages");
      const action = cmp.get("c.getMessages");

      action.setParams({
        apiKey: credential.API_Key__c,
        apiSecret: credential.Secret__c,
        conversationSid
      });

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

        const result = JSON.parse(res.getReturnValue());
        if (result.code) return reject(result);

        resolve(result.messages);
      });

      $A.enqueueAction(action);
    });
  },

  getParticipants: function (cmp, credential, conversationSid) {
    return new Promise((resolve, reject) => {
      console.log("fired getParticipants");
      const action = cmp.get("c.getParticipants");

      action.setParams({
        apiKey: credential.API_Key__c,
        apiSecret: credential.Secret__c,
        conversationSid
      });

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

        const result = JSON.parse(res.getReturnValue());
        if (result.code) return reject(result);

        resolve(result.participants);
      });

      $A.enqueueAction(action);
    });
  }
});
