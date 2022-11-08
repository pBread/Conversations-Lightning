({
  dispatch: function (cmp, action) {
    console.log("helper.dispatch");
    const evDispatch = cmp.getEvent("evDispatch");
    evDispatch.setParams({ action: JSON.stringify(action) });
    evDispatch.fire();
  },

  getTwilioAccounts: function (cmp) {
    return new Promise((resolve, reject) => {
      console.log("fired getTwilioAccounts");
      const action = cmp.get("c.getTwilioAccounts");

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") reject(state);

        const twilioAccounts = res.getReturnValue();
        if (!twilioAccounts.length || twilioAccounts.length > 1)
          reject("No Twilio Accounts are defined");

        resolve(twilioAccounts);
      });

      $A.enqueueAction(action);
    });
  },

  // DEPRECATED

  getConversations: function (cmp, credentialId) {
    return new Promise((resolve, reject) => {
      console.log("fired getConversations");
      const action = cmp.get("c.getConversations");

      const phoneNumber = cmp.get("v.record.MobilePhone").replace("+", "%2B");
      action.setParams({ credentialId, phoneNumber });

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

  getMessages: function (cmp, credentialId, conversationSid) {
    return new Promise((resolve, reject) => {
      console.log("fired getMessages");
      const action = cmp.get("c.getMessages");

      action.setParams({ credentialId, conversationSid });

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

  getParticipants: function (cmp, credentialId, conversationSid) {
    return new Promise((resolve, reject) => {
      console.log("fired getParticipants");
      const action = cmp.get("c.getParticipants");

      action.setParams({ credentialId, conversationSid });

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
