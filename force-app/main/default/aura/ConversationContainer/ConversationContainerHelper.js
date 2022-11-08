({
  getUser: function (cmp, email) {
    return new Promise((resolve, reject) => {
      console.log("fired getUser");
      const action = cmp.get("c.getUser");

      action.setParams({ email });

      action.setCallback(this, function (res) {
        const state = res.getState();
        console.log("Callback state ", state);

        if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

        const result = JSON.parse(res.getReturnValue());
        console.log("Callback result ", result);
        if (result.code) return reject(result);

        resolve(result);
      });

      $A.enqueueAction(action);
    });
  },

  getMessages: function (cmp, twilioAccountId, conversationSid) {
    return new Promise((resolve, reject) => {
      console.log("fired getMessages");
      const action = cmp.get("c.getMessages");

      action.setParams({ twilioAccountId, conversationSid });

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

  getParticipants: function (cmp, twilioAccountId, conversationSid) {
    return new Promise((resolve, reject) => {
      console.log("fired getParticipants");
      const action = cmp.get("c.getParticipants");

      action.setParams({ twilioAccountId, conversationSid });

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
