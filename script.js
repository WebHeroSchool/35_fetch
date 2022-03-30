window.setTimeout(function (){
  document.body.classList.add('loaded');
  let body = document.body;
  let string = window.location.search;
  let url = 'https://api.github.com/users/aartemenko0';
  const date = new Date();
  const getDate = new Promise((resolve, reject) => {
    setTimeout (() => date ? resolve(date) : reject("Ошибка"), 100)
  })
  const getUrl = new Promise((resolve, reject) => {
    setTimeout (() => url ? resolve(url) :reject("Ошибка URL"), 100)
  })

  Promise.all([getUrl, getDate])
    .then(([url,date]) => fetch(url))
    .then(res => res.json())
    .then(json => {
      console.log(json.avatar_url);
      console.log(json.name);
      console.log(json.bio);
      console.log(json.html_url);

      let img = new Image();
      img.src = json.avatar_url;
      body.append(img);

      let name = document.createElement('p');
      if (json.name != null) {
        name.innerHTML = json.name;
      } else {
        name.innerHTML = 'Информация об имени пользователя недоступна';
      }
      body.append(name);
      name.addEventListener("click", () => location.assign(`https://github.com/${checkUsername(url)}`));

      let bio = document.createElement('p');
      if (json.bio != null) {
        bio.innerHTML = json.bio;
      } else {
        bio.innerHTML = 'Информация о bio пользователя недоступна';
      }
      body.append(bio);
      body.append(date)

    })

  .catch(err => alert('Информация о пользователе недоступна'));
}, 3000);