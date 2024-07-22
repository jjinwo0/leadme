// 일단 때려박고 나중에 리팩토링 ㄱㄱ

// VideoDetail
export interface Comment {
  id: number;
  text: string;
  user: string;
}

// VideoDetail
export interface Video {
  id: number;
  src: string;
  title: string;
  comments: Comment[];
  likes: number;
}
