const url = 'http://127.0.0.1:8080/api/upload-file/'
const form = document.querySelector('form')
const auditorList = document.querySelector(".grid-container")

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const files = document.querySelector('[type=file]').files
  const formData = new FormData()

  for (let i = 0; i < files.length; i++) {
    let file = files[i]

    formData.append('file', file)
  }

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    // alert('Berhasil menambahkan data');
    alert('Berhasil menambahkan data') ? "" : location.reload();
  })
})

window.onload = function listAuditor() { 
    fetch('http://127.0.0.1:8080/api/personnel/')
      .then((resp) => resp.json())
      .then(function(data){
        let persons = data.results;
        return persons.map(function(person) {
          let auditorDiv = document.createElement('div');
          auditorDiv.id = person.nama_personel;
          auditorDiv.classList.add("card");
          auditorList.appendChild(auditorDiv);
          auditorDiv.onclick = function(){
            // alert("ini adalah personel");
            var id = auditorDiv.id;
            window.location = "/#/personel/" + id + "/";
          }
          auditorDiv.innerHTML += person.nama_personel + "<br>" + "Status: " + person.status;
        })
        })
      .catch(function(error) {
          console.log(error);
      });
    }


