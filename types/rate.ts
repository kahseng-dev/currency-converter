export type Rate = {
    from: string
    into: string
    rate: number
    [key: string]: string | number;
}