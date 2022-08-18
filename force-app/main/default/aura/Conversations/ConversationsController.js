({
  init: function (cmp, ev, helper) {
    const action = cmp.get("c.getConversations");
    action.setParams({
      apiKey: "SKd2c37d4e70773196ba48e6ab26f2c38d",
      apiSecret: "",
      phoneNumber: "%2B18475070348"
    });
    action.setCallback(this, function (response) {
      var state = response.getState();
      console.log({ state });
      if (state === "SUCCESS") {
        var result = response.getReturnValue();
        console.log({ result });
        //do something with the result
      } else if (state === "INCOMPLETE") {
        // wait, what?
      } else if (state === "ERROR") {
        var errors = response.getError();
        //do something about the errors
        console.error(errors);
      }
    });
    $A.enqueueAction(action);
  }
});
