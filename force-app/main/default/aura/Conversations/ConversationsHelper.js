({
  getCredentials: function (cmp) {
    return new Promise((resolve, reject) => {
      console.log("getCredentials");
      const action = cmp.get("c.getCredentials");

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") reject(state);

        const credentials = res.getReturnValue();
        console.log("credentials setCallback", credentials);
        if (!credentials.length || credentials.length > 1)
          reject("No credentials");

        resolve(credentials);
      });

      $A.enqueueAction(action);
    });
  },

  getConversations: function (cmp, credential) {
    return new Promise((resolve, reject) => {
      console.log("getConversations", { credential });

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

        resolve(result);
      });

      $A.enqueueAction(action);
    });
  }
});
