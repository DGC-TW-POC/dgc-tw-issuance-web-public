export const addInputValidationTextSuccess = (id: string) => {
    $(`#${id}`).removeClass("text-muted");
    $(`#${id}`).addClass("text-success");
    $(`#${id}`).addClass("text-check");
    $(`#${id}`).addClass("font-weight-bold");
}

export const removeInputValidationTextSuccess = (id: string) => {
    $(`#${id}`).addClass("text-muted");
    $(`#${id}`).removeClass("text-success");
    $(`#${id}`).removeClass("text-check");
    $(`#${id}`).removeClass("font-weight-bold");
}