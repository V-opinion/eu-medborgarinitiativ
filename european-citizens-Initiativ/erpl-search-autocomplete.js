// Autocomplete for mep search
// Documentation: https://www.europarldv.ep.parl.union.eu/commonFrontResources/evostrap/5.1.0/documentation/html_fr/#/forms/esAutocomplete
$(function (){
    let inputs = document.querySelectorAll('.erpl_idx_autocomplete');
    if (inputs && inputs.length > 0) {
        const autocompleteSearchUrl = "/" + getPagePlanet() + "/rest/search/autocomplete/" + getPageLanguage();
        inputs.forEach((input) => {
            evostrap.load.esAutocomplete(true).then(EsAutocomplete => {
                new EsAutocomplete(input, {
                    delay: 500,
                    minLength: 3,
                    bodyWidth: 'inputWidth',
                    source: (keyword) => {
                        return new Promise((resolve, reject) => {
                            $.getJSON(autocompleteSearchUrl+"?"+ $(input).closest('form').serialize(),
                                {}, data => {
                                    let res = data.map(entry => {
                                        return {
                                            ...entry, ...{
                                                label: entry.query,
                                                value: entry.query
                                            }
                                        }
                                    })
                                    resolve(res);
                                }).fail(() => reject());
                        })
                    },
                    optionTemplate: (option, i) => {
                        return `<li
                    id="${input.id + "Option" + i}"
                    data-option-index="${i}"
                    class="es_autocomplete-option t-x-block"
                    aria-selected="false"
                    role="option"
                    tabindex="-1" >
                        <a class="d-block erpl_idx_autocomplete"><span class="t-item">${option.htmlQuery}</span></a>
                    </li>`;
                    }
                })
            })

            input.addEventListener('select.es.autocomplete', (event) => {
                event.preventDefault();
                input.closest('form').submit();
            });
        })
    }
})

function getPageLanguage() {
    var languageElt = $('meta[name=language]').first();
    if (!languageElt || !languageElt.length) {
        return 'en';
    }

    return languageElt.attr("content").toLowerCase();
}

function getPagePlanet() {
    return location.pathname.split('/')[1];
}
