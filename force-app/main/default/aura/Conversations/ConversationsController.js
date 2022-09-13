({
  onRecordLoaded: function (cmp, event, helper) {
    // Handles the initial data fetching. Executes when Contact record loads.
    const eventParams = event.getParams();
    if (eventParams.changeType !== "LOADED") return;

    helper.getCredentials(cmp).then((credentials) => {
      cmp.set(
        "v.idToCredential",
        credentials.reduce(
          (acc, credential) =>
            Object.assign(acc, { [credential.Id]: credential }),
          {}
        )
      );
      cmp.set(
        "v.credentialIds",
        credentials.map((credential) => credential.Id)
      );

      for (const credential of credentials)
        helper.getConversations(cmp, credential).then((convos) => {
          const credentialToConvos = cmp.get("v.credentialToConvos");
          credentialToConvos[credential.Id] = convos;
          cmp.set("v.credentialToConvos", credentialToConvos);

          cmp.set(
            "v.convoToCredential",
            convos.reduce(
              (acc, convo) => Object.assign(acc, { [convo.sid]: credential }),
              {}
            )
          );
          cmp.set(
            "v.convoSids",
            convos.map((convo) => convo.conversation_sid)
          );

          for (const convo of convos) {
            helper
              .getMessages(cmp, credential, convo.conversation_sid)
              .then((messages) => {
                const convoToMessages = cmp.get("v.convoToMessages");
                convoToMessages[convo.conversation_sid] = messages;
                cmp.set("v.convoToMessages", convoToMessages);
              });

            helper
              .getParticipants(cmp, credential, convo.conversation_sid)
              .then((participants) => {
                const convoToParticipants = cmp.get("v.convoToParticipants");
                convoToParticipants[convo.conversation_sid] = participants;
                cmp.set("v.convoToParticipants", convoToParticipants);
              });
          }
        });
    });
  },

  tester: function (cmp, event, helper) {
    [
      "convoSids",
      "convoToMessages",
      "convoToParticipants",
      "credentialToConvos"
    ].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(attr, data);
    });
  }
});
