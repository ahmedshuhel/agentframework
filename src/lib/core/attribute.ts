import { IInterceptor } from './interceptor';

export interface IAttribute {

  /**
   * Fired before decoration of this attribute
   * @param target
   * @param targetKey
   */
  beforeDecorate?(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean

  /**
   * Get interceptor for this _invocation
   */
  getInterceptor(): IInterceptor

}


export interface IBeforeDecorateAttribute extends IAttribute {

  /**
   * Fired before decoration of this attribute
   * @param target
   * @param targetKey
   */
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean

}


export function CanDecorate(attribute: IAttribute, target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
  return !attribute.beforeDecorate || attribute.beforeDecorate(target, targetKey, descriptor);
}

export function GetInterceptor(attribute: IAttribute): IInterceptor | undefined {
  const interceptor = attribute.getInterceptor();
  // do not intercept when got false, null, ''
  if (!!interceptor && typeof interceptor.intercept === 'function' && interceptor.intercept.length === 2) {
    return interceptor;
  }
  else {
    return undefined;
  }
}
