export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export interface LogoutInfo {
  message: string;
}

export interface TokenInfo {
  id: number;
  token: string;
}

export interface SignUpInfo {
  username: string;
  message: string;
}

export interface UploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  api_key: string;
}

export interface fetchPostsPaginationInterface {
  data: PostInterface[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AuthorInterface {
  id: number | null;
  email: string;
  avatar: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentInterface {
  id: number;
  postId: number;
  content: string;
  createdAt: string;
  author: AuthorInterface;
}

export interface PostInterface {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: AuthorInterface;
}

export interface UserInterface {
  id: number;
  email: string;
  avatar: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  comments: CommentInterface[];
  posts: PostInterface[];
  totalPages: number;
}
