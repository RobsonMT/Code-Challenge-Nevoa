export interface ICourse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  status: boolean;
  createdAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface INewCourseData {
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  status: boolean;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}
