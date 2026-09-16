document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.wizard').forEach(initWizard);
});

function initWizard(root) {
  var steps = Array.prototype.slice.call(root.querySelectorAll('.wizard-step'));
  var total = steps.length;
  var idx = 0;

  var progressBar = root.querySelector('.wizard-progress-bar');
  var curEl = root.querySelector('[data-cur]');
  var totalEl = root.querySelector('[data-total]');
  if (totalEl) totalEl.textContent = total;

  var backBtn = root.querySelector('.wizard-back');
  var nextBtn = root.querySelector('.wizard-next');
  var body = root.querySelector('.wizard-body');
  var success = root.querySelector('.wizard-success');

  function validate(i) {
    var step = steps[i];
    var ok = true;
    var groups = step.querySelectorAll('.choice-grid');
    groups.forEach(function (g) {
      if (g.hasAttribute('data-optional')) return;
      if (!g.querySelector('.choice-chip.is-selected')) ok = false;
    });
    var inputs = step.querySelectorAll('input[required], select[required]');
    inputs.forEach(function (inp) {
      if (inp.type === 'checkbox') { if (!inp.checked) ok = false; }
      else if (!inp.value) { ok = false; }
    });
    nextBtn.disabled = !ok;
  }

  function show(i) {
    steps.forEach(function (s, n) { s.hidden = n !== i; });
    if (curEl) curEl.textContent = i + 1;
    if (progressBar) progressBar.style.width = ((i + 1) / total * 100) + '%';
    backBtn.style.visibility = i === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = (i === total - 1) ? nextBtn.getAttribute('data-submit-label') : nextBtn.getAttribute('data-next-label');
    validate(i);
  }

  root.querySelectorAll('.choice-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = chip.closest('.choice-grid');
      var multi = group.getAttribute('data-multi') === 'true';
      if (!multi) {
        group.querySelectorAll('.choice-chip').forEach(function (c) { c.classList.remove('is-selected'); });
      }
      chip.classList.toggle('is-selected');
      validate(idx);
    });
  });

  root.querySelectorAll('input, select').forEach(function (el) {
    el.addEventListener('input', function () { validate(idx); });
    el.addEventListener('change', function () { validate(idx); });
  });

  backBtn.addEventListener('click', function () {
    if (idx > 0) { idx--; show(idx); }
  });

  nextBtn.addEventListener('click', function () {
    if (nextBtn.disabled) return;
    if (idx < total - 1) { idx++; show(idx); }
    else { submitWizard(); }
  });

  function collect() {
    var data = {};
    steps.forEach(function (step) {
      step.querySelectorAll('.choice-grid').forEach(function (group) {
        var name = group.getAttribute('data-name');
        var selected = Array.prototype.slice.call(group.querySelectorAll('.choice-chip.is-selected'))
          .map(function (c) { return c.getAttribute('data-value'); });
        data[name] = selected.join(', ');
      });
      step.querySelectorAll('input, select, textarea').forEach(function (el) {
        if (!el.name) return;
        if (el.type === 'checkbox') { data[el.name] = el.checked ? 'sí' : 'no'; }
        else { data[el.name] = el.value; }
      });
    });
    return data;
  }

  function submitWizard() {
    var endpoint = root.getAttribute('data-formspree');
    nextBtn.disabled = true;
    var sending = nextBtn.getAttribute('data-sending-label');
    if (sending) nextBtn.textContent = sending;

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(collect())
    }).then(function (res) {
      if (body) body.hidden = true;
      if (success) success.hidden = false;
    }).catch(function () {
      var msg = root.getAttribute('data-error-msg');
      if (msg) alert(msg);
      nextBtn.disabled = false;
      nextBtn.textContent = nextBtn.getAttribute('data-submit-label');
    });
  }

  show(0);
}
