import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/service/login.service';
import { initProgressbar } from '../shared/service/progress-bar.service';
import { VaccinationDose } from '../shared/models/vaccination-dose';
import { ChooseVaccinationDoseService } from './choose-vaccination-dose.service';
import { VaccineData } from '../shared/models/vaccine-data';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
    selector: 'app-choose-vaccination-dose',
    templateUrl: './choose-vaccination-dose.component.html',
    styleUrls: ['./choose-vaccination-dose.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseVaccinationDoseComponent implements OnInit, AfterViewInit {
    @BlockUI() blockUI: NgBlockUI;
    public searchParams: VaccinationDose.ISearchParams;
    public haveVaccinationDose: boolean;
    public vaccineDataStorage: VaccineData.Storage;
    constructor(
        private loginService: LoginService,
        private chooseVaccinationService: ChooseVaccinationDoseService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { 
        this.haveVaccinationDose=false;
        this.searchParams = {
            IdNo: ""
        };
        this.vaccineDataStorage = new VaccineData.Storage();
        this.vaccineDataStorage.vaccineData = {
            count: 0 ,
            rows: []
        }
    }

    ngOnInit(): void {
        this.blockUI.start("Loading...");
        this.loginService.verifyIsLoing().subscribe(
            (res) => {
                if (res['user']) {
                    this.searchParams.IdNo = res['user'];
                    this.chooseVaccinationService.getVaccineCDCData(this.searchParams).subscribe(
                        (res: VaccineData.ISearchResult) => {
                            if (res.count > 0) {
                                this.haveVaccinationDose = true;
                                this.vaccineDataStorage.vaccineData = res;
                                this.vaccineDataStorage.save();
                                this.cdr.detectChanges();
                                this.blockUI.stop();
                            }
                        },
                        err => {
                            this.blockUI.stop();
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                text: '伺服器發生錯誤'
                            });
                        }
                    );
                } else {
                    this.router.navigate(['/login', {
                        error: 'expire'
                    }]);
                }
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
        initProgressbar(1);

    }

    naviageToVaccineApply(id:number) {
        this.router.navigate(["/vaccine-apply" , { id: id}]);
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.blockUI.resetGlobal();
    }
}
