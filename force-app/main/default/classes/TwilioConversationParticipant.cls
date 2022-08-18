public class TwilioConversationParticipant {
	public String account_sid;	//ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	public String chat_service_sid;	//ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	public cls_conversation_attributes conversation_attributes;
	public String conversation_created_by;	//created_by
	public String conversation_date_created;	//2015-07-30T20:00:00Z
	public String conversation_date_updated;	//2015-07-30T20:00:00Z
	public String conversation_friendly_name;	//friendly_name
	public String conversation_sid;	//CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	public String conversation_state;	//inactive
	public cls_conversation_timers conversation_timers;
	public String conversation_unique_name;	//unique_name
	public cls_links links;
	public String participant_identity;	//
	public cls_participant_messaging_binding participant_messaging_binding;
	public String participant_sid;	//MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	public String participant_user_sid;	//
	class cls_conversation_attributes {
	}
	class cls_conversation_timers {
		public String date_closed;	//2015-12-16T22:28:38Z
		public String date_inactive;	//2015-12-16T22:19:38Z
	}
	class cls_links {
		public String conversation;	//https://conversations.twilio.com/v1/Conversations/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		public String participant;	//https://conversations.twilio.com/v1/Conversations/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	}
	class cls_participant_messaging_binding {
		public String address;	//+375255555555
		public String level;	//
		public String name;	//
		public String projected_address;	//
		public String proxy_address;	//+12345678910
		public String type;	//sms
	}
	public static TwilioConversationParticipant parse(String json){
		return (TwilioConversationParticipant) System.JSON.deserialize(json, TwilioConversationParticipant.class);
	}
/**
	static testMethod void testParse() {
		String json=		'{'+
		'  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'  "chat_service_sid": "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'  "conversation_attributes": {},'+
		'  "conversation_created_by": "created_by",'+
		'  "conversation_date_created": "2015-07-30T20:00:00Z",'+
		'  "conversation_date_updated": "2015-07-30T20:00:00Z",'+
		'  "conversation_friendly_name": "friendly_name",'+
		'  "conversation_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'  "conversation_state": "inactive",'+
		'  "conversation_timers": {'+
		'    "date_closed": "2015-12-16T22:28:38Z",'+
		'    "date_inactive": "2015-12-16T22:19:38Z"'+
		'  },'+
		'  "conversation_unique_name": "unique_name",'+
		'  "links": {'+
		'    "conversation": "https://conversations.twilio.com/v1/Conversations/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'    "participant": "https://conversations.twilio.com/v1/Conversations/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"'+
		'  },'+
		'  "participant_identity": "",'+
		'  "participant_messaging_binding": {'+
		'    "address": "+375255555555",'+
		'    "level": "",'+
		'    "name": "",'+
		'    "projected_address": "",'+
		'    "proxy_address": "+12345678910",'+
		'    "type": "sms"'+
		'  },'+
		'  "participant_sid": "MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",'+
		'  "participant_user_sid": ""'+
		'}'+
		'';
		TwilioConversationParticipant obj = parse(json);
		System.assert(obj != null);
	}
**/
}