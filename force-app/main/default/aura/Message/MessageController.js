({
  tester: function (cmp, event, helper) {
    ["agent", "contact", "message"].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(`ConversationContainer ${attr}`, data);
    });
  }
});
