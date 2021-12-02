import isNode from 'detect-node';

export const IsSSR = (): boolean => isNode && typeof window === 'undefined';
