({
  handleRecordUpdated: function (cmp, event, helper) {
    const eventParams = event.getParams();
    if (eventParams.changeType !== "LOADED") return;

    const getCredentials = cmp.get("c.getCredentials");

    getCredentials.setCallback(this, function (res) {
      const state = res.getState();
      if (state !== "SUCCESS") throw Error("Failed to fetch credentials");

      const credentials = res.getReturnValue();

      for (const credential of credentials) {
        const getConversations = cmp.get("c.getConversations");
        getConversations.setParams({
          apiKey: credential.API_Key__c,
          apiSecret: credential.Secret__c,
          phoneNumber: cmp.get("v.record.MobilePhone").replace("+", "%2B")
        });

        getConversations.setCallback(this, function (res) {
          const state = res.getState();
          if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

          const result = JSON.parse(res.getReturnValue());
          if (result.code) return console.error(result);

          const curConversationSids = cmp.get("v.conversationSids");

          cmp.set("v.conversationSids", [
            ...curConversationSids,
            ...result.conversations.map((convo) => convo.conversation_sid)
          ]);
        });

        $A.enqueueAction(getConversations);
      }
    });

    $A.enqueueAction(getCredentials);
  }
});
