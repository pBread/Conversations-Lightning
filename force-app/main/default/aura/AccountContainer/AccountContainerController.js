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
    const selectedIdentity = identities.find(
      (identity) => identity.name === value
    );

    cmp.set("v.selectedIdentity", selectedIdentity);

    const conversations = JSON.parse(
      JSON.stringify(cmp.get("v.conversations"))
    );
    const selectedConversation = conversations.find(
      (convo) => convo.conversation_sid === selectedIdentity.conversationSid
    );
    cmp.set("v.selectedConversation", selectedConversation);
  },

  handleUpdateIdentities: function (cmp, event, helper) {
    const conversationSid = event.getParam("conversationSid");
    const email = event.getParam("email");
    const name = event.getParam("name");
    const identity = { conversationSid, email, name };

    const curSelectedIdentity = cmp.get("v.selectedIdentity");

    const identities = JSON.parse(JSON.stringify(cmp.get("v.identities")));
    cmp.set("v.identities", identities.concat(identity));

    if (!curSelectedIdentity) {
      cmp.set("v.selectedIdentity", identity);

      const identitySelection = cmp.find("identitySelection");
      identitySelection.set("v.value", name);

      const conversations = JSON.parse(
        JSON.stringify(cmp.get("v.conversations"))
      );
      const selectedConversation = conversations.find(
        (convo) => convo.conversation_sid
      );
      cmp.set("v.selectedConversation", selectedConversation);
    }
  },

  tester: function (cmp, event, helper) {
    [
      "contact",
      "conversations",
      "identities",
      "selectedConversation",
      "selectedIdentity",
      "twilioAccount"
    ].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(attr, data);
    });
  }
});
