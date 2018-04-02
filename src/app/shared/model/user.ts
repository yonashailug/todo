export class User {
    private name: string;
    private email: string;
    private isLoggedIn: boolean;
    private photoUrl: string;

    public static fromObject(obj): User {
        const userRef: User = new User();
        return Object.assign(userRef, obj);
    }

    getName(): string { return this.name; }
    setName(value: string) { this.name = value; }
    getEmail(): string { return this.email; }
    setEmail(value: string) { this.email = value; }
    getIsLoggedIn(): boolean { return this.isLoggedIn; }
    setIsLoggedIn(value: boolean) { this.isLoggedIn = value; }
    getPhotoUrl(): string { return this.photoUrl; }
    setPhotoUrl(value: string) { this.photoUrl = value; }
}
