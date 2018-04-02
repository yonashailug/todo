export class MessageInfo {

    private messageBody: string;
    private messageCode: number;
    private isError: boolean;

    getMessageBody(): string { return this.messageBody; }
    setMessageBody(value: string) { this.messageBody = value; }
    getMessageCode(): number { return this.messageCode; }
    setMessageCode(value: number) { this.messageCode = value; }
    getIsError(): boolean { return this.isError; }
    setIsError(value: boolean) { this.isError = value; }

}
