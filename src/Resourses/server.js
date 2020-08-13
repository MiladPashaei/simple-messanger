class ChatMessage {
  constructor(me, time, type, text) {
    this.id = Math.random().toString();
    this.me = me;
    this.type = type;

    this.text = text;
    this.time = time;
  }
}

class ChatManager {
  constructor(name, avatar, unreadMessageCount, id) {
    this.id = id;

    this.name = name;
    this.unreadMessageCount = unreadMessageCount;
    this.avatar = avatar;
    this.messages = [
      new ChatMessage(
        true,
        new Date(),
        "text",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s "
      ),
      new ChatMessage(
        false,
        new Date(),
        "text",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s "
      ),
      new ChatMessage(
        true,
        new Date(),
        "text",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s "
      ),
      new ChatMessage(
        true,
        new Date(),
        "text",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s "
      ),
      new ChatMessage(
        false,
        new Date(),
        "text",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s "
      ),
      new ChatMessage(
        false,
        new Date(),
        "text",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s "
      ),
    ];
  }
}

export const Server = [
  new ChatManager("Maryam Habibi", "/avatar-f.jpg", 65, 1),
  new ChatManager("Mina Mohammadi", "/avatar-f.jpg", 15, 2),
  new ChatManager("Reza Ahmadi", "/avatar.png", 65, 3),
  new ChatManager("Afshin Karimi", "/avatar.png", 15, 4),
  new ChatManager("Mohammad Mardan Nia", "/avatar.png", 65, 5),
  new ChatManager("Sarah Kiani", "/avatar-f.jpg", 15, 6),
  new ChatManager("Minoo Mohammadian", "/avatar-f.jpg", 65, 7),
  new ChatManager("Fereydoon Sabet", "/avatar.png", 15, 8),
  new ChatManager("Zahra Gholami", "/avatar-f.jpg", 65, 9),
  new ChatManager("Mohammad Bayat", "/avatar.png", 15, 10),
];
