({
  getUser: function (cmp, email) {
    return new Promise((resolve, reject) => {
      const action = cmp.get("c.getUser");

      action.setParams({ email });

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") throw Error("Failed to fetch user");

        const result = res.getReturnValue();
        if (result.code) return reject(result);

        resolve(result);
      });

      $A.enqueueAction(action);
    });
  },

  getMessages: function (cmp, twilioAccountId, conversationSid) {
    return new Promise((resolve, reject) => {
      const action = cmp.get("c.getMessages");

      action.setParams({ twilioAccountId, conversationSid });

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") throw Error("Failed to fetch messages");

        const result = JSON.parse(res.getReturnValue());
        if (result.code) return reject(result);

        const messages = result.messages.map((msg, idx, arr) =>
          Object.assign(msg, {
            dateTime: new Date(msg.date_updated).toLocaleString(),
            isInbound: msg.author.includes("@"),

            showAuthor:
              // show author only if this is last message
              idx + 1 === arr.length ||
              // show author only if the next message is not this author
              arr[idx + 1].author !== msg.author ||
              // show author only if next message isn't until next day
              new Date(arr[idx + 1].date_updated).toDateString() !==
                new Date(msg.date_updated).toDateString()
          })
        );

        resolve(messages);
      });

      $A.enqueueAction(action);
    });
  },

  getParticipants: function (cmp, twilioAccountId, conversationSid) {
    return new Promise((resolve, reject) => {
      const action = cmp.get("c.getParticipants");

      action.setParams({ twilioAccountId, conversationSid });

      action.setCallback(this, function (res) {
        const state = res.getState();
        if (state !== "SUCCESS") throw Error("Failed to fetch participants");

        const result = JSON.parse(res.getReturnValue());
        if (result.code) return reject(result);

        resolve(result.participants);
      });

      $A.enqueueAction(action);
    });
  }
});
