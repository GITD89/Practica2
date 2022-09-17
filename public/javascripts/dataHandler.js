fetch("/perfiles")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let html = "";

    for (let i = 0; i < data.perfiles.length; i++) {
      html += `<a class="collapse-item" href="/perfiles/${data.perfiles[
        i
      ].nombre
        .toLowerCase()
        .replace(" ", "-")}">${data.perfiles[i].nombre}</a>`;
    }

    const contenedor = document.getElementById("perfiles-links");
    contenedor.innerHTML = html;
    const table = document.getElementById("perfiles-table");
    console.log(table);
  })
  .catch((err) => {
    console.log(err);
  });
