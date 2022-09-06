({
  subscribeToDispatch: function (cmp, event, helper) {
    const { type, ...payload } = JSON.parse(event.getParam("action"));

    console.log("subscribeToDispatch", { type, ...payload });
  },

  tester: function (cmp, event, helper) {
    console.log("tester");

    helper.dispatch(cmp, { type: "FETCH_MESSAGES", conversationId: "xxx" });
  }
});
