export const domain: string = 'rtkquerydemo.page.link';

export const bundleId: string = 'com.simform.rtkquerydemo';

export const deepLinkPrefixes = ['rtkquerydemo://', `${domain}//`, `https://${domain}`];

export const deepLinkQueryParamsMatch: RegExp = /\?(.+)/;
export const routeReplace: RegExp = /.*?:\/\//g;
export const paramReplace: RegExp = /\/([^\\/]+)\/?$/;

export enum DeepLink {
  // rtkquerydemo://magic_link&lang=en&tenantId=austin-electrical-qqm76
  MagicLink = 'magic_link',
  // rtkquerydemo://forgot_password&lang=en&tenantId=austin-electrical-qqm76
  ForgotPassword = 'forgot_password',
  // rtkquerydemo://?toastMessage=<message content>
  ToastMessage = 'toastMessage'
}

export default DeepLink;
