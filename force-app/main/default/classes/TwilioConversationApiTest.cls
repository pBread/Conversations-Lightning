@isTest
public class TwilioConversationApiTest {
  static testMethod void validateGetTwilioAccounts() {
    List<Twilio_Account__c> accounts = TwilioConversationApi.getTwilioAccounts();
  }

  static testMethod void validateTwilioRequests() {
    Test.setMock(
      TwilioConversationApi.getConversations('', ''),
      new MockHttpResponseGenerator()
    );
  }
}
