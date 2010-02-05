/* 用户完成字段编辑后调用此函数 */
function field_done_editing(e)
{
  var field_div = $(e).closest('.field');
  
  field_div.find('.question').show();
  field_div.find('.form').hide();
  
  // 更新问题名称
  var field_name = $(field_div).find("#field_name").val();
  field_div.find('.question label').html(field_name)
  
  var field_input = $(field_div).find("#field_input").val();
  var input = '';
  
  if(field_input == 'text') {
    input += "<textarea></textarea>";
  } else if(field_input == 'radio') {
    field_div.find('.form .options input[type=text]').each(function(){
      input += '<input type="radio" />';
      input += '<label>' + $(this).val(); + '</label>';
    });
  } else if(field_input == 'string') {
    input += '<input type="text" />';
  } else if(field_input == 'check') {
    field_div.find('.form .options input[type=text]').each(function(){
      input += '<input type="checkbox" />';
      input += '<label>' + $(this).val(); + '</label>';
    });
  } else if(field_input == 'drop') {
    input += "<select>";
    field_div.find('.form .options input[type=text]').each(function(){
      option = '<option value="' + $(this).val() + '">' + $(this).val() + '</option>';
      input += option;
    });
    input += "</select>";
  }

  field_div.find('.question .input').html(input);
}

function field_cancel_editing(e)
{
  var field = $(e).closest('.field');
  field.find('.question').show();
  field.find('.form').hide();
}

function field_input_changed(e)
{
  var form = $(e).closest('form');
  var input = $(e).val();
  var input_options = $('#' + input + '_input').html();
  form.find('.input_options').html(input_options);
}

function field_add_option(e, type)
{
  var options = $(e).closest('.input_options').find('.options');
  var option = '<p>';

  if(type == 'radio') {
    option += '<input type="radio" />';
  } else if (type == 'check') {
    option += '<input type="checkbox" />';
  }
  
  option += '<input type="text" name="options[]" />';
  option += '<a href="#" onclick="field_remove_option(this);">删除</a>';
  option += '</p>';
  
  options.append(option);
  options.find('input[type=text]').last().focus();
}

function field_remove_option(e)
{
  $(e).parent().remove();
}