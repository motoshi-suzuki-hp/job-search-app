export function changeLanguage() {
    const language = sessionStorage.getItem('language');

    if (language === 'en') {
        sessionStorage.setItem('language', 'ja');
    } else if (language === 'ja') {
        sessionStorage.setItem('language', 'en');
    } else {
        sessionStorage.setItem('language', 'en');
    };
}

export function obtainLanguage() {
    const language = sessionStorage.getItem('language');

    return language;
}

export default { changeLanguage, obtainLanguage };