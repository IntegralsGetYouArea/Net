import { Bridge, SendRequest } from "./Bridge";
import { Identifier } from "./Identifier";


export interface Configuration {
    Channel?: "Reliable" | "Unreliable",
	DebugMode?: boolean,
	DebugKey?: Enum.KeyCode,
	Event?: string,
	Middleware?: ((input: any) => any),
	Ratelimit?: number,
}

export interface QueryResult<T> extends IterableFunction<LuaTuple<[number?, (Player | string)?, string?, ...any[]]>> {}

export class QueryResult<T> {
    private _snapshot: Array<{
        identifier: string;
        sender: Player | "NET_SERVER";
        data: any;
    }>;
    private _identifiers: Array<string>;
    private _senders: Array<Player | "NET_SERVER">;

    public from (this: QueryResult<T>, ...players: LuaTuple<[Player | "NET_SERVER"]>): QueryResult<T>;
    public of (this: QueryResult<T>, ...identifiers: LuaTuple<[string]>): QueryResult<T>;

    private constructor(
        snapshot: Array<{
            identifier: string;
            sender: Player | "NET_SERVER";
            data: any;
        }>,
        identifiers?: Array<string | undefined>,
        senders?: Array<Array<Player> | Player | "NET_SERVER">,
    )
}

export interface Net<T> extends IterableFunction<QueryResult<T>> {}

export class Net<T extends "NET_SERVER" | undefined> {
    public Server: "NET_SERVER";

    private _bridge: Bridge<T>;
    private _configuration: Configuration;

    public query (this: Net<T>, ...strings: LuaTuple<[string]>): QueryResult<T>;
    public send<U extends any[]> (this: Net<T>, identifier: Identifier<U>, ...data: LuaTuple<[T]>): SendRequest<U>;
    public start (this: Net<T>, loop: any): undefined;

    public identifier<U> (this: Net<T>, index: string): Identifier<U>;
    constructor(configuration: Configuration);
}