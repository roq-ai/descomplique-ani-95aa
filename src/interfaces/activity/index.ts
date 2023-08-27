import { CourseInterface } from 'interfaces/course';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ActivityInterface {
  id?: string;
  title: string;
  description?: string;
  course_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ActivityGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  course_id?: string;
  user_id?: string;
}
