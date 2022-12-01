({
  initialize: function (cmp, event, helper) {
    const twilioAccount = cmp.get("v.twilioAccount");

    helper.getConversations(cmp, twilioAccount.Id).then(function (convos) {
      cmp.set("v.conversations", convos);
    });
  },

  tester: function (cmp, event, helper) {
    ["contact", "twilioAccount"].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(attr, data);
    });
  }
});
