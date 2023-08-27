import { ActivityInterface } from 'interfaces/activity';
import { ContentInterface } from 'interfaces/content';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CourseInterface {
  id?: string;
  title: string;
  description?: string;
  organization_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  activity?: ActivityInterface[];
  content?: ContentInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    activity?: number;
    content?: number;
  };
}

export interface CourseGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  organization_id?: string;
  user_id?: string;
}
