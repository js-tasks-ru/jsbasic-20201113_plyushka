function toggleText() {
  function hiddenText() {
    if(!text.hasAttribute('hidden')){
      text.setAttribute('hidden','');
    }else {
      text.removeAttribute('hidden');
    }
  };
  document.querySelector('button').addEventListener('click', hiddenText);
}
