import { getServerSession } from '@roq/nextjs';
import { NextApiRequest } from 'next';
import { NotificationService } from 'server/services/notification.service';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod, generateFilterByPathUtil } from 'server/utils';
import { prisma } from 'server/db';

interface NotificationConfigInterface {
  roles: string[];
  key: string;
  tenantPath: string[];
  userPath: string[];
}

const notificationMapping: Record<string, NotificationConfigInterface> = {
  'course.create': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'course-created',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
  'course.update': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'course-updated',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
  'course.delete': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'course-deleted',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
  'content.create': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'content-created',
    tenantPath: ['organization', 'course', 'content'],
    userPath: [],
  },
  'content.update': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'content-updated',
    tenantPath: ['organization', 'course', 'content'],
    userPath: [],
  },
  'content.delete': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'content-deleted',
    tenantPath: ['organization', 'course', 'content'],
    userPath: [],
  },
  'activity.create': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'activity-created',
    tenantPath: ['organization', 'course', 'activity'],
    userPath: [],
  },
  'activity.update': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'activity-updated',
    tenantPath: ['organization', 'course', 'activity'],
    userPath: [],
  },
  'activity.delete': {
    roles: ['course-administrator', 'technical-support', 'content-creator'],
    key: 'activity-deleted',
    tenantPath: ['organization', 'course', 'activity'],
    userPath: [],
  },
  'achievement.create': {
    roles: ['course-administrator'],
    key: 'achievement-created',
    tenantPath: ['organization', 'user', 'achievement'],
    userPath: [],
  },
  'achievement.update': {
    roles: ['course-administrator'],
    key: 'achievement-updated',
    tenantPath: ['organization', 'user', 'achievement'],
    userPath: [],
  },
  'achievement.delete': {
    roles: ['course-administrator'],
    key: 'achievement-deleted',
    tenantPath: ['organization', 'user', 'achievement'],
    userPath: [],
  },
};

const ownerRoles: string[] = ['course-administrator'];
const customerRoles: string[] = [];
const tenantRoles: string[] = ['course-administrator', 'technical-support', 'content-creator'];

const allTenantRoles = tenantRoles.concat(ownerRoles);
export async function notificationHandlerMiddleware(req: NextApiRequest, entityId: string) {
  const session = getServerSession(req);
  const { roqUserId } = session;
  // get the entity based on the request url
  let [mainPath] = req.url.split('?');
  mainPath = mainPath.trim().split('/').filter(Boolean)[1];
  const entity = convertRouteToEntityUtil(mainPath);
  // get the operation based on request method
  const operation = convertMethodToOperation(req.method as HttpMethod);
  const notificationConfig = notificationMapping[`${entity}.${operation}`];

  if (!notificationConfig || notificationConfig.roles.length === 0 || !notificationConfig.tenantPath?.length) {
    return;
  }

  const { tenantPath, key, roles, userPath } = notificationConfig;

  const tenant = await prisma.organization.findFirst({
    where: generateFilterByPathUtil(tenantPath, entityId),
  });

  if (!tenant) {
    return;
  }
  const sendToTenant = () => {
    console.log('sending notification to tenant', {
      notificationConfig,
      roqUserId,
      tenant,
    });
    return NotificationService.sendNotificationToRoles(key, roles, roqUserId, tenant.tenant_id);
  };
  const sendToCustomer = async () => {
    if (!userPath.length) {
      return;
    }
    const user = await prisma.user.findFirst({
      where: generateFilterByPathUtil(userPath, entityId),
    });
    console.log('sending notification to user', {
      notificationConfig,
      user,
    });
    await NotificationService.sendNotificationToUser(key, user.roq_user_id);
  };

  if (roles.every((role) => allTenantRoles.includes(role))) {
    // check if only  tenantRoles + ownerRoles
    await sendToTenant();
  } else if (roles.every((role) => customerRoles.includes(role))) {
    // check if only customer role
    await sendToCustomer();
  } else {
    // both company and user receives
    await Promise.all([sendToTenant(), sendToCustomer()]);
  }
}
