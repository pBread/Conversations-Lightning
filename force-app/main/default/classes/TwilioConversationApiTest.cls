@isTest
private class TwilioConversationApiTest {
  static testMethod void runGetTwilioAccounts() {
    try {
      List<Twilio_Convo__Twilio_Account__c> twilioAccounts = TwilioConversationApi.getTwilioAccounts();
    } catch (Exception e) {
    }
  }

  static testMethod void runGetUser() {
    try {
      User user = TwilioConversationApi.getUser('');
    } catch (Exception e) {
    }
  }

  static testMethod void runGetConversations() {
    try {
      String conversations = TwilioConversationApi.getConversations('', '');
    } catch (Exception e) {
    }
  }

  static testMethod void runGetMessages() {
    try {
      String messages = TwilioConversationApi.getMessages('', '');
    } catch (Exception e) {
    }
  }

  static testMethod void runGetParticipants() {
    try {
      String participants = TwilioConversationApi.getParticipants('', '');
    } catch (Exception e) {
    }
  }
}
