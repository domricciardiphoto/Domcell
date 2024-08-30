    today_dr.setHours(0, 0, 0, 0);
    enddate_dr.setHours(0, 0, 0, 0);
    startdate_dr.setHours(0, 0, 0, 0);

    if(isanID_dr === 'no') {
        beforelement_comp_dr = '.' + beforelement_dr;
    } else {
        beforelement_comp_dr = '#' + beforelement_dr;
    }

    if (today_dr <= enddate_dr && today_dr >= startdate_dr) {
        var beforelement_comp_dr = document.querySelector(beforelement_comp_dr);
        var styleElement = document.createElement('style');
        styleElement.innerHTML = `
            .promo100 {
                width: 98.7%;
                float: left;
                min-height: 50px;
                margin-left: 1.3%;
                margin-top: 15px;
            }
            .promo100 img {
                width: 100%;
            }
            .desktop {
                display: block;
                margin: 0px;
            }
            .mobile {
                display: none;
                margin: 0px;
            }
            @media (max-width: 767px) {
                .promo100 {
                    width: 98%;
                    margin-left: 1%;
                }
                .desktop {
                    display: none;
                }
                .mobile {
                    display: block;
                }
            }
        `;
        var divElement = document.createElement('div');
        divElement.innerHTML = `
            <div id="midparent" class="promo100">
                <div class="promo100 desktop">
                    <img src="${desktopimaged}" alt="${alttagd}" />
                </div>
                <div class="promo100 mobile">
                    <img src="${mobileimaged}" alt="${alttagd}" />
                </div>
            </div>
        `;
        document.head.appendChild(styleElement);
        beforelement_comp_dr.parentNode.insertBefore(divElement, beforelement_comp_dr);

        document.addEventListener('DOMContentLoaded', function() {
            var midParent = document.getElementById('midparent');
            var parent = midParent.parentElement;
            if (parent) {
                parent.style.width = '100%';
            }
        });
    }