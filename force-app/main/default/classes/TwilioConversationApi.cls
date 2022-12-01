public class TwilioConversationApi {
  @AuraEnabled
  public static List<Twilio_Account__c> getTwilioAccounts() {
    return [SELECT Id, Name FROM Twilio_Account__c];
  }

  @AuraEnabled
  public static String getConversations(
    String twilioAccountId,
    String phoneNumber
  ) {
    return TwilioConversationApi.makeRequest(
      twilioAccountId,
      'https://conversations.twilio.com/v1/ParticipantConversations?Address=' +
      phoneNumber
    );
  }

  @AuraEnabled
  public static String getMessages(
    String twilioAccountId,
    String conversationSid
  ) {
    return TwilioConversationApi.makeRequest(
      twilioAccountId,
      'https://conversations.twilio.com/v1/Conversations/' +
      conversationSid +
      '/Messages'
    );
  }

  @AuraEnabled
  public static String getParticipants(
    String twilioAccountId,
    String conversationSid
  ) {
    return TwilioConversationApi.makeRequest(
      twilioAccountId,
      'https://conversations.twilio.com/v1/Conversations/' +
      conversationSid +
      '/Participants'
    );
  }

  @AuraEnabled
  public static User getUser(String email) {
    User user = [SELECT Id, Name, Email FROM User WHERE Email = :email LIMIT 1];

    return user;
  }

  private static String makeRequest(String twilioAccountId, String url) {
    Twilio_Account__c twilioAccount = [
      SELECT Account_SID__c, API_Key__c, id, Secret__c
      FROM Twilio_Account__c
      LIMIT 1
    ];

    HttpRequest req = new HttpRequest();
    req.setEndpoint(url);
    req.setMethod('GET');

    Blob headerValue = Blob.valueOf(
      twilioAccount.API_Key__c +
      ':' +
      twilioAccount.Secret__c
    );
    req.setHeader(
      'Authorization',
      'Basic ' + EncodingUtil.base64Encode(headerValue)
    );

    Http http = new Http();
    HTTPResponse res = http.send(req);

    return res.getBody();
  }
}
