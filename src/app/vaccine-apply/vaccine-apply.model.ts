import { EUDCC1 } from "../shared/models/dgc-combined-schema";

export interface IPostCDCVaccine {
    NHIId?: string;
    AgencyCode: string;
    IdNo: string;
    Name: string;
    Birthday: string;
    InocuDate: string;
    VaccID: string;
    VaccDoses: number;
    qrcode?: string;
    dgci_hash?: string;
    LastName: string;
    FirstName: string;
    [key:string]: any;
}

export interface IPostData {
    cdcVaccine: IPostCDCVaccine | {};
    eudgc: EUDCC1 | {};
}