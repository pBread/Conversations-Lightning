({
  handleValueChange: function (cmp, event, helper) {
    console.log("handleValueChange event", event);
  },

  subscribeToDispatch: function (cmp, event, helper) {
    const action = JSON.parse(event.getParam("action"));

    console.log("subscribeToDispatch", action);
  },

  tester: function (cmp, event, helper) {
    console.log("tester");

    const action = { conversationId: "xxx", type: "FETCH_MESSAGES" };

    const prevState = helper.getState(cmp);
    helper.dispatch(cmp, action);
    const newState = helper.reducer(prevState, action);
    console.log("tester newState", newState);
    cmp.set("v.state", JSON.stringify(newState));
    const updatedState = cmp.get("v.state");
    console.log("updatedState", updatedState);
  }
});
