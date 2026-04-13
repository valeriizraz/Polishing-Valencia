const cases = document.querySelectorAll('.case');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const track = document.querySelector('.cases__track');

let index = 0;
let startX = 0;
let endX = 0;

function showCase(i) {
  cases.forEach((item) => item.classList.remove('active'));
  cases[i].classList.add('active');
}

next?.addEventListener('click', () => {
  index = (index + 1) % cases.length;
  showCase(index);
});

prev?.addEventListener('click', () => {
  index = (index - 1 + cases.length) % cases.length;
  showCase(index);
});

// scroll
document.querySelector('.header__btn')?.addEventListener('click', () => {
  document.querySelector('#form').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.no-paint__btn')?.addEventListener('click', () => {
  document.querySelector('#form').scrollIntoView({ behavior: 'smooth' });
});

// form
const form = document.querySelector('.final__form');
const successText = document.querySelector('.final__success');
const whatsappBtn = document.querySelector('.final__whatsapp');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const phoneInput = form.querySelector('[name="phone"]');
  const phone = phoneInput.value.trim();

  if (!phone || phone.length < 6) {
    alert('Введите корректный телефон');
    phoneInput.focus();
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      form.reset();
      successText.classList.remove('hidden');
      whatsappBtn.classList.remove('hidden');

      setTimeout(() => {
        successText.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    } else {
      alert('Ошибка отправки');
    }

  } catch {
    alert('Ошибка соединения');
  }
});

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;

  if (Math.abs(diff) < 30) return;

  if (diff > 0) {
    index = (index + 1) % cases.length;
  } else {
    index = (index - 1 + cases.length) % cases.length;
  }

  showCase(index);
}