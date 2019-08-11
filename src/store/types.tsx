export interface IPost {
  title: string,
  datePosted: string,
  categories: string[],
  content: string
}

export interface IPostsState {
  posts: (IPost | null)[]
}

interface IDefaultAction {
  type: string
}

interface IGetAllPostAction {
  type: string,
  payload: IPost[]
}

interface IGetPostByIDAction {
  type: string,
  post: IPost,
  id: number
}

export type IPostActionTypes = IGetAllPostAction | IGetPostByIDAction | IDefaultAction;
