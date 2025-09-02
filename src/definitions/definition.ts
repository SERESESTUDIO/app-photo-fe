export interface IEvent {
    id:string,
    name:string,
    adminId:string,
    accessCode:string,
    createdAt:string,
    updatedAt:string
}
export const emptyEvent:IEvent = {
    id:"",
    name: "",
    adminId: "",
    accessCode: "",
    createdAt: "",
    updatedAt: ""
}
export interface IUser {
    id:string,
    name:string,
    email:string,
    DNI?:string,
    department?:string,
    userType:number,
    eventId?:string,
    createdAt:string,
    updatedAt:string
}
export const emptyUser:IUser = {
    id: "",
    name: "",
    email: "",
    DNI: "",
    department: "",
    userType: 0,
    eventId: "",
    createdAt: "",
    updatedAt: ""
}
export interface IProcess {
    id:"",
    name:"",
    timer:0,
    createdAt:"",
    updatedAt:"",
    eventId:""
}
export const emptyProcess:IProcess = {
    id: "",
    name: "",
    timer: 0,
    createdAt: "",
    updatedAt: "",
    eventId: ""
}