class Singleton {
    private readonly singleTonName: string;
    private static instance: String; // the word static is where you need to focus
    

    public setInstance(val : String): void {
        Singleton.instance = val;
    }

    public getInstance(): void {
        console.log(Singleton.instance);
    }
}

const singleton1 = new Singleton();
const singleton2 = new Singleton();


singleton1.setInstance('A')
singleton2.getInstance();

singleton2.setInstance('B')
singleton1.getInstance();