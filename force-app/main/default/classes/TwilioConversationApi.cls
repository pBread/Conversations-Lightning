public class TwilioConversationApi {
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
  public static String getParticipants(
    String apiKey,
    String apiSecret,
    String conversationSid
  ) {
    return TwilioConversationApi.makeRequest(
      apiKey,
      apiSecret,
      'https://conversations.twilio.com/v1/ParticipantConversations?Address=' +
      conversationSid
    );
  }

  @AuraEnabled
  public static String getInteractions(
    String apiKey,
    String apiSecret,
    String conversationSid
  ) {
    return TwilioConversationApi.makeRequest(
      apiKey,
      apiSecret,
      'https://conversations.twilio.com/v1/ParticipantConversations?Address=' +
      conversationSid
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
