/*
  The function below removes paragraph
  nodes whose data-classified attribute
  is set to "secret".
*/

function removeClassifiedNodes() {
  const paras = document.body.getElementsByTagName('p');
  for (let para of Array.from(paras)) {
    if (para.getAttribute('data-classified') == 'secret') {
      para.remove();
    }
  }
}
