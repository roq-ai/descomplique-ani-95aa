import { CourseInterface } from 'interfaces/course';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  title: string;
  description?: string;
  type: string;
  course_id: string;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  _count?: {};
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  type?: string;
  course_id?: string;
}
