({
  initialize: function (cmp, event, helper) {
    const twilioAccount = cmp.get("v.twilioAccount");

    helper.getConversations(cmp, twilioAccount.Id).then(function (convos) {
      cmp.set("v.conversations", convos);
    });
  },

  handleIdentitySelection: function (cmp, event, helper) {
    const identities = JSON.parse(JSON.stringify(cmp.get("v.identities")));

    const identitySelection = cmp.find("identitySelection");
    const value = identitySelection.get("v.value");

    cmp.set(
      "v.selectedIdentity",
      identities.find((identity) => identity.name === value).email
    );
  },

  handleUpdateIdentities: function (cmp, event, helper) {
    const email = event.getParam("email");
    const name = event.getParam("name");
    const selectedIdentity = event.getParam("selectedIdentity");

    const identities = JSON.parse(JSON.stringify(cmp.get("v.identities")));
    cmp.set("v.identities", identities.concat({ email, name }));

    if (!selectedIdentity) {
      cmp.set("v.selectedIdentity", email);

      const identitySelection = cmp.find("identitySelection");
      identitySelection.set("v.value", name);
    }
  },

  tester: function (cmp, event, helper) {
    [
      "contact",
      "conversations",
      "identities",
      "selectedIdentity",
      "twilioAccount"
    ].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(attr, data);
    });
  }
});
