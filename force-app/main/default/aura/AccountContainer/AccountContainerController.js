({
  initialize: function (cmp, event, helper) {
    console.log("initialize AccountContainer");
    const twilioAccount = cmp.get("v.twilioAccount");

    helper.getConversations(cmp, twilioAccount.Id).then(function (convos) {
      console.log("convos", convos);
    });
  },

  tester: function (cmp, event, helper) {
    ["contact", "twilioAccount"].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(attr, data);
    });
  }
});
