import { DateTime } from "luxon"

export type Bars = {
    data: [{
        t: DateTime,
        o: Number,
        h: Number,
        l: Number,
        c: Number,
        v: Number
    }]
}