/*
  The function asTabs will receive an
  element node as an argument and will
  modify it to be a tab based interface.
  By pressing a tab, content related to
  that tab will be displayed.
*/

const deactiveTabs = tabs => {
  Array.from(tabs).forEach(tab => {
    tab.className = 'inactive-tab';
  });
};

const asTabs = el => {
  const head = document.createElement('div');
  const body = document.createElement('div');
  const bodyContent = [];

  Array.from(el.children).forEach((child, i) => {
    const tab = document.createElement('button');
    tab.textContent = child.getAttribute('data-tabname');
    tab.className = 'inactive-tab';

    bodyOptions.push(child.cloneNode(true));
    child.remove();

    tab.addEventListener('click', () => {
      deactiveTabs(head.children);
      body.children[0].remove();
      body.appendChild(bodyContent[i].cloneNode(true));
      tab.className = 'active-tab';
    });

    head.appendChild(tab);
  });

  el.appendChild(head);
  el.appendChild(body);
  head.children[0].className = 'active-tab';
  body.appendChild(bodyContent[0].cloneNode(true));
};
