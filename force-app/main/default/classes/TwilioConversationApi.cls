public class TwilioConversationApi {
    @AuraEnabled
    public static TwilioConversationParticipantResponse getParticipantConversations(String apiKey, String apiSecret, String phoneNumber) {
        HttpRequest req = TwilioConversationApi.makeRequest(apiKey, apiSecret, 'https://conversations.twilio.com/v1/ParticipantConversations?Address=' + phoneNumber);
        
        Http http = new Http();
        HTTPResponse res = http.send(req);
        
        return TwilioConversationParticipantResponse.parse(res.getBody());
    }
    
    private static HttpRequest makeRequest(String apiKey, String apiSecret, String url){
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        
        Blob headerValue = Blob.valueOf(apiKey + ':' + apiSecret);
        String authorizationHeader = 'Basic ' + EncodingUtil.base64Encode(headerValue);
        req.setHeader('Authorization', authorizationHeader);
        
        return req;
    }
}