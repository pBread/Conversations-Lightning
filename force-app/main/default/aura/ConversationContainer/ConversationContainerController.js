({
  init: function (cmp, ev, helper) {
    console.log("ConversationContainer init");

    const conversationSid = cmp.get("v.conversationSid");
    console.log("conversationSid", conversationSid);

    const credential = cmp.get("v.credential");
    console.log("credential", credential);

    const getMessages = cmp.get("c.getMessages");
    const getParticipants = cmp.get("c.getParticipants");

    const params = {
      apiKey: credential.API_Key__c,
      apiSecret: credential.Secret__c,
      conversationSid
    };

    getMessages.setParams(params);
    getParticipants.setParams(params);

    function composeCallback(property) {
      return (res) => {
        const state = res.getState();
        console.log(property, "state", state);

        if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

        const result = JSON.parse(res.getReturnValue());
        if (result.code) return console.error(result);

        console.log(property, "result", result);
        cmp.set(property, result);

        console.log(property, "cmp.get", cmp.get(property));
      };
    }

    getMessages.setCallback(this, function (res) {
      const state = res.getState();
      if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

      const result = JSON.parse(res.getReturnValue());
      if (result.code) return console.error(result);
      cmp.set("v.messages", result.messages);

      console.log("v.messages", "cmp.get", cmp.get("v.messages"));
    });

    getParticipants.setCallback(this, function (res) {
      const state = res.getState();
      if (state !== "SUCCESS") throw Error("Failed to fetch conversations");

      const result = JSON.parse(res.getReturnValue());
      if (result.code) return console.error(result);
      cmp.set("v.participants", result.participants);

      console.log("v.participants", "cmp.get", cmp.get("v.participants"));
    });

    $A.enqueueAction(getMessages);
    $A.enqueueAction(getParticipants);
  }
});
