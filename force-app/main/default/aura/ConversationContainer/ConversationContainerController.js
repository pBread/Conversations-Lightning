({
  initialize: function (cmp, event, helper) {
    const conversation = cmp.get("v.conversation");
    const twilioAccount = cmp.get("v.twilioAccount");

    helper
      .getMessages(cmp, twilioAccount.Id, conversation.conversation_sid)
      .then((messages) => {
        cmp.set("v.messages", messages);
      });

    helper
      .getParticipants(cmp, twilioAccount.Id, conversation.conversation_sid)
      .then((participants) => {
        cmp.set("v.participants", participants);

        // TO DO: This will work for Frontline users but not necessarily Flex or Conversations users
        const agentParticipant = participants.find(
          (participant) => participant.identity
        );
        helper
          .getUser(cmp, agentParticipant.identity)
          .then((agent) => {
            cmp.set("v.agent", agent);

            const updateIdentities = cmp.getEvent("updateIdentities");

            updateIdentities.setParams({
              conversationSid: conversation.conversation_sid,
              email: agentParticipant.identity,
              name: agent.Name
            });

            updateIdentities.fire();
          })
          .catch(() => {
            cmp.set("v.agent", {
              Id: Math.round(Math.random() * 1000000),
              Name: agentParticipant.identity,
              Email: agentParticipant.identity
            });

            const updateIdentities = cmp.getEvent("updateIdentities");

            updateIdentities.setParams({
              conversationSid: conversation.conversation_sid,
              email: agentParticipant.identity,
              name: agentParticipant.identity
            });

            updateIdentities.fire();
          });
      });
  },

  tester: function (cmp, event, helper) {
    [
      "agent",
      "contact",
      "conversation",
      "isMessagesLoaded",
      "messages",
      "participants",
      "twilioAccount"
    ].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(`ConversationContainer ${attr}`, data);
    });
  }
});
