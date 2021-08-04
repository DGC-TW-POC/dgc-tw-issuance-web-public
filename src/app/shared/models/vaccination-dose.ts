import { IPerson } from "./person";
import { EncryptDataService } from "../service/encrypt-data.service";

export namespace VaccinationDose {
    export interface ISearchParams {
        IdNo: string;
        NHIId?: string;
    }

}