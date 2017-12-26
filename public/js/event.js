$(document).ready(() => {
  var table = document.getElementById('table'),
  id = document.getElementById('id'),
  name = document.getElementById('name'),
  index = document.getElementById('index')

  $.get('/api/get/events', (events) => {
    events.forEach((e, i) => {
      let tr = document.createElement('tr')
      let td1 = document.createElement('td')
      let td2 = document.createElement('td')
      td1.innerHTML = e.id
      td2.innerHTML = e.name
      td1.className = 'col-md-3'
      tr.appendChild(td1)
      tr.appendChild(td2)
      table.appendChild(tr)

      tr.addEventListener('click', () => {
        id.value = e.id
        name.value = e.name
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

    generateId.addEventListener('click', () => {
      var i = 1,
        result = ''

      do {
        result = int2a(i++)
        var exist = events.findIndex(event => event.id == result) != -1
      } while(i%27 == 0 || exist)
      id.value = result
    })
  })

  $('#add').click(() => {
    //
    if (id.value == '' || name.value == '') {
      //
    }

    $.post('/api/add/event', { id: id.value, name: name.value }).done(() => {
      swal(
        'Thêm sự kiện thành công!',
        '',
        'success'
      ).then(() => {
        location.reload()
      })

    })
  })

  $('#edit').click(() => {
    //
    if (id.value == '' || name.value == '') {
      //
    }

    $.post('/api/edit/event', { index: index.value, id: id.value, name: name.value }).done(() => {
      swal(
        'Sửa sự kiện thành công!',
        '',
        'success'
      ).then(() => {
        location.reload()
      })

    })
  })

  $('#remove').click(() => {
    //
    if (id.value == '' || name.value == '') {
      //
    }

    $.post('/api/remove/event', { index: index.value }).done(() => {
      swal(
        'Xóa sự kiện thành công!',
        '',
        'success'
      ).then(() => {
        location.reload()
      })

    })
  })

  /**
   * Convert integer to a27 (`->0 .. 26->z)
   * `,a,b,..,z,a`,aa,ab,..,az,b`,ba..
   * i%27 == 0 -> exist `
   */
   function int2a(x) {
     var result = ''
     do {
       result = String.fromCharCode(96 + x%27) + result
       x = Math.floor(x / 27)
     } while (x != 0)
     return result
   }
})
