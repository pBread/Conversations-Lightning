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
          cmp.set(
            "v.convoToCredential",
            convos.reduce(
              (acc, convo) => Object.assign(acc, { [convo.sid]: credential }),
              {}
            )
          );
          cmp.set(
            "v.convoSids",
            convos.map((convo) => convo.sid)
          );

          for (const convo of convos) {
            helper
              .getParticipants(cmp, credential, convo.conversation_sid)
              .then((participants) => {
                const convoToParticipants = JSON.parse(
                  JSON.stringify(cmp.get("v.convoToParticipants"))
                );
                convoToParticipants[convo.conversation_sid] = participants;
                cmp.set("v.convoToParticipants", convoToParticipants);
              });

            helper
              .getMessages(cmp, credential, convo.conversation_sid)
              .then((messages) => {
                const convoToMessages = JSON.parse(
                  JSON.stringify(cmp.get("v.convoToMessages"))
                );
                convoToMessages[convo.conversation_sid] = messages;
                cmp.set("v.convoToMessages", convoToMessages);
              });
          }
        });
    });
  }
});
