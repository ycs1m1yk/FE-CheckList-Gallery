export interface IAllPostProps {
  _id: string;
  title: string;
  description: string;
  categories: ICategoryListProps[];
  code: ICodeProps[];
  author: IAuthorProps;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IAuthorProps {
  _id: string;
  id: string;
  displayName: string;
  username: string;
  profileUrl: string;
  avatar: string;
  blog: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ICategoryListProps {
  category: ICategoryProps;
  _id: string;
}

export interface ICategoryProps {
  _id: string;
  name: string;
  lowerName: string;
  post: number;
  __v: number;
}

export interface ICodeProps {
  fileName: string;
  fileUrl: string;
  _id: string;
}
