public class TwilioConversationApi {
  @AuraEnabled
  public static List<String> getCredentialIds() {
    List<String> ids = new List<String>();

    List<Twilio_Credentials__c> credentials = [
      SELECT Id
      FROM Twilio_Credentials__c
    ];

    for (Twilio_Credentials__c credential : credentials) {
      ids.add(credential.Id);
    }

    return ids;
  }

  // DEP
  @AuraEnabled
  public static List<Twilio_Credentials__c> getCredentials() {
    return [
      SELECT Account_SID__c, API_Key__c, id, Secret__c
      FROM Twilio_Credentials__c
    ];
  }

  @AuraEnabled
  public static String getConversations(
    String apiKey,
    String apiSecret,
    String phoneNumber
  ) {
    return TwilioConversationApi.makeRequest(
      apiKey,
      apiSecret,
      'https://conversations.twilio.com/v1/ParticipantConversations?Address=' +
      phoneNumber
    );
  }

  @AuraEnabled
  public static String getMessages(
    String apiKey,
    String apiSecret,
    String conversationSid
  ) {
    return TwilioConversationApi.makeRequest(
      apiKey,
      apiSecret,
      'https://conversations.twilio.com/v1/Conversations/' +
      conversationSid +
      '/Messages'
    );
  }

  @AuraEnabled
  public static String getParticipants(
    String apiKey,
    String apiSecret,
    String conversationSid
  ) {
    return TwilioConversationApi.makeRequest(
      apiKey,
      apiSecret,
      'https://conversations.twilio.com/v1/Conversations/' +
      conversationSid +
      '/Participants'
    );
  }

  private static String makeRequest(
    String apiKey,
    String apiSecret,
    String url
  ) {
    HttpRequest req = new HttpRequest();
    req.setEndpoint(url);
    req.setMethod('GET');

    Blob headerValue = Blob.valueOf(apiKey + ':' + apiSecret);
    req.setHeader(
      'Authorization',
      'Basic ' + EncodingUtil.base64Encode(headerValue)
    );

    Http http = new Http();
    HTTPResponse res = http.send(req);

    return res.getBody();
  }
}
