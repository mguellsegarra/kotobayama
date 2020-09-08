import { MockObj } from "jest-mock-console";
export declare function withConsole(fn: Function): void;
export declare function withConsole(settings: MockObj, fn: Function): void;
export declare function withConsole(props: Array<ConsoleProps>, fn: Function): void;
