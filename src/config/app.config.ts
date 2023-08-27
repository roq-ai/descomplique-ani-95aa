interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Course Administrator'],
  customerRoles: [],
  tenantRoles: ['Course Administrator', 'Technical Support', 'Content Creator'],
  tenantName: 'Organization',
  applicationName: 'Descomplique ANIHU',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
