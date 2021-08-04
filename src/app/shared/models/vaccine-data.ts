import { EncryptDataService } from "../service/encrypt-data.service";
import { IPerson } from "./person";

export namespace VaccineData {
    interface IQrcode {
        readonly type: string;
        data: any;
    }
    export interface IVaccineCDCData {
        id?: number;
        AgencyCode: string;
        IdNo: string;
        InocuDate: string;
        VaccID: string;
        VaccDoses: number;
        dgci_hash: string;
        qrcode: IQrcode;
        person: IPerson;
    }
    export interface ISearchResult {
        count: number,
        rows: Array<IVaccineCDCData>;
    }
    export class Storage {
        encryptoService: EncryptDataService;
        vaccineData: ISearchResult;
        constructor() {
            this.encryptoService = new EncryptDataService("1H%_uLfD7iy&*?:JGYEMvF", "U$|#'/mEE|fXwWth,,Nh6@");
        }

        save(): void {
            localStorage.setItem("vaccineData",this.encryptoService.encryptData(this.vaccineData));
        }

        get() :any{
            return JSON.parse(this.encryptoService.decryptData(localStorage.getItem("vaccineData")));
        }

        getRowByVaccDoses(vaccDose:number) : IVaccineCDCData {
            return this.vaccineData.rows.find(v=> v.VaccDoses == vaccDose);
        }

        remove() {
            localStorage.removeItem("vaccineData");        
        }
    }
}