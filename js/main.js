window.addEventListener('DOMContentLoaded', () => {

    const questions = document.querySelectorAll('.questions__question-title'),
        sumInput = document.querySelector('.calc__input--sum'),
        timeInput = document.querySelector('.calc__input--time'),
        payt = document.querySelector('.calc__pt'),
        rangeTimeInput = document.querySelector('.range__input--time'),
        rangeSumInput = document.querySelector('.range__input--sum'),
        dateText = document.querySelector('.calc__input-text-right--date');

    // accordion

    questions.forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('questions__question-title--active');
            question.nextElementSibling.classList.toggle('questions__question-content--active');
        });
    });

    // range + calc

    // маска
    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function getPayment(sum, period, rate) {
        // *
        // * sum - сумма кредита
        // * period - срок в годах
        // * rate - годовая ставка в процентах
        // * payt - поле, куда будет вывобиться платеж
        let i,
            koef;

        // ставка в месяц
        i = (rate / 12) / 100;

        // коэффициент аннуитета
        koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

        // итог
        payt.textContent = (sum * koef).toFixed();
    }

    function range(input, progress, content) {
        $(input).each(function(i, elem) {
            val = $(this).val();
            min = $(this).attr('min');
            max = $(this).attr('max');
            step = $(this).attr('step');
            position = 100 / (max - step) * (val - step);
            $(this).parent().find(progress).width(position + "%");
        });
        $(input).on('input', function() {
            val = $(this).val();
            min = $(this).attr('min');
            max = $(this).attr('max');
            step = $(this).attr('step');
            position = 100 / (max - step) * (val - step);
            $(this).parent().find(progress).width(position + "%");
            content.value = prettify(val);
        });
    }

    function calc() {
        let sum = +sumInput.value.replace(/\D/g, ''),
            period = +timeInput.value.replace(/\D/g, '');

        getPayment(sum, period, 4);
    }

    function checkSymbols(input, event, maxValue) {
        input.addEventListener(event, () => {
            if (maxValue) {
                if (input.value[0] == 0) {
                    input.value = input.value.replace(/./g, '');
                }

                input.value = input.value.replace(/\D/g, '');

                input.value = prettify(input.value);

                if (+input.value.replace(/\D/g, '') > maxValue) {
                    input.value = prettify(maxValue);
                }
            }
            if ((+sumInput.value.replace(/\D/g, '') >= 100000 && +sumInput.value.replace(/\D/g, '') <= 20000000) && (+timeInput.value.replace(/\D/g, '') >= 1 && +timeInput.value.replace(/\D/g, '') <= 10)) {
                calc();
            } else {
                payt.textContent = '0';
            }

            switch (timeInput.value) {
                case '1':
                    dateText.textContent = 'год';
                    break;

                case '2':
                case '3':
                case '4':
                    dateText.textContent = 'года';
                    break;
                default:
                    dateText.textContent = 'лет';
            }
        });
    }

    range('.range__input--sum', '.range__track--sum', sumInput);
    range('.range__input--time', '.range__track--time', timeInput);
    checkSymbols(sumInput, 'input', 20000000);
    checkSymbols(timeInput, 'input', 10);
    checkSymbols(rangeSumInput, 'change');
    checkSymbols(rangeTimeInput, 'change');

});

$(document).ready(function() {
    // slider
    if ($(window).width() < 577) {

        $('.desctop-reviews__block').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            appendDots: '.dots',
            prevArrow: '.prev',
            nextArrow: '.next'
        });
    }
});