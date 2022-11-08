({
  initialize: function (cmp, event, helper) {
    console.log("initialize CoonversationContainer");
  },

  tester: function (cmp, event, helper) {
    ["contact", "conversation", "twilioAccount"].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(attr, data);
    });
  }
});
