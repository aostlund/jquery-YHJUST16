var addDiv = $('<li>Add div</li>').attr('id', 'add_div')
var addP = $('<li>Add p</li>').attr('id', 'add_p')
var addText = $('<li>Add text</li>').attr('id', 'add_text')
var elemId = 0

$(function () {
  $('#container').on('click', '#start', function (event) {
    if (event.target.id == $(this).attr('id')) { // only trigger this if we really pressed the #start div
      showMenu($(this))
    }
  })
  $('#container').on('click', 'li', function () {
    addSomething($(this))
  })
})

var showMenu = function (element) {
  element.append($('<ul></ul>').attr('id', 'add_ul'))
  $('#add_ul').append(addDiv, addText, addP)
}

var addSomething = function (element) {
  switch (element.attr('id')) {
    case 'add_div':
      addElement(element.parent().parent(), '<div></div>')
      removeMenu()
      break
    case 'add_p':
      addElement(element.parent().parent(), '<p></p>')
      removeMenu()
      break
    case 'add_text':
      addTxt(element.parent().parent(), 'text')
      removeMenu()
      break
  }
}

var addElement = function (element, newElem) {
  var newId = 'id' + elemId
  element.append($(newElem)
    .text('new element')
    .attr('id', newId)
    .on('click', function () {
      if (event.target.id == $(this).attr('id')) {
        showMenu($(this))
      }
    }))
  elemId++
}

var addTxt = function (element, text) {
  var withDataAndEvents = true;
  var deepWithDataAndEvents = true;
  var temp = element.children().clone(withDataAndEvents, deepWithDataAndEvents) //uses clone(true, true) to make the copy contain the eventhandlers of the children
  element.text(text).append(temp)
}

var removeMenu = function() {
  $('#add_ul').remove()
}
