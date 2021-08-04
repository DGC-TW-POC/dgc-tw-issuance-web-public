import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { LoginService } from '../shared/service/login.service';
import * as joi from '@hapi/joi';
import { ILoginSchema } from './login.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { initProgressbar } from '../shared/service/progress-bar.service';
import { addInputValidationTextSuccess, removeInputValidationTextSuccess } from '../shared/common';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    //#region variables
    @BlockUI() blockUI: NgBlockUI;
    public loginSchema: ILoginSchema
    private loginFormJoiSchema;
    private loginFormCustomError = {
        "idn": `"身份證或居留號"不得為空`,
        "nhCard": `"健保卡卡號"格式錯誤`
    };
    //#endregion
    constructor(
        private loginService: LoginService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.blockUI.start("Loading...");
    }
    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('error')) {
            Swal.fire({
                icon: 'warning',
                title: '請重新登入'
            })
        }
        this.loginSchema = {
            idn: "",
            nhCard: ""
        }
        this.loginFormJoiSchema = {
            idn: joi.string().min(1).required(),
            nhCard: joi.string().min(12).max(12).required()
        }
    }
    ngAfterViewInit(): void {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        let checkInput = setInterval(() => {
            console.log($('.input-custom').length);
            if ($('.input-custom').length > 0) {
                clearInterval(checkInput);
                $('.input-custom').each(function () {
                    $(this).on('blur', function () {
                        if (($(this).val() as string).trim() != "") {
                            $(this).addClass('has-val');
                        } else {
                            $(this).removeClass('has-val');
                        }
                    })
                })
            }
        }, 100);

        initProgressbar(0);
        setTimeout(() => {
            this.blockUI.stop();
        }, 1000);

    }

    onIdnInput() {
        if (this.loginSchema.idn.length >= 10) {
            addInputValidationTextSuccess("text-idn");
        } else {
            removeInputValidationTextSuccess("text-idn");
        }
    }

    onNhCardInput() {
        if (this.loginSchema.nhCard.length == 12) {
            addInputValidationTextSuccess("text-nhCard");
        } else {
            removeInputValidationTextSuccess("text-nhCard");
        }
    }

    validateLogin() {
        let validation = joi.object(this.loginFormJoiSchema).validate(this.loginSchema);
        if (validation.error) {
            let errorDetial = validation.error.details.pop();
            let errorPath = errorDetial.path.pop();
            console.error(validation.error);
            Swal.fire({
                icon: 'warning',
                titleText: "輸入錯誤",
                text: this.loginFormCustomError[errorPath],
            })
        } else {
            this.blockUI.start("登入中...");
            this.loginService.login(this.loginSchema).subscribe(
                res => {
                    this.blockUI.stop();
                    this.router.navigate(['/choose-vaccination-dose']);
                },
                err => {
                    this.blockUI.stop();
                    console.error(err);
                    if (err.status == 401) {
                        Swal.fire({
                            icon: 'warning',
                            text: '查無此身分'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            text: '伺服器發生錯誤'
                        });
                    }
                }
            )

        }
    }
    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.blockUI.resetGlobal();
    }
}
