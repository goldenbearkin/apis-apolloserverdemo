import * as CanCan from 'cancan';

export const cancanFactory = (): CanCan => {
    const cancan = new CanCan({
        instanceOf: <T, U>(instance: T, model: U): boolean => {

            if (model instanceof Function) {
                return instance instanceof model;
            }

            return false;
        }
    });

    return cancan;
};
