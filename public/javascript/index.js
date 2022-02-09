const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(elem => {
        let text = ""




        elem.data.reverse().forEach(eachCharacter => {


          text += `<div class="character-info">
  <div class="name">${eachCharacter.name}</div>
  <div class="occupation"> name: ${eachCharacter.occupation}
  </div>
  <div class="cartoon">is a Cartoon?: ${eachCharacter.cartoon}</div>
  <div class="weapon">Weapon ${eachCharacter.weapon}</div>
</div>`;
        })
        document.querySelector('.characters-container').innerHTML = text



      })
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const valueID = document.getElementById('character-id').value



    charactersAPI.getOneRegister(valueID).then(elem => {
      let text = ""

      text += `<div class="character-info">
  <div class="name">${elem.data.name}</div>
  <div class="occupation"> name: ${elem.data.occupation}
  </div>
  <div class="cartoon">is a Cartoon?: ${elem.data.cartoon}</div>
  <div class="weapon">Weapon ${elem.data.weapon}</div>
</div>`;
      document.querySelector('.characters-container').innerHTML = text
    }




    )
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const valueID = document.getElementById("character-id-delete").value

    charactersAPI.deleteOneRegister(valueID).then((elm) => {

      if (elm.data) {
        const colorBtn = document.getElementById("delete-one")
        colorBtn.style.backgroundColor = "green";
        console.log(elm)
      } else {
        const colorBtn = document.getElementById("delete-one")
        colorBtn.style.backgroundColor = "red";
      }
    }

    )



  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form .field input')
    console.log(inputs)
    console.log(event.target)
    charId = inputs[0].value
    const characterData = {

      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }


    charactersAPI.updateOneRegister(charId, characterData).then(x => {


      if (x.data) {


        const colorBtn = document.getElementById("send-data-edit")
        colorBtn.style.backgroundColor = "green";
      } else {

        const colorBtn = document.getElementById("send-data-edit")
        colorBtn.style.backgroundColor = "red";
      }
    })



  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {



    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form .field input')
    console.log(inputs)
    const formData = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      isCartoon: inputs[3].checked
    }


    charactersAPI
      .createOneRegister(formData)
      .then(response => {
        document.querySelector("#new-character-form").reset()
        charactersAPI.getFullList()
        const colorBtn = document.getElementById("send-data")
        colorBtn.style.backgroundColor = "green";
      })
      .catch(err => console.log(err + "yoooo esto es un HERRORRRR"))






    // document.querySelector('#newCharacterForm').onsubmit = e => {

    //   e.preventDefault()

    //   const inputs = document.querySelectorAll('#newCharacterForm input')

    //   const characterData = {
    //     name: inputs[0].value,
    //     occupation: inputs[1].value,
    //     weapon: inputs[2].value
    //   }

    //   handler
    //     .saveCharacter(characterData)
    //     .then(response => {
    //       document.querySelector('#newCharacterForm').reset()
    //       loadAllCharacters()
    //     })
    //     .catch(err => console.log(err))
    // }
  });
});
