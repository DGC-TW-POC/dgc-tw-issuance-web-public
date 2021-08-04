export interface IIdentity {
    IdNo: string;
    NHIId?: string;
}

export interface IPerson extends IIdentity{
    id?: number;
    Name: string;
    Birthday: string;
}