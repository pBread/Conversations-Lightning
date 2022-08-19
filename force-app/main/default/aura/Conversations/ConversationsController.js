({
  init: function (cmp, ev, helper) {
    const getCredentials = cmp.get("c.getCredentials");

    getCredentials.setCallback(this, function (res) {
      const state = res.getState();
      console.log("getCredentials state: ", state);
      if (state !== "SUCCESS") throw Error("Failed to fetch credentials");

      const credentials = res.getReturnValue();
      console.log("credential getReturnValue", credentials);
      cmp.set("v.credentials", JSON.stringify(credentials));

      console.log("v.credentials", cmp.get("v.credentials"));
      for (const credential of credentials) {
        const getConversations = cmp.get("c.getConversations");

        getConversations.setParams({
          apiKey: credential.API_Key__c,
          apiSecret: credential.Secret__c,
          phoneNumber: "%2B18475070348"
        });

        getConversations.setCallback(this, function (res) {
          const state = res.getState();
          console.log("getConversations callback state: ", state);
          if (state !== "SUCCESS") throw Error("Failed to fetch conversations");
          const result = JSON.parse(res.getReturnValue());
          if (result.code) return console.error(result);

          console.log("getConversations callback result: ", result);

          const curConversationSids = cmp.get("v.conversationSids");
          console.log(
            "getConversations callback curConversationSids: ",
            curConversationSids
          );

          cmp.set("v.conversationSids", [
            ...curConversationSids,
            ...result.conversations.map((convo) => convo.conversation_sid)
          ]);

          console.log("v.conversationSids", cmp.get("v.conversationSids"));
        });

        $A.enqueueAction(getConversations);
      }
    });

    $A.enqueueAction(getCredentials);
  },

  credentialListener: function (cmp, ev, helper) {
    console.log("credentialListener");

    console.log("credentialListener ev", ev);
  }
});
