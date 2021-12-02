import { Suspense } from "react";
import { ISuspenseCompatible } from "./SuspenseCompatible";

const SuspenseCompatible: React.FunctionComponent<ISuspenseCompatible.Props> = (props): any => {
    if (process.browser) return <Suspense fallback={props.fallback}>{props.children}</Suspense>;
    return props.children;
}

export default SuspenseCompatible;
