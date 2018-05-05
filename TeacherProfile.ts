import {IProfile} from "./IProfile";
class Teacher implements IProfile{
    public id:number;
    public name:string;
    public age:number;
    public email:string;
    public reviews:string[];
    public aboutMe:string;
    public location:string;
    public instruments:string[];
    public wantsToTeach:string[];
    public hourlyRate:number;
    public CalendarID:string;

    constructor(id:number, name:string, age:number,email:string){
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.reviews = new Array<string>();
        this.aboutMe = '';
        this.location = '';
        this.instruments= new Array<string>();
        this.wantsToTeach= new Array<string>();
        this.hourlyRate = 0;
        this.CalendarID = '';
    }
    addReview(review:string){
        this.reviews.push(review);
    }
    addInstrument(instrument:string){
        this.instruments.push(instrument);
    }
    addTeachableInstrument(instrument:string){
        this.wantsToTeach.push(instrument);
    }
    setRate(pay:number){
        this.hourlyRate = pay;
    }
    setCalendar(id:string){
        this.CalendarID = id;
    }

   
}

export {Teacher};