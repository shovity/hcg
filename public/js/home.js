document.addEventListener('DOMContentLoaded', () => {
  var input = document.getElementById('id'),
    output = document.getElementById('name')

    $.get('/api/get/all', (data) => {
      data.events.forEach((e, i) => {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        td1.innerHTML = e.id
        td1.className = 'col-md-3'
        td2.innerHTML = e.name
        tr.appendChild(td1)
        tr.appendChild(td2)
        tableEvents.appendChild(tr)

        tr.addEventListener('click', () => {
          if (input.value == '') {
            input.value = td1.innerHTML
          } else {
            input.value += '^' + td1.innerHTML
          }
        })
      })

      var rules = data.roles,
      dich = tapDich(rules)

      function deductiveStart() {
        log.innerHTML = '<th>Tập trung gian</th><th></th>'
        var giaThiet = input.value.split('^') || giaThiet
        if (true) {
          var result = deductive(giaThiet, rules, dich)
          tlog.className = ''
          if (result != null) {
            al.innerHTML = `<strong>Kết luận : ${result.dich}</strong>`
            al.innerHTML += '<br>Nếu:'
            input.value.split('^').forEach((r) => {
              var e = data.events.find(ev => ev.id == r)
              al.innerHTML += `<br> ${e.name}`
              console.log(r);
            })

            var fi = data.events.find(ev => ev.id == result.dich)
            al.innerHTML += '<br>Thì: ' + fi.name
            al.className = 'alert alert-success'
          } else {
            al.innerHTML = '<strong>Không tìm thấy</strong> tập sự kiện đích trong tập trung gian'
            al.className = 'alert alert-danger'
          }
        }
      }

      input.addEventListener('keyup', (e) => {
        if (e.keyCode == 32) {
          input.value = input.value.replace(' ', '^')
        } else if (e.keyCode == 13) {
          deductiveStart()
        }
      })

      enter.addEventListener('click', () => {
        deductiveStart()
      })

      clear.addEventListener('click', () => {
        input.value = ''
      })
    })

  // Tra lai tap luat chi ton tai ben ve phai
  function tapDich(rules) {
    var result = []
    rules.forEach((rule) => {
      var exist = false
      rules.forEach((v) => {
        if (v.left.indexOf(rule.right) != -1) exist = true
      })
      if (!exist) result.push(rule.right)
    })
    return result
  }

  // [1, 2, 3] , [2, 3] => true
  function checkRule(target, rules) {
    var rules = rules.split('^')
    for (let i = 0; i < rules.length; i++) {
      if (target.indexOf(rules[i]) == -1) return false
    }
    return true
  }

  function deductive(giaThiet, rules, dich) {
    var rules = JSON.parse(JSON.stringify(rules)),
      trungGian = giaThiet,
      stop = false,
      result = null

    log.innerHTML += `<tr><td>${trungGian}</td><td></td></tr>`

    while (rules.length > 0 && !stop) {
      stop = true
      rules.forEach((rule, i) => {
        if (checkRule(trungGian, rule.left)) {
          log.innerHTML += `<tr><td>${trungGian},<strong>${rule.right}</strong> </td><td>Vi ${rule.left} -> ${rule.right}</td></tr>`
          trungGian.push(rule.right)
          rules.splice(i, 1);
          stop = false
        }
      })

      // Kiem tra ton tai dich' trong tung gian
      for (let i = 0; i < dich.length; i++) {
          if (trungGian.indexOf(dich[[i]]) != -1) {
            result = {trungGian, dich: dich[i]}
          }
      }
    }
    return result
  }

})
