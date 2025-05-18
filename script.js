document.getElementById('booking-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    fetch('http://localhost:3000/check-session', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) throw new Error(`فشل في التحقق من الجلسة: ${response.status} ${response.statusText}`);
        return response.json();
    })
    .then(data => {
        if (data.loggedIn) {
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            if (!service || !date) {
                alert('يرجى اختيار الخدمة والتاريخ!');
                return;
            }
            fetch('http://localhost:3000/submit-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ service, date })
            })
            .then(response => {
                if (!response.ok) throw new Error('فشل في الحجز: ' + response.statusText);
                return response.json();
            })
            .then(data => alert(data.message || 'تم الحجز بنجاح!'))
            .catch(error => alert('حدث خطأ أثناء الحجز: ' + error.message));
        } else {
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        alert('حدث خطأ أثناء التحقق من الجلسة: ' + error.message);
        window.location.href = 'login.html';
    });
    this.reset();
});