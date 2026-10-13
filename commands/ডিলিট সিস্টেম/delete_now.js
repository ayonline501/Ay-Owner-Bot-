/*CMD
  command: delete_now
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ডিলিট সিস্টেম

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var targetMsgId = options.msg_id;

Api.deleteMessage({
  chat_id: chat.chatid,
  message_id: targetMsgId
});
