import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccineData } from '../shared/models/vaccine-data';
import { LoginService } from '../shared/service/login.service';
import { initProgressbar } from '../shared/service/progress-bar.service';
import { VaccineApplyService } from './vaccine-apply.service';
import { IPostCDCVaccine, IPostData } from './vaccine-apply.model';
import romanize from 'romanize-names';
import Swal from 'sweetalert2';
import * as joi from '@hapi/joi';
import { addInputValidationTextSuccess, removeInputValidationTextSuccess } from '../shared/common';
import { VaccinationEntry } from '../shared/models/dgc-combined-schema';
import { vaccineMap } from '../shared/models/vaccine';
import { normalizeName } from 'normalize-text';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
    selector: 'app-vaccine-apply',
    templateUrl: './vaccine-apply.component.html',
    styleUrls: ['./vaccine-apply.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VaccineApplyComponent implements OnInit, AfterViewInit {
    @BlockUI() blockUI: NgBlockUI;
    public vaccineDataStorage: VaccineData.Storage;
    public vaccineData: VaccineData.IVaccineCDCData;
    public postCDCVaccine: IPostCDCVaccine;
    private postCDCVaccineSchema;
    private postData: IPostData;
    private chekcedRomanize:string;
    public qrcode:string;
    public nowPage:string = "vaccineApply";
    constructor(
        private loginService: LoginService,
        private vaccineApplyService: VaccineApplyService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {
        this.vaccineDataStorage = new VaccineData.Storage();
        this.vaccineDataStorage.vaccineData = this.vaccineDataStorage.get();
        this.vaccineData = {
            AgencyCode: "",
            IdNo: "",
            VaccID: "",
            VaccDoses: 1,
            InocuDate: "",
            person: {
                Name: "",
                Birthday: "",
                IdNo: ""
            },
            dgci_hash: "",
            qrcode: {
                type: "Buffer",
                data: ""
            }
        };
        this.postCDCVaccine = {
            AgencyCode: "",
            IdNo: "",
            VaccID: "",
            VaccDoses: 1,
            InocuDate: "",
            person: {
                Name: "",
                Birthday: "",
                IdNo: ""
            },
            dgci_hash: "",
            Name: "", 
            Birthday: "", 
            LastName: "", 
            FirstName: "",
            email: ""
        }
        this.postCDCVaccineSchema = {
            email: joi.string().email({
                tlds : {
                    allow: false
                }
            }).required(),
            LastName: joi.string().regex(/^[A-Z<]*$/).required(),
            FirstName : joi.string().regex(/^[A-Z<]*$/).required()
        }
        this.postData = {
            cdcVaccine: {} ,
            eudgc: {}
        }
    }

    ngOnInit(): void {
        this.blockUI.start("Loading...");
        this.loginService.verifyIsLoing().subscribe(
            res => {
                let vaccinationDose = Number(this.route.snapshot.paramMap.get('id'));
                this.vaccineData = this.vaccineDataStorage.getRowByVaccDoses(vaccinationDose);
                this.cdr.detectChanges();
                this.blockUI.stop();
            },
            err => {
                this.blockUI.stop();
                this.router.navigate(['/login', {
                    error: 'expire'
                }]);
                console.error('error', err);
            }
        );
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        initProgressbar(2);
    }

    onBtnRomanizeNameClick(translateSystem:string="HANYU") : void {
        try {
            let romanizeName:string = romanize(this.vaccineData.person.Name,translateSystem);
            let [firstName, lastName] = romanizeName.split(" ");
            firstName = firstName.replace(/-/gm , "<").toUpperCase();
            lastName = lastName.replace(/-/gm , "<").toUpperCase();
            this.postCDCVaccine.FirstName = firstName;
            this.postCDCVaccine.LastName = lastName;
            this.chekcedRomanize = translateSystem;
            this.cdr.detectChanges();
            this.checkInput("FirstName" , "text-firstName");
            this.checkInput("LastName","text-lastName");
        } catch(e) {
            console.error(e);
            Swal.fire({
                text: "抱歉，此名字目前自動翻譯不支援。" , 
                icon: "error"
            });
        }
        
    }

    checkedRomanizeCss(romanizeSystem: string) {
        if (this.chekcedRomanize == romanizeSystem) {
            return {
                'btn-secondary' : true ,
                'btn-outline-secondary' : false
            };
        }
        return {
            'btn-secondary' : false,
            'btn-outline-secondary' : true
        };
    }

    checkInput(field: string,id: string) {
        let validation: joi.ValidationResult = this.postCDCVaccineSchema[field].validate(this.postCDCVaccine[field]);
        if (validation.error) {
            removeInputValidationTextSuccess(id);
        } else {
            addInputValidationTextSuccess(id);
        }
    }
    enNameFilter(event,field:string) : void {
        if (!/^[A-Z< ]+$/gm.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^A-Z< ]/g, "");
            return;
        }
        let oldSelectionStart = event.target.selectionStart;
        let oldSelectionEnd = event.target.selectionEnd;
        event.target.value = event.target.value.replace(/[ ]/, "<").toUpperCase();
        this.postCDCVaccine[field] = event.target.value;
        event.target.setSelectionRange(oldSelectionStart , oldSelectionEnd);
    }

    public doGennerateQRCode() {
        for(let field in this.postCDCVaccineSchema) {
            let validation: joi.ValidationResult = this.postCDCVaccineSchema
            [field].validate(this.postCDCVaccine[field]);
            if (validation.error) {
                Swal.fire({
                    "icon" : "warning",
                    "text" : "您還有資料沒有填寫完畢喔!!"
                });
                return;
            }
        }
        this.blockUI.start("產生QR Code中...");
        let vaccine = vaccineMap.find(v=> v.id == this.vaccineData.VaccID);
        const vacc: VaccinationEntry = {
            tg: "840539006",
            vp: vaccine.type.id,
            mp: vaccine.id,
            ma: vaccine.org.id,
            dn: Number(this.vaccineData.VaccDoses),
            sd: 2,
            dt: this.vaccineData.InocuDate,
            co: "TW",
            is: this.vaccineData.AgencyCode,
            ci: ''
        };
        const eudgc = {
            ver: '1.3.0',
            nam: {
                fn: undefined,
                fnt: this.postCDCVaccine.LastName,
                gn: this.vaccineData.person.Name,
                gnt: this.postCDCVaccine.FirstName
            },
            dob: this.postCDCVaccine.Birthday,
            v: [vacc]
        }
        this.postCDCVaccine = Object.assign({} , this.postCDCVaccine , this.vaccineData);
        this.postData.cdcVaccine = { ... this.postCDCVaccine};
        this.postData.eudgc = eudgc;
        this.vaccineApplyService.postVaccineIssueQRCode(this.postData).subscribe(
            res=> {
                this.qrcode= res['qrCode'];
                this.nowPage = "showQRCode";
                this.cdr.detectChanges();
                this.blockUI.stop();
            },
            err=> {
                this.blockUI.stop();
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    text: '伺服器發生錯誤'
                })
            }
        )
    }
}
