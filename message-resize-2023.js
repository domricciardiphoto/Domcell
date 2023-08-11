    function resizer() {
        swidth <= 768 && $(".width100-2").parent("div").parent("div").parent("div").parent("div").children(".tile-body")
            .children(".tile-bottom-container").children(".tile-body-footer").css("margin-top", "20px"), swidth <=
            375 && $(".width100-2").parent("div").parent("div").parent("div").parent("div").children(".tile-body")
            .children(".tile-bottom-container").children(".tile-body-footer").css("margin-top", "20px"), swidth > 768 &&
            $(".width100-2").parent("div").parent("div").parent("div").parent("div").children(".tile-body").children(
                ".tile-bottom-container").children(".tile-body-footer").css("margin-top", "0px")
    }
    document.addEventListener("DOMContentLoaded", function () {
        swidth = $(window).width(), resizer(), $(window).resize(function () {
            resizer(swidth = $(window).width())
        })
    });