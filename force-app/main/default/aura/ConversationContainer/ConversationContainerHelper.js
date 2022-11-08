({
  getConversations: function (cmp, twilioAccountId) {
    return new Promise((resolve, reject) => {
      console.log("fired getConversations");
      const action = cmp.get("c.getConversations");

      const phoneNumber = cmp.get("v.contact.MobilePhone").replace("+", "%2B");
      action.setParams({ twilioAccountId, phoneNumber });

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

        const result = JSON.parse(res.getReturnValue());
        if (result.code) return reject(result);

        resolve(result.conversations);
      });

      $A.enqueueAction(action);
    });
  }
});
