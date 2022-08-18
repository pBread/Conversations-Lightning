({
  init: function (cmp, ev, helper) {
    const getConversations = cmp.get("c.getConversations");
    getConversations.setParams({
      apiKey: "SKd2c37d4e70773196ba48e6ab26f2c38d",
      apiSecret: "ST9BlmoP9xcJyEVB0dhanXv2SN0gsHly",
      phoneNumber: "%2B18475070348"
    });

    getConversations.setCallback(this, function (response) {
      const state = response.getState();
      console.log(state);
      if (state !== "SUCCESS") throw Error("Failed to fetch conversations");
      const result = JSON.parse(response.getReturnValue());
      console.log(typeof result, result);
      cmp.set(
        "v.conversationSids",
        result.conversations.map((convo) => convo.conversation_sid)
      );

      component.set("v.buttonLabel", myLabel);
    });

    $A.enqueueAction(getConversations);
  }
});
