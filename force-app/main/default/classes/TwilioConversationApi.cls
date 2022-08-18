public class TwilioConversationApi {
  @AuraEnabled
  public static List<String> getConversations(
    String apiKey,
    String apiSecret,
    String phoneNumber
  ) {
    HttpRequest req = TwilioConversationApi.makeRequest(
      apiKey,
      apiSecret,
      'https://conversations.twilio.com/v1/ParticipantConversations?Address=' +
      phoneNumber
    );

    Http http = new Http();
    HTTPResponse res = http.send(req);

    List<String> sids = new List<String>();
    System.debug(res.getBody());

    for (
      TwilioConversationParticipant conversation : TwilioConversationParticipantResponse.parse(
          res.getBody()
        )
        .conversations
    ) {
      sids.add(conversation.conversation_sid);
    }

    return sids;
  }

  private static HttpRequest makeRequest(
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

    return req;
  }
}
