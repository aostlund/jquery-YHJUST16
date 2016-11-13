var addDiv = $('<li>Add div</li>').attr('id', 'add_div')
var addP = $('<li>Add p</li>').attr('id', 'add_p')
var addText = $('<li>Change text</li>').attr('id', 'change_text')
var changeBgColor = $('<li>Change background color</p>').attr('id', 'change_bg_color')
var changeTextColor = $('<li>Change text color</p>').attr('id', 'change_text_color')
var red = $('<li></li>').attr('style', 'background: #f00').attr('id', 'red')
var green = $('<li></li>').attr('style', 'background: #0f0').attr('id', 'green')
var blue = $('<li></li>').attr('style', 'background: #00f').attr('id', 'blue')
var black = $('<li></li>').attr('style', 'background: #000').attr('id', 'black')
var white = $('<li></li>').attr('style', 'background: #fff').attr('id', 'white')
var colors = $('<ul></ul>').attr('id', 'colors').append(red, green, blue, black, white)
var elemId = 0

$(function () {
  $('#container').on('click', '#start', function (event) {
    if (event.target.id == $(this).attr('id')) { // only trigger this if we really pressed the #start div
      showMenu($(this))
    }
  })
  $('#container').on('click', 'li', function (event) {
    addSomething($(this), event)
  })
})

var showMenu = function (element) {
  element.append($('<ul></ul>').attr('id', 'add_ul').attr('style', 'background: grey'))
  $('#add_ul').append(addDiv, addText, addP, changeBgColor, changeTextColor)
}

var addSomething = function (element, event) {
  switch (element.attr('id')) {
    case 'add_div':
      addElement(element.parent().parent(), '<div></div>')
      removeMenu()
      break
    case 'add_p':
      addElement(element.parent().parent(), '<p></p>')
      removeMenu()
      break
    case 'change_text':
      if ($('#text_form').val() === undefined) { //only run if there is no other text box already up
        element.append('<form id="text_form"><input type="text" id="input_text"><input type="submit">').submit(function (event) {
          event.preventDefault()
          var $input = $('#text_form :input#input_text')
          addTxt(element.parent().parent(), $input.val())
          addText.find('#text_form').remove()
          removeMenu()
        })
      }
      break
    case 'change_bg_color':
      if (event.target.id === element.attr('id')) {
        element.append(colors)
      }
      break
    case 'change_text_color':
      if (event.target.id === element.attr('id')) {
        element.append(colors)
      }
      break
    case 'red':     
      changeColor(element, '#f00')
      break
    case 'green':     
      changeColor(element, '#0f0')
      break
    case 'blue':     
      changeColor(element, '#00f')
      break
    case 'black':     
      changeColor(element, '#000')
      break
    case 'white':     
      changeColor(element, '#fff')
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

var changeColor = function(element, color) {
  if (element.parent().parent().attr('id') == 'change_bg_color') {
    changeBackgroundColor(element.parent().parent().parent().parent(), color)
    changeBgColor.find('#colors').remove()
  } else {
    changeTxtColor(element.parent().parent().parent().parent(), color)
    changeTextColor.find('#colors').remove()
  }
  removeMenu()
} 

var changeBackgroundColor = function(element, color) {
  element.css('background', color)
}

var changeTxtColor = function(element, color) {
  element.css('color',  color)
}

var removeMenu = function() {
  $('#add_ul').remove()
}
