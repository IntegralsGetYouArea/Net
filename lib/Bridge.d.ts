
type Recipient = Player[] | Player | "NET_SERVER"

type Packet = {
    data: Array<any>;
    identifier: string;
    recipient: "NET_SERVER" | Player | Array<Player>;
}

type Payload = Array<any>

type OutgoingQueue = Array<Packet>

// IMPORTANT: Remember, on the server side T must be set to `any` as we cannot be 100% certain
// if data coming in from the client is actually the data it says it is
type IncomingQueue = Array<{
    identifier: string,
    sender: Player | "NET_SERVER",
    data: Array<any>,
}>

export interface Bridge {}

export class Bridge {
    public remote: RemoteEvent;

    private _configuration: Map<string, any>;
    private _outgoingQueue: OutgoingQueue;
    private _incomingQueue: IncomingQueue;

    private _addPacketToPayload(this: Bridge, payload: Map<string, any>, packet: Packet): undefined;
	private _updateClientPayload: (
		this: Bridge,
		clientPackages: Map<Player, Map<string, any>>,
		player: Player,
		packet: Packet,
	) => undefined;
	private _processOutgoingQueue (self: Bridge): undefined;
	private _processIncoming (self: Bridge, sender: Player | "NET_SERVER", payload: Payload): undefined;

	public step (this: Bridge): undefined;
	public snapshot (this: Bridge): IncomingQueue;
	public send (this: Bridge, recipient: Recipient, identifier: string, ...data: LuaTuple<[any]>): SendRequest | undefined;

    public constructor(configuration?: Map<string, any>);
}

export interface SendRequest {}

export class SendRequest {
    private _outgoingQueue: OutgoingQueue;
	private _bridge: Bridge;
	private _position: number;

	public to (this: SendRequest, recipient: Recipient): undefined;
}