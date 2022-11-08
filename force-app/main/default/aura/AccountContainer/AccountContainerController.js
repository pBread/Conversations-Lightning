({
  initialize: function (cmp, event, helper) {
    const twilioAccount = cmp.get("v.twilioAccount");

    helper.getConversations(cmp, twilioAccount.Id).then(function (convos) {
      console.log("convos", convos);
    });
  }
});
