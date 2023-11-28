
type Recipient = Player[] | Player | "NET_SERVER"

type Packet<T> = {
    identifier: string,
    recipient: Recipient,
    data: Array<T>,
}

type OutgoingQueue<T> = Packet<T>[]

// IMPORTANT: Remember, on the server side T must be set to `any` as we cannot be 100% certain
// if data coming in from the client is actually the data it says it is
type IncomingQueue<T> = Array<{
    identifier: string,
    sender: Player | "NET_SERVER",
    data: Array<T>,
}>

export interface Bridge<T> {}

export class Bridge<T> {
    public remote: RemoteEvent;

    private _configuration: Map<string, any>;
    private _outgoingQueue: OutgoingQueue<T>;
    private _incomingQueue: IncomingQueue<T>;
}

export class SendRequest<T extends any[]> {
    
}