({
  onRecordLoaded: function (cmp, event, helper) {
    // Handles the initial data fetching. Executes when Contact record loads.
    const eventParams = event.getParams();
    if (eventParams.changeType !== "LOADED") return;

    helper.getTwilioAccounts(cmp).then((twilioAccounts) => {
      cmp.set("v.twilioAccounts", twilioAccounts);
    });
  },

  tester: function (cmp, event, helper) {
    ["contact", "twilioAccounts"].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(attr, data);
    });
  }
});
