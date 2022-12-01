({
  getTwilioAccounts: function (cmp) {
    return new Promise((resolve, reject) => {
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
  }
});
