import type { JestEnvironment } from '@jest/environment';
declare function extendAllureBaseEnvironment<TBase extends typeof JestEnvironment>(Base: TBase): TBase;
export default extendAllureBaseEnvironment;
