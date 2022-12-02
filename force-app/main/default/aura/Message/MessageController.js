({
  onRender: function (cmp, event, helper) {
    const isLast = cmp.get("v.isLast");

    if (isLast) {
      const chatContainer = document.getElementById("chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  },

  tester: function (cmp, event, helper) {
    ["agent", "contact", "isLast", "message"].forEach((attr) => {
      const data = JSON.parse(JSON.stringify(cmp.get(`v.${attr}`)));
      console.log(`Message ${attr}`, data);
    });
  }
});
