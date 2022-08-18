public class TwilioConversationParticipantResponse {
	public TwilioConversationParticipant[] conversations;
	public cls_meta meta;

	class cls_meta {
		public Integer page;
		public Integer page_size;
		public String first_page_url;
		public String previous_page_url;
		public String url;
		public String next_page_url;
		public String key;
	}
	
	public static TwilioConversationParticipantResponse parse(String json){
		return (TwilioConversationParticipantResponse) System.JSON.deserialize(json, TwilioConversationParticipantResponse.class);
	}
/**
	static testMethod void testParse() {
		String json=		'{'+
		'  "conversations": ['+
		'    {'+
		'      "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'      "chat_service_sid": "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'      "conversation_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'      "participant_sid": "MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'      "conversation_friendly_name": "friendly_name",'+
		'      "conversation_state": "inactive",'+
		'      "conversation_timers": {'+
		'        "date_inactive": "2015-12-16T22:19:38Z",'+
		'        "date_closed": "2015-12-16T22:28:38Z"'+
		'      },'+
		'      "conversation_attributes": {},'+
		'      "conversation_date_created": "2015-07-30T20:00:00Z",'+
		'      "conversation_date_updated": "2015-07-30T20:00:00Z",'+
		'      "conversation_created_by": "created_by",'+
		'      "conversation_unique_name": "unique_name",'+
		'      "participant_user_sid": "",'+
		'      "participant_identity": "",'+
		'      "participant_messaging_binding": {'+
		'        "address": "+375255555555",'+
		'        "proxy_address": "+12345678910",'+
		'        "type": "sms",'+
		'        "level": "",'+
		'        "name": "",'+
		'        "projected_address": ""'+
		'      },'+
		'      "links": {'+
		'        "participant": "https://conversations.twilio.com/v1/Conversations/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'        "conversation": "https://conversations.twilio.com/v1/Conversations/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"'+
		'      }'+
		'    }'+
		'  ],'+
		'  "meta": {'+
		'    "page": 0,'+
		'    "page_size": 50,'+
		'    "first_page_url": "https://conversations.twilio.com/v1/ParticipantConversations?Address=%2B375255555555&PageSize=50&Page=0",'+
		'    "previous_page_url": "https://conversations.twilio.com/v1/ParticipantConversations?Address=%2B375255555555&PageSize=50&Page=0",'+
		'    "url": "https://conversations.twilio.com/v1/ParticipantConversations?Address=%2B375255555555&PageSize=50&Page=0",'+
		'    "next_page_url": "https://conversations.twilio.com/v1/ParticipantConversations?Address=%2B375255555555&PageSize=50&Page=1",'+
		'    "key": "conversations"'+
		'  }'+
		'}'+
		'';
		TwilioConversationParticipantResponse obj = parse(json);
		System.assert(obj != null);
	}
**/
}