async function submitForm(event) {
    event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
    try {
        // формируем запрос
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: new FormData(event.target)
        });
        // проверяем, что ответ есть
        if (!response.ok) throw ('Ошибка при обращении к серверу: ${response.status}');
        // проверяем, что ответ действительно JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw ('Ошибка. Ответ не JSON');
        }

        // обрабатываем запрос
        const json = await response.json();
        if (json.result === "success") {
            // в случае успеха
            alert(json.info);
        } else {
            // в случае ошибки
            console.log(json.desc);
            throw (json.info);
        }
    } catch (error) { // обработка ошибки
        alert(error);
    }
}