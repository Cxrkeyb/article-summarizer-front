interface User {
  userName: string;
  email: string;
  id: string;
}

interface Message {
  isUser: boolean;
  message: string;
  messageDate: string;
}

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type { Message, User };

export { HttpMethods };
