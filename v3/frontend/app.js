document.addEventListener('DOMContentLoaded', () => {
    // const toggleSwitch = document.getElementById('language-toggle');

    const languageRadios = document.querySelectorAll('input[name="language"]');

    const resources = {
        en: {
            headerText: "Job Search App",
            language: "Language",
            searchPlaceholder: "Enter search keyword",
            areaLabel: "Area",
            stationLabel: "Station",
            jobTypeLabel: "Job Type",
            all: "All",
            singleJob: "Single Job",
            longJob: "Long Job",
            searchButton: "Search",

            headerTextDetail: "Job Details",

            companyInfo: "Company Information",
            access: "Access",
            society: "Society",
            personalInfo: "Personal Information",
            contact: "Contact"
        },
        ja: {
            headerText: "バイト検索アプリ",
            language: "言語",
            searchPlaceholder: "検索ワードを入力",
            areaLabel: "エリア",
            stationLabel: "駅名",
            jobTypeLabel: "職種",
            all: "すべて",
            singleJob: "単発バイト",
            longJob: "長期バイト",
            searchButton: "検索",

            headerTextDetail: "求人詳細",

            companyInfo: "企業情報",
            access: "アクセス",
            society: "社会的な取り組み",
            personalInfo: "個人情報保護方針",
            contact: "お問い合わせ",
        }
    };

    // toggleSwitch.addEventListener('change', () => {
    //     if (toggleSwitch.checked) {
    //         setLanguage('ja');
    //     } else {
    //         setLanguage('en');
    //     }
    // });

    languageRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            setLanguage(radio.value);
        });
    });

    function setLanguage(language) {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (element.tagName === 'LABEL') {
                // ラベルのテキストノードを変更
                // const radioInput = element.querySelector('input[type="radio"]');
                element.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = ` ${resources[language][key]}`;
                    }
                });
            } else {
                element.textContent = resources[language][key];
            }
        });

        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            element.placeholder = resources[language][key];
        });
    }

    // ページロード時のデフォルト言語を設定

    let language = new URLSearchParams(window.location.search).get('language');
    if (language == null) {
        setLanguage('en'); // 日本語をデフォルトにする場合
    } else {
        setLanguage(language);
    }
});