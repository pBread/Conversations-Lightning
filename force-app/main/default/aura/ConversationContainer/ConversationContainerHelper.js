({
  getUser: function (cmp, email) {
    return new Promise((resolve, reject) => {
      const action = cmp.get("c.getUser");

      action.setParams({ email });

      action.setCallback(this, function (res) {
        const result = res.getReturnValue();
        if (!result) return reject(result);

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
            showAuthor: showAuthor(msg, idx, arr),
            showDateTime: showDateTime(msg, idx, arr)
          })
        );

        resolve(messages);
      });

      $A.enqueueAction(action);

      // Helpers

      function showAuthor(msg, idx, arr) {
        return (
          // show author if this is last message
          idx + 1 === arr.length ||
          // show author if the next message is not this author
          arr[idx + 1].author !== msg.author
        );
      }

      function showDateTime(msg, idx, arr) {
        if (showAuthor(msg, idx, arr)) return true;

        const curDate = new Date(msg.date_updated);
        const nextDate = new Date(arr[idx + 1].date_updated);

        return (
          // show time if more than X minutes between next message
          Math.abs(curDate - nextDate) > 10 * 60 * 1000 ||
          // show time if next message is in the next hour
          curDate.getHours() !== nextDate.getHours()
        );
      }
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
