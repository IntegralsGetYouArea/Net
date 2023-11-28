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

export interface QueryResult extends IterableFunction<LuaTuple<[number?, (Player | string)?, string?, ...any[]]>> {}

export class QueryResult {
    private _snapshot: Array<{
        identifier: string;
        sender: Player | "NET_SERVER";
        data: any;
    }>;
    private _identifiers: Array<string>;
    private _senders: Array<Player | "NET_SERVER">;

    public from (this: QueryResult, players: LuaTuple<[Player | "NET_SERVER"]>): QueryResult;
    public of (this: QueryResult, identifiers: LuaTuple<[string]>): QueryResult;

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

export interface Net extends IterableFunction<QueryResult> {}

export class Net {
    public Server: "NET_SERVER";

    private _bridge: Bridge;
    private _configuration: Configuration;

    public query (this: Net, strings: LuaTuple<string[]>): QueryResult;
    public send (this: Net, identifier: string, data: LuaTuple<any[]>): SendRequest;
    public start (this: Net, loop: any): undefined;

    public identifier (this: Net, index: string): Identifier;
    constructor(configuration?: Configuration);
}