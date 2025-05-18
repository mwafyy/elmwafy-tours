/* التسجيل */
document.getElementById('register-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;

    if (password !== confirmPassword) {
        alert('كلمات المرور غير متطابقة!');
        return;
    }

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
        credentials: 'include'
    }).then(response => {
        if (!response.ok) throw new Error('فشل في التسجيل: ' + response.statusText);
        return response.json();
    })
      .then(data => {
          alert(data.message);
          if (data.message.includes('بنجاح')) {
              window.location.href = 'login.html'; // رجوع لتسجيل الدخول بعد التسجيل
          }
      })
      .catch(error => alert('حدث خطأ أثناء التسجيل: ' + error.message));
    this.reset();
});

/* تسجيل الدخول */
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    }).then(response => {
        if (!response.ok) throw new Error('فشل في تسجيل الدخول: ' + response.statusText);
        return response.json();
    })
      .then(data => {
          alert(data.message);
          if (data.message === 'تم تسجيل الدخول بنجاح!') {
              window.location.href = 'booking.html';
          }
      })
      .catch(error => alert('حدث خطأ أثناء تسجيل الدخول: ' + error.message));
    this.reset();
});

/* تسجيل الخروج */
function logout() {
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include'
    }).then(response => {
        if (!response.ok) throw new Error('فشل في تسجيل الخروج: ' + response.statusText);
        return response.json();
    })
      .then(data => {
          alert(data.message);
          window.location.href = 'index.html';
      })
      .catch(error => alert('حدث خطأ أثناء تسجيل الخروج: ' + error.message));
}

/* الحجز مع التحقق من تسجيل الدخول */
document.getElementById('booking-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    fetch('http://localhost:3000/check-session', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (!response.ok) throw new Error('فشل في التحقق من الجلسة: ' + response.statusText);
        return response.json();
    })
      .then(data => {
          if (data.loggedIn) {
              fetch('http://localhost:3000/submit-booking', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      service: document.getElementById('service').value,
                      date: document.getElementById('date').value
                  }),
                  credentials: 'include'
              }).then(response => {
                  if (!response.ok) throw new Error('فشل في الحجز: ' + response.statusText);
                  return response.json();
              })
                .then(data => alert(data.message))
                .catch(error => alert('حدث خطأ أثناء الحجز: ' + error.message));
          } else {
              window.location.href = 'login.html'; // التوجيه لصفحة تسجيل الدخول
          }
      })
      .catch(error => {
          alert('حدث خطأ أثناء التحقق من الجلسة: ' + error.message);
          window.location.href = 'login.html'; // توجيه في حالة الخطأ
      });
    this.reset();
});

/* البحث عن الطيران الداخلي */
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) throw new Error('فشل في تسجيل الدخول: ' + response.statusText);
        return response.json();
    })
    .then(data => {
        alert(data.message);
        if (data.message === 'تم تسجيل الدخول بنجاح!') {
            window.location.href = 'booking.html';
        }
    })
    .catch(error => {
        alert('حدث خطأ أثناء تسجيل الدخول: ' + error.message);
    });
});
/* نموذج التواصل */
function submitContactForm() {
    fetch('http://localhost:3000/check-session', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (!response.ok) throw new Error('فشل في التحقق من الجلسة: ' + response.statusText);
        return response.json();
    })
      .then(data => {
          if (data.loggedIn) {
              fetch('http://localhost:3000/submit-contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      message: document.getElementById('message').value
                  }),
                  credentials: 'include'
              }).then(response => {
                  if (!response.ok) throw new Error('فشل في الإرسال: ' + response.statusText);
                  return response.json();
              })
                .then(data => alert(data.message))
                .catch(error => alert('حدث خطأ أثناء الإرسال: ' + error.message));
          } else {
              window.location.href = 'login.html';
          }
      })
      .catch(error => {
          alert('حدث خطأ أثناء التحقق من الجلسة: ' + error.message);
          window.location.href = 'login.html';
      });
    document.getElementById('contact-form')?.reset();
}