({
  init: function (cmp, ev, helper) {
    console.log("ConversationContainer init");

    const conversationSid = cmp.get("v.conversationSid");
    console.log("conversationSid", conversationSid);
  }
});
