@isTest
private class TwilioConversationApiTest {
  static testMethod void validateSOQL() {
    try {
      List<Twilio_Account__c> twilioAccounts = TwilioConversationApi.getTwilioAccounts();
    } catch (Exception e) {
    }

    try {
      User user = TwilioConversationApi.getUser('');
    } catch (Exception e) {
    }
  }

  static testMethod void validateTwilioRequests() {
    try {
      String conversations = TwilioConversationApi.getConversations('', '');
    } catch (Exception e) {
    }
    try {
      String messages = TwilioConversationApi.getMessages('', '');
    } catch (Exception e) {
    }
    try {
      String participants = TwilioConversationApi.getParticipants('', '');
    } catch (Exception e) {
    }
  }
}
