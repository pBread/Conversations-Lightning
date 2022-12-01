({
  initialize: function (cmp, event, helper) {
    const twilioAccount = cmp.get("v.twilioAccount");

    helper.getConversations(cmp, twilioAccount.Id).then(function (convos) {
      cmp.set("v.conversations", convos);
    });
  },

  handleUpdateIdentities: function (cmp, event, helper) {
    const email = event.getParam("email");
    const name = event.getParam("name");

    const identities = cmp.get("identities");

    console.log("handleUpdateIdentities", { email, name, identities });
    cmp.set("identities", identities.concat({ email, name }));
  },

  tester: function (cmp, event, helper) {
    ["contact", "conversations", "identities", "twilioAccount"].forEach(
      (attr) => {
        const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
        console.log(attr, data);
      }
    );
  }
});
