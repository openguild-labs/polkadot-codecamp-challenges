export type Message = {
    id: number
    type: "user" | "assistant"
    content: string
    timestamp: string
}