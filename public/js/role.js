$(document).ready(() => {
  var table = document.getElementById('table'),
  tableEvents = document.getElementById('tableEvents'),
  id = document.getElementById('id'),
  name = document.getElementById('name'),
  index = document.getElementById('index'),
  focus = 1

  $.get('/api/get/all', (data) => {
    data.roles.forEach((e, i) => {
      let tr = document.createElement('tr')
      let td1 = document.createElement('td')
      let td2 = document.createElement('td')
      td1.innerHTML = e.left
      td2.innerHTML = e.right
      td1.className = 'col-md-9'
      tr.appendChild(td1)
      tr.appendChild(td2)
      table.appendChild(tr)

      tr.addEventListener('click', () => {
        id.value = e.left
        name.value = e.right
        index.value = i

        // Clear active
        var trs = document.getElementsByTagName('tr');
        for (let i = 0; i < trs.length; i++) {
          trs[i].className = ''
        }

        // Active
        tr.className = 'active'
      })
    })

    data.events.forEach((e, i) => {
      let tr = document.createElement('tr')
      let td1 = document.createElement('td')
      let td2 = document.createElement('td')
      td1.innerHTML = e.id
      td2.innerHTML = e.name
      td1.className = 'col-md-3'
      tr.appendChild(td1)
      tr.appendChild(td2)
      tableEvents.appendChild(tr)

      tr.addEventListener('click', () => {
        if (focus == 1) {
          if (id.value == '') {
            id.value = td1.innerHTML
          } else {
            id.value += '^' + td1.innerHTML
          }
        } else {
          if (name.value == '') {
            name.value = td1.innerHTML
          } else {
            name.value += '^' + td1.innerHTML
          }
        }
      })
    })
  })

  $('#add').click(() => {

    $.post('/api/add/role', { id: id.value, name: name.value }).done(() => {
      swal(
        'Thêm luật thành công!',
        '',
        'success'
      ).then(() => {
        location.reload()
      })

    })
  })

  $('#edit').click(() => {
    $.post('/api/edit/role', { index: index.value, id: id.value, name: name.value }).done(() => {
      swal(
        'Sửa luật thành công!',
        '',
        'success'
      ).then(() => {
        location.reload()
      })

    })
  })

  $('#remove').click(() => {
    $.post('/api/remove/role', { index: index.value }).done(() => {
      swal(
        'Xóa luật thành công!',
        '',
        'success'
      ).then(() => {
        location.reload()
      })
    })
  })

  $('#id').click(() => {
    focus = 1
  })

  $('#name').click(() => {
    focus = 2
  })
})
