export type wsBars = wsBarsAsk | wsBarsBid | wsBarsLast;

export type wsBarsAsk = {
    type: string,
    instrumentId: string,
    provider: string,
    ask: {
        timestamp: string,
        price: number,
        volume: number
    }
}

export type wsBarsBid = {
    type: string,
    instrumentId: string,
    provider: string,
    bid: {
        timestamp: string,
        price: number,
        volume: number
    }
}

export type wsBarsLast = {
    type: string,
    instrumentId: string,
    provider: string,
    last: {
        timestamp: string,
        price: number,
        volume: number,
        change: number,
        changePct: number
    }
}