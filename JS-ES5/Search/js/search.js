(function(d){
    var accordionSearch = function() {
        var functions = {
            init: function(){
                accordionSearch.appendStuff();
                accordionSearch.events();
            },
            accordionSearch() {
                var searchTearm = d.getElementById('accordion-search-input').value.toLowerCase().trim(),
                articles = d.querySelectorAll('.post .accordion h2'),
                parentElem, titleText;
                articles.forEach(a => {
                    parentElem = a.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    titleText = a.textContent.toLowerCase();
                    if( ~titleText.indexOf( searchTearm )){
                        parentElem.classList.remove('hide-accordion-item');
                    } else {
                        parentElem.classList.add('hide-accordion-item');
                    }
                });
                var sections = d.querySelectorAll('section.collapsable .blogroll-inner');
                sections.forEach(s => {
                    var children = s.querySelectorAll('.post'),
                    sectionElement = s.parentElement.querySelector('header.header-band'),
                    sectionTitle = sectionElement.textContent.toLowerCase();
                    counter = 0;
                    if(~sectionTitle.indexOf( searchTearm )) {
                        counter = 1;
                        children.forEach(c => {
                            c.classList.remove('hide-accordion-item');
                        });
                    } else { 							
                        children.forEach(c => {
                            if(c.classList.contains('hide-accordion-item')) {} else { counter += 1; }
                        });
                    }
                    if ( counter === 0 ) {
                        s.parentElement.classList.add('hide-accordion-item');
                    } else {
                        s.parentElement.classList.remove('hide-accordion-item');
                    }
                });
                var total = 0;
                sections.forEach(l => {
                    if(l.parentElement.classList.contains('hide-accordion-item')) {} else { total += 1; }
                });
                if ( total === 0 ) {
                    d.getElementById('no-results-wrap').innerHTML = '<h2 id="no-results-title">No Results Found</h2>';
                } else {
                    d.getElementById('no-results-wrap').innerHTML = '';
                }
            },
            events: function(){
                setTimeout(function(){
                    d.querySelector("#accordion-search-input").addEventListener("keyup", function(event) {
                        if( d.querySelector("#accordion-search-input").value !== "") {
                            d.querySelector('.clear-acc-search-form').innerHTML = 'Clear Search';
                        } else {
                            d.querySelector('.clear-acc-search-form').innerHTML = '';
                        }
                        if(event.key !== "Enter") {
                            return;
                        } else {
                            accordionSearch.accordionSearch();
                        }
                        event.preventDefault();
                    });
                    d.getElementById('accordion-search-submit').addEventListener("click", function() {
                        accordionSearch.accordionSearch();
                    });
                    d.querySelector('.clear-acc-search-form').addEventListener("click", function() {
                        d.querySelector("#accordion-search-input").value = "";
                        accordionSearch.accordionSearch();
                        d.querySelector('.clear-acc-search-form').innerHTML = '';
                    });
                }, 1000);
            },
            appendStuff: function() {
                var hideAccordionStyles = '.hide-accordion-item { display: none;} .search-wrapper .search-bar {margin: 15px 10px 30px 10px;} #no-results-title { padding: 24px 60px; color: #cc0000; } .clear-acc-search-form { color: #aaa; font-size: 14px; cursor: pointer; margin-top: 10px;} input[type=\"search\"] { -webkit-appearance: searchfield; -moz-box-sizing: none; -webkit-box-sizing: none; box-sizing: none; }',
                accordionStyles = d.createElement('style');
                accordionStyles.setAttribute('type', 'text/css');
                accordionStyles.innerHTML = hideAccordionStyles;
                d.getElementsByTagName('head')[0].appendChild(accordionStyles);

                var accordionSearchForm = "<div class=\"search-wrapper\"><div class=\"search-bar rowline\"><input type=\"search\" value=\"\" id=\"accordion-search-input\"><button id=\"accordion-search-submit\"><span class=\"icon-base icon-search\" style=\"display:inherit;\"></span>Search</button><div class=\"clear-acc-search-form\"></div></div></div>",
                accordionSearchWrap = d.createElement('div');
                accordionSearchWrap.id = 'accordion-top-wrap';
                accordionSearchWrap.innerHTML += accordionSearchForm;
                d.querySelector('section.title').append(accordionSearchWrap);

                var noResults = d.createElement('div');
                noResults.id = 'no-results-wrap';
                d.querySelector('.content').append(noResults); //.main-content  .content
            }
        }
        return functions;
    }
    var accordionSearch = new accordionSearch();
    accordionSearch.init();
})(document);