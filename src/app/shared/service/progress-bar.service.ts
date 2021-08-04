import * as $ from 'jquery';


export const initProgressbar = (step: number) => {
    $(".progressbar li").removeClass("active");
    for (let i = 0 ; i < step ; i++) {
        $(".progressbar li").eq(i).addClass("active");
    }
}
