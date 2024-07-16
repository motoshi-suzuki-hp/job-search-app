function updateMypage(event) {
    event.preventDefault();  // フォームのデフォルト送信を防止

    const form = event.target;
    const formData = new FormData(form);

    fetch(`/mypage-update`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('更新しました');
            
            // // 画像パスをセッションストレージに保存
            // const profilePicturePath = data.profilePicturePath;
            // const resumePath = data.resumePath;
            // if (profilePicturePath) {
            //     sessionStorage.setItem('profilePicturePath', profilePicturePath);
            // }
            // if (resumePath) {
            //     sessionStorage.setItem('resumePath', resumePath);
            // }
            
            window.location.href = "/mypage";
        } else {
            alert('エラーが発生しました');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateMypage(event) {
    event.preventDefault();  // フォームのデフォルト送信を防止

    const form = event.target;
    const formData = new FormData(form);
    console.log(formData);

    fetch(`/mypage-update`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('更新しました');
            window.location.href = "/mypage";
        } else {
            alert('エラーが発生しました');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




document.addEventListener('DOMContentLoaded', () => {
    const switchCheckboxJa = document.getElementById('switch-checkbox-ja');
    const switchCheckboxEn = document.getElementById('switch-checkbox-en');
    
    let language = sessionStorage.getItem('language');

    
    if (language === 'ja') {
        switchCheckboxJa.checked = true;
        switchCheckboxEn.checked = false;

    } else if (language === 'en') {
        switchCheckboxJa.checked = false;
        switchCheckboxEn.checked = true;
    }

    console.log(switchCheckboxEn.checked);

});

// document.querySelectorAll('input[name="language"]').forEach(radio => {
//     radio.addEventListener('change', () => {
//         sessionStorage.setItem('language', radio.value);
//     });
// });

const select = document.getElementById('switch-checkbox');
    select.addEventListener('change', (e) => {
        sessionStorage.setItem('language', e.target.value);
    });