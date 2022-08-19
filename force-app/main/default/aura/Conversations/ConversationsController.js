({
  handleRecordUpdated: function (cmp, event, helper) {
    const eventParams = event.getParams();
    if (eventParams.changeType !== "LOADED") return;

    helper.getCredentials(cmp).then((credentials) =>
      // TODO: implement multi-credention. The next line disables multi-credential
      credentials.slice(0, 1).map((credential) => {
        helper.getConversations(cmp, credential).then((conversations) => {
          cmp.set("v.conversations", conversations);

          conversations.forEach((conversation) => {
            helper
              .getParticipants(cmp, credential, conversation.conversation_sid)
              .then((participants) => {
                const participantMap = JSON.parse(cmp.get("v.participantMap"));
                participantMap[conversation.conversation_sid] = participants;
                cmp.set("v.participantMap", participantMap);
              });

            helper
              .getMessages(cmp, credential, conversation.conversation_sid)
              .then((messages) => {
                const messageMap = JSON.parse(cmp.get("v.messageMap"));
                messageMap[conversation.conversation_sid] = messages;

                cmp.set("v.messageMap", messageMap);
              });
          });
        });
      })
    );

    // const getCredentials = cmp.get("c.getCredentials");

    // getCredentials.setCallback(this, function (res) {
    //   const state = res.getState();
    //   if (state !== "SUCCESS") throw Error("Failed to fetch credentials");

    //   const credentials = res.getReturnValue();

    //   // TODO: We are currently only taking the first credential record.
    //   // Users may have multiple accounts
    //   cmp.set("v.credential", credentials[0]);
    //   for (const credential of credentials.splice(0, 1)) {
    //     const getConversations = cmp.get("c.getConversations");
    //     getConversations.setParams({
    //       apiKey: credential.API_Key__c,
    //       apiSecret: credential.Secret__c,
    //       phoneNumber: cmp.get("v.record.MobilePhone").replace("+", "%2B")
    //     });

    //     getConversations.setCallback(this, function (res) {
    //       const state = res.getState();
    //       if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

    //       const result = JSON.parse(res.getReturnValue());
    //       if (result.code) return console.error(result);

    //       const curConversationSids = cmp.get("v.conversationSids");

    //       cmp.set("v.conversationSids", [
    //         ...curConversationSids,
    //         ...result.conversations.map((convo) => convo.conversation_sid)
    //       ]);
    //     });

    //     $A.enqueueAction(getConversations);
    //   }
    // });

    // $A.enqueueAction(getCredentials);
  }
});
