import { ReactNode } from 'react';

declare namespace ISuspenseCompatible {
    export interface Props {
        fallback: NonNullable<ReactNode> | null;
    }
}

export { ISuspenseCompatible };
