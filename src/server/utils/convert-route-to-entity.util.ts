const mapping: Record<string, string> = {
  achievements: 'achievement',
  activities: 'activity',
  contents: 'content',
  courses: 'course',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
