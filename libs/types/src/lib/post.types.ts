export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostFile {
  id: number;
  postId: number;
  fileId: string;
}

export interface PostPresenter extends Post {
  filesIds: string[];
}
