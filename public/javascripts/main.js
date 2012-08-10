$(document).ready(function(){
	
	$('a.edit').on('click', function(ev){
		ev.preventDefault();
		var li =  $(this).closest('li');
		li.find('form.edit').show();
		li.find('div.text').hide();
	})
	
	$('a.cancel').on('click', function(ev){
		ev.preventDefault();
		var li =  $(this).closest('li');
		li.find('form.edit').hide();
		li.find('div.text').show();
	})
	
	$('a.save').on('click', function(ev){
		ev.preventDefault();
		$(this).closest('form').submit();
	})
	
	$('a.delete').on('click', function(ev){
		ev.preventDefault();
		var li = $(this).closest('li');
		$.ajax({
			url: '/delete',
			type: 'post',
			data: { id: li.find('input[name=id]').val()},
			success: function(data){
				li.remove();
			}
		})
	})
	
})