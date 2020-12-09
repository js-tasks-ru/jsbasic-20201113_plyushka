/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement('UL');
  for (let friend of friends) {
    let li = document.createElement('LI');
    	li.innerHTML = friend.firstName+' '+ friend.lastName;
    ul.append(li);
  }
  return ul;
}
