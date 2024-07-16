

document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.querySelectorAll('input[name="language"]');

    const resources = {
        en: {
            headerText: "Job Search App",
            language: "Language",
            searchPlaceholder: "Enter search keyword",
            areaLabel: "Area",
            cityLabel: "City",
            lineLabel: "Line",
            stationLabel: "Station",
            jobTypeLabel: "Job Type",

            jobDateLabel: "Job Date",
            all: "All",
            singleJob: "Single Job",
            longJob: "Long Job",

            yourLevel: "Your Level",

            searchButton: "Search",

            wage: "Wage",

            headerTextDetail: "Job Details",

            companyInfo: "Company Information",
            access: "Access",
            society: "Society",
            personalInfo: "Personal Information",
            contact: "Contact",

            apply: "Apply Now",

            headerTextMypage: "Mypage",


            updateName: "Name",
            updateGender: "Gender",
            male: "Male",
            female: "Female",
            updateBirthday: "Birthday",
            updateNationality: "Nationality",
            updateVisa: "Visa Type",
            studentVisa: "Student Visa",
            touristVisa: "Tourist Visa",
            workingVisa: "Working Visa",
            updatePhone: "Phone",
            updateAddress: "Address",
            updateEmail: "Email",
            updateBio: "Biography",
            updateJapaneseLevel: "Japanese Level",
            updateEnglishLevel: "English Level",
            updateProfilePicture: "Profile Picture",
            updateProfileDocument: "Resume",

            mypage: "Mypage",
            update: "Update",
            updateDocument: "Update Information",
            mypageFavoriteJobs: "Favorite Jobs",
        },
        ja: {
            headerText: "バイト検索アプリ",
            language: "言語",
            searchPlaceholder: "検索ワードを入力",
            areaLabel: "エリア",
            cityLabel: "市区",
            lineLabel: "路線",
            stationLabel: "駅名",
            jobTypeLabel: "職種",
            jobDateLabel: "日付",
            
            all: "すべて",
            singleJob: "単発バイト",
            longJob: "長期バイト",

            yourLevel: "あなたのレベル",

            searchButton: "検索",

            wage: "時給",


            headerTextDetail: "求人詳細",

            companyInfo: "企業情報",
            access: "アクセス",
            society: "社会的な取り組み",
            personalInfo: "個人情報保護方針",
            contact: "お問い合わせ",

            apply: "応募する",

            headerTextMypage: "マイページ",


            updateName: "名前",
            updateGender: "性別",
            male: "男性",
            female: "女性",
            updateBirthday: "生年月日",
            updateNationality: "国籍",
            updateVisa: "ビザの種類",
            studentVisa: "留学ビザ",
            touristVisa: "観光ビザ",
            workingVisa: "就労ビザ",
            updatePhone: "電話番号",
            updateAddress: "住所",
            updateEmail: "メールアドレス",
            updateBio: "自己紹介",
            updateJapaneseLevel: "日本語能力",
            updateEnglishLevel: "英語能力",
            updateProfilePicture: "プロフィール写真",
            updateProfileDocument: "履歴書",

            mypage: "マイページ",
            update: "更新",
            updateDocument: "情報更新",
            mypageFavoriteJobs: "お気に入りのバイト",

        }
    };


    // languageselect.forEach(radio => {
    //     radio.addEventListener('change', () => {
    //         setLanguage(radio.value);
    //     });
    // });

    const select = document.getElementById('switch-checkbox');
    select.addEventListener('change', (e) => {
        console.log(e);
        setLanguage(e.target.value);
    });



    function setLanguage(language) {
        // console.log(language);
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

    let language = sessionStorage.getItem('language');
    if (language == null) {
        setLanguage('en');
        sessionStorage.setItem('language', 'en');
    } else {
        console.log('language: ' + language);
        setLanguage(language);
    }
});