public class TwilioConversationApi {
  @AuraEnabled
  public static List<Twilio_Account__c> getTwilioAccounts() {
    return [SELECT Id, Name FROM Twilio_Account__c];
  }

  @AuraEnabled
  public static String getConversations(
    String credentialId,
    String phoneNumber
  ) {
    return TwilioConversationApi.makeRequest(
      credentialId,
      'https://conversations.twilio.com/v1/ParticipantConversations?Address=' +
      phoneNumber
    );
  }

  @AuraEnabled
  public static String getMessages(
    String credentialId,
    String conversationSid
  ) {
    return TwilioConversationApi.makeRequest(
      credentialId,
      'https://conversations.twilio.com/v1/Conversations/' +
      conversationSid +
      '/Messages'
    );
  }

  @AuraEnabled
  public static String getParticipants(
    String credentialId,
    String conversationSid
  ) {
    return TwilioConversationApi.makeRequest(
      credentialId,
      'https://conversations.twilio.com/v1/Conversations/' +
      conversationSid +
      '/Participants'
    );
  }

  private static String makeRequest(String credentialId, String url) {
    // Twilio_Credentials__c credential = [
    //   SELECT Account_SID__c, API_Key__c, id, Secret__c
    //   FROM Twilio_Credentials__c
    //   LIMIT 1
    // ];

    // HttpRequest req = new HttpRequest();
    // req.setEndpoint(url);
    // req.setMethod('GET');

    // Blob headerValue = Blob.valueOf(
    //   credential.API_Key__c +
    //   ':' +
    //   credential.Secret__c
    // );
    // req.setHeader(
    //   'Authorization',
    //   'Basic ' + EncodingUtil.base64Encode(headerValue)
    // );

    // Http http = new Http();
    // HTTPResponse res = http.send(req);

    // return res.getBody();

    return 'hello';
  }
}
