const getHedgehogs = () => {
  $('#hedgehog-info').html('');

  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`) // make a get request to url
    .then(response => response.json()) // after getting back the request turn the response into json format (object)
    .then(hedgehogs => appendHedgehogs(hedgehogs)) // take the json, call it hedgehogs, and then run the function appendHedgehogs on the hedgehog array
    .catch(error => console.error({ error }));  // if there's an error in any of this throw an error
};

const addNewHedgehog = () => {
  const name = $('#name').val();
  const hoglets = $('#hoglets').val();
  const allergies = $('#allergies').val();
  fetch('https://hedgehog-party.herokuapp.com/api/v1/invites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      hoglets: hoglets,
      allergies: allergies
    })
  })
  .then(response => {
    return response.json();
  })
  .then(jsonResponse => {
    if(jsonResponse.error) {
      alert(jsonResponse.error)
      $('#api-response').append(`<div class=success>Not added successfully</div>`)
    } else {
      alert('Hedgehog added successfully');
      console.log(jsonResponse);
      $('#api-response').append(`<div class=success>Successfully made request</div>`);
      getHedgehogs();
    }
  })
  .catch(error => alert(error));
}

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const unInviteHedgehog = (id) => {
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites/${id}`, {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Methods': 'DELETE'
    }
  })
  .then((response) => {
    getHedgehogs();
  })
  .catch((e) => {
    console.log(e);
  })
};

getHedgehogs();

$('#invite-btn').on('click', (e) => {
  e.preventDefault();
  console.log(e);
  addNewHedgehog();
});

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', (e) => {
  let id = e.currentTarget.id;
  unInviteHedgehog(id);
});

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
