({
  initialize: function (cmp, event, helper) {
    console.log("initialize ConversationContainer");

    const conversation = cmp.get("v.conversation");
    const twilioAccount = cmp.get("v.twilioAccount");

    console.log(
      "ConversationContainer conversation",
      JSON.parse(JSON.stringify(conversation))
    );

    console.log(
      "ConversationContainer twilioAccount",
      JSON.parse(JSON.stringify(twilioAccount))
    );

    helper
      .getMessages(cmp, twilioAccount.Id, conversation.conversation_sid)
      .then((messages) => {
        cmp.set("v.messages", messages);
      });

    helper
      .getParticipants(cmp, twilioAccount.Id, conversation.conversation_sid)
      .then((participants) => {
        cmp.set("v.participants", participants);
      });
  },

  tester: function (cmp, event, helper) {
    [
      "contact",
      "conversation",
      "messages",
      "participants",
      "twilioAccount"
    ].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log("ConversationContainer" + attr, data);
    });
  }
});
